import { Fragment } from 'react';
import ToggleSwitch from '../SideBar/toggleSwitch';
import { BsFillBookmarkCheckFill } from 'react-icons/bs';
import { ImEnter } from 'react-icons/im';
import { RiDeleteBin5Line } from 'react-icons/ri';
import { BiSave } from 'react-icons/bi';
import { FaMapMarkedAlt, FaWindowClose } from 'react-icons/fa';
import { GrMap } from 'react-icons/gr';
import { Button } from 'reactstrap';

const ModalSide = ({
    p,
    isOtherPost,
    toCloseModal,
    clickFavorite,
    IsFavorite,
    clickJoin,
    MapViewOpen,
    SeeMap,
    setSeeMap,
    clickSave,
    clickDelete, // Delete function 里面需要 pass 进去 p, p 就是当前的 one post data
}) => {
    function ifOthers() {
        return (
            <Fragment>
                <div className="modal-side-cover" onClick={() => clickJoin(p)}>
                    <ToggleSwitch
                        getClass={() => {
                            if (p.btn === 'Join') {
                                return '';
                            }
                            if (p.btn === 'Leave') {
                                return ' is-active';
                            }
                        }}
                    />
                    <div className="modal-side-mask">
                        <div
                            className={
                                'modal-side-btn' +
                                (p.btn === 'Leave' ? ' is-active' : '')
                            }
                        >
                            <div className="modal-side-icon">
                                <ImEnter />
                            </div>
                            <span>Join</span>
                        </div>
                    </div>
                </div>

                <div className="modal-side-cover" onClick={clickFavorite}>
                    <ToggleSwitch
                        getClass={() => {
                            return IsFavorite ? ' is-active' : '';
                        }}
                    />
                    <div className="modal-side-mask">
                        <div
                            className={
                                'modal-side-btn' +
                                (IsFavorite ? ' is-active' : '')
                            }
                        >
                            <div className="modal-side-icon">
                                <BsFillBookmarkCheckFill />
                            </div>
                            <span>Favorite</span>
                            {/* <span>
                                {IsFavorite
                                    ? 'Remove Favorite'
                                    : 'Add Favorite'}
                            </span> */}
                        </div>
                    </div>
                </div>
                {!MapViewOpen && (
                    <div
                        className="modal-side-cover"
                        onClick={() => {
                            setSeeMap(!SeeMap);
                        }}
                    >
                        <div className="modal-side-mask">
                            <div
                                className={
                                    'modal-side-btn' +
                                    (SeeMap ? ' is-active' : '')
                                }
                            >
                                <div className="modal-side-icon">
                                    <GrMap />
                                </div>

                                <span>Map</span>
                            </div>
                        </div>
                    </div>
                )}

                <div className="modal-side-cover" onClick={toCloseModal}>
                    <div className="modal-side-mask">
                        <div className="modal-side-btn">
                            <div className="modal-side-icon">
                                <FaWindowClose />
                            </div>
                            <span>Close</span>
                        </div>
                    </div>
                </div>

                {/* <button onClick={toCloseModal}>Close</button> */}
            </Fragment>
        );
    }

    function ifOwn() {
        return (
            <Fragment>
                <Button
                    onClick={clickSave}
                    className="modal-side-cover"
                    variant="secondary"
                >
                    Save
                </Button>
                <Button
                    onClick={() => {
                        clickDelete(p, toCloseModal);
                    }}
                    className="modal-side-cover"
                    variant="danger"
                >
                    Delete
                </Button>
                <Button onClick={toCloseModal} className="modal-side-cover">
                    Close
                </Button>
            </Fragment>
        );
    }

    return (
        <div className="modal-side-contain">
            {isOtherPost ? ifOthers() : ifOwn()}
        </div>
    );
};

export default ModalSide;
