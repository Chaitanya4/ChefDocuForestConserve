import React, { useRef, useEffect, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import './Map.css';
import { Container, Nav, Navbar,Row,NavItem,Col } from 'react-bootstrap';
// Mapbox access token
mapboxgl.accessToken =
  'pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4M29iazA2Z2gycXA4N2pmbDZmangifQ.-g_vE53SD2WrJ6tFX7QHmA';

const Map = () => {
  
  const mapContainerRef = useRef(null);
 
  
  
  // Initialize map when component mounts
  useEffect(() => {


   const map = new mapboxgl.Map({
    container: mapContainerRef.current,
    style: 'mapbox://styles/mapbox/streets-v11',
    lat:5,
    lng:34,
    center: [5, 34],
    zoom: 1.5
  });
  //Finding current location of user
  
  navigator.geolocation.getCurrentPosition(function(position) {
    console.log("Latitude is :", position.coords.latitude);
    console.log("Longitude is :", position.coords.longitude);
    //creating marker popup
    const marker = new mapboxgl.Marker()
.setLngLat([position.coords.longitude, position.coords.latitude])
.setPopup(new mapboxgl.Popup().setHTML('<h4>You are currently located here.</h4>'))
.addTo(map);
marker.togglePopup(); 
const lngLat = marker.getLngLat();
// Print the marker's longitude and latitude values in the console
console.log(`Longitude: ${lngLat.lng}, Latitude: ${lngLat.lat}`);
  });
  
  //plotting earthquake data taken from a data source
    map.on('load', () => {
      map.addSource('earthquakes', {
        type: 'geojson',
        // data source URL
        data: 'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/2.5_month.geojson'
        });
        //adding layer on Map
      map.addLayer({
        'id': 'earthquakes-layer',
        'type': 'circle',
        'source': 'earthquakes',
        'paint': {
        'circle-radius': 6,
        'circle-stroke-width': 2,
        'circle-color': 'red',
        'circle-stroke-color': 'white'
        }
        });

    });

    // Clean up on unmount
    return () => map.remove();
  }, []);

  
  

  return (
    <div>
 <div ref={mapContainerRef} style={{
            position: 'absolute',
            top:200,
            bottom: 0,
            width: '100%',
            height: '70%',
     }} />
   
     </div>
  );
};

export default Map;
