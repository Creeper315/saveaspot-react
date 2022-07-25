import { default as ReactSelect } from 'react-select';
import { components } from 'react-select';
import { useState, useEffect } from 'react';
import axios from 'axios';
import a from '../img/lin.jpg';

const Option = (props) => {
    // console.log('what is props ', props);
    return (
        <div
            className="lo-contain"
            style={{ '--bg-image': `url(${props.data.locpic})` }}
        >
            <components.Option {...props} className="location-option">
                {/* <img src={props.data.locpic} alt="nothing" /> */}
                <input
                    type="checkbox"
                    data-att="333"
                    checked={props.isSelected}
                    onChange={() => null}
                />{' '}
                <label>{props.label}</label>
            </components.Option>
        </div>
    );
};

const SearchLocation = ({ loadPosts, filterOption, AllLocation }) => {
    const [Selected, setSelected] = useState('');

    let onMenuClose = () => {
        // filterOption.current.isUpcoming = false;
        // filterOption.current.isSaved = false;
        // loadPosts();
    };

    let handleChange = (list) => {
        // console.log('loc changed ', list);

        setSelected(list);

        filterOption.current.listLocation = list.map((e) => {
            return e.locname;
        });

        filterOption.current.isUpcoming = false;
        filterOption.current.isSaved = false;
        loadPosts();
    };

    return (
        // <div style={{ '--is-location': 1 }}>
        <ReactSelect
            className="multi-select"
            options={AllLocation}
            isMulti
            closeMenuOnSelect={false}
            hideSelectedOptions={false}
            components={{
                Option,
            }}
            // menuIsOpen={true}
            onChange={handleChange}
            allowSelectAll={true}
            value={Selected}
            onMenuClose={onMenuClose}
            noOptionsMessage={() => 'No Results Found...'}
            placeholder="Filter search location:"
            onFocus={(e) => {
                // console.log('on fcs ', e);
            }}
        />
        // </div>
    );
};

export default SearchLocation;
