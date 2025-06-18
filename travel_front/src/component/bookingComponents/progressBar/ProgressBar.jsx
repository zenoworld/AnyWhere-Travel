import React from "react";
import './ProgressBar.css';

const steps = [
  "Cart Page",
  "Your Details",
  "Payment Information",
  "Completed"
];

function ProgressBar({ step }) {
  return (
    <div
      className="progressbar-container"
      role="progressbar"
      aria-valuenow={step}
      aria-valuemin="1"
      aria-valuemax="4"
    >
      {
        steps.map((label, index) => {
          const stepNumber = index + 1;
          const isActive = stepNumber === step;
          const isCompleted = stepNumber < step;

          return (
            <div
              key={label}
              className="progress-step"
            >
              <div
                className={`circle ${isActive ? "active" : ""} ${isCompleted ? "completed" : ""}`}
              >
                {
                  isCompleted ?
                    (
                      <span className="material-icons check-icon">
                        check
                      </span>
                    ) : (
                      <span>
                        {stepNumber}
                      </span>
                    )}
              </div>
              <div
                className={`label ${isActive || isCompleted ? "active" : ""}`}
              >
                {label}
              </div>


              {
                stepNumber !== steps.length &&
                (
                  <div
                    className={`bar ${isCompleted ? "filled" : ""}`}
                  ></div>
                )
              }

            </div>
          );
        })
      }
    </div>
  );
}

export default ProgressBar;
