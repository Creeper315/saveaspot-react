import React, { useEffect } from 'react';
import { useState } from 'react';
import {
    GoogleMap,
    LoadScript,
    Marker,
    InfoWindow,
} from '@react-google-maps/api';
import lin from '../img/lin.jpg';

const MyMap = ({ lat, long, locname, locp }) => {
    // locname: Location name.  locp: Location photo

    if (lat === undefined) {
        lat = 49.259765;
    }
    if (long === undefined) {
        long = -123.2424953;
    }
    let myPosition = { lat: lat, lng: long };
    const zoom = 17;

    const [WindowOpen, setWindowOpen] = useState(false);

    const mapStyles = {
        height: '400px',
        width: '500px',
    };

    function showWindow() {
        setWindowOpen(true);
    }

    const imgDiv = {
        width: '450px',
        height: '400px',
    };

    return (
        <LoadScript googleMapsApiKey="AIzaSyD-F9PkcMOHcDp5Zht0WTEP20tWLj0BDAk">
            <GoogleMap
                mapContainerStyle={mapStyles}
                zoom={zoom}
                center={myPosition}
            >
                {
                    // 也可以用 array.map() 来制作多个 Marker ！ Location 也是
                    <Marker
                        position={myPosition}
                        onClick={() => showWindow(true)}
                    />
                }
                {WindowOpen && (
                    <InfoWindow
                        position={myPosition}
                        clickable={true}
                        onCloseClick={() => showWindow(false)}
                    >
                        <div style={imgDiv}>
                            <p>{locname}</p>
                            <img src={lin} alt={'location'} />
                        </div>
                    </InfoWindow>
                )}
            </GoogleMap>
        </LoadScript>
    );
};

export default MyMap;
