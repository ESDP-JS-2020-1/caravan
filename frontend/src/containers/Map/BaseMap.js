import React from 'react';
import './Maps.css'
class BaseMap extends React.Component {
    onChange = (e) => {

        if (this.props.onChange) {
            this.props.onChange(e.currentTarget.value);
        }
    };

    render() {
        return (
            <div className="basemaps-container">
                <select value={this.props.basemap} onChange={this.onChange}>
                    <option value="osm">OSM</option>
                    <option value="hot">OSM HOT</option>
                    <option value="dark">DARK</option>
                    <option value="cycle">CYCLE MAP</option>
                </select>
            </div>
        );
    }
};

export default BaseMap;