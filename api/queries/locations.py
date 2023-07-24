from pydantic import BaseModel
from queries.pool import pool
from typing import Union, List


class Error(BaseModel):
    message: str


class LocationIn(BaseModel):
    name: str
    address: str
    city: str
    state: str
    zip_code: int
    latitude: str
    longitude: str


class LocationOut(BaseModel):
    id: int
    name: str
    address: str
    city: str
    state: str
    zip_code: int
    latitude: str
    longitude: str


class LocationQueries(BaseModel):
    def get_all(self) -> Union[Error, List[LocationOut]]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
                        SELECT id
                            , name
                            , address
                            , city
                            , state
                            , zip_code
                            , latitude
                            , longitude
                        FROM locations
                        ORDER BY id;
                        """
                    )
                    return [
                        LocationOut(
                            id=record[0],
                            name=record[1],
                            address=record[2],
                            city=record[3],
                            state=record[4],
                            zip_code=record[5],
                            latitude=record[6],
                            longitude=record[7],
                        )
                        for record in db
                    ]
        except Exception as e:
            print(e)
            return {"message": "could not get all locations"}

    def create(self, location: LocationIn) -> Union[LocationOut, Error]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    result = db.execute(
                        """
                        INSERT INTO locations
                            (
                            name
                            , address
                            , city
                            , state
                            , zip_code
                            , latitude
                            , longitude
                        )
                        VALUES
                            (%s, %s, %s, %s, %s, %s, %s)
                        RETURNING id;
                        """,
                        [
                            location.name,
                            location.address,
                            location.city,
                            location.state,
                            location.zip_code,
                            location.latitude,
                            location.longitude,
                        ],
                    )
                    id = result.fetchone()[0]
                    return self.location_in_to_out(id, location)
        except Exception:
            return {"message": "create didn't work"}

    def location_in_to_out(self, id: int, location: LocationIn):
        old_data = location.dict()
        return LocationOut(id=id, **old_data)
