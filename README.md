# hotel-rest-server
- This project is for simple hotel-rest-server which uses node.js, express.js, MVC, and REST concepts.
Controller part accepts and serves the requests. Model does all the data related work.
- Currently hotel-rest-server deals with in memory json data.This is kept for the minimal scope.This can further be extended to read/write from/to nosql, sql databases.

- hotel-rest-server has three entities
  * Hotels
  * Users
  * Rooms
- Can have addition entity named bookings(can be done)
- Entity schema includes:
  * hotels:
  ```JSON
    {
        "id" : number, //unique
        "room_price": number,
        "name": string,
        "address": string
    }
  ```
  * users:
  ```JSON
     {   
        "id" : number, //unique
        "username" : string,
        "phone" : number,
        "email" : string,
        "bookings": array,
        "bonus_points" : number,
        "gender": string
    }
  ```
  * rooms:
  - For simplicity checkin date, departure date are not considered
  - Those can be added in the current framework
  ```JSON
     {      
        "id": number, //unique
        "status": string,
        "hotel_id": number //Foregin key from hotel
    }
  ```
* APIS for Hotels
- As per the user schema each user has bonus points. `/api/v1/hotels/{id}`can be used to book the hotel room based on user bonus points.
- If the user has `bonus points > hotel price` then room status will be chnaged to `BOOKED` and there will be updation to the bonus points of the user.
- If the user has `bonus points < hotel price` then room status chnages to `PENDING_APPROVAL`

| API       | Method           | Parameters|Comment  |
| ------------- |:-------------:| :---------:|-----:|
| /api/v1/hotels| GET | None| List all the hotels |
| /api/v1/hotels/{id}| GET | None |Get the hotel details |
| /api/v1/hotels/{id} | PUT| body paramters {"username":{username}} |Book a hotel room based on user bonus points |

* APIS for Users

| API       | Method           | Parameters|Comment  |
| ------------- |:-------------:| :---------:|-----:|
| /api/v1/users| GET | None| List all the users |

* APIS for Rooms

| API       | Method           | Parameters|Comment  |
| ------------- |:-------------:| :---------:|-----:|
| /api/v1/rooms| GET | None| List all the rooms |
