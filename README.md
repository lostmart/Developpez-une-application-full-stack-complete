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
- Lazy-loading modules (optional)

#### Form Handling

- Prefer Reactive Forms for better control and validation handling

#### CSS Framework

- Angular Material

#### Authentication Token Handling

- HttpInterceptor to inject JWT into headers
- Store token in localStorage or sessionStorage

---

## 🖥️ Backend: Java + Spring

- Spring Core (mandatory)
- Spring Boot and other Spring modules

### 📌 Key Technical Choices

#### Architecture

- Layered architecture: Controllers → Services → Repositories (standard)
- DTOs and Mappers (MapStruct)

#### Database

- MySQL
- MySQL / H2 for easier local setup and CI/CD testing.

#### Security

- Options: Spring Security with JWT
- Encode with jjwt

#### Data Access

- Spring Data JPA with Hibernate
- Constraints and validations (`@NotNull`, `@Size`, etc.)

#### Error Handling

- Global error handler with `@ControllerAdvice`

---

## 🔐 Security Layer

### Frontend:

- Store token securely (e.g., HttpOnly cookie if going advanced)
- Redirect to login on 401 errors

### Backend:

- Filter and validate JWT in request headers
- Protect endpoints with `@PreAuthorize` or configuration-based rules

---

## 📦 Project Structure

- **Frontend:**
  - `/components`, `/services`, `/models`, `/guards`, `/pages`
- **Backend:**
  - `com.mdd.app.controller`, `.service`, `.repository`, `.model`, `.security`, `.dto`

---

## Endpoints

### Users:

- http://localhost:8080/api/users/register POST: register new user
- http://localhost:8080/api/users/login POST: login registered user

## 📂 Assets for API & Database Testing

Inside the [`/assets`](./assets) folder you will find:

- **MDD-mond-de-development.postman_collection.json** → Postman collection to test all RESTful API endpoints (users, topics, posts, comments, subscriptions).
- **mdd.sql** → MySQL dump of the database schema and seed data.
- **Readme.txt** → Detailed documentation on using the Postman collection and database structure.

For setup and testing instructions, read the [`Readme.txt`](./assets/Readme.txt) file first.

---

## UML

![MDD diagram](/Monde-de-Dev-diagram.jpg)
