# FleetCare — Fleet Maintenance Tracker

A small React dashboard for monitoring vehicle health, upcoming service dates, and maintenance history.

## Features

- Displays fleet vehicles with registration numbers and health status.
- Automatically calculates service status: Scheduled, Due Soon, or Overdue.
- Displays maintenance records for the selected vehicle.
- Demonstrates loading, empty, and error UI states.
- Includes interactive controls to test dashboard states.

## Component Structure

| Component | Responsibility |
|---|---|
| `App.jsx` | Owns application state and coordinates the dashboard |
| `VehicleCard.jsx` | Displays individual vehicle information |
| `ServiceBadge.jsx` | Calculates and displays service status |
| `MaintenanceList.jsx` | Displays maintenance history |

## State Ownership

Application-level state is maintained in `App.jsx` using React's `useState`.

- `vehicles`: fleet data.
- `selectedVehicle`: currently selected vehicle.
- `loading`: loading indicator visibility.
- `error`: error state visibility.

Child components receive data and callbacks through props. This keeps state centralized and components reusable.

## UI States

- **Loading:** Displays a loading message while data loading is simulated.
- **Empty:** Displays a message when the fleet contains no vehicles.
- **Error:** Displays an error message with a retry/reset action.

## Edge Cases Demonstrated

1. **Overdue service:** The Hyundai Creta has a service date of November 20, 2026. The dashboard correctly identifies it as overdue on November 28, 2026.
2. **Empty maintenance history:** The Tata Nexon has no maintenance records, so the component displays an appropriate empty-state message.
3. **No vehicle selected:** The maintenance component prompts the user to select a vehicle.

## Data and Limitations

Vehicle data is stored locally in `src/data/vehicles.js`. Loading and error states are simulated for demonstration. No backend or external API is currently connected.

## Run Locally

```bash
npm install
npm run dev
```

## Tech Stack

- React
- JavaScript
- Vite
- CSS
