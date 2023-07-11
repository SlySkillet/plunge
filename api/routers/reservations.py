from fastapi import APIRouter, Depends, Response
from typing import List, Optional, Union
from queries.reservations import (
    Error,
    ReservationIn,
    ReservationOut,
    ReservationQuery,
)


router = APIRouter()


@router.post("/reservations", response_model=Union[ReservationOut, Error])
def create_reservation(
    reservation: ReservationIn,
    response: Response,
    query: ReservationQuery = Depends(),
):
    response.status_code = 400
    return query.create(reservation)


@router.put(
    "/reservations/{reservation_id}",
    response_model=Union[ReservationOut, Error],
)
def update_reservation(
    reservation_id: int,
    reservation: ReservationIn,
    query: ReservationQuery = Depends(),
) -> Union[ReservationOut, Error]:
    return query.update(reservation_id, reservation)


@router.get(
    "/student/reservations/{student_id}",
    response_model=Optional[ReservationOut],
)
def get_student_reservations(
    student_id: int,
    query: ReservationOut = Depends(),
) -> ReservationOut:
    return query.get_student(student_id)


@router.get(
    "/instructor/reservations/{instructor_id}",
    response_model=Optional[ReservationOut],
)
def get_instructor_reservations(
    instructor_id: int,
    query: ReservationOut = Depends(),
) -> ReservationOut:
    return query.get_instructor(instructor_id)
