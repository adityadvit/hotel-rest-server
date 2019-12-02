# hotel-rest-server
This project is for simple hotel-rest-server which uses node.js, express

hotel-rest-server has three entities
* Hotels
* Users
* Rooms

* APIS for Hotels

| API       | Method           | Parameters|Comment  |
| ------------- |:-------------:| :---------:|-----:|
| /api/v1/hotels| GET | None| List all the hotels |
| /api/v1/hotels/{id}| GET | None |Get the hotel details |
| /api/v1/hotels/{id} | PUT| body paramters {"username":{username}} |Book a hotel room |

* APIS for Users

| API       | Method           | Parameters|Comment  |
| ------------- |:-------------:| :---------:|-----:|
| /api/v1/users| GET | None| List all the users |

* APIS for Rooms

| API       | Method           | Parameters|Comment  |
| ------------- |:-------------:| :---------:|-----:|
| /api/v1/rooms| GET | None| List all the rooms |
