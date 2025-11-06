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

#### Production Mode
```bash
# Build and start all services
docker-compose up --build

# Run in background
docker-compose up -d --build
```

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

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/events` | Get all events (with optional filters) |
| GET | `/api/events/{id}` | Get event by ID |
| POST | `/api/events` | Create new event |
| PUT | `/api/events/{id}` | Update event |
| DELETE | `/api/events/{id}` | Delete event |

### Query Parameters for GET /api/events

- `title` - Filter by event title
- `location` - Filter by location
- `status` - Filter by status (0=Upcoming, 1=Attending, 2=Maybe, 3=Declined)
- `dateFrom` - Filter events from this date
- `dateTo` - Filter events to this date

## Event Status Types

- **Upcoming** (0) - Event is scheduled for the future
- **Attending** (1) - User plans to attend
- **Maybe** (2) - User might attend
- **Declined** (3) - User will not attend

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

## Development

### Local Development (without Docker)

### Backend Development

```cmd
cd event-management
dotnet watch run
```

### Frontend Development

```cmd
cd event-frontend
npm start
```

The frontend will automatically reload when you make changes to the source files.

### Building for Production

**Backend:**
```cmd
cd event-management
dotnet publish -c Release
```

**Frontend:**
```cmd
cd event-frontend
npm run build
```

## Configuration

### Backend Configuration

Edit `appsettings.json` or `appsettings.Development.json` in the `event-management` folder.

### Frontend Configuration

Edit environment files in `event-frontend/src/environments/`:
- `environment.ts` - Development configuration

## Database

The application uses SQLite with Entity Framework Core. 

**Docker Setup:**
- Database file (`events.db`) is automatically created in the `./data` directory
- Data persists between container restarts through Docker volumes
- Database is accessible from both development and production containers

**Manual Setup:**
- Database file is created in the backend project folder when you first run the application





### Checking if Services are Running

**Docker:**
- Backend: Visit http://localhost:5059/swagger
- Frontend: Visit http://localhost:4200

**Manual Setup:**
- Backend: Visit https://localhost:7049/swagger
- Frontend: Visit http://localhost:4200


## License

This project is for educational purposes.