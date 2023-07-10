from pydantic import BaseModel
from queries.pool import pool
from typing import Union, List, Optional


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
                        [account_id],
                    )
                    record = result.fetchone()
                    if record is None:
                        return None
                    return AccountDetailOut(
                        id=record[0],
                        account_id=record[1],
                        avatar=record[2],
                        phone_number=record[3],
                        biography=record[4],
                        mock_credit_card=record[5],
                        interests=record[6],
                        location_id=record[7],
                    )
        except Exception as e:
            print(e)
            return {"message": "could not get that account detail"}

    def create(self, account_details: AccountDetailIn) -> AccountDetailOut:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    result = db.execute(
                        """
                        INSERT INTO account_details
                            (account_id
                            , avatar
                            , phone_number
                            , biography
                            , mock_credit_card
                            , interests
                            , location_id)
                        VALUES
                            (%s, %s, %s, %s, %s, %s, %s)
                        RETURNING id;
                        """,
                        [
                            account_details.account_id,
                            account_details.avatar,
                            account_details.phone_number,
                            account_details.biography,
                            account_details.mock_credit_card,
                            account_details.interests,
                            account_details.location_id,
                        ],
                    )
                    id = result.fetchone()[0]
                    # Return new data
                    return self.account_details_in_to_out(id, account_details)
        except Exception as e:
            print(e)
            return {"message": "Could not create account details"}

    def account_details_in_to_out(self, id, account_details: AccountDetailIn):
        old_data = account_details.dict()
        return AccountDetailOut(id=id, **old_data)

    def update(
        self, account_id, account_details: AccountDetailIn
    ) -> Union[AccountDetailOut, Error]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
                        UPDATE account_details
                        SET avatar = %s
                            , phone_number = %s
                            , biography = %s
                            , mock_credit_card = %s
                            , interests = %s
                            , location_id = %s
                        WHERE account_id = %s
                        """,
                        [
                            account_details.avatar,
                            account_details.phone_number,
                            account_details.biography,
                            account_details.mock_credit_card,
                            account_details.interests,
                            account_details.location_id,
                            account_id,
                        ],
                    )
                    return self.account_details_in_to_out(
                        account_id, account_details
                    )
        except Exception as e:
            print(e)
            return {"message": "Could not update those account details"}

    def delete(self, account_id) -> bool:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
                        DELETE FROM account_details
                        WHERE account_id = %s
                        """,
                        [account_id],
                    )
                    return True
        except Exception as e:
            print(e)
            return False
