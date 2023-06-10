import React from "react";

function TaskCard({ icon, data, msg }) {
  return (
    <div className="card task-card">
      <div className="card-icon icon-box green">{icon}</div>

      <div>
        <data className="card-data" value="21">
          {data}
        </data>

        <p className="card-text">{msg}</p>
      </div>
    </div>
  );
}

export default TaskCard;
