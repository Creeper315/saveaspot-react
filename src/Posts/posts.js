import '../css/post.css';
import OnePost from './onePost';
import { useEffect, useState, Fragment } from 'react';
import axios from 'axios';

const Posts = ({ PageData, ThisUser, loadPosts }) => {
    function renderPost() {
        if (PageData === undefined || PageData.length === 0) {
            return null;
        }
        return PageData.map((e, idx) => {
            return (
                <OnePost
                    x={e}
                    ThisUser={ThisUser}
                    key={idx}
                    handleHelp={handleHelp}
                    handleSave={handleSave}
                    handleDelete={handleDelete}
                />
            );
        });
    }

    function handleHelp(isHelped, postId) {
        let toHelp = !isHelped; // 如果 post 已经被 help 了，isHelped == true, 那么就要取消 help，toHelp = false == !isHelped
        return axios({
            method: 'POST',
            url: 'posthelp',
            data: { toHelp, postId }, // myId 在 server 的 req.info.id 里面，所以这里不用 pass 进去
        })
            .then((e) => {
                if (e.status === 200) {
                    return toHelp;
                }
            })
            .catch((e) => {
                return 'error !';
            });
    }

    function handleSave(isSaved, postId) {
        let toSave = !isSaved;
        return axios({
            method: 'POST',
            url: 'postsave',
            data: { toSave, postId }, // myId 在 server 的 req.info.id 里面，所以这里不用 pass 进去
        })
            .then((e) => {
                if (e.status === 200) {
                    return toSave;
                }
            })
            .catch((e) => {
                return 'error !';
            });
    }

    function handleDelete(postId) {
        // 如果 delete 成功，就 call loadPosts()
        axios({
            method: 'post',
            url: 'postdelete',
            data: { postId },
        }).then((e) => {
            if (e.status === 200) {
                loadPosts();
            }
        });
    }

    return (
        <Fragment>
            <div className="post-container">{renderPost()}</div>
        </Fragment>
    );
};

export default Posts;
