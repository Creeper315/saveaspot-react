import { default as ReactSelect } from 'react-select';
import { components } from 'react-select';
import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
// import a from '../img/lin.jpg';

const Option = (props) => {
    // console.log('props', props);
    return (
        <div>
            <components.Option {...props} className="user-option">
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

const SearchSingle = ({ optionData, thisvalue }) => {
    useEffect(() => {}, []);

    let handleSelect = (e) => {
        // console.log('handle select ', e);
        thisvalue.current = e;
    };

    let onfocus = () => {
        // console.log('on focus');
    };

    return (
        <ReactSelect
            className="multi-select"
            // value={Selected}
            onChange={handleSelect}
            options={optionData}
            components={{
                Option,
            }}
            closeMenuOnSelect={true}
            blurInputOnSelect={true}
            hideSelectedOptions={false}
            onFocus={onfocus}
            placeholder="Search..."
            noOptionsMessage={() => 'Type User Name to Search'}
        />
    );
};

export default SearchSingle;
