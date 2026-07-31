# Trackfinder (Encounter & Monster Tracker)

This project consists of two parts: a C# (.NET Core) backend and a React (Vite + TypeScript) frontend. Below are the instructions for setting up both parts locally.

## Prerequisites

Ensure the following software is installed on your machine:

- [Git](https://git-scm.com/)
- [.NET SDK](https://dotnet.microsoft.com/download) (Version used in the project, e.g., .NET 8)
- [Node.js](https://nodejs.org/) (Version 18+ and npm recommended)
- [PostgreSQL](https://www.postgresql.org/) (Database server must be running)

---

## Backend Setup (.NET API)

The backend handles storing encounter data, monster templates (bestiary), and their current state.

**1. Clone the repository**

```bash
git clone https://github.com/Harlamis/tf-backend
cd tf-backend
```

**2. Database Configuration**
Open `appsettings.json` (or `appsettings.Development.json`) and configure the connection string for your local PostgreSQL server.
_Note: replace `Username` and `Password` with your actual credentials._

```json
"ConnectionStrings": {
  "DefaultConnection": "Host=localhost;Database=TrackfinderDb;Username=postgres;Password=your_password"
}
```

**3. Apply Migrations and Seed Database**
The project uses Entity Framework Core. To create the tables and populate the bestiary with initial monster templates (Mudcrab, Draugr, Dragon), run the following command:

```bash
dotnet ef database update
```

_(If EF Core tools are not installed globally, run: `dotnet tool install --global dotnet-ef`)_

**4. Run the Server**

```bash
dotnet run
```

By default, the API will be available at `http://localhost:5287`. The Swagger documentation page is accessible at `/swagger`.

---

## Frontend Setup (React + Vite)

The client side is built with React, using TypeScript and Tailwind CSS for styling.

**1. Clone the repository**

```bash
git clone https://github.com/Harlamis/trackfinder
cd trackfinder
```

**2. Install Dependencies**

```bash
npm install
```

**3. Environment Variables**
Create a `.env` file in the root of the frontend project and specify the URL to the local API. Ensure the port matches the one where the backend is running:

```env
VITE_API_URL=http://localhost:5287/api
```

**4. Run the Application**

```bash
npm run dev
```

The frontend will be available in your browser at `http://localhost:5173`.

---

## LAN Access (Optional)

If you want to access the application interface from a smartphone or another computer on your local network (Wi-Fi):

1. **On the backend:** Ensure your CORS settings allow requests from your local IP address.
2. **On the frontend:** Run Vite with the `--host` flag so the server accepts external connections:
   ```bash
   npm run dev -- --host
   ```
   Your local IP address will appear in the terminal (e.g., `Network: http://192.168.1.100:5173/`), which you can use to open the application from other devices.
