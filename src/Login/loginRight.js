import { useEffect, useRef, useState } from 'react';
import { Transition } from 'react-transition-group';
import axios from 'axios';

const clientId =
    '1016702716489-u2fjc3us998nqb1mt8c01uglpt42dshl.apps.googleusercontent.com';

const LoginRight = ({ name, password, isLogin, onsubmit, googleSubmit }) => {
    const [ShowHr, setShowHr] = useState(false);
    const [ForceRender, setForceRender] = useState(1);
    const [SubmitLabel, setSubmitLabel] = useState(
        isLogin ? 'SIGN IN' : 'SIGN UP'
    );

    const transitionStyles = useRef({});
    const defaultStyle = useRef({});
    const btnLeft = useRef();
    const btnRight = useRef();

    useEffect(() => {
        let k = 0;

        /* global google */

        google.accounts.id.initialize({
            client_id: clientId,
            callback: googleSubmit,
        });
        google.accounts.id.renderButton(document.getElementById('signInDiv'), {
            theme: 'outline',
            size: 'large',
        });
    }, []);

    // console.log('haha ', btnLeft.current.clientWidth);  <-- Throws undefined error !
    // 注意！这个 Button 的 clientWidth, 需要在 useEffect 里面才能拿到
    //  ！因为在 page 刚刚 render 的时候， btnLeft 这个值还没被设定好
    // console.log('rendered');
    useEffect(() => {
        transitionStyles.current = {
            entering: { left: btnLeft.current.offsetLeft },
            entered: { left: btnRight.current.offsetLeft },
            exiting: { left: btnRight.current.offsetLeft },
            exited: { left: btnLeft.current.offsetLeft },
        };
        let w = btnLeft.current.clientWidth + 4;
        defaultStyle.current = {
            transition: `left 300ms ease-in-out`,
            width: w + 'px',
            left: btnLeft.current.offsetLeft + 'px',
        };
        setForceRender(2); // 随便设置成一个不一样的 value，然后 page 就会 re-render
    }, []);

    let tg = (bool) => setShowHr(bool);

    return (
        <div className="login-right">
            <div id="login-form-contain">
                <div id="login-form">
                    <div id="login-upper">
                        <div id="signin-contain">
                            <span
                                className="signin-signup"
                                ref={btnLeft}
                                onClick={() => {
                                    tg(false);
                                    setSubmitLabel('SIGN IN');
                                    isLogin.current = true;
                                }}
                            >
                                SIGN IN
                            </span>
                            <span
                                className="signin-signup"
                                ref={btnRight}
                                onClick={() => {
                                    tg(true);
                                    setSubmitLabel('SIGN UP');
                                    isLogin.current = false;
                                }}
                            >
                                SIGN UP
                            </span>
                        </div>
                        <Transition in={ShowHr} timeout={0}>
                            {(state) => (
                                <div
                                    id="signin-hr"
                                    style={{
                                        ...defaultStyle.current,
                                        ...transitionStyles.current[state],
                                    }}
                                />
                            )}
                        </Transition>
                    </div>
                    <div className="login-label">USERNAME</div>
                    <input
                        className="login-shape login-input"
                        onChange={(e) => (name.current = e.target.value)}
                    />

                    <div className="login-label">PASSWORD</div>
                    <input
                        className="login-shape login-input"
                        onChange={(e) => (password.current = e.target.value)}
                    />

                    <div
                        id="login-submit"
                        className="login-shape"
                        onClick={onsubmit}
                    >
                        <span>{SubmitLabel}</span>
                    </div>
                    <div id="signInDiv"></div>
                </div>
            </div>
        </div>
    );
};

export default LoginRight;
