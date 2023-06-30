from fastapi import APIRouter, Depends, Response
from typing import List, Union, Optional
from queries.account_details import (
    Error,
    AccountDetailIn,
    AccountDetailOut,
    AccountDetailQueries
)

router = APIRouter()

@router.get("/account/{account_id}", response_model=Optional[AccountDetailOut])
def get_one_account(
    account_id: int,
    response: Response,
    query: AccountDetailQueries = Depends(),
) -> AccountDetailOut:
    account = query.get_one(account_id)
    if account is None:
        response.status_code = 404
    return account
