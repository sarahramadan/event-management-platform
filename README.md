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
├── ClientApp/                 # Angular Frontend
│   ├── src/
│   │   ├── app/
│   │   │   ├── components/    # Angular components
│   │   │   ├── models/        # TypeScript interfaces
│   │   │   ├── services/      # HTTP services
│   │   │   └── environments/  # Environment configuration
│   │   └── styles.css         # Global styles
│   └── package.json
├── event-management/          # .NET Backend
│   ├── Controllers/           # API Controllers
│   ├── Domain/               # Domain entities
│   ├── Application/          # DTOs and services
│   ├── Infrastructure/       # Data access layer
│   └── Program.cs           # Application entry point
└── README.md                 # Project documentation
```

## Getting Started

### Prerequisites

- [.NET 8 SDK](https://dotnet.microsoft.com/download/dotnet/8.0)
- [Node.js](https://nodejs.org/) (version 18 or later)
- [Angular CLI](https://angular.io/cli) (optional, for manual commands)

### Quick Start

**Start Backend:**
```cmd
cd event-management
dotnet run
```

**Start Frontend (in another terminal):**
```cmd
cd ClientApp
npm install
npm start
```

### Access the Application

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

## Development

### Backend Development

```cmd
cd event-management
dotnet watch run
```

### Frontend Development

```cmd
cd ClientApp
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
cd ClientApp
npm run build
```

## Configuration

### Backend Configuration

Edit `appsettings.json` or `appsettings.Development.json` in the `event-management` folder.

### Frontend Configuration

Edit environment files in `ClientApp/src/environments/`:
- `environment.ts` - Development configuration
- `environment.prod.ts` - Production configuration

## Database

The application uses SQLite with Entity Framework Core. The database file (`events.db`) is automatically created in the backend project folder when you first run the application.

## Troubleshooting

### Common Issues

1. **CORS Errors**: Make sure the backend is running and CORS is properly configured
2. **npm/PowerShell Execution Policy**: Run PowerShell as administrator and execute: `Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser`
3. **Port Conflicts**: Make sure ports 4200 (frontend) and 7049 (backend) are available

### Checking if Services are Running

- Backend: Visit https://localhost:7049/swagger
- Frontend: Visit http://localhost:4200

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is for educational purposes.