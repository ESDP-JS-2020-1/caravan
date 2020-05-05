import React, { Component } from 'react'
import Leaflet from 'leaflet';
import { Map, TileLayer, Marker, Popup } from 'react-leaflet'
import 'leaflet/dist/leaflet.css';
import ReactLeafletSearch from "react-leaflet-search";
import {connect} from "react-redux";
import {createCoordinateSuccess} from "../../store/actions/usersActions";

Leaflet.Icon.Default.imagePath =
    '../node_modules/leaflet'

delete Leaflet.Icon.Default.prototype._getIconUrl;

Leaflet.Icon.Default.mergeOptions({
    iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
    iconUrl: require('leaflet/dist/images/marker-icon.png'),
    shadowUrl: require('leaflet/dist/images/marker-shadow.png')
});



 class MapDisplay extends Component {
    state = {
        lat: 42.8700000,
        lng: 74.5900000,
        zoom: 12,
        marker: []
    };

    addMarker = (event) => {
        const marker = [...this.state.marker];
        marker.push(event.latlng);
        this.setState({marker: marker});
        this.props.createCoordinateSuccess({lat: event.latlng.lat, lng: event.latlng.lng})
    };
    deleteMarker = (event) => {
        const marker = [...this.state.marker];
        const newMarker = marker.filter(d => {
            if (d.lat !== event.latlng.lat && d.lng !== event.latlng.lng) {
                return d
            } else {
                return false
            }
        });
        this.setState({marker: newMarker})
    };

    myPopup(SearchInfo) {
        console.log(SearchInfo);
        return(
            <Popup>
                <div>
                    <p>I am a custom popUp</p>
                    <p>latitude and longitude from search component: lat:{SearchInfo.latLng.lat} lng:{SearchInfo.latLng.lng}</p>
                </div>
            </Popup>
        );
    }
    render() {
        const position = [this.state.lat, this.state.lng];
        return (
            <Map onClick={this.addMarker} center={position} zoom={this.state.zoom} style={{height : '100%'}}>
                <ReactLeafletSearch
                    popUp={ this.myPopup }
                    showMarker = {true}
                    position="topleft" />
                <TileLayer
                    attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {this.state.marker.map((m, index) => (
                    <Marker onClick={this.deleteMarker} key={index} position={m}/>
                ))}
            </Map>
        )
    }
}

const mapDispatchToProps = dispatch => ({
    createCoordinateSuccess: (data) => dispatch(createCoordinateSuccess(data))
});

export default connect(null, mapDispatchToProps)(MapDisplay);