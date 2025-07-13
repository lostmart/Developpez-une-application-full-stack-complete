# P6-Full-Stack-reseau-dev

## 🔧 Frontend: Angular + TypeScript

- Angular CLI (strongly recommended)
- TypeScript (with best practices: indentation, SOLID principles)

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
- Constraints and validations (@NotNull, @Size, etc.)

#### Error Handling

- Global error handler with `@ControllerAdvice`

## 🔐 Security Layer

### Frontend:

- Store token securely (e.g., HttpOnly cookie if going advanced)
- Redirect to login on 401 errors

### Backend

- Filter and validate JWT in request headers
- Protect endpoints with `@PreAuthorize` or configuration-based rules

## 📦 Project Structure

- Frontend:
  - /components, /services, /models, /guards, /pages
- Backend:
  - com.mdd.app.controller, ...service, ...repository, ...model, ...security, ...dto

## ✅ Final Evaluation Checkpoints

- All required features (register/login, themes, posts, comments, profile)
- Code follows best practices (indentation, SOLID, Javadoc)
- Frontend and backend are well integrated via API
- Your documentation matches the implementation
- GitHub repo is complete and link is shared
