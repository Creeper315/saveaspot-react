import '../css/login.css';
import { useState, useRef } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Parent from './parent';

const LoginMain = () => {
    let navigate = useNavigate();
    const [Title, setTitle] = useState('Login');
    const name = useRef();
    const password = useRef();

    // const [, set] = useState();
    function onsubmit() {
        axios({
            method: 'POST',
            url: Title === 'Login' ? 'login' : 'register',
            data: {
                username: name.current,
                password: password.current,
            },
        })
            .then((e) => {
                // window.rr = e;
                console.log('submit result ', e.status, e.data); // 现在这个 e.data 是登录进来的 user 的 object
                navigate('/main', { state: e.data });
            })
            .catch((e) => {
                console.log('submit Error ', e, e.response);
            });
    }
    function cookie() {
        axios({
            method: 'post',
            url: 'https://fun-together.herokuapp.com/cookie',
            // headers: {
            //     Authorization: `Bearer ${`eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InBvcCIsImlhdCI6MTY0OTY1MDk3M30.xyBYVaM6-_NCtY1wnd-c5E2TXKoarw8kzTz9Pg2vNvE`}`,
            // },
        })
            .then((e) => {
                console.log('test then', e);
            })
            .catch((e) => {
                console.log('test catch ', e);
            });
    }
    function test() {
        axios({
            method: 'post',
            url: 'https://fun-together.herokuapp.com/authMiddle',
            data: { msg: 'nothing' },
        })
            .then((e) => {
                console.log('cookie back,', e);
            })
            .catch((e) => {
                console.log('err response', e.response);
            });
    }

    function refresh() {
        axios({
            method: 'post',
            url: 'https://fun-together.herokuapp.com/refresh',
        }).then((e) => {
            console.log('refresh result ', e);
        });
    }

    // const render = (status) => {
    //     switch (status) {
    //         case Status.FAILURE:
    //             return <div>Failed ...</div>;
    //         case Status.LOADING:
    //             return <div>loading ..</div>;
    //         default:
    //             return <div>default</div>;
    //     }
    // };

    return (
        <div className="login-contain">
            <Parent />
            <div className="login-window">
                <h2>{Title}</h2>
                <p>Name</p>
                <input
                    onChange={(e) => {
                        name.current = e.target.value;
                    }}
                />
                <p>Password</p>
                <input
                    onChange={(e) => {
                        password.current = e.target.value;
                    }}
                />
                <button
                    onClick={() => {
                        onsubmit();
                    }}
                >
                    Submit
                </button>
                <br />
                <button onClick={() => setTitle('Login')}>Login</button>
                <button onClick={() => setTitle('Register')}>Register</button>
            </div>
        </div>
    );
};

export default LoginMain;
