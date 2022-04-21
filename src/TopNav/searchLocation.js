import { default as ReactSelect } from 'react-select';
import { components } from 'react-select';
import { locations } from './data';
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

const SearchLocation = ({ loadPosts, filterOption }) => {
    const [Selected, setSelected] = useState('');
    const [AllLocation, setAllLocation] = useState([]);
    // const [AllOptions, setAllOptions] = useState();
    console.log('LOCATION ft opt ', filterOption.current);
    useEffect(() => {
        axios({
            method: 'GET',
            url: 'getlocation',
        }).then((e) => {
            // setAllOptions(e.data.valueLabelPair);
            // setAllLocation(e.data.listLoc);
            setAllLocation(e.data);
            // console.log('all Loc - ', e.data);
        });
    }, []);

    let onMenuClose = () => {
        // query sql to select on these locations
        loadPosts();
    };

    let handleChange = (list) => {
        // console.log('changed ', c);

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
            onChange={handleChange}
            allowSelectAll={true}
            value={Selected}
            onMenuClose={onMenuClose}
            noOptionsMessage={() => "you're beautiful"}
            onFocus={(e) => {
                // console.log('on fcs ', e);
            }}
        />
    );
};

export default SearchLocation;
