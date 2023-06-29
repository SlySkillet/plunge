from pydantic import BaseModel
from queries.pool import pool


class DuplicateAccountError(ValueError):
    pass


class AccountIn(BaseModel):
    username: str
    first_name: str
    last_name: str
    email: str
    password: str


class AccountOut(BaseModel):
    id: str
    username: str
    first_name: str
    last_name: str
    email: str


class AccountOutWithPassword(AccountOut):
    hashed_password: str


class AccountQueries:
    def get(self, username: str) -> AccountOutWithPassword:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    result = db.execute(
                        """
                        SELECT id
                            , username
                            , first_name
                            , last_name
                            , email
                            , password
                        FROM accounts
                        WHERE username = %s
                        """,
                        [username],
                    )
                    record = result.fetchone()
                    if record is None:
                        return None
                    return self.record_to_account_out_with_password(record)
        except Exception as e:
            print(e)
            return {"message": "Could not get that account"}

    def create(
        self, info: AccountIn, hashed_password: str
    ) -> AccountOutWithPassword:
        with pool.connection() as conn:
            with conn.cursor() as db:
                params = [
                    info.username,
                    info.first_name,
                    info.last_name,
                    info.email,
                    hashed_password,
                ]
                result = db.execute(
                    """
                    INSERT INTO accounts (username, first_name, last_name, email, password)
                    VALUES (%s, %s, %s, %s, %s)
                    RETURNING id, username, first_name, last_name, email, password
                    """,
                    params,
                )
                record = result.fetchone()
                if record is None:
                    return None
                return self.record_to_account_out_with_password(record)

    def record_to_account_out(self, record):
        return AccountOut(
            id=record[0],
            username=record[1],
            first_name=record[2],
            last_name=record[3],
            email=record[4],
        )

    def record_to_account_out_with_password(self, record):
        return AccountOutWithPassword(
            id=record[0],
            username=record[1],
            first_name=record[2],
            last_name=record[3],
            email=record[4],
            hashed_password=record[5],
        )
