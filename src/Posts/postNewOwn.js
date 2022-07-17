import { Modal, ModalHeader, ModalFooter, ModalBody, Button } from 'reactstrap';
import { Form, FormGroup, Input, Label } from 'reactstrap';
import { useEffect, useState, Fragment, useRef } from 'react';
// import { Wrapper, Status } from '@googlemaps/react-wrapper';
import axios from 'axios';
import ModalSide from './modalSide';
import ModalMap from './modalMap';

const PostModalOther = ({
    PageData,
    ModalOpen,
    MapViewOpen,
    toCloseModal,
    ActiveIdx,
    clickJoin,
}) => {
    const isOtherPost = true;
    const p = PageData[ActiveIdx];
    // const thisLocation = AllLocation.find((e) => e.locname === p.locname);

    // console.log('p is ', p);
    const [IsFavorite, setIsFavorite] = useState(false);
    const [SeeMap, setSeeMap] = useState(false);
    const Lat = useRef(0);
    const Lng = useRef(0);

    useEffect(() => {
        axios({
            method: 'post',
            url: '/api/checksaved',
            data: { postid: p.id },
        }).then((e) => {
            if (e.status === 200) {
                setIsFavorite(e.data);
            }
        });
    }, []);

    function clickFavorite() {
        axios({
            method: 'POST',
            url: 'api/postsave',
            data: { toSave: !IsFavorite, postid: p.id }, // myId 在 server 的 req.info.id 里面，所以这里不用 pass 进去
        }).then((e) => {
            if (e.status === 200) {
                setIsFavorite(!IsFavorite);
            }
        });
    }

    // const modalBodyStyle = { overflow: 'scroll', maxHeight: '55vh' };
    const modalBodyStyle = {};

    return (
        <Modal
            isOpen={ModalOpen}
            toggle={toCloseModal}
            style={{
                transform: 'translateX(-10vw)',
                maxHeight: '90vh',
                // overflow: 'hidden',
            }}
        >
            <ModalSide
                {...{
                    p,
                    isOtherPost,
                    toCloseModal,
                    clickFavorite,
                    IsFavorite,
                    clickJoin,
                    MapViewOpen,
                    SeeMap,
                    setSeeMap,
                }}
            />
            <ModalHeader toggle={toCloseModal}>Event</ModalHeader>
            <ModalMap
                SeeMap={SeeMap}
                locpic={p.locp}
                lat={p.lat}
                long={p.long}
            />
            <div className="modal-profile">
                <img
                    style={{ width: '100px', height: '100px' }}
                    src={
                        'https://www.gamehelper.top/wp-content/uploads/2020/06/spike-brawl-stars-guide.jpg'
                    }
                    alt={'user profile'}
                ></img>
                <h4>{p.username}</h4>
            </div>
            {/* <ModalBody>
                <img
                    style={{ width: '100px', height: '100px' }}
                    src={
                        'https://www.gamehelper.top/wp-content/uploads/2020/06/spike-brawl-stars-guide.jpg'
                    }
                    alt={'user profile'}
                ></img>
                <FormGroup>
                    <Label>Username</Label>
                    <Input value={p.username} readOnly />
                </FormGroup>
            </ModalBody> */}
            <ModalBody style={modalBodyStyle}>
                <Form>
                    <FormGroup>
                        <Label>Location</Label>
                        <Input value={p.locname} readOnly />
                    </FormGroup>
                    <FormGroup>
                        <Label>Time</Label>
                        <Input value={p.time} readOnly />
                    </FormGroup>
                    <FormGroup>
                        <Label>Description</Label>
                        <Input value={p.description} readOnly />
                    </FormGroup>
                    <FormGroup>
                        <Label>Email</Label>
                        <Input value={p.email} readOnly />
                    </FormGroup>
                    <FormGroup>
                        <Label>Phone</Label>
                        <Input value={p.phone} readOnly />
                    </FormGroup>
                    <FormGroup>
                        <Label>Reward</Label>
                        <Input value={p.reward} readOnly />
                    </FormGroup>
                    <FormGroup>
                        <Label>Helper</Label>
                        <Input value={p.helper} readOnly />
                    </FormGroup>
                </Form>
                <img src={p.locp} alt={'location '}></img>
                <img src={p.postp} alt={'seat detail '}></img>
            </ModalBody>
            {/* <ModalFooter>
                {getJoinBtn(ActiveIdx)}
                {renderAddSavedButton()}
                <Button onClick={toCloseModal}>Close</Button>
            </ModalFooter> */}
        </Modal>
    );
};

export default PostModalOther;
