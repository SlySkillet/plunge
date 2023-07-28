from fastapi.testclient import TestClient
from main import app
from queries.categories import CategoryQueries


client = TestClient(app)


class FakeCategoryQuery:
    def get_all(self):
        return []


def test_get_valid_categories():
    # Arrange
    app.dependency_overrides[CategoryQueries] = FakeCategoryQuery

    # Act
    response = client.get(
        "/api/categories",
    )

    # Clean up
    app.dependency_overrides = {}

    # Assert
    assert response.json() == []
    assert response.status_code == 200
