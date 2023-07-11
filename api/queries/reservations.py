from pydantic import BaseModel
from typing import List, Optional, Union
from datetime import date
from queries.pool import pool


class Error(BaseModel):
    message: str


class ReservationIn(BaseModel):
    event_id: int
    class_id: int
    student_id: int
    total_price: float
    status: bool


class ReservationOut(BaseModel):
    id: int
    event_id: int
    class_id: int
    student_id: int
    total_price: float
    status: bool


class ReservationQuery:
    def get_student(self, student_id: int) -> Optional[ReservationOut]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    result = db.execute(
                        """
                        SELECT id, event_id, class_id, student_id, total_price, status
                        FROM reservations
                        WHERE student_id = %s
                        """,
                        [student_id],
                    )
                    return [
                        self.record_to_reservation_out(record)
                        for record in result
                    ]
        except Exception as e:
            print(e)
            return {"message": "Could not get your reservations"}

    def get_instructor(self, instructor_id: int) -> Optional[ReservationOut]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    result = db.execute(
                        """
                        SELECT id
                            , event_id
                            , class_id
                            , student_id
                            , total_price
                            , status
                        FROM reservations
                        INNER JOIN classes on reservations.class_id = classes.id
                        WHERE classes.instructor_id = %s
                        """,
                        [instructor_id],
                    )
                    return [
                        self.record_to_reservation_out(record)
                        for record in result
                    ]
        except Exception as e:
            print(e)
            return {"message": "Could not get your reservations"}

    def update(
        self, reservation_id: int, reservation: ReservationIn
    ) -> Union[ReservationOut, Error]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
                        UPDATE reservations
                        SET event_id = %s
                            , class_id = %s
                            , student_id = %s
                            , total_price = %s
                            , status = %s
                        WHERE id = %s
                        """,
                        [
                            reservation.event_id,
                            reservation.class_id,
                            reservation.student_id,
                            reservation.total_price,
                            reservation.status,
                            reservation_id,
                        ],
                    )
                    return self.reservation_in_to_out(
                        reservation_id, reservation
                    )
        except Exception as e:
            print(e)
            return {"message": "Could not update that reservation"}

    def create(
        self, reservation: ReservationIn
    ) -> Union[ReservationOut, Error]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    result = db.execute(
                        """
                        INSERT INTO reservations
                            (event_id, class_id, student_id, total_price, status)
                        VALUES
                            (%s, %s, %s, %s, %s)
                        RETURNING id;
                        """,
                        [
                            reservation.event_id,
                            reservation.class_id,
                            reservation.student_id,
                            reservation.total_price,
                            reservation.status,
                        ],
                    )
                    id = result.fetchone()[0]
                    return self.reservation_in_to_out(id, reservation)
        except Exception:
            return {"message": "Create did not work"}

    def reservation_in_to_out(self, id: int, reservation: ReservationIn):
        old_data = reservation.dict()
        return ReservationOut(id=id, **old_data)

    def record_to_reservation_out(self, record):
        return ReservationOut(
            id=record[0],
            event_id=record[1],
            class_id=record[2],
            student_id=record[3],
            total_price=record[4],
            status=record[5],
        )
