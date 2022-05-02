import SearchLocation from './searchLocation';
import SearchActivity from './searchActivity';
import '../css/topnav.css';
import DropdownFilter from './dropdownFilter';
import { useEffect } from 'react';

const TopNav = ({ loadPosts, filterOption, ThisUser }) => {
    // console.log('Top Nav Refresh');
    useEffect(() => {
        // console.log('Top Nav Effect');
    }, []);

    return (
        <div className="topnav-main">
            <SearchLocation loadPosts={loadPosts} filterOption={filterOption} />
            {/* <SearchUser loadPosts={loadPosts} filterOption={filterOption} /> */}
            <SearchActivity loadPosts={loadPosts} filterOption={filterOption} />
            {/* <DropdownFilter
                loadPosts={loadPosts}
                filterOption={filterOption}
                ThisUser={ThisUser}
            /> */}
        </div>
    );
};

export default TopNav;
