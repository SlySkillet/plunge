from fastapi import APIRouter, Depends, Response
from typing import Union
from authenticator import authenticator
from queries.account_details import (
    Error,
    AccountDetailPutIn,
    AccountDetailOut,
    AccountDetailQueries,
    AccountDetailsOut,
)

router = APIRouter()


@router.get(
    "/api/account_details", response_model=Union[AccountDetailsOut, Error]
)
def get_one_account(
    response: Response,
    query: AccountDetailQueries = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data),
) -> Union[AccountDetailsOut, Error]:
    account = query.get_one(account_data.get("id"))
    if account is None:
        response.status_code = 404
        return {"message": "Account not found"}
    return account


@router.put(
    "/api/account_details",
    response_model=Union[AccountDetailOut, Error],
)
def update_account_details(
    account_details: AccountDetailPutIn,
    query: AccountDetailQueries = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data),
) -> Union[AccountDetailOut, Error]:
    return query.update(account_data.get("id"), account_details)
