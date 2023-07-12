from pydantic import BaseModel
from typing import List, Optional, Union
<<<<<<< HEAD
from datetime import datetime
=======
from datetime import date
>>>>>>> e1c9437 (Reservations queries and routers (create_reservation, update_reservation, get_student_reservation) completed)
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


<<<<<<< HEAD
class ReservationDetailsOut(BaseModel):
    id: int
    date_time: datetime
    capacity: int
    class_name: str
    instructor_first_name: str
    instructor_last_name: str
    location_name: str
    address: str
    city: str
    state: str
    zip_code: int
    total_price: float
    status: bool


class ReservationQuery:
    def get_one(self, reservation_id: int) -> Optional[ReservationDetailsOut]:
=======
class ReservationQuery:
    def get_student(self, student_id: int) -> Optional[ReservationOut]:
>>>>>>> e1c9437 (Reservations queries and routers (create_reservation, update_reservation, get_student_reservation) completed)
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    result = db.execute(
                        """
<<<<<<< HEAD
                        SELECT reservations.id
                            , events.date_time
                            , events.capacity
                            , classes.class_name
                            , accounts.first_name
                            , accounts.last_name
                            , locations.name
                            , locations.address
                            , locations.city
                            , locations.state
                            , locations.zip_code
                            , total_price
                            , status
                        FROM reservations
                        INNER JOIN events ON reservations.event_id = events.id
                        INNER JOIN classes ON reservations.class_id = classes.id
                        INNER JOIN accounts ON reservations.student_id = accounts.id
                        INNER JOIN locations ON classes.location_id = locations.id
                        WHERE reservations.id = %s
                        """,
                        [reservation_id],
                    )
                    record = result.fetchone()
                    if record is None:
                        return None
                    return self.record_to_reservation_details_out(record)
        except Exception as e:
            print(e)
            return {"message": "Could not get that reservation"}

    def get_student(
        self, student_id: int
    ) -> Union[Error, List[ReservationDetailsOut]]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    result = db.execute(
                        """
                        SELECT reservations.id
                            , events.date_time
                            , events.capacity
                            , classes.class_name
                            , accounts.first_name
                            , accounts.last_name
                            , locations.name
                            , locations.address
                            , locations.city
                            , locations.state
                            , locations.zip_code
                            , total_price
                            , status
                        FROM reservations
                        INNER JOIN events ON reservations.event_id = events.id
                        INNER JOIN classes ON reservations.class_id = classes.id
                        INNER JOIN accounts ON reservations.student_id = accounts.id
                        INNER JOIN locations ON classes.location_id = locations.id
                        WHERE student_id = %s;
=======
                        SELECT id, event_id, class_id, student_id, total_price, status
                        FROM reservations
                        WHERE student_id = %s
>>>>>>> e1c9437 (Reservations queries and routers (create_reservation, update_reservation, get_student_reservation) completed)
                        """,
                        [student_id],
                    )
                    return [
<<<<<<< HEAD
                        self.record_to_reservation_details_out(record)
=======
                        self.record_to_reservation_out(record)
>>>>>>> e1c9437 (Reservations queries and routers (create_reservation, update_reservation, get_student_reservation) completed)
                        for record in result
                    ]
        except Exception as e:
            print(e)
<<<<<<< HEAD
            return {"message": "Could not get that reservation"}
=======
            return {"message": "Could not get your reservations"}

    # def get_instructor:
    #     pass
>>>>>>> e1c9437 (Reservations queries and routers (create_reservation, update_reservation, get_student_reservation) completed)

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
<<<<<<< HEAD

    def record_to_reservation_details_out(self, record):
        return ReservationDetailsOut(
            id=record[0],
            date_time=record[1],
            capacity=record[2],
            class_name=record[3],
            instructor_first_name=record[4],
            instructor_last_name=record[5],
            location_name=record[6],
            address=record[7],
            city=record[8],
            state=record[9],
            zip_code=record[10],
            total_price=record[11],
            status=record[12],
        )

    # def get_instructor(self, instructor_id: int) -> Optional[ReservationOut]:
    #     try:
    #         with pool.connection() as conn:
    #             with conn.cursor() as db:
    #                 result = db.execute(
    #                     """
    #                     SELECT id
    #                         , events.date_time
    #                         , events.capacity
    #                         , classes.name
    #                         , classes.accounts.first_name
    #                         , classes.accounts.last_name
    #                         , classes.locations.address
    #                         , classes.locations.city
    #                         , classes.locations.state
    #                         , classes.locations.zip_code
    #                         , accounts.first_name
    #                         , accounts.last_name
    #                         , total_price
    #                         , status
    #                     FROM reservations
    #                     INNER JOIN events ON reservations.event_id = events.id
    #                     INNER JOIN classes ON reservations.class_id = classes.id
    #                     INNER JOIN accounts ON reservations.student_id = accounts.id
    #                     WHERE classes.instructor_id = %s
    #                     """,
    #                     [instructor_id],
    #                 )
    #                 return [
    #                     self.record_to_reservation_out(record)
    #                     for record in result
    #                 ]
    #     except Exception as e:
    #         print(e)
    #         return {"message": "Could not get your reservations"}
=======
>>>>>>> e1c9437 (Reservations queries and routers (create_reservation, update_reservation, get_student_reservation) completed)
