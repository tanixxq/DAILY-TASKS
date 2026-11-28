function ServiceBadge({ nextService }) {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
  
    const serviceDate = new Date(`${nextService}T00:00:00`);
    const daysLeft = Math.ceil(
      (serviceDate - today) / (1000 * 60 * 60 * 24)
    );
  
    let status;
    let className;
  
    if (daysLeft < 0) {
      status = "Overdue";
      className = "overdue";
    } else if (daysLeft <= 30) {
      status = "Due Soon";
      className = "due-soon";
    } else {
      status = "Scheduled";
      className = "scheduled";
    }
  
    return (
      <span className={`service-badge ${className}`}>
        {status}
      </span>
    );
  }
  
  export default ServiceBadge;