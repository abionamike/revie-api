# Revie’s API documentation

This repository contains the documentation for [Revie](https://revie-api.herokuapp.com/api)’s API.

#### Contents

- [Overview](#1-overview)
- [Users](#2-users)
  - [Authentication](#21-authentication)
- [Reviews](#3-reviews)
  - [Get all reviews](#31-get-all-reviews)
  - [Sort reviews by most helpful](#32-sort-reviews-by-most-helpful)
  - [Sort reviews by most recent](#34-sort-reviews-by-most-recent)
  - [Create Review](#34-create-review)
  - [Mark review as helpful](#34-mark-review-as-helpful)
  - [Image upload](#34-image-upload)

## 1. Overview

Revie is a hypothetical platform where users can sign up with their basic information and post reviews about apartments they've previously lived in.

Revie's API is a JSON-based API. All requests are made to endpoints beginning:
`https://revie-api.herokuapp.com/api`

All requests must be secure, i.e. `https`.

## 2. Users

Schema:

| Parameter       | Type     | Required?  | Description                                     |
| -------------   |----------|------------|-------------------------------------------------|
| `name`     | string   | required   | The full name of the user |
| `email`         | string   | required   | Email of the user, the email must be unique. No Two users can have thesame email address in the database |
| `password` | string   | required   | user's password(Passwords are harshed)  |

### 2.1 Authentication

It's only the `Create review` endpoint that requires authentication. All other routes are unprotected routes.

To authenticate a user, a `POST` request must be made to: 

```
POST https://revie-api.herokuapp.com/api/users
```

Returns user's data with a token:

Example:
```
HTTP/1.1 201 OK
Content-Type: application/json; charset=utf-8

{
  "_id": "60b4dd6725d9a117fc4d06ec"
  "name": "Abiona Michael",
  "email": "amabiona21@gmail.com",
  "token": "eyJhbGciOiJIUzI1NiIslnR0cCI6IkpXVCJ9.eyJpZCI6IjYwYjRkZDwY3MjkNTQxMTdmYzRkMDZlYyIsImlhdCI6MTYyMjQ2NTg5NX0.Xwe8coNhWnCGyFRREMLJpHzm9rZgrY3LgLvjhuUAY7E",
}
```

Note: The token is a "Bearer" token and also when decoded, it only contains the user's Id. No sensitive info is parsed into it.

## 3. Reviews

Schema:

| Parameter       | Type     | Required?  | Description                                     |
| -------------   |----------|------------|-------------------------------------------------|
| `aboutLandlord`     | string   | required   | A little description of the Landlord |
| `location`         | string   | required   | The location of the apartment |
| `qualityOfAmenities` | string   | required   | The quality of the amenities in the apartment |
| `markAsHelpful` | number   | Not required   | This is the number of marks this review got. It has a default of zero at creation and increases as random users make them as useful |
| `image` | string   | Not required   | A review may have an image or not and they are only made available by reviewer(Details on image upload later) |

### 3.1 Get all reviews

This requires an unauthenticated GET request to:

```
GET https://revie-api.herokuapp.com/api/reviews
```
Returns an array of objects with the details of all the reviews made in no particular order.

Example:
```
HTTP/1.1 200 OK
Content-Type: application/json;

[
  {
    "markAsHelpful": 5,
    "_id": "60b4bb19b391ad25accee066",
    "aboutLandlord": "Landlord is very friendly",
    "location": "Ikeja",
    "qualityOfAmenities": "Not bad",
    "image": "image_1622454998553.jpg",
    "createdAt": "2021-05-31T10:31:53.411Z",
    "updatedAt": "2021-05-31T10:41:46.813Z",
    "__v": 0
  },
  {
    "markAsHelpful": 1,
    "_id": "60b4bb61b391ad25accee067",
    "aboutLandlord": "Landlord is a little bit strict",
    "location": "Surulere",
    "qualityOfAmenities": "Good",
    "createdAt": "2021-05-31T10:33:05.107Z",
    "updatedAt": "2021-05-31T10:42:40.632Z",
    "__v": 0
  },
  {
    "markAsHelpful": 3,
    "_id": "60b4bcc0b391ad25accee069",
    "aboutLandlord": "Landlord is tough",
    "location": "Yaba",
    "qualityOfAmenities": "Good",
    "createdAt": "2021-05-31T10:38:56.666Z",
    "updatedAt": "2021-05-31T10:42:22.270Z",
    "__v": 0
  },
  {
    "markAsHelpful": 0,
    "_id": "60b4dc6725d54117fc4d06ea",
    "aboutLandlord": "The Landlord has this I don't care attitude",
    "location": "Egbeda",
    "qualityOfAmenities": "Poor",
    "image": "uploads/image_1622464682790.jpg",
    "createdAt": "2021-05-31T12:53:59.298Z",
    "updatedAt": "2021-05-31T12:53:59.298Z",
    "__v": 0
  }
]
```

### 3.2 Sort reviews by most helpful

This requires an unauthenticated GET request to:

```
GET https://revie-api.herokuapp.com/api/reviews/most-helpful
```
Returns an array of objects with the details of all the reviews made in the descending order of the `markAsHelpful`.

Example:
```
HTTP/1.1 200 OK
Content-Type: application/json;

[
  {
    "markAsHelpful": 5,
    "_id": "60b4bb19b391ad25accee066",
    "aboutLandlord": "Landlord is very friendly",
    "location": "Ikeja",
    "qualityOfAmenities": "Not bad",
    "image": "image_1622454998553.jpg",
    "createdAt": "2021-05-31T10:31:53.411Z",
    "updatedAt": "2021-05-31T10:41:46.813Z",
    "__v": 0
  },
  {
    "markAsHelpful": 3,
    "_id": "60b4bcc0b391ad25accee069",
    "aboutLandlord": "Landlord is tough",
    "location": "Yaba",
    "qualityOfAmenities": "Good",
    "createdAt": "2021-05-31T10:38:56.666Z",
    "updatedAt": "2021-05-31T10:42:22.270Z",
    "__v": 0
  },
  {
    "markAsHelpful": 1,
    "_id": "60b4bb61b391ad25accee067",
    "aboutLandlord": "Landlord is a little bit strict",
    "location": "Surulere",
    "qualityOfAmenities": "Good",
    "createdAt": "2021-05-31T10:33:05.107Z",
    "updatedAt": "2021-05-31T10:42:40.632Z",
    "__v": 0
  },
  {
    "markAsHelpful": 0,
    "_id": "60b4dc6725d54117fc4d06ea",
    "aboutLandlord": "The Landlord has this I don't care attitude",
    "location": "Egbeda",
    "qualityOfAmenities": "Poor",
    "image": "uploads/image_1622464682790.jpg",
    "createdAt": "2021-05-31T12:53:59.298Z",
    "updatedAt": "2021-05-31T12:53:59.298Z",
    "__v": 0
  }
]
```

### 3.3 Sort Reviews by most recent

This requires an unauthenticated GET request to:

```
GET https://revie-api.herokuapp.com/api/reviews/most-recent
```
Returns an array of objects with the details of all the reviews starting from the review latest to the first ever review created.

Example:
```
HTTP/1.1 200 OK
Content-Type: application/json;

[
  {
    "markAsHelpful": 0,
    "_id": "60b4dc6725d54117fc4d06ea",
    "aboutLandlord": "The Landlord has this I don't care attitude",
    "location": "Egbeda",
    "qualityOfAmenities": "Poor",
    "image": "uploads/image_1622464682790.jpg",
    "createdAt": "2021-05-31T12:53:59.298Z",
    "updatedAt": "2021-05-31T12:53:59.298Z",
    "__v": 0
  },
  {
    "markAsHelpful": 3,
    "_id": "60b4bcc0b391ad25accee069",
    "aboutLandlord": "Landlord is tough",
    "location": "Yaba",
    "qualityOfAmenities": "Good",
    "createdAt": "2021-05-31T10:38:56.666Z",
    "updatedAt": "2021-05-31T10:42:22.270Z",
    "__v": 0
  },
  {
    "markAsHelpful": 1,
    "_id": "60b4bb61b391ad25accee067",
    "aboutLandlord": "Landlord is a little bit strict",
    "location": "Surulere",
    "qualityOfAmenities": "Good",
    "createdAt": "2021-05-31T10:33:05.107Z",
    "updatedAt": "2021-05-31T10:42:40.632Z",
    "__v": 0
  },
  {
    "markAsHelpful": 5,
    "_id": "60b4bb19b391ad25accee066",
    "aboutLandlord": "Landlord is very friendly",
    "location": "Ikeja",
    "qualityOfAmenities": "Not bad",
    "image": "image_1622454998553.jpg",
    "createdAt": "2021-05-31T10:31:53.411Z",
    "updatedAt": "2021-05-31T10:41:46.813Z",
    "__v": 0
  }
]
```

### 3.4 Create Review

This requires an authenticated POST request to:

```
POST https://revie-api.herokuapp.com/api/reviews
```
Returns an object with the details of all the reviews created with `_id`, `createdAt`, `updatedAt` and the `markAsHelpfull` set to zero by default. If an image path is uploaded(optional), it will be return in the object

Example:
```
HTTP/1.1 200 OK
Content-Type: application/json;

{
  "markAsHelpful": 0,
  "_id": "60b4dc6725d54117fc4d06ea",
  "aboutLandlord": "The Landlord has this I don't care attitude",
  "location": "Egbeda",
  "qualityOfAmenities": "Poor",
  "image": "uploads/image_1622464682790.jpg",
  "createdAt": "2021-05-31T12:53:59.298Z",
  "updatedAt": "2021-05-31T12:53:59.298Z",
  "__v": 0
}
```

### 3.5 Mark review as helpful

This requires an unauthenticated PUT request to:

```
PUT https://revie-api.herokuapp.com/api/:id
```
Returns an object with the details of all the reviews created with the `markAsHelpfull` field increased by one.

The `:id` is the unique id of the review to be marked as helpful. 
It's worth noting that nothing is required to be passed in the "body". Just hitting the endpoint with a PUT request will mark the review as helpful.

Example:
```
HTTP/1.1 200 OK
Content-Type: application/json;

{
  "markAsHelpful": 1,
  "_id": "60b4bb61b391ad25accee067",
  "aboutLandlord": "Landlord is a little bit strict",
  "location": "Surulere",
  "qualityOfAmenities": "Good",
  "createdAt": "2021-05-31T10:33:05.107Z",
  "updatedAt": "2021-05-31T10:42:40.632Z",
  "__v": 0
  }
```

### 3.6 Image upload

Image upload is optional, but if the user wants to upload an image, it requires an unauthenticated POST request to:

```
POST https://revie-api.herokuapp.com/api/uploads
```

NOTE: `Content-Type` must be `form-data` for the image upload to work.

When an image is uploaded, it checks it is an image, change the image name and uploads the image in a folder `upload/image` in the root directory.

The response to this request is the filename which is the name of the image in the `upload/image` folder.

Example:
```
HTTP/1.1 200 OK
Content-Type: application/json;

{
  "filename": "uploads/image_1622464682790.jpg"
}
```

The image `filename` is what is stored in the database and is what is retrieved when we GET reviews. That's if an image was uploaded.

The image can however be accessed from the frontend by hitting the `https://revie-api.herokuapp.com/{{ filename }}` route.