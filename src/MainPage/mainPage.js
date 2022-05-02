import '../css/main.css';
import TopNav from '../TopNav/topNav';
import SideBar from '../SideBar/sideBar';
import Posts2 from '../Posts/posts2';
import Pagination from '../Pagination/pagination';
import { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

import axios from 'axios';

const MainPage = () => {
    // console.log('Main Page render');
    const LOCATION = useLocation();
    const filterOption = useRef({
        listLocation: [],
        listActivity: [],
        isUpcoming: false,
        isSaved: false,
        pageSize: 3,
        onPage: 1,
    });
    // const filterOption = useRef({
    //     listLocation: [],
    //     userId: null,
    //     myId: null,
    //     saved: false,
    //     helpedByMe: false,
    //     ownPost: false,
    //     pageSize: 3,
    //     onPage: 1,
    // });
    const [ThisUser, setThisUser] = useState({});
    const [PageData, setPageData] = useState([]); // 当前 page 的 posts
    const [CurrentPage, setCurrentPage] = useState(0);
    const [DisplayPage, setDisplayPage] = useState(0);
    const [TotalPage, setTotalPage] = useState(0);

    useEffect(() => {
        // console.log('Main Effect');
        setThisUser(LOCATION.state);
        console.log('set This User:! ', LOCATION.state);
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
            url: 'api/getpost',
            data: filterOption.current,
        })
            .then((e) => {
                // console.log('load then');
                let listP = e.data.pageData;
                // listP = listP.map((e) => {
                //     return { ...e, btn: 'Join' };
                // });
                setPageData(listP);
                setCurrentPage(e.data.onPage);
                setDisplayPage(e.data.onPage);
                setTotalPage(e.data.totalPage);
                // console.log('End load post ');
            })
            .catch((e) => {
                console.log('catch load err ', e, e.response);
            });
    }

    // function loadUpcoming() {
    //     axios({
    //         method: 'post',
    //         url: '/api/myupcoming',
    //         data: filterOption.current,
    //         //拿所有我已经 join 的，和我创建的 post
    //         // 如果 post 是 join 的，那 Button 就全初始为 Leave ！
    //     }).then((e) => {
    //         let listP = e.data.pageData;
    //         listP = listP.map((e) => {
    //             return { ...e, btn: 'Leave' };
    //         });
    //         setPageData(listP);
    //         setCurrentPage(e.data.onPage);
    //         setDisplayPage(e.data.onPage);
    //         setTotalPage(e.data.totalPage);
    //     });
    // }

    // function loadSaved() {
    //     axios({
    //         method: 'post',
    //         url: '/api/getsaved',
    //         data: filterOption.current,
    //     }).then((e) => {
    //         let listP = e.data.pageData;
    //         setPageData(listP);
    //         setCurrentPage(e.data.onPage);
    //         setDisplayPage(e.data.onPage);
    //         setTotalPage(e.data.totalPage);
    //     });
    // }

    return (
        <div className="all-container">
            <div className="grid-bx-1">
                {/* <button
                    onClick={() => console.log(filterOption.current)}
                    style={{ position: 'absolute' }}
                >
                    Show ref
                </button> */}
                <TopNav
                    loadPosts={loadPosts}
                    filterOption={filterOption}
                    ThisUser={ThisUser}
                />
            </div>
            <div className="grid-bx-2">
                <SideBar
                    ThisUser={ThisUser}
                    setThisUser={setThisUser}
                    loadPosts={loadPosts}
                    filterOption={filterOption}
                />
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
