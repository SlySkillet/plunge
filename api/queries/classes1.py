from pydantic import BaseModel
from queries.pool import pool
from typing import (
    Union,
    List,
    Optional
)

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

class ClassQueries(BaseModel):
    def get_all(self) -> Union[Error, List[ClassOut]]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
                        SELECT id
                            , class_name
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
                        FROM classes
                        """
                    )
                    return [
                        ClassOut(
                            id=record[0],
                            class_name=record[1],
                            instructor_id = record[2],
                            requirements=record[3],
                            category_id=record[4],
                            description=record[5],
                            price=record[6],
                            featured=record[7],
                            image_1 = record[8],
                            image_2=record[9],
                            image_3=record[10],
                            image_4=record[11],
                            location_id=record[12],
                        )
                        for record in db
                    ]
        except Exception as e:
            print(e)
            return {"message": "could not get all classes"}

    def create(self, class_info: ClassIn) -> Union[ClassIn, Error]:
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
                            class_info.location_id
                        ]
                    )
                    id = result.fetchone()[0]
                    return self.class_in_to_out(id, class_info)
        except Exception as e:
                print(e)
                return {"message": "create didn't work"}

    def class_in_to_out(self, id:int, class_info: ClassIn):
        old_data = class_info.dict()
        return ClassOut(id=id, **old_data)

    def get_one(self, class_id: int) -> Optional[ClassOut]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    result = db.execute(
                        """
                        SELECT id
                            , class_name
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
                        FROM classes
                        WHERE id = %s
                        """,
                        [class_id],
                    )
                    record = result.fetchone()
                    if record is None:
                        return None
                    return ClassOut(
                        id=record[0],
                        class_name=record[1],
                        instructor_id = record[2],
                        requirements=record[3],
                        category_id=record[4],
                        description=record[5],
                        price=record[6],
                        featured=record[7],
                        image_1 = record[8],
                        image_2=record[9],
                        image_3=record[10],
                        image_4=record[11],
                        location_id=record[12],
                    )
        except Exception as e:
            print(e)
            return {"message": "could not get that class info"}
