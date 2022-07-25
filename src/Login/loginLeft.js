import party from '../svg/party.svg';
import tree from '../svg/tree.svg';
// import { GoogleLogin, GoogleLogout } from 'react-google-login';
import { useEffect } from 'react';

const LoginLeft = () => {
    function googleSignout(e) {
        // console.log('s out ', e);
    }

    return (
        <div className="login-left">
            <h4 id="login-left-title">Fun Together</h4>

            <p className="login-left-para">
                I'm Yuncheng Jia. I'm a new Grad looking for Web Developing
                Jobs. I made this Full Stack website end-to-end for practice.
            </p>

            {/* <p className="login-left-para">
                This is a website for UBC students to join activities with
                strangers or invite them to your own. It's the website to make
                friends and have fun :)
            </p> */}

            <p className="login-left-para">
                This is a website for UBC students to post activities, and
                invite strangers to join. It is the website to make friends and
                have fun :)
            </p>

            <div id="login-tech">Tech: React Node.js SQL</div>

            <img src={party} alt="party" id="party-svg" />
            <p id="login-left-foot">Yuncheng's self project</p>
            <div id="login-contact">
                <span>richardjia4@gmail.com</span>
                <span>(778)-855-0315</span>
            </div>
        </div>
    );
};

export default LoginLeft;
