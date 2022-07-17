import '../css/pagination.css';
import { useEffect, useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setPage } from '../Redux/Reducer/postReducer';
import { Button } from 'reactstrap';

const Pagination = ({
    loadPosts,
    CurrentPage,
    DisplayPage,
    setDisplayPage,
    TotalPage,
    setTotalPage,
    filterOption,
}) => {
    // console.log('Pagination Refresh');
    // const [RunEffect, setRunEffect] = useState(false);
    // const disp = useDispatch();
    // const setP = (p) => {
    //     disp(setPage(p));
    // };
    // const get = useSelector((state) => {
    //     return state.postReducer;
    // });
    // useEffect(() => {
    //     console.log('effect pagination ');
    //     loadPosts();
    // }, [RunEffect]);
    let inputRef = useRef();

    function goToPage(p) {
        if (p < 0) {
            p = 0;
        }
        if (p == CurrentPage) {
            return;
        }
        if (CurrentPage == 1 && p == 0) {
            return;
        }

        // 修改 redux 里面的 onPage 值，然后直接 call: loadPost()
        // console.log('before on page ', filterOption.current.onPage);
        // setP(p);
        filterOption.current.onPage = p;
        // console.log('pagi before run effect ', filterOption.current.onPage);

        // setRunEffect(!RunEffect);
        loadPosts();
    }

    return (
        <div className="pagination-main">
            <Button
                className="page-left"
                onClick={() => goToPage(CurrentPage - 1)}
            >
                Left
            </Button>
            <input
                className="page-input"
                ref={inputRef}
                value={DisplayPage}
                onChange={(e) => {
                    setDisplayPage(e.target.value);
                }}
                onKeyUp={(e) => {
                    if (e.key === 'Enter') {
                        goToPage(e.target.value);
                        inputRef.current.blur();
                    }
                    // console.log(e.target.value, e.key);
                }}
                onBlur={() => {
                    setDisplayPage(CurrentPage);
                }}
            />
            <Button
                className="page-right"
                onClick={() => goToPage(CurrentPage + 1)}
            >
                Right
            </Button>
            <div className="page-number">{CurrentPage + '/' + TotalPage}</div>
        </div>
    );
};

export default Pagination;
