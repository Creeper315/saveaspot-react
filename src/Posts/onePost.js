import axios from 'axios';
import { useEffect, useState, Fragment } from 'react';
import PostModal from './postModal';

const OnePost = ({ x, ThisUser, handleHelp, handleSave, handleDelete }) => {
    const isOwnPost = x.userid === ThisUser.id;

    let initHelper = () => {
        if (x.helper === ThisUser.username) {
            return true; // 说明这个 post 已经被当前登录的用户 help 过。但是如果已经被别人 help 了呢
        }
        return false;
    };

    const [IsOpen, setIsOpen] = useState(false);
    const [IsHelped, setIsHelped] = useState(initHelper()); // toggle 'Help' 和 'Cancel Help'

    function toggleOpen(bool) {
        if (bool === undefined) {
            setIsOpen(!IsOpen);
        }
        setIsOpen(bool);
    }

    // 注意！ props 里面的 x，就是当前的 onePost 的所有 data，包括：
    // postid: 1,
    // userid: 2,
    // username: 'Lin',
    // userp: 'https://www.google.com.hk/imgres?imgurl=https%3A%2F%2Fcdnb.artstation.com%2Fp%2Fassets%2Fcovers%2Fimages%2F016%2F220%2F089%2Flarge%2Fsupercell-art-spike-thumb.jpg%3F1551358928&imgrefurl=https%3A%2F%2Fwww.artstation.com%2Fartwork%2FW2GD82&tbnid=R9KbQs_huMiquM&vet=12ahUKEwibspSazJT3AhWTTPUHHc4KAFoQMygeegUIARCGAg..i&docid=UAXZCY8Nc8N0wM&w=400&h=400&q=brawl%20tar%20spike&ved=2ahUKEwibspSazJT3AhWTTPUHHc4KAFoQMygeegUIARCGAg',
    // email: null,
    // phone: null,
    // time: '20220415',
    // description: 'oooo',
    // locName: 'EOSC',
    // helper: null,    // helper 就是 username 的 string，因为 username 是 unique
    // reward: null,
    // plat: null,
    // plong: null,
    // postp: 'https://www.google.com.hk/imgres?imgurl=https%3A%2F%2Fimg.static-kl.com%2Fimages%2Fmedia%2FE5748AF4-1BCB-471C-80A9026F29053C92%3Faspect_ratio%3D1%3A1%26min_width%3D912&imgrefurl=https%3A%2F%2Fwww.klm.com%2Fdestinations%2Fua%2Fen%2Farticle%2Fplace-du-capitole-the-heart-of-the-city&tbnid=mH5eU0rMur03XM&vet=12ahUKEwjv48qHzZT3AhUvTPUHHaPmDUgQMygUegUIARDiAQ..i&docid=J-jgHZHTrVz6eM&w=960&h=960&q=place&ved=2ahUKEwjv48qHzZT3AhUvTPUHHaPmDUgQMygUegUIARDiAQ',
    // locp: 'https://www.google.com.hk/url?sa=i&url=https%3A%2F%2Fyou.ubc.ca%2Fubc_programs%2Fearth-ocean-sciences%2F&psig=AOvVaw2GrUhK5cII9x5-IASw9f5j&ust=1649872039626000&source=images&cd=vfe&ved=0CAcQjRxqFwoTCKDbvoeNj_cCFQAAAAAdAAAAABAD'

    function renderHelpButton() {
        // console.log('xx, tt', x, ThisUser, x.userid == ThisUser.id);
        // 是别人的 帖子：
        if (
            isOwnPost ||
            (x.helper != null &&
                x.helper !== '' &&
                x.helper !== ThisUser.username)
        ) {
            // console.log('别人的帖子，被 help 了');
            return null; // 这个帖子已经被别人 help 过了，不需要 render 按钮
        }
        return (
            <div>
                <button
                    onClick={() => {
                        handleHelp(IsHelped, x.postid).then((e) => {
                            setIsHelped(e);
                            if (e === true) {
                                // console.log('One post help set ', e);
                                x.helper = ThisUser.username;
                            } else {
                                // console.log('One post help set ', e);
                                x.helper = '';
                            }
                        });
                    }}
                >
                    {IsHelped ? 'Cancel Help' : 'Help'}
                </button>
            </div>
        );
    }
    function renderEditButton() {
        if (!isOwnPost) {
            return null;
        }
        return (
            <button
                onClick={() => {
                    toggleOpen(true);
                }}
            >
                Edit
            </button>
        );
    }
    function renderDeleteButton() {
        if (!isOwnPost) {
            return null;
        }
        return <button onClick={() => handleDelete(x.postid)}>Delete</button>;
    }
    // 是自己的帖子：

    return (
        <Fragment>
            <div>
                {isOwnPost && renderEditButton()}
                {isOwnPost && renderDeleteButton()}
                {!isOwnPost && renderHelpButton()}
                <div
                    className="one-post"
                    onClick={() => {
                        toggleOpen(true);
                    }}
                >
                    <h4>{'Location: ' + x.locName}</h4>
                    <p>{'Requester: ' + x.username}</p>
                    <p>{'Time: ' + x.time}</p>
                    <p>{'Description: ' + x.description}</p>
                    <p>{'Helper: ' + x.helper}</p>
                </div>
            </div>
            {
                <PostModal
                    ThisUser={ThisUser}
                    x={x}
                    isOwnPost={isOwnPost}
                    IsOpen={IsOpen}
                    toggleOpen={toggleOpen}
                    renderHelpButton={renderHelpButton}
                    renderDeleteButton={renderDeleteButton}
                    handleHelp={handleHelp}
                    handleSave={handleSave}
                    handleDelete={handleDelete}
                />
            }
        </Fragment>
    );
};

export default OnePost;
