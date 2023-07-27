from fastapi import APIRouter, Depends
from typing import List, Union
from queries.categories import Error, CategoryOut, CategoryQueries

router = APIRouter()


@router.get("/api/categories", response_model=Union[List[CategoryOut], Error])
def get_all(
    query: CategoryQueries = Depends(),
) -> Union[List[CategoryOut], Error]:
    return query.get_all()
