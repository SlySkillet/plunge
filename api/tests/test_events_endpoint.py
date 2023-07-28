from pydantic import BaseModel
from fastapi.testclient import TestClient
from main import app
from queries.events import EventQueries
from authenticator import authenticator
from datetime import datetime


client = TestClient(app)

class FalseEventIn(BaseModel):
    date_time: datetime
    capacity: int
    class_id: int

class FalseEventOut(BaseModel):
    id: int
    date_time: datetime
    capacity: int
    class_id: int
    instructor_id: int
    seats_taken: int | None


class FalseGetEventQueries:
    def get_all_by_instructor(self, instructor_id):
        if instructor_id == 1:
            return []
        return None
    
class FalsePutEventQueries:
    def update(self, event_id):
        if event_id == 1:
            return FalseEventOut(
                id=1,
                date_time='2032-04-23T10:20:30.400+02:30',
                capacity=1,
                class_id=1,
                instructor_id=1,
                seats_taken=1,
            )
        return None


def test_get_instructor_events():
    # Arrange
    app.dependency_overrides[EventQueries] = FalseGetEventQueries

    # Act
    response = client.get(
        "/api/events/instructor/1",
    )

    # Clean up
    app.dependency_overrides = {}

    # Assert
    assert response.status_code == 200
    assert response.json() == []

# def test_update_event_happy():
#     # Arrange
#     app.dependency_overrides[EventQueries] = FalsePutEventQueries
#     event = FalseEventIn(
#                 date_time='2032-04-23T10:20:30.400+02:30',
#                 capacity=1,
#                 class_id=1,
#             )

#     # Act
#     response = client.put(
#         "/api/events/1", event
#     )

#     # Clean up
#     app.dependency_overrides = {}

#     # Assert
#     assert response.status_code == 400
#     assert response.json() == FalseEventOut(
#                 id=1,
#                 date_time='2032-04-23T10:20:30.400+02:30',
#                 capacity=1,
#                 class_id=1,
#                 instructor_id=1,
#                 seats_taken=1,
#             )