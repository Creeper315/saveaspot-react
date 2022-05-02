import { useEffect, useState, Fragment } from 'react';
import { Button } from 'reactstrap';

const OnePost2 = ({
    PageData,
    kk,
    ThisUser,
    getJoinBtn,
    getDeleteBtn,
    getEditBtn,
    toOpenModal,
}) => {
    // console.log('one post 2 ', PageData, kk);
    // function getBtn(){
    //     if (PageData[kk].username === ThisUser.username){
    //         // Own post
    //         return <Fragment>
    //             {}
    //         </Fragment>
    //     }
    // }
    return (
        <Fragment>
            <div>
                {getJoinBtn(kk)}
                {getEditBtn(kk)}
                {getDeleteBtn(kk)}
                <div
                    className="one-post"
                    onClick={() => {
                        // console.log('open modal idx ', kk);
                        toOpenModal(kk);
                    }}
                >
                    <h4>{'Location: ' + PageData[kk].locname}</h4>
                    <p>{'Requester: ' + PageData[kk].username}</p>
                    <p>{'Time: ' + PageData[kk].time}</p>
                    <p>{'Description: ' + PageData[kk].description}</p>
                    <p>{'Activity: ' + PageData[kk].activity}</p>
                    <p>
                        {'Joiner: ' +
                            PageData[kk].curppl +
                            ' / ' +
                            PageData[kk].maxppl}
                    </p>
                </div>
            </div>
        </Fragment>
    );
};

export default OnePost2;
