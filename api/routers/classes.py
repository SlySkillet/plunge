from fastapi import APIRouter, Depends, Response
from typing import List, Union
from queries.classes import(
    Error,
    ClassIn,
    ClassOut,
    ClassQueries
)

router = APIRouter()

@router.get("/classes", response_model=Union[List[ClassOut], Error])
def get_all(
    query: ClassQueries = Depends()
):
    return query.get_all()

@router.post("/classes", response_model=Union[ClassOut, Error])
def create_class(
    class_info: ClassIn,
    query: ClassQueries = Depends()
):
    return query.create(class_info)
