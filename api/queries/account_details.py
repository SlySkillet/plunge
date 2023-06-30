from pydantic import BaseModel
from queries.pool import pool
from typing import (
    Union,
    List,
    Optional
)

class Error(BaseModel):
    message: str

class AccountDetailIn(BaseModel):
    account_id: int
    avatar: str
    phone_number: int
    biography: str
    mock_credit_card: str
    interests: int
    location_id: int

class AccountDetailOut(BaseModel):
    id: int
    account_id: int
    avatar: str
    phone_number: int
    biography: str
    mock_credit_card: str
    interests: int
    location_id: int


class AccountDetailQueries(BaseModel):
    def get_one(self, account_id: int) -> Optional[AccountDetailOut]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    result = db.execute(
                        """
                        SELECT id
                            , account_id
                            , avatar
                            , phone_number
                            , biography
                            , mock_credit_card
                            , interests
                            , location_id
                        FROM account_details
                        WHERE account_id = %s
                        ORDER BY id;
                        """,
                        [account_id]
                    )
                    record = result.fetchone()
                    if record is None:
                        return None

                    return [
                        AccountDetailOut(
                            id=1,
                            account_id=1,
                            avatar='string',
                            phone_number=32,
                            biography='string',
                            mock_credit_card='string',
                            interests=1,
                            location_id=2
                        )
                        for record in db
                    ]
                    # return [
                    #     AccountDetailOut(
                    #         id=record[0],
                    #         account_id=record[1],
                    #         avatar=record[2],
                    #         phone_number=record[3],
                    #         biography=record[4],
                    #         mock_credit_card=record[5],
                    #         interests=record[6],
                    #         location_id=record[7]
                    #     )
                    #     for record in db
                    # ]
        except Exception as e:
            print(e)
            return {"message": "could not get that account detail"}
