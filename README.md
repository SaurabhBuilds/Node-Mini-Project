# Mini Project using MongoDB Express Node.js & EJS

This project was created as part of my learning journey in web development. It was designed to help me understand and implement 
various concepts like authentication, authorization, JWT, hashing, and working with MongoDB. 

Please note that this project was built for educational purposes, and I did not strictly follow industry standards or best practices.

## Project Overview

### Features
 1. Authentication and Authorization:
  - Implemented user sign-up, login, and JWT-based authentication.
  - Authorization of user access to specific resources based on roles.
 2. JWT (JSON Web Tokens):
  - Used for secure user sessions and token-based authentication.
 3. Hashing:
  - Implemented password hashing using `bcrypt` for enhanced security.
 4. File Uploading:
  - Integrated `multer` for handling file uploads and storing them securely on the server.
 5. EJS Templating:
  - Used EJS to render dynamic content on the server side.
 6. MongoDB Data Association:**
  - Demonstrated how to associate data between different MongoDB collections.

## Learning Objectives

Through this project, I learned:
- How to set up a Node.js server using Express.
- Creating RESTful APIs for user management.
- Implementing secure authentication and authorization using JWT and bcrypt.
- Handling file uploads in Node.js with `multer`.
- Using EJS to create dynamic web pages.
- Working with MongoDB and mongoose for data storage and associations.

## Technologies Used
- Node.js
- Express.js
- MongoDB (with Mongoose)
- EJS
- Multer
- bcrypt
- JWT (jsonwebtoken)

### Prerequisites
- Node.js
- MongoDB (installed locally or on a cloud service like MongoDB Atlas)

## Usage
1. User Registration:
Endpoint: POST /create
Description: Create a new account by registering a user. The registration process includes storing the user's information
securely in the database with hashed passwords for security.

3. User Login:
Endpoint: POST /login
Description: Log in as an existing user. Upon successful login, a JWT token is issued, allowing the user to access protected
routes and their personal profile.

5. User Profile:
Description: Once logged in, users can access their profile, where they can view and manage their posts. The profile page
displays the user's information along with a profile picture, which can be uploaded using the file upload feature.

7. Posting Content:
Endpoint: POST /post
Description: Users can create new posts, similar to tweets, containing only text. Each post comes with options to like and
edit the content. The edited posts update in real-time, reflecting the changes on the user's profile.

9. File Upload:
Endpoint: POST /upload
Description: Users can upload a profile picture using the file upload feature, powered by multer. The uploaded image will be
displayed on their profile.

11. Post Management:
Description: Users can like their posts or edit the text content. This allows users to manage their posts effectively, keeping
their profile up-to-date.

13. Protected Routes:
Description: Certain routes, like the profile page, are protected and require authentication. If a user is not logged in, they
cannot access these routes. This is enforced using JWT tokens.

15. Logout:
Endpoint: GET /logout
Description: Users can log out from their profile, which will invalidate their session and JWT token, preventing access to protected
routes until they log in again.
