from fastapi import APIRouter, Depends, Response
from typing import List, Optional, Union
from queries.reservations import (
    Error,
    ReservationIn,
    ReservationOut,
    ReservationDetailsOut,
    ReservationStatusIn,
    ReservationStatusOut,
    ReservationQuery,
)


router = APIRouter()


@router.post("/reservations", response_model=Union[ReservationOut, Error])
def create_reservation(
    reservation: ReservationIn,
    response: Response,
    query: ReservationQuery = Depends(),
):
    return query.create(reservation)


@router.put(
    "/reservations/{reservation_id}",
    response_model=Union[ReservationStatusOut, Error],
)
def update_reservation(
    reservation_id: int,
    reservation: ReservationStatusIn,
    query: ReservationQuery = Depends(),
) -> Union[ReservationStatusOut, Error]:
    return query.update(reservation_id, reservation)


@router.get(
    "/reservations/{reservation_id}",
    response_model=Optional[ReservationDetailsOut],
)
def get_one_reservation(
    reservation_id: int,
    response: Response,
    query: ReservationQuery = Depends(),
) -> ReservationDetailsOut:
    reservation = query.get_one(reservation_id)
    if reservation is None:
        response.status_code = 404
    return reservation


@router.get(
    "/student/reservations/{student_id}",
    response_model=Union[List[ReservationDetailsOut], Error],
)
def get_student_reservations(
    student_id: int,
    query: ReservationQuery = Depends(),
) -> ReservationDetailsOut:
    return query.get_student(student_id)


@router.get(
    "/reservations/instructors/{instructor_id}",
    response_model=Union[List[ReservationDetailsOut], Error],
)
def get_reservations_by_instructor(
    instructor_id: int,
    query: ReservationQuery = Depends(),
) -> ReservationDetailsOut:
    return query.get_reservations_by_instructor(instructor_id)
