import a from '../img/lin.jpg';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import Parent from './parent';

const Welcome = () => {
    const navi = useNavigate();
    console.log('Welcome rendered!');
    const [arr, setarr] = useState([1, 2, 3, 4, 5]);

    return (
        <div>
            <p>Welcome to my .... page</p>
            <img src={a} alt="haha" />
            <button
                onClick={() => {
                    navi('/login');
                }}
            >
                to login
            </button>
            <button
                onClick={() => {
                    navi('/main');
                }}
            >
                to main
            </button>
            <button
                onClick={() => {
                    arr[2] = { hi: 'wow' };
                    setarr(arr);
                }}
            >
                push
            </button>
            <button
                onClick={() => {
                    console.log(arr);
                }}
            >
                show arr
            </button>
            {/* {<Parent />} */}
        </div>
    );
};

export default Welcome;
