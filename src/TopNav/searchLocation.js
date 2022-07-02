import { default as ReactSelect } from 'react-select';
import { components } from 'react-select';
import { useState, useEffect } from 'react';
import axios from 'axios';
import a from '../img/lin.jpg';

const Option = (props) => {
    // console.log('what is props ', props);
    return (
        <div>
            <components.Option {...props} className="location-option">
                {/* <img src={a} alt="nothing" /> */}
                <input
                    type="checkbox"
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
        filterOption.current.isUpcoming = false;
        filterOption.current.isSaved = false;
        loadPosts();
    };

    let handleChange = (list) => {
        console.log('changed ', list);

        setSelected(list);

        filterOption.current.listLocation = list.map((e) => {
            return e.locname;
        });
    };

    return (
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
            noOptionsMessage={() => "you're beautiful"}
            placeholder="Search By Location.."
            onFocus={(e) => {
                // console.log('on fcs ', e);
            }}
        />
    );
};

export default SearchLocation;
