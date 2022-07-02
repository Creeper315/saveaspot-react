import React, { useEffect } from 'react';
import { useState } from 'react';
import {
    GoogleMap,
    LoadScript,
    Marker,
    InfoWindow,
} from '@react-google-maps/api';
import lin from '../img/lin.jpg';

const MainMap = ({ lat, long, zoom, AllLocation, PageData, toOpenModal }) => {
    // Main Map: 预先设定好 default lat lang 为 UBC 中心
    // 打开 Map 的时候，再从 AllLocation 的 state 里面，filter 拿到当前页面的位置

    // Single Map location： 打开 Post Modal 的时候，就开始 axios 拿 Location 的 Lat Long。
    // Map 中心略放大一点点，
    // Marker 点开：是 Location 的 Picture 然后还有左下角地名。
    const defaultZoom = 15.7;
    const defaultLat = 49.2650167;
    const defaultLon = -123.249627;

    if (lat === undefined) {
        lat = defaultLat;
    }
    if (long === undefined) {
        long = defaultLon;
    }
    if (zoom === undefined) {
        zoom = defaultZoom;
    }
    let myPosition = { lat: lat, lng: long };

    // const [WindowOpen, setWindowOpen] = useState(false);

    const mapStyles = {
        position: 'absolute',
        left: 0,
        top: 0,
        height: '100%',
        width: '100%',
    };

    // function showWindow() {
    // setWindowOpen(true);
    // }

    // const imgDiv = {
    //     width: '450px',
    //     height: '400px',
    // };
    function renderAllMarker() {
        return PageData.map((e, idx) => {
            let loc = AllLocation.find((ll) => ll.locname === e.locname);
            // let pos = { lat: loc.lat, lng: loc.long };
            let pos = {
                lat: defaultLat + idx * 0.001,
                lng: defaultLon + idx * 0.001,
            };
            console.log('render pos: ', pos);
            let click = () => {
                toOpenModal(idx);
            };
            return <Marker position={pos} onClick={click} key={idx} />;
        });
    }

    return (
        <LoadScript googleMapsApiKey="AIzaSyD-F9PkcMOHcDp5Zht0WTEP20tWLj0BDAk">
            <GoogleMap
                mapContainerStyle={mapStyles}
                zoom={zoom}
                center={myPosition}
            >
                {renderAllMarker()}
                {/* {
                    // 需要一个 list of {lat, long, kk}
                    <Marker
                        position={myPosition}
                        // onClick={() => showWindow(true)}
                    />
                } */}
                {/* {WindowOpen && (
                    <InfoWindow
                        position={myPosition}
                        clickable={true}
                        onCloseClick={() => showWindow(false)}
                    >
                        <div style={imgDiv}>
                            <p>{'locname here~'}</p>
                            <img src={lin} alt={'location'} />
                        </div>
                    </InfoWindow>
                )} */}
            </GoogleMap>
        </LoadScript>
    );
};

export default MainMap;
