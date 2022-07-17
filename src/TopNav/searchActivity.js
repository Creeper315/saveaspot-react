import { default as ReactSelect } from 'react-select';
import { components } from 'react-select';
import { activities } from './data';
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
                />
                <label>{props.label}</label>
            </components.Option>
        </div>
    );
};

const SearchActivity = ({ loadPosts, filterOption }) => {
    const [Selected, setSelected] = useState('');
    // console.log('LOCATION ft opt ', filterOption.current);
    useEffect(() => {}, []);

    let onMenuClose = () => {
        // query sql to select on these locations
        // filterOption.current.isUpcoming = false;
        // filterOption.current.isSaved = false;
        // loadPosts();
    };

    let handleChange = (list) => {
        // console.log('changed ', list);

        setSelected(list);

        filterOption.current.listActivity = list.map((e) => {
            return e.value;
        });

        filterOption.current.isUpcoming = false;
        filterOption.current.isSaved = false;
        loadPosts();
    };

    // const filterOption = useRef({
    //     listLocation: [],
    //     listActivity: [],
    //     pageSize: 3,
    //     onPage: 1,
    // });

    return (
        <ReactSelect
            className="multi-select"
            options={activities}
            value={Selected}
            onChange={handleChange}
            onMenuClose={onMenuClose}
            noOptionsMessage={() => "you're beautiful"}
            onFocus={(e) => {
                // console.log('on fcs ', e);
            }}
            components={{
                Option,
            }}
            isMulti
            closeMenuOnSelect={false}
            hideSelectedOptions={false}
            allowSelectAll={true}
            placeholder="Search By Event Type.."
        />
    );
};

export default SearchActivity;
