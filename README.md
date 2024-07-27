# Blog Application API

This is a RESTful API for a blog application developed using Node.js, Express, and MongoDB. The API allows users to create, read, update, and delete blog posts, as well as manage comments on the posts.
 

## Table of Contents

- [Objective](#objective)
- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Database Schema](#database-schema)
- [Authentication](#authentication)
- [Documentation](#documentation)
- [Technologies Used](#technologies-used)


## Objective

Create a RESTful API for a blog application that allows users to create, read, update, and delete blog posts, as well as manage comments.

## Features

- User registration and authentication using JWT.
- CRUD operations for blog posts and comments.
- Role-based access control to ensure only authenticated users can create, update, or delete posts and comments.
- Input validation and error handling.

## Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/AnaghaaRavi/Restful-Blog-App
    cd blog-api
    ```

2. Install dependencies:
    ```bash
    npm install
    ```

3. Set up environment variables:
    Create a `.env` file in the root directory and add the following:
    ```env
    PORT=3000
    MONGO_URI=mongodb://localhost:27017/blog
    JWT_SECRET=your_jwt_secret
    ```

4. Start the server:
    ```bash
    npm start
    ```

## Usage

The API can be accessed at `http://localhost:3000`. Use tools like Postman or cURL to interact with the API endpoints.

## API Endpoints

### Blog Posts

- **Create Post**
    ```http
    POST /posts
    ```

- **Read All Posts**
    ```http
    GET /posts
    ```

- **Read Single Post**
    ```http
    GET /posts/:id
    ```

- **Update Post**
    ```http
    PUT /posts/:id
    ```

- **Delete Post**
    ```http
    DELETE /posts/:id
    ```

### Comments

- **Create Comment**
    ```http
    POST /comments
    ```

- **Read Comments for a Post**
    ```http
    GET /comments?post_id=postId
    ```

- **Read Single Comment**
    ```http
    GET /comments/:id
    ```

- **Update Comment**
    ```http
    PUT /comments/:id
    ```

- **Delete Comment**
    ```http
    DELETE /comments/:id
    ```

### Authentication

- **Register**
    ```http
    POST /register
    ```

- **Login**
    ```http
    POST /login
    ```

## Database Schema

### Users

- `id`
- `password`
- `email`

### Posts

- `id`
- `name`
- `content`
- `user`
- `image`

### Comments

- `id`
- `post_id`
- `content`

## Authentication

JWT (JSON Web Tokens) is used for user authentication. Upon successful login, a token is provided which must be included in the `Authorization` header for endpoints that require authentication.
## Documentation
API documentation is provided using Postman. You can access the documentation at http://localhost:3000/api-docs.

## Technologies Used
- Programming Language: Node.js
- Framework: Express
- Database: MongoDB
- Authentication: JWT
