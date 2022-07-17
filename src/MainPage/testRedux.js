import { useSelector, useDispatch } from 'react-redux';
import { useState } from 'react';
import {
    setLocation,
    setUser,
    setId,
    setSaved,
    setHelpedByMe,
    setOwnPost,
} from '../Redux/Reducer/postReducer';
// console.log('what is set', setLocation);

const TestRedux = () => {
    let disp = useDispatch();
    let arr = ['Math Building', 'EOSC', 'Cirs'];
    const [saved, setsaved] = useState();

    const get = useSelector((state) => {
        return state.postReducer;
    });

    function sLocation(list) {
        disp(setLocation(list));
    }

    function sSaved(bool) {
        disp(setSaved(bool));
    }

    return (
        <div>
            <button
                onClick={() => {
                    setsaved(!saved);
                    sSaved(saved);
                }}
            >
                toggleSaved
            </button>
            <button onClick={() => sLocation(arr)}>s loc</button>
            <button
                onClick={() => {
                    // console.log(get);
                }}
            >
                Check
            </button>
        </div>
    );
};

export default TestRedux;
