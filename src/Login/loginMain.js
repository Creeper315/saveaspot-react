import '../css/login.css';
import LoginLeft from './loginLeft';
import LoginRight from './loginRight';
import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
// import { heroku } from '../App';
const heroku = 'https://fun-together.herokuapp.com/';

const LoginMain = () => {
    const [ErrorMsg, setErrorMsg] = useState('');
    let navigate = useNavigate();
    const isLogin = useRef(true);
    const name = useRef('');
    const password = useRef('');

    function urlHeroku() {
        if (isLogin.current) {
            console.log('used url', heroku + 'api/login');
            return heroku + 'api/login';
        }
        console.log('used url', heroku + 'api/register');
        return heroku + 'api/register';
    }

    function url() {
        if (isLogin.current) {
            return 'api/login';
        }
        return 'api/register';
    }

    function inputValidation(name, pass) {
        if (name.length === 0) {
            return 'Please Enter a Name';
        }
        if (pass.length === 0) {
            return 'Please Enter a Password';
        }

        if (name.includes(' ')) {
            return 'Name cannot contain spaces';
        }
        if (pass.includes(' ')) {
            return 'Password cannot contain spaces';
        }

        if (pass.length < 3) {
            return 'Password length should be at least 3';
        }
        if (name.length > 30) {
            return 'Name has maximum 30 characters';
        }
        if (pass.length > 64) {
            return 'Password has maximum 64 characters';
        }
        return '';
    }

    function googleSubmit(obj) {
        // console.log('hiii', obj);
        let token = obj.credential;
        let clientId = obj.clientId;

        axios({
            method: 'post',
            url: '/api/googlein',
            data: { token, clientId },
        })
            .then((e) => {
                console.log('whats e data', e.data);
                if (e.status === 200) {
                    navigate('/main', { state: e.data });
                }
            })
            .catch((e) => {
                console.log(e);
            });
    }

    function onsubmit() {
        let errMsg = inputValidation(name.current, password.current);
        if (errMsg.length !== 0) {
            if (isLogin.current) {
                setErrorMsg('Username or Password incorrect');
            } else {
                // when register
                setErrorMsg(errMsg);
            }
            return;
        }

        setErrorMsg('');

        axios({
            method: 'POST',
            url: url(),
            // url: urlHeroku(),
            data: {
                username: name.current,
                password: password.current,
            },
        })
            .then((e) => {
                // console.log('submit result ', e.status, e.data); // 现在这个 e.data 是登录进来的 user 的 object
                // email: null;
                // id: 2;
                // phone: null;
                // picture: null;
                // stuid: null;
                // username: 'Rua';
                navigate('/main', { state: e.data });
            })
            .catch((e) => {
                // console.log('submit err', e.response.data);
                setErrorMsg(e.response.data);
            });
    }

    return (
        <div className="login-main">
            <LoginLeft />
            <LoginRight
                name={name}
                password={password}
                isLogin={isLogin}
                ErrorMsg={ErrorMsg}
                setErrorMsg={setErrorMsg}
                onsubmit={onsubmit}
                googleSubmit={googleSubmit}
            />
        </div>
    );
};

export default LoginMain;
