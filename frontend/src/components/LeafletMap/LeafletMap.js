import React, {useEffect, useRef, useState} from 'react';
import L from "leaflet";
import 'leaflet-routing-machine'

const LeafletMap = ({locations ,myLocation, to, type}) => {
    const statuses = {
        locations: 'locations',
        routing: 'routing'
    };
    const mapValue = useRef(null);

    const layerRef = useRef(null)

    const [rout, setRout] = useState(undefined);

    useEffect(() => {
        mapValue.current = L.map('map').setView([42.87467465600499, 74.58344969152971], 13);
        layerRef.current = L.layerGroup().addTo(mapValue.current)

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(mapValue.current);
    }, [])

    useEffect(() => {
        if(type === statuses.locations) {

            layerRef.current.clearLayers();

            locations.forEach(e => {
                L.marker([e.location.lat, e.location.lng]).addTo(layerRef.current)
            })

            // mapValue.current.setView(myLocation);
        }
        if(type === statuses.routing) {
            layerRef.current.clearLayers();

            let newRouting = rout ? rout : undefined;


            if(rout !== undefined) {
                const coords = locations.find(e => e.user._id === myLocation)

                newRouting.setWaypoints([[coords.location.lat, coords.location.lng],
                    to])

                setRout(newRouting)
            } else {
                const coords = locations.find(e => e.user._id === myLocation)

                newRouting = L.Routing.control({
                    waypoints: [
                        [coords.location.lat, coords.location.lng],
                        to
                    ]
                }).addTo(mapValue.current);

                newRouting._container.style.display = "None";

                mapValue.current.setView([coords.location.lat, coords.location.lng]);

                setRout(newRouting)
            }

        }
    }, [myLocation, to, locations])
    return (
        <div id='map' style={{width: '100%', height: '100%'}}></div>
    );
};

export default LeafletMap;