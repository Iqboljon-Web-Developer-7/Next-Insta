"use client";

import { GeoSetLocationNameType, GeoTyes } from "@/types/types";
import { useState, useEffect } from "react";

const LocationDisplay = ({
  setLocation: setLocationName,
}: GeoSetLocationNameType) => {
  const [location, setLocation] = useState<GeoTyes>({
    latitude: 0,
    longitude: 0,
    city: "",
  });
  const [error, setError] = useState("");

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setLocation((prevState) => ({
            ...prevState,
            latitude,
            longitude,
          }));
          fetchCityName(latitude, longitude);
        },
        (err) => {
          setError("Unable to retrieve location");
          console.error("Error getting location: ", err);
        }
      );
    } else {
      setError("Geolocation is not supported by this browser");
    }
  }, []);

  const fetchCityName = async (latitude: number, longitude: number) => {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
      );
      const data = await response.json();
      if (data) {
        setLocationName(
          `${data?.address?.country}, ${data?.address?.city}, ${data?.address?.county}`
        );
      }

      const city =
        data.address.city ||
        data.address.town ||
        data.address.village ||
        "Unknown location";
      setLocation((prevState) => ({
        ...prevState,
        city,
      }));
    } catch (err) {
      setError("Failed to fetch city name");
      console.error("Error fetching city name: ", err);
    }
  };

  return <></>;
};

export default LocationDisplay;
