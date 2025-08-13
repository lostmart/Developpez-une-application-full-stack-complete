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

## 📂 Assets for API & Database Testing

Inside the [`/assets`](./assets) folder you will find:

- **MDD-mond-de-development.postman_collection.json** → Postman collection to test all RESTful API endpoints (users, topics, posts, comments, subscriptions).
- **mdd.sql** → MySQL dump of the database schema and seed data.
- **Readme.txt** → Detailed documentation on using the Postman collection and database structure.

For setup and testing instructions, read the [`Readme.txt`](./assets/Readme.txt) file first.

---

## UML

![MDD diagram](/Monde-de-Dev-diagram.jpg)
