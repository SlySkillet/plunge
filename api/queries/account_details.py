from pydantic import BaseModel
from queries.pool import pool
from typing import Union, Optional


class Error(BaseModel):
    message: str


class AccountDetailPostIn(BaseModel):
    account_id: int
    avatar: str | None
    phone_number: int | None
    biography: str | None
    mock_credit_card: str | None
    interests: int | None
    location_id: int | None


class AccountDetailPutIn(BaseModel):
    avatar: str | None
    phone_number: int | None
    biography: str | None
    mock_credit_card: str | None
    interests: int | None
    location_id: int | None


class AccountDetailOut(BaseModel):
    id: int
    account_id: int
    avatar: str | None
    phone_number: int | None
    biography: str | None
    mock_credit_card: str | None
    interests: int | None
    location_id: int | None


class AccountDetailsOut(AccountDetailOut):
    interest_name: str | None
    location_name: str | None
    location_address: str | None
    location_city: str | None
    location_state: str | None
    location_zip_code: str | None
    location_latitude: str | None
    location_longitude: str | None


class AccountDetailQueries(BaseModel):
    def get_one(self, account_id: int) -> Optional[AccountDetailsOut]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    result = db.execute(
                        """
                        SELECT account_details.id
                            , account_id
                            , avatar
                            , phone_number
                            , biography
                            , mock_credit_card
                            , interests
                            , categories.name
                            , location_id
                            , locations.name
                            , locations.address
                            , locations.city
                            , locations.state
                            , locations.zip_code
                            , locations.latitude
                            , locations.longitude
                        FROM account_details
                        LEFT JOIN categories on account_details.interests = categories.id
                        LEFT JOIN locations on account_details.location_id = locations.id
                        WHERE account_id = %s
                        """,
                        [account_id],
                    )
                    record = result.fetchone()
                    if record is None:
                        return None
                    return self.record_to_account_details_out(record)

        except Exception as e:
            print(e)
            return {"message": "could not get that account detail"}

    def create(self, account_details: AccountDetailPostIn) -> AccountDetailOut:
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
                    return self.account_details_post_in_to_out(
                        id, account_details
                    )
        except Exception as e:
            print(e)
            return {"message": "Could not create account details"}

    def account_details_post_in_to_out(
        self, id, account_details: AccountDetailPostIn
    ):
        old_data = account_details.dict()
        return AccountDetailOut(id=id, **old_data)

    def account_details_put_in_to_out(
        self, id, account_id, account_details: AccountDetailPutIn
    ):
        old_data = account_details.dict()
        return AccountDetailOut(id=id, account_id=account_id, **old_data)

    def update(
        self, account_id, account_details: AccountDetailPutIn
    ) -> Union[AccountDetailOut, Error]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    result = db.execute(
                        """
                        UPDATE account_details
                        SET avatar = %s
                            , phone_number = %s
                            , biography = %s
                            , mock_credit_card = %s
                            , interests = %s
                            , location_id = %s
                        WHERE account_id = %s
                        RETURNING id;
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
                    id = result.fetchone()[0]
                    return self.account_details_put_in_to_out(
                        id, account_id, account_details
                    )
        except Exception as e:
            print(e)
            return {"message": "Could not update those account details"}

    def record_to_account_details_out(self, record):
        return AccountDetailsOut(
            id=record[0],
            account_id=record[1],
            avatar=record[2],
            phone_number=record[3],
            biography=record[4],
            mock_credit_card=record[5],
            interests=record[6],
            interest_name=record[7],
            location_id=record[8],
            location_name=record[9],
            location_address=record[10],
            location_city=record[11],
            location_state=record[12],
            location_zip_code=record[13],
            location_latitude=record[14],
            location_longitude=record[15],
        )
