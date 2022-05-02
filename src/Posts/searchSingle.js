import { default as ReactSelect } from 'react-select';
import { components } from 'react-select';
import { locations } from './data';
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

const SearchSingle = ({ loadPosts, filterOption }) => {
    const [Selected, setSelected] = useState('');
    const [AllName, setAllName] = useState([]);
    // const InputValue = useRef();
    // window.aa = AllName;
    // window.ss = Selected;
    // window.rr = filterOption;
    // console.log('SEARCH ft opts ', filterOption.current);

    useEffect(() => {}, []);

    function getLikeUser(str) {
        axios({
            method: 'post',
            url: 'api/likeuser',
            data: { str },
        }).then((e) => {
            // assume return list of name, used as Options
            console.log(e.data);
            setAllName(e.data);
        });
    }

    // function handleMenuClose() {
    //     // Load All Post again
    //     console.log('selected ', filterOption.current);
    //     filterOption.current.userId = Selected.id;
    //     loadPosts();
    // }

    let handleInput = (e) => {
        if (e === '') {
            setAllName([]);
            return;
        }
        // console.log('inp ', e);
        // InputValue.current = e;
        getLikeUser(e);
    };

    let handleSelect = (e) => {
        // console.log('changed ', e);
        setSelected(e);
        filterOption.current.userId = e.id;
    };

    let onfocus = () => {
        setSelected('');
        setAllName([]);
        filterOption.current.userId = null;
    };

    return (
        <ReactSelect
            className="multi-select"
            onInputChange={handleInput}
            value={Selected}
            onChange={handleSelect}
            options={AllName}
            components={{
                Option,
            }}
            closeMenuOnSelect={true}
            blurInputOnSelect={true}
            hideSelectedOptions={false}
            onFocus={onfocus}
            onMenuClose={loadPosts}
            noOptionsMessage={() => 'Type User Name to Search'}
        />
    );
};

export default SearchSingle;
