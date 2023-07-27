from fastapi import (
    Depends,
    HTTPException,
    status,
    Response,
    APIRouter,
    Request,
)
from jwtdown_fastapi.authentication import Token
from authenticator import authenticator
from pydantic import BaseModel
from queries.accounts import (
    AccountIn,
    AccountOut,
    AccountQueries,
    DuplicateAccountError,
)
from queries.account_details import AccountDetailQueries, AccountDetailPostIn


class AccountForm(BaseModel):
    username: str
    first_name: str
    last_name: str
    email: str
    password: str


class AccountToken(Token):
    account: AccountOut


class HttpError(BaseModel):
    detail: str


router = APIRouter()


@router.get("/token", response_model=AccountToken | None)
async def get_token(
    request: Request,
    account: AccountOut = Depends(authenticator.try_get_current_account_data),
) -> AccountToken | None:
    if account and authenticator.cookie_name in request.cookies:
        return {
            "access_token": request.cookies[authenticator.cookie_name],
            "type": "Bearer",
            "account": account,
        }


@router.post("/api/accounts", response_model=AccountToken | HttpError)
async def create_account(
    info: AccountIn,
    request: Request,
    response: Response,
    accounts: AccountQueries = Depends(),
    account_details_query: AccountDetailQueries = Depends(),
):
    hashed_password = authenticator.hash_password(info.password)
    try:
        account = accounts.create(info, hashed_password)
    except DuplicateAccountError:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Cannot create an account with those credentials",
        )
    form = AccountForm(
        username=info.username,
        password=info.password,
        first_name=info.first_name,
        last_name=info.last_name,
        email=info.email,
    )
    token = await authenticator.login(response, request, form, accounts)
    account_details = AccountDetailPostIn(
        account_id=account.id,
        avatar="https://www.seekpng.com/png/full/143-1435868_headshot-silhouette-person-placeholder.png",
        phone_number=None,
        biography=None,
        mock_credit_card=None,
        interests=None,
        location_id=None,
    )
    account_details_query.create(account_details)
    return AccountToken(account=account, **token.dict())
