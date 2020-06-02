import React from 'react';
import './Maps.css'

const BaseMap = props => {
    return (
        <div className="basemaps-container">
            <select id="select" value={props.basemap} onChange={(e) => props.onChange(e.currentTarget.value)}>
                <option value="osm">OSM</option>
                <option value="hot">OSM HOT</option>
                <option value="dark">DARK</option>
                <option value="cycle">CYCLE MAP</option>
            </select>
        </div>
    )
};

export default BaseMap;