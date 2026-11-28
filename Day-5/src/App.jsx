
import { useState } from "react";
import { vehicles as initialVehicles } from "./data/vehicles";
import VehicleCard from "./components/VehicleCard";
import MaintenanceList from "./components/MaintenanceList";
import "./App.css";

function App() {
  const [vehicles, setVehicles] = useState(initialVehicles);
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  function showEmptyState() {
    setVehicles([]);
    setSelectedVehicle(null);
    setError(false);
  }

  function resetDashboard() {
    setVehicles(initialVehicles);
    setSelectedVehicle(null);
    setError(false);
    setLoading(false);
  }

  function simulateLoading() {
    setLoading(true);
    setError(false);

    setTimeout(() => {
      setLoading(false);
    }, 1500);
  }

  return (
    <main className="dashboard">
      <header className="dashboard-header">
        <div>
          <p className="eyebrow">FLEET MANAGEMENT</p>
          <h1>FleetCare</h1>
          <p>Monitor vehicle health and maintenance schedules.</p>
        </div>

        <div className="demo-controls">
          <button onClick={simulateLoading}>Loading</button>
          <button onClick={() => setError(true)}>Error</button>
          <button onClick={showEmptyState}>Empty</button>
          <button onClick={resetDashboard}>Reset</button>
        </div>
      </header>

      {loading ? (
        <p className="state-message">Loading fleet data...</p>
      ) : error ? (
        <div className="state-message error-state">
          <p>Unable to load fleet data.</p>
          <button onClick={resetDashboard}>Try again</button>
        </div>
      ) : vehicles.length === 0 ? (
        <p className="state-message">No vehicles found in your fleet.</p>
      ) : (
        <>
          <section className="fleet-section">
            <h2>Your Vehicles ({vehicles.length})</h2>

            <div className="vehicle-grid">
              {vehicles.map((vehicle) => (
                <VehicleCard
                  key={vehicle.id}
                  vehicle={vehicle}
                  onSelect={setSelectedVehicle}
                />
              ))}
            </div>
          </section>

          <section className="history-section">
            <MaintenanceList vehicle={selectedVehicle} />
          </section>
        </>
      )}
    </main>
  );
}

export default App;
