from pydantic import BaseModel
from fastapi.testclient import TestClient
from main import app
from queries.account_details import AccountDetailQueries
from authenticator import authenticator

client = TestClient(app)


class FakeAccountDetailQueries:
    def get_one(self, account_id):
        return {"account_details": ""}


def test_get_account_details():
    # Arrange
    app.dependency_overrides[AccountDetailQueries] = FakeAccountDetailQueries

    # Act
    response = client.get(
        "/api/account_details",
    )

    # Clean up
    app.dependency_overrides = {}

    # Assert
    assert response.status_code == 401
