from pydantic import BaseModel
from queries.pool import pool
from typing import Union, List, Optional


class Error(BaseModel):
    message: str


class ClassIn(BaseModel):
    class_name: str
    instructor_id: int
    requirements: str
    category_id: int
    description: str
    price: int
    featured: bool
    image_1: str
    image_2: str
    image_3: str
    image_4: str
    location_id: int


class ClassOut(BaseModel):
    id: int
    class_name: str
    instructor_id: int
    requirements: str
    category_id: int
    description: str
    price: int
    featured: bool
    image_1: str
    image_2: str
    image_3: str
    image_4: str
    location_id: int


class ClassOutDetail(ClassOut):
    category_name: str
    location_name: str
    location_address: str
    location_city: str
    location_state: str
    location_zip_code: str
    location_latitude: str = None
    location_longitude: str = None


class ClassQueries(BaseModel):
    def get_all(self) -> Union[Error, List[ClassOutDetail]]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
                        SELECT classes.id
                            , class_name
                            , instructor_id
                            , requirements
                            , category_id
                            , categories.name
                            , description
                            , price
                            , featured
                            , image_1
                            , image_2
                            , image_3
                            , image_4
                            , location_id
                            , locations.name
                            , locations.address
                            , locations.city
                            , locations.state
                            , locations.zip_code
                            , locations.latitude
                            , locations.longitude
                        FROM classes
                        INNER JOIN categories on classes.category_id = categories.id
                        INNER JOIN locations on classes.location_id = locations.id
                        """
                    )
                    return [
                        self.record_to_class_detail_out(record)
                        for record in db
                    ]
        except Exception as e:
            print(e)
            return {"message": "could not get all classes"}

    def create(self, class_info: ClassIn) -> Union[ClassOut, Error]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    result = db.execute(
                        """
                        INSERT INTO classes
                            (
                            class_name
                            , instructor_id
                            , requirements
                            , category_id
                            , description
                            , price
                            , featured
                            , image_1
                            , image_2
                            , image_3
                            , image_4
                            , location_id
                        )
                        VALUES
                            (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
                        RETURNING id;
                        """,
                        [
                            class_info.class_name,
                            class_info.instructor_id,
                            class_info.requirements,
                            class_info.category_id,
                            class_info.description,
                            class_info.price,
                            class_info.featured,
                            class_info.image_1,
                            class_info.image_2,
                            class_info.image_3,
                            class_info.image_4,
                            class_info.location_id,
                        ],
                    )
                    id = result.fetchone()[0]
                    return self.class_in_to_out(id, class_info)
        except Exception as e:
            print(e)
            return {"message": "create didn't work"}

    def class_in_to_out(self, id: int, class_info: ClassIn):
        old_data = class_info.dict()
        return ClassOut(id=id, **old_data)

    def get_one(self, class_id: int) -> Optional[ClassOutDetail]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    result = db.execute(
                        """
                        SELECT classes.id
                            , class_name
                            , instructor_id
                            , requirements
                            , category_id
                            , categories.name
                            , description
                            , price
                            , featured
                            , image_1
                            , image_2
                            , image_3
                            , image_4
                            , location_id
                            , locations.name
                            , locations.address
                            , locations.city
                            , locations.state
                            , locations.zip_code
                            , locations.latitude
                            , locations.longitude
                        FROM classes
                        INNER JOIN categories on classes.category_id = categories.id
                        INNER JOIN locations on classes.location_id = locations.id
                        WHERE classes.id = %s
                        """,
                        [class_id],
                    )
                    record = result.fetchone()
                    if record is None:
                        return None
                    return self.record_to_class_detail_out(record)
        except Exception as e:
            print(e)
            return {"message": "could not get that class info"}

    def record_to_class_detail_out(self, record):
        return ClassOutDetail(
            id=record[0],
            class_name=record[1],
            instructor_id=record[2],
            requirements=record[3],
            category_id=record[4],
            category_name=record[5],
            description=record[6],
            price=record[7],
            featured=record[8],
            image_1=record[9],
            image_2=record[10],
            image_3=record[11],
            image_4=record[12],
            location_id=record[13],
            location_name=record[14],
            location_address=record[15],
            location_city=record[16],
            location_state=record[17],
            location_zip_code=record[18],
            location_latitude=record[19],
            location_longitude=record[20],
        )
