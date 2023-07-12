from fastapi import APIRouter, Depends, Response
from typing import List, Union, Optional
from queries.classes import (
    Error,
    ClassIn,
    ClassOut,
    ClassQueries,
    ClassOutDetail,
)

router = APIRouter()


@router.get("/classes", response_model=Union[List[ClassOutDetail], Error])
def get_all(query: ClassQueries = Depends()):
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
