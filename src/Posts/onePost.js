import { useEffect, useState, Fragment } from 'react';
import { Button } from 'reactstrap';
import { BsFillPersonLinesFill } from 'react-icons/bs';
import { IoMdTime } from 'react-icons/io';
import { MdPlace } from 'react-icons/md';
import { FcSportsMode } from 'react-icons/fc';

const OnePost = ({
    PageData,
    kk,
    ThisUser,
    getJoinBtn,
    getDeleteBtn,
    getEditBtn,
    toOpenModal,
}) => {
    /* {getJoinBtn(kk)}
                {getEditBtn(kk)}
                {getDeleteBtn(kk)} */

    return (
        <div
            className="one-post"
            onClick={() => {
                toOpenModal(kk);
            }}
        >
            <div className="one-post-line">
                <div>
                    <MdPlace />
                </div>
                <span>{PageData[kk].locname}</span>
            </div>
            <div className="one-post-line">
                <div>
                    <BsFillPersonLinesFill />
                </div>
                <span>{PageData[kk].username}</span>
            </div>
            <div className="one-post-line">
                <div>
                    <FcSportsMode />
                </div>

                <span>{PageData[kk].activity}</span>
            </div>
            <div className="one-post-line">
                <div>
                    <IoMdTime />
                </div>

                <span>{PageData[kk].time}</span>
            </div>
            <div className="one-post-line">
                <span>
                    {'Joiners: ' +
                        PageData[kk].curppl +
                        ' / ' +
                        PageData[kk].maxppl}
                </span>
            </div>
        </div>
    );
};

export default OnePost;
