from fastapi import APIRouter, Depends, Response
from typing import List, Union
from queries.categories import(
    Error,
    CategoryIn,
    CategoryOut,
    CategoryQueries
)

router = APIRouter()

@router.get("/categories", response_model=Union[List[CategoryOut], Error])
def get_all(
    query: CategoryQueries = Depends()
):
    return query.get_all()
