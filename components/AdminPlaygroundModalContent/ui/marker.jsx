import React, { useState } from "react";

const Marker = ({ lat, lng, onDragEnd }) => {
  const [dragging, setDragging] = useState(false);

  const handleDragStart = () => {
    setDragging(true);
  };

  const handleDragEnd = (e) => {
    setDragging(false);
    const newLat = e.latLng.lat();
    const newLng = e.latLng.lng();
    onDragEnd({ lat: newLat, lng: newLng });
  };

  return (
    <div
      lat={lat}
      lng={lng}
      draggable={true}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      style={{
        height: "20px",
        width: "20px",
        backgroundColor: "red",
        borderRadius: "50%",
        cursor: dragging ? "grabbing" : "grab",
        position: "relative",
        transform: "translate(-50%, -50%)",
      }}
    />
  );
};

export default Marker;
