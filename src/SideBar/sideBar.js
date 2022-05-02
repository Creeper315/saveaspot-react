import a from '../img/lin.jpg';
import cross from '../img/cross.png';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/sideBar.css';
import Profile from './profile';
import EditContactForm from './editContactForm';
import CreatePostForm from './CreatePostForm';
import axios from 'axios';

const SideBar = ({ ThisUser, setThisUser, loadPosts, filterOption }) => {
    // id: 1;
    // username: 'richard';
    // email: null;
    // phone: null;
    // picture: 'https://www.google.com.hk/imgres?imgurl=https%3A%2F%2Fcdnb.artstation.com%2Fp%2Fassets%2Fcovers%2Fimages%2F016%2F220%2F089%2Flarge%2Fsupercell-art-spike-thumb.jpg%3F1551358928&imgrefurl=https%3A%2F%2Fwww.artstation.com%2Fartwork%2FW2GD82&tbnid=R9KbQs_huMiquM&vet=12ahUKEwibspSazJT3AhWTTPUHHc4KAFoQMygeegUIARCGAg..i&docid=UAXZCY8Nc8N0wM&w=400&h=400&q=brawl%20tar%20spike&ved=2ahUKEwibspSazJT3AhWTTPUHHc4KAFoQMygeegUIARCGAg';
    // console.log('Side Bar Refresh');
    const navigate = useNavigate();
    const [EditModalOpen, setEditModalOpen] = useState(false);
    const [CreateModalOpen, setCreateModalOpen] = useState(false);

    function toggleEdit() {
        setEditModalOpen(!EditModalOpen);
    }
    function toggleCreate() {
        setCreateModalOpen(!CreateModalOpen);
    }
    useEffect(() => {
        // console.log('Side Bar Effect, ', ThisUser);
    }, []);

    function handleLogOut() {
        navigate('/login');
    } //map: AIzaSyD-F9PkcMOHcDp5Zht0WTEP20tWLj0BDAk

    return (
        <div className="side-bar">
            {/* <img src={a} alt="profile " className="user-profile" /> */}
            <Profile ThisUser={ThisUser} setThisUser={setThisUser} />
            <h4 className="profile-label">{ThisUser.username}</h4>
            <div id="contact-info-contain" className="left-bar-info-contain">
                <div
                    className="spinning-gear-contain"
                    onClick={() => toggleEdit()}
                >
                    <div className="spinning-gear">ccc</div>
                </div>
                <div id="contact-info-contain-2">
                    <div className="contact-info-line">
                        <span className="profile-label">Email:</span>
                        <span>{ThisUser.email || ''}</span>
                    </div>
                    <div className="contact-info-line">
                        <span className="profile-label">Phone:</span>
                        <span>{ThisUser.phone || ''}</span>
                    </div>
                </div>
            </div>

            <div
                className="left-bar-info-contain"
                style={{ borderColor: 'blue' }}
            >
                <button
                    onClick={() => {
                        filterOption.current.isUpcoming = true;
                        filterOption.current.isSaved = false;
                        loadPosts();
                    }}
                >
                    My Upcoming Events
                </button>
                <button
                    onClick={() => {
                        filterOption.current.isUpcoming = false;
                        filterOption.current.isSaved = true;
                        loadPosts();
                    }}
                >
                    Saved Posts
                </button>
            </div>

            <div id="create-post-btn">
                <p>Create Activity Post</p>
                <div
                    id="cross-btn"
                    onClick={() => {
                        toggleCreate();
                    }}
                >
                    <img src={cross} alt="" />
                </div>
            </div>

            <div className="log-out-container">
                <button className="log-out" onClick={() => handleLogOut()}>
                    Log Out
                </button>
            </div>

            {EditModalOpen && (
                <EditContactForm
                    ThisUser={ThisUser}
                    setThisUser={setThisUser}
                    EditModalOpen={EditModalOpen}
                    toggleEdit={toggleEdit}
                />
            )}
            {CreateModalOpen && (
                <CreatePostForm
                    ThisUser={ThisUser}
                    setThisUser={setThisUser}
                    CreateModalOpen={CreateModalOpen}
                    toggleCreate={toggleCreate}
                />
            )}
        </div>
    );
};

export default SideBar;
