import ServiceBadge from "./ServiceBadge";

function VehicleCard({ vehicle, onSelect }) {
  return (
    <div className="vehicle-card" onClick={() => onSelect(vehicle)}>
      <div className="vehicle-header">
        <div>
          <h3>{vehicle.name}</h3>
          <p>{vehicle.registration}</p>
        </div>

        <span className={`health ${vehicle.health.toLowerCase()}`}>
          {vehicle.health}
        </span>
      </div>

      <div className="service-info">
        <p>Next service: {vehicle.nextService}</p>
        <ServiceBadge nextService={vehicle.nextService} />
      </div>

      <p className="last-service">
        Last serviced: {vehicle.lastService}
      </p>
    </div>
  );
}

export default VehicleCard;