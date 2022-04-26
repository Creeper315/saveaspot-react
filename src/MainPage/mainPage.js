import '../css/main.css';
import TopNav from '../TopNav/topNav';
import SideBar from '../SideBar/sideBar';
import Posts2 from '../Posts/posts2';
import Pagination from '../Pagination/pagination';
// import TestRedux from './testRedux';
import { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';

import axios from 'axios';
import { heroku } from '../App';

const MainPage = () => {
    const LOCATION = useLocation();
    // const filterOption = useSelector((state) => {
    //     return state.postReducer;
    // });
    const filterOption = useRef({
        listLocation: [],
        userId: null,
        myId: null,
        saved: false,
        helpedByMe: false,
        ownPost: false,
        pageSize: 3,
        onPage: 1,
    });
    // filterOption.current = {
    //     listLocation: [],
    //     userId: null,
    //     myId: null,
    //     saved: false,
    //     helpedByMe: false,
    //     ownPost: false,
    //     pageSize: 3,
    //     onPage: 1,
    // };
    const [ThisUser, setThisUser] = useState({});
    const [PageData, setPageData] = useState([]); // 当前 page 的 posts
    const [CurrentPage, setCurrentPage] = useState(0);
    const [DisplayPage, setDisplayPage] = useState(0);
    const [TotalPage, setTotalPage] = useState(0);

    useEffect(() => {
        // console.log('Main Effect');
        // window.tt = ThisUser;
        setThisUser(LOCATION.state);
        console.log('This User:! ', LOCATION.state);
        filterOption.current.myId = LOCATION.state.id;
        // 这个 ThisUser 只能从 Login 或 Register 成功后，才会 set 这个 location
        // 所以，如果没有 login，直接跳到这个 /main 的 URL，ThisUser 是 null。
        // 所以需要回 Login 重新登录
        if (ThisUser == null) {
            throw 'user undefined !';
        }
        console.log('filter opt ', filterOption.current);
        loadPosts();
        return () => {
            console.log('Main Page un mounting');
        };
    }, []);

    function loadPosts() {
        // console.log('start load post ', filterOption.current);
        axios({
            method: 'post',
            url: heroku + 'getpost',
            data: filterOption.current,
        })
            .then((e) => {
                // console.log('load then', e.data.onPage, e.data.totalPage);
                setPageData(e.data.pageData);
                setCurrentPage(e.data.onPage);
                setDisplayPage(e.data.onPage);
                setTotalPage(e.data.totalPage);
                // console.log('End load post ', e.data.pageData);
            })
            .catch((e) => {
                console.log('catch load err ', e, e.response);
            });
    }

    return (
        <div className="all-container">
            <div className="grid-bx-1">
                <button
                    onClick={() => console.log(filterOption.current)}
                    style={{ position: 'absolute' }}
                >
                    Show ref
                </button>
                <TopNav
                    loadPosts={loadPosts}
                    filterOption={filterOption}
                    ThisUser={ThisUser}
                />
            </div>
            <div className="grid-bx-2">
                <SideBar ThisUser={ThisUser} setThisUser={setThisUser} />
            </div>
            <div className="grid-bx-3">
                <Posts2
                    PageData={PageData}
                    setPageData={setPageData}
                    ThisUser={ThisUser}
                    loadPosts={loadPosts}
                />
                {/* <TestRedux /> */}
            </div>
            <div className="grid-bx-4">
                <Pagination
                    loadPosts={loadPosts}
                    CurrentPage={CurrentPage}
                    DisplayPage={DisplayPage}
                    setDisplayPage={setDisplayPage}
                    TotalPage={TotalPage}
                    setTotalPage={setTotalPage}
                    filterOption={filterOption}
                />
            </div>
        </div>
    );
};

export default MainPage;
