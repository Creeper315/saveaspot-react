import SearchLocation from './searchLocation';
import SearchActivity from './searchActivity';
import '../css/topnav.css';
import '../sass/top-nav.scss';
import { useEffect } from 'react';
import { GrMap } from 'react-icons/gr';

const TopNav = ({
    loadPosts,
    filterOption,
    ThisUser,
    AllLocation,
    MapViewOpen,
    setMapViewOpen,
}) => {
    // console.log('Top Nav Refresh');
    useEffect(() => {
        // console.log('Top Nav Effect');
    }, []);

    function btnStyle() {
        if (MapViewOpen) {
            return {
                backgroundColor: 'skyblue',
            };
        }
        return {
            backgroundColor: 'white',
        };
    }

    return (
        <div className="topnav-main">
            <SearchLocation
                loadPosts={loadPosts}
                filterOption={filterOption}
                AllLocation={AllLocation}
            />
            <div id="nav-map" onClick={() => setMapViewOpen(!MapViewOpen)}>
                <GrMap fontSize={'20px'} fontWeight={'bold'} />
            </div>
            {/* <button
                id="topnav-view-map-btn"
                style={btnStyle()}
                onClick={() => setMapViewOpen(!MapViewOpen)}
            >
                View Map
            </button> */}
            <SearchActivity loadPosts={loadPosts} filterOption={filterOption} />
        </div>
    );
};

export default TopNav;
