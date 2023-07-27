from pydantic import BaseModel
from queries.pool import pool
from typing import Union, List


class Error(BaseModel):
    message: str


class CategoryIn(BaseModel):
    name: str
    image_1: str

class CategoryOut(BaseModel):
    id: int
    name: str
    image_1: str

class CategoryQueries(BaseModel):
    def get_all(self) -> Union[Error, List[CategoryOut]]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
                        SELECT id
                            , name
                            , image_1
                        FROM categories;
                        """
                    )
                    return [
                        CategoryOut(
                            id=record[0],
                            name=record[1],
                            image_1=record[2]
                        )
                        for record in db
                    ]
        except Exception as e:
            print(e)
            return {"message": "could not get all categories"}
