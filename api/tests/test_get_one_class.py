from pydantic import BaseModel
from fastapi.testclient import TestClient
from main import app
from queries.classes import ClassQueries
from authenticator import authenticator

client = TestClient(app)


class FakeClassOutDetail(BaseModel):
    id: int
    class_name: str
    instructor_id: int
    requirements: str
    category_id: int
    description: str
    price: int
    featured: bool
    image_1: str
    image_2: str
    image_3: str
    image_4: str
    location_id: int
    category_name: str
    location_name: str
    location_address: str
    location_city: str
    location_state: str
    location_zip_code: str
    location_latitude: str = None
    location_longitude: str = None
    instructor_first_name: str
    instructor_last_name: str
    instructor_biography: str | None
    instructor_avatar: str


class FakeClassQueries:
    def get_one(self, class_id):
        if class_id == 1:
            return FakeClassOutDetail(
                id=1,
                class_name="string",
                instructor_id=1,
                requirements="string",
                category_id=1,
                description="string",
                price=1,
                featured=True,
                image_1="string",
                image_2="string",
                image_3="string",
                image_4="string",
                location_id=1,
                category_name=1,
                location_name="string",
                location_address="string",
                location_city="string",
                location_state="string",
                location_zip_code="string",
                location_latitude="string",
                location_longitude="string",
                instructor_first_name="string",
                instructor_last_name="string",
                instructor_biography="string",
                instructor_avatar="string",
            )
        return None


def test_get_valid_class_details():
    # Arrange
    app.dependency_overrides[ClassQueries] = FakeClassQueries

    # Act
    response = client.get(
        "/api/classes/1",
    )

    # Clean up
    app.dependency_overrides = {}

    # Assert
    assert response.status_code == 200
    assert response.json() == FakeClassOutDetail(
        id=1,
        class_name="string",
        instructor_id=1,
        requirements="string",
        category_id=1,
        description="string",
        price=1,
        featured=True,
        image_1="string",
        image_2="string",
        image_3="string",
        image_4="string",
        location_id=1,
        category_name=1,
        location_name="string",
        location_address="string",
        location_city="string",
        location_state="string",
        location_zip_code="string",
        location_latitude="string",
        location_longitude="string",
        instructor_first_name="string",
        instructor_last_name="string",
        instructor_biography="string",
        instructor_avatar="string",
    )


def test_get_invalid_class_details():
    # Arrange
    app.dependency_overrides[ClassQueries] = FakeClassQueries

    # Act
    response = client.get(
        "/api/classes/2",
    )

    # Clean up
    app.dependency_overrides = {}

    # Assert
    assert response.status_code == 404
    assert response.json() == None
