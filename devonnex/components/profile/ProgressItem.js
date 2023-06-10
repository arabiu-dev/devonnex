import React from "react";

function ProgressItem({ title, progress, color }) {
  return (
    <li className="progress-item">
      <div className="progress-label">
        <p className="progress-title">{title}</p>

        <data className="progress-data" value={progress}>
          {progress}%
        </data>
      </div>

      <div className="progress-bar">
        <div
          className="progress"
          style={{ "--width": `${progress}%`, "--bg": `var(${color})` }}
        ></div>
      </div>
    </li>
  );
}

export default ProgressItem;
