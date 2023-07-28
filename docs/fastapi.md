# APIs

# Token

- Method: `GET`, `POST`, `DELETE`
- Path: 'http://localhost:8000/token'

Logging in posts a token as a global state variable in redux. Get is used to access account information. Delete occurs at logout.

# Accounts

- Method: `POST`
- Path: 'http://localhost:8000/api/accounts'

Post at this path creates an account in the accounts table

# Categories

- Method: `GET`
- PATH: 'http://localhost:8000/api/categories'

Get at this path returns the 11 possible categories that are in the database

# Locations

- Method: `GET`, `POST`
- Paths:
  - 'http://localhost:8000/api/locations'
  - 'http://localhost:8000/api/locations/{account_id}

Get returns all locations in the system. Get with account_id returns the location stored in a user's account for location purposes. Post creates a location that a user can input for a class or for their profile.

# Account Details

- Method: `GET`, `PUT`
- Path: 'http://localhost:8000/api/account_details'

Get returns an account with the the account details. Put updates those details.

# Events

- Method: `GET`, `POST`, `PUT`, `DELETE`
- Paths: - 'http://localhost:8000/api/events - 'http://localhost:8000/api/events/{event_id}
  Post creates an event related to a class. Get returns that class by id, put updates it's information and delete deletes it. - 'http://localhost:8000/api/events/future/{class_id}
  Get returns all events scheduled in the future with the corresponding class_id

# Classes

- Method: `GET`, `POST`, `PUT`
- Paths:
  - 'http://localhost:8000/api/classes'
  - 'http://localhost:8000/api/classes/{class_id}'

# Reservations

- Method: `POST`
- Paths: 'http://localhost:8000/api/reservations'
  creates a reservation

- Method: `GET`, `PUT`
- Path: 'http://localhost:8000/api/reservations/{reservation_id}
  Get retrieves one reservation by id and put updates it

- Method: `GET`
  -Path: `http://localhost:8000/api/student/reservations/{student_id}`
  retrieves all reservations that a student has made

- Method: `GET`
- Path: `http://localhost:8000/api/reservations/instructors/{instructor_id}`
  retrieves all reservations made for a class offered by an instructor. For the instructor dashboard.
