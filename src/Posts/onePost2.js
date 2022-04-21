import { useEffect, useState, Fragment } from 'react';
import { Button } from 'reactstrap';

const OnePost2 = ({
    PageData,
    kk,
    ThisUser,
    renderHelpButton,
    renderDeleteButton,
    toOpenModal,
}) => {
    // console.log('one post 2 ', PageData, kk);
    function renderEditButton() {
        if (PageData[kk].userid !== ThisUser.id) {
            return null;
        }
        return <Button onClick={() => toOpenModal(kk)}>Edit</Button>;
    }
    return (
        <Fragment>
            <div>
                {renderHelpButton(kk)}
                {renderEditButton()}
                {renderDeleteButton(kk)}
                <div
                    className="one-post"
                    onClick={() => {
                        console.log('open modal idx ', kk);
                        toOpenModal(kk);
                    }}
                >
                    <h4>{'Location: ' + PageData[kk].locName}</h4>
                    <p>{'Requester: ' + PageData[kk].username}</p>
                    <p>{'Time: ' + PageData[kk].time}</p>
                    <p>{'Description: ' + PageData[kk].description}</p>
                    <p>{'Helper: ' + PageData[kk].helper}</p>
                </div>
            </div>
        </Fragment>
    );
};

export default OnePost2;
