from fastapi import APIRouter, Depends, Response
from typing import List, Union, Optional
from authenticator import authenticator
from queries.classes import (
    Error,
    ClassIn,
    ClassOut,
    ClassQueries,
    ClassOutDetail,
)

router = APIRouter()


@router.get("/api/classes", response_model=Union[List[ClassOutDetail], Error])
def get_all(
    response: Response,
    query: ClassQueries = Depends(),
    feed: str | None = None,
    category: int | None = None,
    instructor: int | None = None,
    search_term: str | None = None,
    account_data: Optional[dict] = Depends(
        authenticator.try_get_current_account_data
    ),
) -> Union[List[ClassOutDetail], Error]:
    if feed is not None:
        if feed == "featured":
            return query.get_featured()
        elif feed == "upcoming":
            return query.get_upcoming()
        elif feed == "nearby":
            if account_data is None:
                response.status_code = 401
                return {"message": "Login to see nearby classes"}
            return query.get_nearby(account_data.get("id"))
    elif category is not None:
        return query.get_category(category)
    elif instructor is not None:
        return query.get_by_instructor(instructor)
    elif search_term is not None:
        return query.get_by_search_term(search_term)
    else:
        return query.get_all()


@router.post("/api/classes", response_model=Union[ClassOut, Error])
def create_class(
    response: Response, class_info: ClassIn, query: ClassQueries = Depends()
) -> Union[ClassOut, Error]:
    result = query.create(class_info)
    try:
        result.id
    except AttributeError:
        response.status_code = 400
    return result


@router.put(
    "/api/classes/{class_id}",
    response_model=Union[ClassOut, Error],
)
def update_class(
    class_id: int,
    new_class_details: ClassIn,
    response: Response,
    query: ClassQueries = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data),
) -> Union[ClassOut, Error]:
    original_class_details = query.get_one(class_id)
    if account_data.get("id") == original_class_details.instructor_id:
        return query.update(class_id, new_class_details)
    else:
        response.status_code = 401
        return {
            "message": "Only the instructor is permitted to edit this class."
        }


@router.get("/api/classes/{class_id}", response_model=Optional[ClassOutDetail])
def get_one_class(
    class_id: int,
    response: Response,
    query: ClassQueries = Depends(),
) -> Optional[ClassOutDetail]:
    class_info = query.get_one(class_id)
    if class_info is None:
        response.status_code = 404
    return class_info
