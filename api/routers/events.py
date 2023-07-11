from fastapi import APIRouter, Depends, Response
from typing import List, Union, Optional
from queries.events import (
    Error,
    EventIn,
    EventOut,
    EventQueries,
)


router = APIRouter()


@router.post("/events", response_model=Union[EventOut, Error])
def create_event(
    event: EventIn,
    query: EventQueries = Depends(),
) -> Union[EventOut, Error]:
    return query.create(event)


@router.get("/events/{event_id}", response_model=Optional[EventOut])
def get_one_event(
    event_id: int,
    response: Response,
    query: EventQueries = Depends(),
) -> EventOut:
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
    event: EventIn,
    query: EventQueries = Depends(),
) -> Union[EventOut, Error]:
    return query.update(event_id, event)


@router.delete("/events/{event_id}", response_model=bool)
def delete_event(
    event_id: int,
    query: EventQueries = Depends(),
) -> bool:
    return query.delete(event_id)
