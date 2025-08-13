MDD – REST API Test Pack (Postman + MySQL)
A compact guide for testing a small REST API with a MySQL database that includes users, topics, posts, comments, and user_subscriptions.

What’s here
A Postman collection (MDD-mond-de-development) with folders for:

User-Auth

Topics

Posts

Comments

Subscriptions

welcome-message

A MySQL schema using utf8mb4_general_ci with five tables:

users

topics

posts

comments

user_subscriptions

The API runs at http://localhost:8080.

Note: bearer tokens in the sample requests are examples and will expire. Always re-login to obtain a fresh token before hitting protected routes.

Prerequisites
Node/Java/whatever runs the server (not covered here), listening on :8080.

MySQL (or MariaDB) and a database created (e.g., mdd).

Postman (v10+ recommended).

Database outline
Tables and typical relations:

users

id, username, email (unique), password (bcrypt), picture, created_at, updated_at

topics

id, name (unique), description, timestamps

posts

id, title, content, topic_id → topics.id, author_id → users.id, timestamps

comments

id, content, post_id → posts.id, author_id → users.id, timestamps

user_subscriptions

id, user_id → users.id, topic_id → topics.id, description, timestamps

Consider a (user_id, topic_id) unique constraint to prevent duplicates.

Encoding/Engine: InnoDB, utf8mb4_general_ci.

Seed/Test users
Two accounts exist for quick testing:

0001test@test.net / 123pass

sdvsdv@gmail.com / 123passqsc@HJKLl

Passwords are demo-grade; change them outside of local testing.

Importing the Postman collection
Open Postman → Import → paste the JSON or import the file.

(Optional) Create an environment:

BASE_URL = http://localhost:8080

TOKEN = (filled after login)
Then change requests to use {{BASE_URL}}.