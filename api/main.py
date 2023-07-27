from authenticator import authenticator
from routers import (
    accounts,
    categories,
    locations,
    account_details,
    events,
    classes,
    reservations,
)
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import os

app = FastAPI()
app.include_router(authenticator.router)
app.include_router(accounts.router)
app.include_router(categories.router)
app.include_router(locations.router)
app.include_router(account_details.router)
app.include_router(events.router)
app.include_router(classes.router)
app.include_router(reservations.router)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[os.environ.get("CORS_HOST", "http://localhost:3000")],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
