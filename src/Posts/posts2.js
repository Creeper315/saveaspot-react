import '../css/post.css';
import OnePost2 from './onePost2';
import PostModalOther from './postModalOther';
import { useEffect, useState, Fragment } from 'react';
import axios from 'axios';
import { Button } from 'reactstrap';
import PostModalOwn from './postModalOwn';

const Posts2 = ({ PageData, setPageData, ThisUser, loadPosts }) => {
    // window.pp = PageData;
    const [ActiveIdx, setActiveIdx] = useState(null);
    const [ModalOpen, setModalOpen] = useState(false);

    function renderPost() {
        if (PageData === undefined || PageData.length === 0) {
            return null;
        }
        return PageData.map((e, idx) => {
            return (
                <OnePost2
                    PageData={PageData}
                    setPageData={setPageData}
                    key={idx}
                    kk={idx}
                    ThisUser={ThisUser}
                    getJoinBtn={getJoinBtn}
                    getDeleteBtn={getDeleteBtn}
                    getEditBtn={getEditBtn}
                    toOpenModal={toOpenModal}
                />
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
                console.log('join then ', e);
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
    function getDeleteBtn(idx) {
        let p = PageData[idx];
        if (p.username !== ThisUser.username) {
            return null;
        }
        let click = () => {
            console.log('delete called', p);
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
            console.log('err. no such post');
        }
        console.log('-- ', PageData[ActiveIdx], ThisUser.username);
        if (PageData[ActiveIdx].username === ThisUser.username) {
            return (
                <PostModalOwn
                    PageData={PageData}
                    setPageData={setPageData}
                    ModalOpen={ModalOpen}
                    toCloseModal={toCloseModal}
                    ActiveIdx={ActiveIdx} // this is one-post 's key, the index in PostData !
                    getDeleteBtn={getDeleteBtn}
                />
            );
        } else {
            console.log('over here');
            return (
                <PostModalOther
                    PageData={PageData}
                    ModalOpen={ModalOpen}
                    toCloseModal={toCloseModal}
                    ActiveIdx={ActiveIdx} // this is one-post 's key, the index in PostData !
                    getJoinBtn={getJoinBtn}
                />
            );
        }
    }

    return (
        <Fragment>
            <div className="post-container">{renderPost()}</div>
            {ActiveIdx !== null && whichModal()}
        </Fragment>
    );
};

export default Posts2;
