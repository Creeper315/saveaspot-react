import '../css/post.css';
import OnePost2 from './onePost2';
import PostModalOther from './postModalOther';
import { useEffect, useState, Fragment } from 'react';
import axios from 'axios';
import { Button } from 'reactstrap';
import PostModalOwn from './postModalOwn';

const Posts2 = ({ PageData, setPageData, ThisUser, loadPosts }) => {
    window.pp = PageData;
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
                    renderHelpButton={renderHelpButton}
                    renderDeleteButton={renderDeleteButton}
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

    function renderHelpButton(idx) {
        let p = PageData[idx];
        if (p.userid === ThisUser.id) {
            // console.log('warning. helping own post ');
            return null;
        }
        let toHelp = true;
        let buttonName = '???';
        if (p.helper == null || p.helper == '') {
            buttonName = 'Help';
        } else {
            toHelp = false;
            buttonName = 'Cancel Help';
        }

        let click = () => {
            handleHelp(toHelp, p.postid).then((e) => {
                if (e.status === 200) {
                    console.log('here !');
                    if (toHelp) {
                        PageData[idx].helper = ThisUser.username;
                    } else {
                        PageData[idx].helper = '';
                    }
                    setPageData([...PageData]);
                }
            });
        };
        return <Button onClick={click}>{buttonName}</Button>;
    }

    function handleHelp(toHelp, postId) {
        return axios({
            method: 'POST',
            url: 'posthelp',
            data: { toHelp, postId }, // myId 在 server 的 req.info.id 里面，所以这里不用 pass 进去
        });
    }

    function renderDeleteButton(idx) {
        let p = PageData[idx];
        if (p.userid !== ThisUser.id) {
            // console.log('warning. deleting other ppl"s post');
            return null;
        }
        let click = () => {
            console.log('delete called');
            handleDelete(p.postid);
        };
        return <Button onClick={click}>Delete</Button>;
    }

    function handleDelete(postId) {
        // 如果 delete 成功，就 call loadPosts()
        return axios({
            method: 'post',
            url: 'postdelete',
            data: { postId },
        }).then((e) => {
            if (e.status === 200) {
                loadPosts();
            }
        });
    }

    function whichModal() {
        if (ActiveIdx == null) {
            return null;
        }
        if (PageData[ActiveIdx] == null) {
            console.log('err. no such post');
        }
        if (PageData[ActiveIdx].userid == ThisUser.id) {
            return (
                <PostModalOwn
                    PageData={PageData}
                    setPageData={setPageData}
                    ModalOpen={ModalOpen}
                    toCloseModal={toCloseModal}
                    ActiveIdx={ActiveIdx} // this is one-post 's key, the index in PostData !
                    renderDeleteButton={renderDeleteButton}
                />
            );
        } else {
            return (
                <PostModalOther
                    PageData={PageData}
                    ModalOpen={ModalOpen}
                    toCloseModal={toCloseModal}
                    ActiveIdx={ActiveIdx} // this is one-post 's key, the index in PostData !
                    renderHelpButton={renderHelpButton}
                />
            );
        }
    }

    return (
        <Fragment>
            <div className="post-container">{renderPost()}</div>
            {whichModal()}
        </Fragment>
    );
};

export default Posts2;
