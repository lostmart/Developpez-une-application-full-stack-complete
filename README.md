# Full-Stack: MDD (Monde de Dév)

## 🔧 Frontend: Angular + TypeScript

- Angular CLI (strongly recommended)
- TypeScript (with best practices: indentation, SOLID principles)

### Folder Architecture:

```
front/
├── .angular/
├── .vscode/
├── node_modules/
├── src/
│   ├── app/
│   │   ├── pages/
│   │   │   ├── articles/
│   │   │   ├── home/
│   │   │   ├── login/
│   │   │   ├── new-article/
│   │   │   ├── not-found/
│   │   │   ├── profile/
│   │   │   ├── register/
│   │   │   ├── single-article/
│   │   │   └── topics/
│   │   ├── shared/
│   │   │   ├── components/
│   │   │   ├── guards/
│   │   │   ├── interceptors/
│   │   │   ├── models/
│   │   │   ├── services/
│   │   │   └── validators/
│   │   ├── app-routing.module.ts
│   │   ├── app.component.html
│   │   ├── app.component.scss
│   │   ├── app.component.spec.ts
│   │   ├── app.component.ts
│   │   ├── app.module.ts
│   │   └── shared.module.ts
│   ├── assets/
│   ├── environments/
│   ├── styles/
│   └── favicon.png
```

### 📌 Key Technical Choices

#### State Management

- Options: Services + RxJS (simple) vs. NgRx (complex, scalable)
- Use `BehaviorSubject` in services for MVP simplicity unless your app has many interconnected components.

#### Routing Strategy

- Angular’s built-in router

#### Form Handling

- Reactive Forms

#### CSS Framework

- Angular Material

#### Authentication Token Handling

- HttpInterceptor to inject JWT into headers
- Store token in localStorage

---

## 🖥️ Backend: Java + Spring

- Spring Core
- Spring Boot and other Spring modules

### 📌 Key Technical Choices

#### Architecture

- Layered architecture: Controllers → Services → Repositories (standard)
- DTOs and Mappers (MapStruct)

### Folder Architecture:

```
back/
├── .mvn/
├── src/
│   ├── main/
│   │   ├── java/com/openclassrooms/mddapi/
│   │   │   ├── config/
│   │   │   ├── controller/
│   │   │   ├── dto/
│   │   │   ├── exception/
│   │   │   ├── model/
│   │   │   ├── repo/
│   │   │   ├── security/
│   │   │   ├── service/
│   │   │   └── MddApiApplication.java
│   │   └── resources/
│   └── test/
├── target/
├── .gitignore
├── mvnw
├── mvnw.cmd
└── pom.xml
```

#### Database

- MySQL

#### Security

- Spring Security with JWT
- Encode with jjwt
- Encoded passwords stored on DB
- Each comment, subscription, post topic is created based on the user's id extracted from the token

#### Data Access

- Spring Data JPA with Hibernate
- Constraints and validations (`@NotNull`, `@Size`, etc.)

## 📦 Project Structure

- **Frontend:**
  - `/components`, `/services`, `/models`, `/guards`, `/pages`
- **Backend:**
  - `com.mdd.app.controller`, `.service`, `.repository`, `.model`, `.security`, `.dto`

---

## Endpoints

### Users:

- http://localhost:8080/api/users/register POST -> register new user
- http://localhost:8080/api/users/login POST -> login registered user
- http://localhost:8080/api/users/:userId -> get user's id, userName, email and image

### Posts:

- http://localhost:8080/api/posts GET -> get a list of posts with their id, title, content, author, topic and date of creation
- http://localhost:8080/api/posts POST -> create a new post. You need to send a title, content and a topic
- http://localhost:8080/api/posts/:postId GET -> get a post based on its id
- http://localhost:8080/api/posts/topic-name/:postName GET -> get a post based on its topic name

### Topics:

- http://localhost:8080/api/topics GET -> get a list of all possible topics. Each topic contains an id, a name, a description and a cretor id
- http://localhost:8080/api/topics/:topicId GET -> get one topic based on its id
- http://localhost:8080/api/topics POST -> create a new topic. You need to send the topic name and description

### Subscriptions:

- http://localhost:8080/api/subscriptions GET -> get a list of all existent subccsiptions from all users
- http://localhost:8080/api/subscriptions/user/:userId GET -> get all the topics to which the user is subcribed
- http://localhost:8080/api/subscriptions/user/:topicId DELETE -> unsubscribe to a topic based on its id
- http://localhost:8080/api/subscriptions/subscribe/:topicId POST -> subscribe a user to a topic

### Comments:

- http://localhost:8080/api/comments/post/:postId GET -> get all comments based on a post id
- http://localhost:8080/api/comments POST -> create a comment for a specific post. You need to provide the ^pst id and the content in the request's body

## 📂 Assets for API & Database Testing

Inside the [`/assets`](./assets) folder you will find:

- **MDD-mond-de-development.postman_collection.json** → Postman collection to test all RESTful API endpoints (users, topics, posts, comments, subscriptions).
- **mdd.sql** → MySQL dump of the database schema and seed data.
- **Readme.txt** → Detailed documentation on using the Postman collection and database structure.

For setup and testing instructions, read the [`Readme.txt`](./assets/Readme.txt) file first.

---

## UML

![MDD diagram](/Monde-de-Dev-diagram.jpg)
