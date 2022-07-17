import a from '../img/lin.jpg';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Parent from './parent';
import GoogleLoginComponent from './googleLogin';

const Welcome = () => {
    const navi = useNavigate();
    navi('/login');
    // console.log('Welcome rendered!');
    const [arr, setarr] = useState([1, 2, 3, 4, 5]);

    function doRes(res) {
        console.log('jwt is', res.credential);
    }

    useEffect(() => {
        /* global google*/
        google.accounts.id.initialize({
            client_id:
                '1016702716489-u2fjc3us998nqb1mt8c01uglpt42dshl.apps.googleusercontent.com',
            callback: doRes,
        });
        google.accounts.id.renderButton(document.getElementById('signInDiv'), {
            theme: 'outline',
            size: 'large',
        });
        google.accounts.id.prompt();
    }, []);

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
            {/* <GoogleLoginComponent /> */}
            <div id="signInDiv"></div>
        </div>
    );
};

export default Welcome;
