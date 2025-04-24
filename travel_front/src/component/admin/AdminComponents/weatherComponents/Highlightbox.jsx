import React from "react";


// Define the props type for the HighlightBox component


const HighlightBox = ({ title, value, Icon }) => {
  return (
    <div
      style={{
        backgroundColor: "#2e3c5af6",
        color: "white",
        padding: "1rem",
        borderRadius: "0.5rem",
        width: "180px",
        height: "140px",
      }}
    >
      <div>
        <div style={{ fontSize: "18px",display:"flex",justifyContent:"center" }}>{title}</div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginTop:"20px"
          }}
        >
          <Icon style={{ fontSize: "30px" }} />
          <p style={{ fontSize: "25px" ,margin:"0"}}>{value}</p>
        </div>
      </div>
    </div>
  );
};

export default HighlightBox;
