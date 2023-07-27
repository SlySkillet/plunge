from fastapi import APIRouter, Depends, Response
from typing import List, Union, Optional
from authenticator import authenticator
from queries.events import (
    Error,
    EventIn,
    EventOut,
    EventDetailOut,
    EventQueries,
)


router = APIRouter()


@router.post("/events", response_model=Union[EventOut, Error])
def create_event(
    response: Response,
    event: EventIn,
    query: EventQueries = Depends(),
) -> Union[EventOut, Error]:
    result = query.create(event)
    try:
        result.id
    except AttributeError:
        response.status_code = 400
    return result


@router.get(
    "/events/future/{class_id}",
    response_model=Union[List[EventDetailOut], Error],
)
def get_all_future(class_id: int, query: EventQueries = Depends()):
    return query.get_all_future(class_id)


@router.get(
    "/events/instructor/{instructor_id}",
    response_model=Union[List[EventDetailOut], Error],
)
def get_all_by_instructor(instructor_id: int, query: EventQueries = Depends()):
    return query.get_all_by_instructor(instructor_id)


@router.get("/events/{event_id}", response_model=Optional[EventDetailOut])
def get_one_event(
    event_id: int,
    response: Response,
    query: EventQueries = Depends(),
) -> EventDetailOut:
    event = query.get_one(event_id)
    if event is None:
        response.status_code = 404
    return event


@router.put(
    "/events/{event_id}",
    response_model=Union[EventOut, Error],
)
def update_event(
    event_id: int,
    new_event_details: EventIn,
    response: Response,
    query: EventQueries = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data),
) -> Union[EventOut, Error]:
    original_event_details = query.get_one(event_id)
    if account_data.get("id") == original_event_details.instructor_id:
        return query.update(event_id, new_event_details)
    else:
        response.status_code = 401
        return {
            "message": "Only the instructor is permitted to edit this event."
        }


@router.delete("/events/{event_id}", response_model=bool)
def delete_event(
    event_id: int,
    query: EventQueries = Depends(),
) -> bool:
    return query.delete(event_id)
