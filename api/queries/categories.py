from pydantic import BaseModel
from queries.pool import pool
from typing import (
    Union,
    List
)

class Error(BaseModel):
    message: str

class CategoryIn(BaseModel):
    name: str

class CategoryOut(BaseModel):
    id: int
    name: str

class CategoryQueries(BaseModel):
    def get_all(self) -> Union[Error, List[CategoryOut]]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
                        SELECT id, name
                        FROM categories;
                        """
                    )
                    return [
                        CategoryOut(
                            id=record[0],
                            name=record[1],
                        )
                        for record in db
                    ]
        except Exception as e:
            print(e)
            return {"message": "could not get all categories"}
