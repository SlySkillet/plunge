from pydantic import BaseModel
from queries.pool import pool
from typing import Union, List, Optional
from datetime import datetime


class Error(BaseModel):
    message: str


class EventIn(BaseModel):
    date_time: datetime
    capacity: int
    class_id: int


class EventOut(BaseModel):
    id: int
    date_time: datetime
    capacity: int
    class_id: int


class EventDetailOut(BaseModel):
    id: int
    date_time: datetime
    capacity: int
    class_id: int
    instructor_id: int
    seats_taken: int | None


class EventQueries(BaseModel):
    def create(self, event: EventIn) -> EventOut:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    result = db.execute(
                        """
                        INSERT INTO events
                            (date_time
                            , capacity
                            , class_id
                        )
                        VALUES
                            (%s, %s, %s)
                        RETURNING id;
                        """,
                        [event.date_time, event.capacity, event.class_id],
                    )
                    id = result.fetchone()[0]
                    return self.event_in_to_out(id, event)
        except Exception as e:
            print(e)
            return {"message": "could not create that event"}

    def event_in_to_out(self, id, event: EventIn):
        old_data = event.dict()
        return EventOut(id=id, **old_data)

    def get_one(self, event_id: int) -> Optional[EventDetailOut]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    result = db.execute(
                        """
                        WITH seats_taken AS (
                        SELECT
                            event_id,
                            COUNT(student_id) AS seats_taken
                        FROM reservations
                        WHERE event_id = %s AND status = true
                        GROUP BY event_id
                        )
                        SELECT events.id
                            , date_time
                            , capacity
                            , class_id
                            , classes.instructor_id
                            , seats_taken.seats_taken
                        FROM events
                        INNER JOIN classes ON classes.id = events.class_id
                        LEFT JOIN seats_taken ON events.id = seats_taken.event_id
                        WHERE events.id = %s
                        ORDER BY id;
                        """,
                        [event_id, event_id],
                    )
                    record = result.fetchone()
                    if record is None:
                        return None
                    return EventDetailOut(
                        id=record[0],
                        date_time=record[1],
                        capacity=record[2],
                        class_id=record[3],
                        instructor_id=record[4],
                        seats_taken=record[5],
                    )
        except Exception as e:
            print(e)
            return {"message": "could not get that event"}

    def get_all_future(self, class_id) -> Union[List[EventDetailOut], Error]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
                        WITH seats_taken AS (
                        SELECT
                            event_id,
                            COUNT(student_id) AS seats_taken
                        FROM reservations
                        INNER JOIN events ON event_id = events.id
                        WHERE event_id = events.id AND status = true
                        GROUP BY event_id
                        )
                        SELECT events.id
                            , date_time
                            , capacity
                            , class_id
                            , classes.instructor_id
                            , seats_taken.seats_taken
                        FROM events
                        INNER JOIN classes ON classes.id = events.class_id
                        LEFT JOIN seats_taken ON events.id = seats_taken.event_id
                        WHERE events.date_time > current_date AND class_id = %s
                        ORDER BY events.date_time;
                        """,
                        [class_id],
                    )
                    return [self.record_to_event_out(record) for record in db]
        except Exception as e:
            print(e)
            return {"message": "could not get those events"}

    def get_all_by_instructor(
        self, instructor_id
    ) -> Union[List[EventDetailOut], Error]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
                        WITH seats_taken AS (
                        SELECT
                            event_id,
                            COUNT(student_id) AS seats_taken
                        FROM reservations
                        INNER JOIN events ON event_id = events.id
                        WHERE event_id = events.id AND status = true
                        GROUP BY event_id
                        )
                        SELECT events.id
                            , date_time
                            , capacity
                            , class_id
                            , classes.instructor_id
                            , seats_taken.seats_taken
                        FROM events
                        INNER JOIN classes ON classes.id = events.class_id
                        LEFT JOIN seats_taken ON events.id = seats_taken.event_id
                        WHERE classes.instructor_id = %s
                        ORDER BY events.date_time DESC;
                        """,
                        [instructor_id],
                    )
                    return [self.record_to_event_out(record) for record in db]
        except Exception as e:
            print(e)
            return {"message": "could not get those events"}

    def update(self, event_id, event: EventIn) -> Union[EventOut, Error]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
                        UPDATE events
                        SET date_time = %s
                        , capacity = %s
                        , class_id = %s
                        WHERE id = %s
                        """,
                        [
                            event.date_time,
                            event.capacity,
                            event.class_id,
                            event_id,
                        ],
                    )
                    return self.event_in_to_out(event_id, event)
        except Exception as e:
            print(e)
            return {"message": "Could not update that event"}

    def delete(self, event_id) -> bool:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
                        DELETE FROM events
                        WHERE id = %s
                        """,
                        [event_id],
                    )
                    return True
        except Exception as e:
            print(e)
            return False

    def record_to_event_out(self, record):
        return EventDetailOut(
            id=record[0],
            date_time=record[1],
            capacity=record[2],
            class_id=record[3],
            instructor_id=record[4],
            seats_taken=record[5],
        )
