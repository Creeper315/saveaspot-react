import a from '../img/lin.jpg';
import cross from '../img/cross.png';
import { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/sideBar.css';
import Profile from './profile';
import EditContactForm from './editContactForm';
import CreatePostForm from './CreatePostForm';
import SpinGear from './spinGear';
import SideButton from './sideButton';
import axios from 'axios';
import { MdEmail } from 'react-icons/md';
import { BsFillTelephoneFill } from 'react-icons/bs';
import { ImCross } from 'react-icons/im';

// import $ from 'jquery';

const SideBar = ({
    ThisUser,
    setThisUser,
    loadPosts,
    filterOption,
    AllLocation,
}) => {
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

    function clickUpcoming() {
        if (filterOption.current.isUpcoming === true) {
            filterOption.current.isUpcoming = false;
            loadPosts();
            return;
        }
        filterOption.current.isUpcoming = true;
        filterOption.current.isSaved = false;
        loadPosts();
    }

    function clickSaved() {
        if (filterOption.current.isSaved === true) {
            filterOption.current.isSaved = false;
            loadPosts();
            return;
        }
        filterOption.current.isSaved = true;
        filterOption.current.isUpcoming = false;
        loadPosts();
    }

    return (
        <div id="side-bar">
            <Profile ThisUser={ThisUser} setThisUser={setThisUser} />

            <div id="contact-info">
                <SpinGear clickFun={() => toggleEdit()} />
                <p
                    style={{
                        padding: '5px',
                        backgroundColor: 'antiquewhite',
                        margin: 0,
                    }}
                >
                    CONTACT INFO
                </p>
                <div className="contact-line">
                    <MdEmail
                        style={{ marginLeft: '15px', marginRight: '15px' }}
                    />
                    <span>{ThisUser.email || ''}</span>
                </div>
                <div className="contact-line">
                    <BsFillTelephoneFill
                        style={{ marginLeft: '15px', marginRight: '15px' }}
                    />
                    <span>{ThisUser.phone || ''}</span>
                </div>
            </div>

            <SideButton
                text="View Upcoming Event"
                activeFun={clickUpcoming}
                isActive={filterOption.current.isUpcoming}
            />
            <SideButton
                text="View Saved Event"
                activeFun={clickSaved}
                isActive={filterOption.current.isSaved}
            />

            {/* <div className="test-div">
                <button>hi</button>
            </div>
            <div className="test-div">
                <button>hi2</button>
            </div> */}

            <div id="create-post">
                <span>Create Event Post</span>
                <div id="create-post-button" onClick={toggleCreate}>
                    <ImCross id="create-post-cross" />
                </div>
            </div>

            <div id="log-out-button" onClick={() => handleLogOut()}>
                <span>Log Out</span>
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
                    AllLocation={AllLocation}
                />
            )}
        </div>
    );
};

export default SideBar;
