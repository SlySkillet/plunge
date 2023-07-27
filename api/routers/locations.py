from fastapi import APIRouter, Depends, Response
from typing import List, Union
from queries.locations import Error, LocationIn, LocationOut, LocationQueries
from .acls import get_location_data

router = APIRouter()


@router.get(
    "/api/locations/{account_id}",
    response_model=Union[List[LocationOut], Error],
)
def get_locations_by_account(
    account_id: int,
    query: LocationQueries = Depends(),
) -> Union[List[LocationOut], Error]:
    return query.get_locations_by_account(account_id)


@router.get("/api/locations", response_model=Union[List[LocationOut], Error])
def get_all(
    query: LocationQueries = Depends(),
) -> Union[List[LocationOut], Error]:
    return query.get_all()


@router.post("/api/locations", response_model=Union[LocationOut, Error])
def create_location(
    location: LocationIn, query: LocationQueries = Depends()
) -> Union[LocationOut, Error]:
    openweather = get_location_data(location.zip_code)
    location.latitude = openweather["latitude"]
    location.longitude = openweather["longitude"]
    return query.create(location)
