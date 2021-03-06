import React, {useState} from 'react'

import {useDispatch} from "react-redux";
import Leaflet from 'leaflet';
import {Map, TileLayer, Marker, Popup} from 'react-leaflet'
import ReactLeafletSearch from "react-leaflet-search";
import BaseMap from "./BaseMap";

import {createCoordinateSuccess} from "../../store/actions/usersActions";

import 'leaflet/dist/leaflet.css';


Leaflet.Icon.Default.imagePath =
    '../node_modules/leaflet';

delete Leaflet.Icon.Default.prototype._getIconUrl;

Leaflet.Icon.Default.mergeOptions({
    iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
    iconUrl: require('leaflet/dist/images/marker-icon.png'),
    shadowUrl: require('leaflet/dist/images/marker-shadow.png')
});

const MapDisplay = () => {

    const dispatch = useDispatch();

    const [state, setState] = useState({
        lat: 42.8700000,
        lng: 74.5900000,
        zoom: 12,
        marker: {},
        basemap: 'osm'
    });

    const addMarker = (event) => {
        const marker = {...event.latlng};

        if (event.originalEvent.target.id !== 'select') {
            setState({...state, marker});
            dispatch(createCoordinateSuccess({lat: event.latlng.lat, lng: event.latlng.lng}))
        }

    };


    const myPopup = (SearchInfo) => {
        return (
            <Popup>
                <div>
                    <p>I am a custom popUp</p>
                    <p>latitude and longitude from search component:
                        lat:{SearchInfo.latLng.lat} lng:{SearchInfo.latLng.lng}</p>
                </div>
            </Popup>
        );
    };

    const onBMChange = (bm) => {
        setState({...state, basemap: bm});
    };


    const basemapsDict = {
        osm: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
        hot: "https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png",
        dark: "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}@2x.png",
        cycle: "https://dev.{s}.tile.openstreetmap.fr/cyclosm/{z}/{x}/{y}.png"
    };

    const position = [state.lat, state.lng];

    return (
        <Map onClick={addMarker} center={position} zoom={state.zoom} style={{height: '100%'}}>
            <ReactLeafletSearch
                popUp={myPopup}
                showMarker={true}
                position="topleft"/>
            <TileLayer
                url={basemapsDict[state.basemap]}
            />
            <BaseMap basemap={state.basemap} onChange={onBMChange}/>

            {state.marker.lat && <Marker position={state.marker}/>}

        </Map>
    )
};

export default MapDisplay;