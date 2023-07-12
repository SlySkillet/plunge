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
                        [
                            event.date_time,
                            event.capacity,
                            event.class_id
                        ],
                    )
                    id = result.fetchone()[0]
                    return self.event_in_to_out(id, event)
        except Exception as e:
            print(e)
            return {"message": "could not create that event"}

    def event_in_to_out(self, id, event: EventIn):
        old_data = event.dict()
        return EventOut(id=id, **old_data)

    def get_one(self, event_id: int) -> Optional[EventOut]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    result = db.execute(
                        """
                        SELECT id
                        , date_time
                        , capacity
                        , class_id
                        FROM events
                        WHERE id = %s
                        ORDER BY id;
                        """,
                        [event_id],
                    )
                    record = result.fetchone()
                    if record is None:
                        return None
                    return EventOut(
                        id=record[0],
                        date_time=record[1],
                        capacity=record[2],
                        class_id=record[3],
                    )
        except Exception as e:
            print(e)
            return {"message": "could not get that event"}

    def update(
        self, event_id, event: EventIn
    ) -> Union[EventOut, Error]:
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
                    return self.event_in_to_out(
                        event_id, event
                    )
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
