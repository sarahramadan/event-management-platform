# Event Management System

Full-stack Event Management Platform built with .NET 8, Angular, and SQLite. Supports complete CRUD operations, event status tracking, and advanced search &amp; filtering. Designed for managing various types of events such as conferences, concerts, and appointments with a clean and responsive interface.

## Architecture

- **Frontend**: Angular 20 with TypeScript
- **Backend**: .NET 8 Web API
- **Database**: SQLite (Entity Framework Core)

## Features

- 📅 Create, view, edit, and delete events
- 🔍 Filter events by title, location, date range, and status
- 📱 Responsive design
- 🎨 Modern UI with clean styling
- 🔗 RESTful API integration

## Project Structure

```
event-management/
├── event-frontend/                 # Angular Frontend
│   ├── src/
│   │   ├── app/
│   │   │   ├── event/    # Angular components
│   │   │   ├── shared/        # common components
│   │   │   └── environments/  # Environment configuration
│   │   └── styles.css         # Global styles
│   └── package.json
├── event-management/          # .NET Backend
│   ├── Controllers/           # API Controllers
│   ├── Domain/               # Domain entities
│   ├── Application/          # DTOs and services
│   ├── Infrastructure/       # Data access layer
│   └── Program.cs            # Application entry point
└── README.md                 # Project documentation
└── docker-compose.yml        # Running app as container
```

## Getting Started

### Prerequisites

**Option 1: Docker (Recommended)**
- [Docker](https://www.docker.com/get-started)
- [Docker Compose](https://docs.docker.com/compose/install/)

**Option 2: Manual Setup**
- [.NET 8 SDK](https://dotnet.microsoft.com/download/dotnet/8.0)
- [Node.js](https://nodejs.org/) (version 18 or later)
- [Angular CLI](https://angular.io/cli) (optional, for manual commands)

### Quick Start with Docker


#### Development Mode (with live reload)
```bash
# Start development environment
docker-compose -f docker-compose.yml up --build

# Run in background
docker-compose -f docker-compose.yml up -d --build
```

#### Stopping Services
```bash
# Stop all services
docker-compose down

# Stop and remove volumes
docker-compose down -v
```

### Manual Setup (Alternative)

**Start Backend:**
```cmd
cd event-management
dotnet run
```

**Start Frontend (in another terminal):**
```cmd
cd event-frontend
npm install
npm start
```

### Access the Application

**Docker (Development):**
- **Frontend**: http://localhost:4200 (with live reload)
- **Backend API**: http://localhost:5059 (with hot reload)
- **Swagger UI**: http://localhost:5059/swagger

**Manual Setup:**
- **Frontend**: http://localhost:4200
- **Backend API**: https://localhost:7049
- **Swagger UI**: https://localhost:7049/swagger


## Docker

### Architecture

The application is containerized using Docker with the following services:

- **Backend Service**: .NET 8 Web API running on port 5059
- **Frontend Service**: Angular app served by Nginx on port 4200
- **Database**: SQLite database with persistent volume at `./data`
<!-- Network: uses a custom bridge network for service communication -->

`


### Data Persistence

- SQLite database files are stored in the `./data` directory
- This directory is mounted as a volume in the backend container
- Database persists between container restarts
- Backup your `./data` directory to preserve your data



## Configuration

### Backend Configuration

Edit `appsettings.json` or `appsettings.Development.json` in the `event-management` folder.

### Frontend Configuration

Edit environment files in `event-frontend/src/environments/`:
- `environment.ts` - Development configuration









## Technical TODO List

> This section tracks planned technical enhancements and architectural improvements for the Event Management Platform.

### Backend (.NET)

- **Unit Testing**
	- Add and expand unit tests for services, controllers, and repository logic using xUnit or NUnit.
	- Ensure coverage for validation, mapping, and authentication logic.

- **Seed Data Separation**
	- Move database seed logic to a dedicated service/class for better maintainability and testability.

- **Object Mapping**
	- Integrate AutoMapper or similar library to handle DTO/entity conversions and reduce manual mapping code.

- **Validation**
	- Add FluentValidation for all DTOs, including a rule to ensure event titles are unique.

- **EF Core Configuration**
	- Refactor Entity Framework configuration using Fluent API in separate configuration classes for each entity to improve separation of concerns.

- **Authentication & Authorization**
	- Implement JWT authentication and integrate IdentityServer4 for secure user management and API protection.

### Frontend (Angular)

- **Unit Testing**
	- Add and expand unit tests for Angular components, services, and guards using Jasmine/Karma.
	- Test authentication flows, UI logic, and API integration.

- **JWT Authentication**
	- Add login/register UI and connect to backend authentication endpoints using JWT.
	- Store and manage JWT tokens securely in the frontend.
	- Protect routes and display user-specific content based on authentication state.

---


## Credits

This project was developed with the assistance of GitHub Copilot.

## License

This project is for educational purposes.