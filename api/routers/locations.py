from fastapi import APIRouter, Depends, Response
from typing import List, Union
from queries.locations import (
    Error,
    LocationIn,
    LocationOut,
    LocationQueries
)

router = APIRouter()

@router.get("/locations", response_model=Union[List[LocationOut], Error])
def get_all(
    query: LocationQueries = Depends()
):
    return query.get_all()

@router.post("/locations", response_model=Union[LocationOut, Error])
def create_location(
    location: LocationIn,
    query: LocationQueries = Depends()
):
    return query.create(location)
