import a from '../img/lin.jpg';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/sideBar.css';

const SideBar = ({ ThisUser, setThisUser }) => {
    // id: 1;
    // username: 'richard';
    // email: null;
    // stuid: null;
    // phone: null;
    // picture: 'https://www.google.com.hk/imgres?imgurl=https%3A%2F%2Fcdnb.artstation.com%2Fp%2Fassets%2Fcovers%2Fimages%2F016%2F220%2F089%2Flarge%2Fsupercell-art-spike-thumb.jpg%3F1551358928&imgrefurl=https%3A%2F%2Fwww.artstation.com%2Fartwork%2FW2GD82&tbnid=R9KbQs_huMiquM&vet=12ahUKEwibspSazJT3AhWTTPUHHc4KAFoQMygeegUIARCGAg..i&docid=UAXZCY8Nc8N0wM&w=400&h=400&q=brawl%20tar%20spike&ved=2ahUKEwibspSazJT3AhWTTPUHHc4KAFoQMygeegUIARCGAg';
    // console.log('Side Bar Refresh');
    const navigate = useNavigate();
    useEffect(() => {
        // console.log('Side Bar Effect, ', ThisUser);
    }, []);

    function handleLogOut() {
        navigate('/login');
    } //map: AIzaSyD-F9PkcMOHcDp5Zht0WTEP20tWLj0BDAk

    return (
        <div className="side-bar">
            <img src={a} alt="profile " className="user-profile" />
            <h4>{'Name: ' + ThisUser.username}</h4>
            <div>{'email: ' + ThisUser.email}</div>
            <div>{'student ID: ' + ThisUser.email}</div>
            <div>{'phone: ' + ThisUser.phone}</div>
            <div className="log-out-container">
                <button className="log-out" onClick={() => handleLogOut()}>
                    Log Out
                </button>
            </div>
        </div>
    );
};

export default SideBar;
