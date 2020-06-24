import React, {useState} from 'react';
import {LayersControl, Map, Marker, Popup, TileLayer} from "react-leaflet";
import {checkPermission} from "../../../CheckPermission";
import {NavLink} from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import {makeStyles} from "@material-ui/core/styles";
import {useSelector} from "react-redux";
import {wordList} from "../../../wordList";

const {BaseLayer} = LayersControl;

const useStyles = makeStyles({
    map: {
        height: '720px',
        padding: '15px'
    },
    popup: {
        display: "flex",
        flexDirection: 'column'
    }
});

const MainPageMap = (
    {users}
) => {
    const classes = useStyles();

    const [mapConfig] = useState({
        center: [42.8746, 74.5698],
        zoom: 12
    });

    const language = useSelector(state => state.language.name);

    const layers = {
        osm: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
        hot: "https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png",
        dark: "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}@2x.png",
        cycle: "https://dev.{s}.tile.openstreetmap.fr/cyclosm/{z}/{x}/{y}.png"
    };

    return (
        <Grid item container direction='column'>
            <Grid item>
                <Typography variant='h3' paragraph>
                    {wordList[language].mainPageMap.title}
                </Typography>
            </Grid>
            <Grid item xs>
                <Paper className={classes.map}>
                    <Map center={mapConfig.center} zoom={mapConfig.zoom}
                         style={{background: '#000', height: '100%', width: '100%'}}
                    >
                        <LayersControl position="topright">

                            {Object.keys(layers).map(layer => (
                                <BaseLayer checked name={layer} key={layer}>
                                    <TileLayer
                                        attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                                        url={layers[layer]}
                                    />
                                </BaseLayer>
                            ))}

                            {users && users.map(user => {
                                if (user.role === 'market') {
                                    const userData = user.market;
                                    const lat = userData.coordinates.lat;
                                    const lng = userData.coordinates.lng;
                                    return  <Marker position={[lat, lng]} key={user._id}>
                                        <Popup>
                                            <div className={classes.popup}>
                                                {checkPermission('getUser') ?
                                                    <NavLink to={`/users/${user._id}`}>
                                                        {userData.companyName}
                                                    </NavLink> : <b>{userData.companyName}</b>}
                                                <span>{userData.address}</span>
                                            </div>
                                        </Popup>
                                    </Marker>
                                }
                                return null
                            })}
                        </LayersControl>
                    </Map>
                </Paper>
            </Grid>
        </Grid>
    );
};

export default MainPageMap;