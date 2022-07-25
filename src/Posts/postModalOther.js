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
    const [Email, setEmail] = useState('');
    const [Phone, setPhone] = useState('');
    const [Profile, setProfile] = useState('');

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
        axios({
            method: 'get',
            url: '/api/getuser',
            params: { username: p.username },
        }).then((e) => {
            if (e.status === 200) {
                // console.log('nm', e.data);
                setEmail(e.data.email || '...');
                setPhone(e.data.phone || '...');
                setProfile(
                    e.data.userpic ||
                        'https://www.gamehelper.top/wp-content/uploads/2020/06/spike-brawl-stars-guide.jpg'
                );
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
                locpic={p.locpic}
                lat={p.lat}
                long={p.long}
            />
            <div className="modal-profile">
                <img
                    style={{ width: '100px', height: '100px' }}
                    src={Profile}
                    alt={'user profile'}
                ></img>
                <h4>{p.username}</h4>
            </div>
            <ModalBody style={modalBodyStyle}>
                <Form>
                    <FormGroup>
                        <Label>Location</Label>
                        <Input value={p.locname} readOnly />
                    </FormGroup>
                    <FormGroup>
                        <Label>Activity</Label>
                        <Input value={p.activity} readOnly />
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
                        <Input value={Email} readOnly />
                    </FormGroup>
                    <FormGroup>
                        <Label>Phone</Label>
                        <Input value={Phone} readOnly />
                    </FormGroup>
                </Form>
                {/* <img src={p.locp} alt={'location '}></img> */}
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
