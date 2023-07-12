from fastapi import APIRouter, Depends, Response
from typing import List, Union, Optional
from queries.account_details import (
    Error,
    AccountDetailIn,
    AccountDetailOut,
    AccountDetailQueries,
    AccountDetailsOut
)

router = APIRouter()


@router.get("/account/{account_id}", response_model=Optional[AccountDetailsOut])
def get_one_account(
    account_id: int,
    response: Response,
    query: AccountDetailQueries = Depends(),
) -> AccountDetailsOut:
    account = query.get_one(account_id)
    if account is None:
        response.status_code = 404
    return account


@router.post("/account_details", response_model=Union[AccountDetailOut, Error])
def create_account_details(
    account_details: AccountDetailIn,
    query: AccountDetailQueries = Depends(),
) -> Union[AccountDetailOut, Error]:
    return query.create(account_details)


@router.put(
    "/account_details/{account_id}",
    response_model=Union[AccountDetailOut, Error],
)
def update_account_details(
    account_id: int,
    account_details: AccountDetailIn,
    query: AccountDetailQueries = Depends(),
) -> Union[AccountDetailOut, Error]:
    return query.update(account_id, account_details)


@router.delete("/account_details/{account_id}", response_model=bool)
def delete_account_details(
    account_id: int,
    query: AccountDetailQueries = Depends(),
) -> bool:
    return query.delete(account_id)
