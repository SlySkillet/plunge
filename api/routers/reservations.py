from fastapi import APIRouter, Depends, Response
from typing import List, Optional, Union
from authenticator import authenticator
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


@router.post("/api/reservations", response_model=Union[ReservationOut, Error])
def create_reservation(
    reservation: ReservationIn,
    query: ReservationQuery = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data),
) -> Union[ReservationOut, Error]:
    return query.create(account_data.get("id"), reservation)


@router.put(
    "/api/reservations/{reservation_id}",
    response_model=Union[ReservationStatusOut, Error],
)
def update_reservation(
    reservation_id: int,
    reservation: ReservationStatusIn,
    response: Response,
    query: ReservationQuery = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data),
) -> Union[ReservationStatusOut, Error]:
    original_reservation = query.get_one(reservation_id)
    if (
        account_data.get("id") == original_reservation.student_id
        or account_data.get("id") == original_reservation.instructor_id
    ):
        return query.update(reservation_id, reservation)
    else:
        response.status_code = 401
        return {
            "message": "Only the instructor or the student are permitted to update a reservation."
        }


@router.get(
    "/api/reservations/{reservation_id}",
    response_model=Optional[ReservationDetailsOut],
)
def get_one_reservation(
    reservation_id: int,
    response: Response,
    query: ReservationQuery = Depends(),
) -> Optional[ReservationDetailsOut]:
    reservation = query.get_one(reservation_id)
    if reservation is None:
        response.status_code = 404
    return reservation


@router.get(
    "/api/student/reservations/{student_id}",
    response_model=Union[List[ReservationDetailsOut], Error],
)
def get_student_reservations(
    student_id: int,
    query: ReservationQuery = Depends(),
) -> Union[List[ReservationDetailsOut], Error]:
    return query.get_student(student_id)


@router.get(
    "/api/reservations/instructors/{instructor_id}",
    response_model=Union[List[ReservationDetailsOut], Error],
)
def get_reservations_by_instructor(
    instructor_id: int,
    query: ReservationQuery = Depends(),
) -> Union[List[ReservationDetailsOut], Error]:
    return query.get_reservations_by_instructor(instructor_id)
