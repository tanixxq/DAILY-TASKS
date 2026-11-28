function MaintenanceList({ vehicle }) {
    if (!vehicle) {
      return <p className="empty-state">Select a vehicle to view its history.</p>;
    }
  
    if (vehicle.records.length === 0) {
      return <p className="empty-state">No maintenance records available.</p>;
    }
  
    return (
      <div className="maintenance-list">
        <h3>Maintenance History — {vehicle.name}</h3>
  
        {vehicle.records.map((record) => (
          <div className="maintenance-record" key={record.id}>
            <span>{record.description}</span>
            <small>{record.date}</small>
          </div>
        ))}
      </div>
    );
  }
  
  export default MaintenanceList;