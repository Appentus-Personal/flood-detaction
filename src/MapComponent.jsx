import GoogleMapReact from "google-map-react";
import green from "./assets/pin-green.png";
import ornage from "./assets/pin-ornage.png";
import red from "./assets/pin-red.png";
import { useEffect, useState } from "react";
import "./App.css";
import { useLottie } from "lottie-react";
import * as animationData from "./ripple.json";
import anim from "./ripple.gif";

const MapComponent = ({ locations }) => {
  const [markers, setMarkets] = useState(0);

  const options = {
    animationData: animationData,
    loop: true,
  };

  const { View } = useLottie(options);

  const AnyReactComponent = ({ text }) => {
    const color = getMarkerTextColor(text);

    return (
      <>
        {View}
        <div
          style={{
            color: "white",
            width: "25px",
            background: color,
            padding: "15px 10px",
            display: "inline-flex",
            textAlign: "center",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: "100%",
            transform: "translate(-50%, -50%)",
          }}
        >
          {"WL " + text}
        </div>
        {View}
      </>
    );
  };

  const Marker = ({ text }) => {
    const color = getMarkerTextColor(text);
    return (
      <div className="marker" style={{ width: "50px" }}>
        <img src={getMarkerIcon(Number(text))} alt="Marker" width={40} />
        <div
          style={{
            display: "flex",
            fontSize: "12px",
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
      // return (
      //   <Marker
      //     key={index}
      //     lat={Number(marker.location[0])}
      //     lng={Number(marker.location[1])}
      //     text={marker.water_level}
      //     animation={2}
      //   />
      // );
      return (
        <AnyReactComponent
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
        defaultZoom={9}
        yesIWantToUseGoogleMapApiInternals
        defaultCenter={[33.696534985886636, 74.53796411881365]}
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
