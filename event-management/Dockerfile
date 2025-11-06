# Use the official .NET 8 SDK image for building
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build

# Set working directory
WORKDIR /src

# Copy project file and restore dependencies
COPY event-management.csproj .
RUN dotnet restore "event-management.csproj"

# Copy source code
COPY . .

# Build the application
RUN dotnet build "event-management.csproj" -c Release -o /app/build

# Publish the application
RUN dotnet publish "event-management.csproj" -c Release -o /app/publish /p:UseAppHost=false

# Use the official .NET 8 runtime image for the final stage
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS final

# Install SQLite (in case you need sqlite3 command-line tool)
RUN apt-get update && apt-get install -y sqlite3 && rm -rf /var/lib/apt/lists/*

# Set working directory
WORKDIR /app

# Copy published application from build stage
COPY --from=build /app/publish .

# Create directory for database files
RUN mkdir -p /app/data

# Expose port 80 (default for ASP.NET Core in containers)
EXPOSE 80
EXPOSE 443

# Set environment variables
ENV ASPNETCORE_URLS=http://+:80
ENV ASPNETCORE_ENVIRONMENT=Development

# Set the entry point
ENTRYPOINT ["dotnet", "event-management.dll"]