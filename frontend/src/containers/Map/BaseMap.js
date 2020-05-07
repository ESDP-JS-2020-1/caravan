import React from 'react';
import './Maps.css'

const BaseMap = props => {
    const onChange = (e) => props.onChange && props.onChange(e.currentTarget.value);

    return (
        <div className="basemaps-container">
            <select value={props.basemap} onChange={onChange}>
                <option value="osm">OSM</option>
                <option value="hot">OSM HOT</option>
                <option value="dark">DARK</option>
                <option value="cycle">CYCLE MAP</option>
            </select>
        </div>
    )
}

export default BaseMap;