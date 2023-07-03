import { useState, useEffect } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { Client, Databases, Query } from "appwrite";
import MapComponent from "./MapComponent";

function App() {
  const client = new Client();

  const [locations, setLocations] = useState([]);

  useEffect(() => {
    client
      .setEndpoint("https://cloud.appwrite.io/v1")
      .setProject("64a2836e0f940af2a655");

    client.subscribe(
      [
        "databases.64a2849a1978bf068f3c.collections.64a284b5e572d551fdc6.documents",
      ],
      (response) => {
        setLocations([])
        getDocuments();
      }
    );

    getDocuments();
  }, []);

  useEffect(() => {}, [locations]);

  const getDocuments = async () => {
    const databases = new Databases(client);
    let promise = databases
      .listDocuments("64a2849a1978bf068f3c", "64a284b5e572d551fdc6")
      .then(
        function (response) {
          setLocations(response.documents);
        },
        function (error) {
          console.log(error);
        }
      );
  };

  return (
    <>{locations.length > 0 ? <MapComponent locations={locations} /> : ""}</>
  );
}

export default App;
