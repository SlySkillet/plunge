from fastapi import APIRouter, Depends, Response, Request
from typing import List, Union, Optional
from authenticator import authenticator
from queries.classes import (
    Error,
    ClassIn,
    ClassOut,
    ClassQueries,
    ClassOutDetail,
)
from queries.accounts import AccountOut

router = APIRouter()


@router.get("/classes", response_model=Union[List[ClassOutDetail], Error])
def get_all(
    response: Response,
    query: ClassQueries = Depends(),
    feed: str | None = None,
    category: int | None = None,
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
    else:
        return query.get_all()


@router.post("/classes", response_model=Union[ClassOut, Error])
def create_class(class_info: ClassIn, query: ClassQueries = Depends()):
    return query.create(class_info)


@router.get("/classes/{class_id}", response_model=Optional[ClassOutDetail])
def get_one_class(
    class_id: int,
    response: Response,
    query: ClassQueries = Depends(),
) -> ClassOutDetail:
    class_info = query.get_one(class_id)
    if class_info is None:
        response.status_code = 404
    return class_info
