import '../css/main.css';
import TopNav from '../TopNav/topNav';
import SideBar from '../SideBar/sideBar';
import Posts from '../Posts/posts';
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
        pageSize: 4,
        onPage: 1,
    });

    const [ThisUser, setThisUser] = useState({});
    const [PageData, setPageData] = useState([]); // 当前 page 的 posts
    const [CurrentPage, setCurrentPage] = useState(0);
    const [DisplayPage, setDisplayPage] = useState(0);
    const [TotalPage, setTotalPage] = useState(0);
    const [AllLocation, setAllLocation] = useState([]);
    const [MapViewOpen, setMapViewOpen] = useState(false);

    useEffect(() => {
        // console.log('Main Effect');
        setThisUser(LOCATION.state);
        // console.log('Location state This User:! ', LOCATION.state);
        // 这个 ThisUser 只能从 Login 或 Register 成功后，才会 set 这个 location
        // 所以，如果没有 login，直接跳到这个 /main 的 URL，ThisUser 是 null。
        // 所以需要回 Login 重新登录
        if (ThisUser == null) {
            throw 'user undefined !';
        }
        console.log('filter opt ', filterOption.current);
        loadUser(LOCATION.state.username);
        loadPosts();
        loadLocation();

        return () => {
            console.log('Main Page un mounting');
        };
    }, []);

    function loadUser(username) {
        axios({
            method: 'get',
            url: '/api/getuser',
            params: { username },
        }).then((e) => {
            console.log('Init This User:! ', LOCATION.state);
            setThisUser(e.data);
        });
    }

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
    function loadLocation() {
        axios({
            method: 'GET',
            url: 'api/getlocation',
        }).then((e) => {
            setAllLocation(e.data);
        });
    }

    return (
        <div className="all-container">
            <div className="grid-bx-1">
                <TopNav
                    AllLocation={AllLocation}
                    loadPosts={loadPosts}
                    filterOption={filterOption}
                    ThisUser={ThisUser}
                    MapViewOpen={MapViewOpen}
                    setMapViewOpen={setMapViewOpen}
                />
            </div>
            <div className="grid-bx-2">
                <SideBar
                    AllLocation={AllLocation}
                    ThisUser={ThisUser}
                    setThisUser={setThisUser}
                    loadPosts={loadPosts}
                    filterOption={filterOption}
                />
            </div>
            <div className="grid-bx-3">
                <Posts
                    PageData={PageData}
                    setPageData={setPageData}
                    AllLocation={AllLocation}
                    ThisUser={ThisUser}
                    loadPosts={loadPosts}
                    MapViewOpen={MapViewOpen}
                />
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
