import a from '../img/lin.jpg';
import { useNavigate } from 'react-router-dom';

const Welcome = () => {
    const navi = useNavigate();

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
        </div>
    );
};

export default Welcome;
