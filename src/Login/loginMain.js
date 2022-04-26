import '../css/login.css';
import LoginLeft from './loginLeft';
import LoginRight from './loginRight';
import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { heroku } from '../App';

const LoginMain = () => {
    let navigate = useNavigate();
    const isLogin = useRef(true);
    const name = useRef('');
    const password = useRef('');

    function urlHeroku() {
        if (isLogin.current) {
            return heroku + 'login';
        }
        return heroku + 'register';
    }

    function onsubmit() {
        axios({
            method: 'POST',
            url: urlHeroku(),
            data: {
                username: name.current,
                password: password.current,
            },
        })
            .then((e) => {
                console.log('submit result ', e.status, e.data); // 现在这个 e.data 是登录进来的 user 的 object
                navigate('/main', { state: e.data });
            })
            .catch((e) => {
                console.log('submit Error ', e, e.response);
            });
    }

    return (
        <div className="login-main">
            <LoginLeft />
            <LoginRight
                name={name}
                password={password}
                isLogin={isLogin}
                onsubmit={onsubmit}
            />
        </div>
    );
};

export default LoginMain;
