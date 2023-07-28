from fastapi.testclient import TestClient
from main import app
from queries.locations import LocationQueries

client = TestClient(app)


# class FakeLocationOut(BaseModel):
#     id: int
#     name: str
#     address: str
#     city: str
#     state: str
#     zip_code: int
#     latitude: str = None
#     longitude: str = None
#     user_id: int


class FakeLocationQueries:
    def get_locations_by_account(self, account_id):
        return []


def test_get_valid_locations_by_account():
    #  Arrange
    app.dependency_overrides[LocationQueries] = FakeLocationQueries

    # Act
    response = client.get(
        "/api/locations/2",
    )

    # Clean up
    app.dependency_overrides = {}

    # Assert
    assert response.status_code == 200
    assert response.json() == []
