import GoogleMapReact from "google-map-react";
import green from "./assets/pin-green.png";
import ornage from "./assets/pin-ornage.png";
import red from "./assets/pin-red.png";
import { useEffect, useState } from "react";

const MapComponent = ({ locations }) => {
  const [markers, setMarkets] = useState(0);

  const Marker = ({ text }) => {
    const color = getMarkerTextColor(text);
    return (
      <div className="marker" style={{ width: "25px" }}>
        <img src={getMarkerIcon(Number(text))} alt="Marker" width={20} />
        <div
          style={{
            display: "flex",
            fontSize: "8px",
            color: color,
            fontWeight: "600",
            textAlign: "center",
          }}
        >
          {"Water Level " + text}
        </div>
      </div>
    );
  };

  const renderMarkers = () => {
    return locations.map((marker, index) => {
      return (
        <Marker
          key={index}
          lat={Number(marker.location[0])}
          lng={Number(marker.location[1])}
          text={marker.water_level}
        />
      );
    });
  };

  useEffect(() => {
    setMarkets(renderMarkers());
  }, [locations]);

  const getMarkerIcon = (level) => {
    if (level <= 5) {
      return green;
    } else if (level > 5 && level <= 7) {
      return ornage;
    } else {
      return red;
    }
  };

  const getMarkerTextColor = (level) => {
    if (level <= 5) {
      return "green";
    } else if (level > 5 && level <= 7) {
      return "orange";
    } else {
      return "red";
    }
  };

  return (
    <div style={{ height: "100vh", width: "100%" }}>
      <GoogleMapReact
        options={{
          panControl: false,
          scrollwheel: false,
          draggable: false,
          mapTypeControl: false,
        }}
        bootstrapURLKeys={{ key: "AIzaSyDfafon1lZ3Lh-iN07d8wIeN87fODKRGyg" }}
        defaultZoom={12}
        defaultCenter={[26.91673695818268, 75.7882869206132]}
        onDragEnd={() => {
          setMarkets(renderMarkers());
        }}
      >
        {markers}
      </GoogleMapReact>
    </div>
  );
};
export default MapComponent;
