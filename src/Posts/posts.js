import '../css/post.css';
import OnePost from './onePost';
import PostModalOther from './postModalOther';
import { useEffect, useState, Fragment } from 'react';
import axios from 'axios';
import { Button } from 'reactstrap';
import PostModalOwn from './postModalOwn';
import MainMap from './mainMap';
import '../sass/modal-side-btn.scss';
import '../sass/modal.scss';

const Posts = ({
    PageData,
    setPageData,
    AllLocation,
    ThisUser,
    loadPosts,
    MapViewOpen,
}) => {
    // window.pp = PageData;
    const [ActiveIdx, setActiveIdx] = useState(null);
    const [ModalOpen, setModalOpen] = useState(false);

    function renderPost() {
        if (PageData === undefined || PageData.length === 0) {
            return null;
        }
        return PageData.map((e, idx) => {
            return (
                <div className="one-post-contain" key={idx}>
                    <OnePost
                        PageData={PageData}
                        setPageData={setPageData}
                        kk={idx}
                        ThisUser={ThisUser}
                        getJoinBtn={getJoinBtn}
                        getDeleteBtn={getDeleteBtn}
                        getEditBtn={getEditBtn}
                        toOpenModal={toOpenModal}
                    />
                </div>
            );
        });
    }

    function toOpenModal(index) {
        setActiveIdx(index);
        setModalOpen(true);
    }
    function toCloseModal() {
        setActiveIdx(null);
        setModalOpen(false);
    }

    // function ren
    function clickJoin(p) {
        let postid = p.id;
        let curppl = p.curppl;
        let toJoin = p.btn === 'Join';
        axios({
            method: 'post',
            url: '/api/userjoin',
            data: { postid, curppl, toJoin },
        }).then((e) => {
            // console.log('join then ', e);
            if (e.status === 200) {
                if (toJoin) {
                    p.btn = 'Leave';
                    p.curppl++;
                } else {
                    p.btn = 'Join';
                    p.curppl--;
                }
                setPageData([...PageData]);
            }
        });
    }

    function getJoinBtn(idx) {
        let p = PageData[idx];
        if (p.username === ThisUser.username) {
            return null;
        }
        let click = () => {
            let postid = p.id;
            let curppl = p.curppl;
            let toJoin = p.btn === 'Join';
            axios({
                method: 'post',
                url: '/api/userjoin',
                data: { postid, curppl, toJoin },
            }).then((e) => {
                // console.log('join then ', e);
                if (e.status === 200) {
                    if (toJoin) {
                        PageData[idx].btn = 'Leave';
                        PageData[idx].curppl++;
                    } else {
                        PageData[idx].btn = 'Join';
                        PageData[idx].curppl--;
                    }
                    setPageData([...PageData]);
                }
            });
        };
        return <Button onClick={click}>{p.btn}</Button>;
    }

    function getEditBtn(idx) {
        if (PageData[idx].username !== ThisUser.username) {
            return null;
        }
        return <Button onClick={() => toOpenModal(idx)}>Edit</Button>;
    }

    function clickDelete(p, closeModalFun) {
        let ok = window.confirm('Sure to delete ?');
        if (!ok) return;

        axios({
            method: 'post',
            url: '/api/postdelete',
            data: { postid: p.id },
        })
            .then((e) => {
                if (e.status === 200) {
                    loadPosts();
                    if (closeModalFun) closeModalFun();
                }
            })
            .catch((e) => {
                alert('delete failed, error: ', e);
            });
    }

    function getDeleteBtn(idx) {
        let p = PageData[idx];
        if (p.username !== ThisUser.username) {
            return null;
        }
        let click = () => {
            // console.log('delete called', p);
            axios({
                method: 'post',
                url: '/api/postdelete',
                data: { postid: p.id },
            }).then((e) => {
                if (e.status === 200) {
                    loadPosts();
                }
            });
        };
        return <Button onClick={click}>Delete</Button>;
    }

    function whichModal() {
        if (ActiveIdx == null) {
            return null;
        }
        if (PageData[ActiveIdx] == null) {
            // console.log('!!! err. no such post');
        }
        // console.log(
        //     'this post data-- my username',
        //     PageData[ActiveIdx],
        //     ThisUser.username
        // );
        // console.log(PageData[ActiveIdx].username, ThisUser.username);
        if (PageData[ActiveIdx].username === ThisUser.username) {
            return (
                <PostModalOwn
                    PageData={PageData}
                    setPageData={setPageData}
                    ModalOpen={ModalOpen}
                    MapViewOpen={MapViewOpen}
                    toCloseModal={toCloseModal}
                    ActiveIdx={ActiveIdx} // this is one-post 's key, the index in PostData !
                    clickDelete={clickDelete}
                    AllLocation={AllLocation}
                />
            );
        } else {
            return (
                <PostModalOther
                    PageData={PageData}
                    setPageData={setPageData}
                    ModalOpen={ModalOpen}
                    MapViewOpen={MapViewOpen}
                    toCloseModal={toCloseModal}
                    ActiveIdx={ActiveIdx} // this is one-post 's key, the index in PostData !
                    clickJoin={clickJoin}
                />
            );
        }
    }

    return (
        <div className="post-container">
            {MapViewOpen && (
                <MainMap
                    AllLocation={AllLocation}
                    toOpenModal={toOpenModal}
                    PageData={PageData}
                />
            )}
            {!MapViewOpen && renderPost()}
            {ActiveIdx !== null && whichModal()}
        </div>
    );
};

export default Posts;
