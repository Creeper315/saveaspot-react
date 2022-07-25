import { Modal, ModalHeader, ModalFooter, ModalBody, Button } from 'reactstrap';
import { Form, FormGroup, Input, Label } from 'reactstrap';
import { useEffect, useState, Fragment } from 'react';
// import { Wrapper, Status } from '@googlemaps/react-wrapper';
import SingleMap from './singleMap';
import axios from 'axios';
import ModalSide from './modalSide';
import ModalMap from './modalMap';

const PostModalOwn = ({
    // 可以 Edit, Delete, Close, ViewMap
    PageData,
    setPageData,
    ModalOpen,
    MapViewOpen,
    toCloseModal,
    ActiveIdx,
    clickDelete,
    ThisUser,
}) => {
    const isOtherPost = false;
    const p = PageData[ActiveIdx];
    // console.log('whats p ', p);
    // const [username, setusername] = useState(p.username);
    const [locname, setlocname] = useState(p.locname);
    const [time, settime] = useState(p.time);
    const [description, setdescription] = useState(p.description);
    const [email, setemail] = useState('');
    const [phone, setphone] = useState('');
    const [MapOpen, setMapOpen] = useState(false);

    const [SeeMap, setSeeMap] = useState(false);

    useEffect(() => {
        // get * from user where username = p.username
        // console.log('here !');
        // axios({
        //     method: 'get',
        //     url: '/api/getuser',
        //     params: { username: p.username },
        // }).then((e) => {
        //     // console.log('???', e.data);
        //     setemail(e.data.email);
        //     setphone(e.data.phone);
        // });
    }, []);

    function toggleMap(bool) {
        if (bool === true || bool === false) {
            setMapOpen(bool);
        }
        setMapOpen(!MapOpen);
    }

    function newUpdateObj() {
        let r = {};
        r.postid = p.id;
        // r.userid = p.userid;
        r.time = time;
        r.description = description;
        r.locname = locname;
        let u = {};
        // u.id = p.userid;
        u.email = email;
        u.phone = phone;
        return { postObj: r, userObj: u };
    }

    function clickSave() {
        axios({
            method: 'post',
            url: 'api/postedit',
            data: newUpdateObj(),
        }).then((e) => {
            // console.log('here we are', e.status);
            if (e.status === 200) {
                // Also, modify PostData at ActiveIdx
                p.locname = locname;
                p.time = time;
                p.description = description;
                // console.log('new p', p);
                PageData[ActiveIdx] = { ...p };
                setPageData([...PageData]);
                toCloseModal();
            }
        });
    }

    return (
        <Modal isOpen={ModalOpen} toggle={toCloseModal}>
            <ModalSide
                {...{
                    p,
                    isOtherPost,
                    toCloseModal,
                    MapViewOpen,
                    SeeMap,
                    setSeeMap,
                    clickSave,
                    clickDelete,
                }}
            />
            <ModalHeader toggle={toCloseModal}>Event</ModalHeader>
            {/* <ModalMap
                SeeMap={SeeMap}
                locpic={p.locp}
                lat={p.lat}
                long={p.long}
            /> */}
            {/* {!MapViewOpen && <SingleMap zoom={17} />} */}
            <ModalBody>
                <div
                    style={{
                        width: '100%',
                        textAlign: 'center',
                        marginBottom: '10px',
                    }}
                >
                    <img
                        style={{
                            width: '100px',
                            height: '100px',
                            borderRadius: '20px',
                        }}
                        src={
                            ThisUser.userpic ||
                            'https://www.gamehelper.top/wp-content/uploads/2020/06/spike-brawl-stars-guide.jpg'
                        }
                        alt={'user profile'}
                    ></img>
                </div>

                <Form>
                    {/* <FormGroup>
                        <Label>Username</Label>
                        <Input
                            value={username}
                            onChange={(e) => setusername(e.target.value)}
                        />
                    </FormGroup> */}
                    <FormGroup>
                        <Label>Location</Label>
                        <Input
                            value={locname || ''}
                            onChange={(e) => setlocname(e.target.value)}
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label>Time</Label>
                        <Input
                            value={time || ''}
                            onChange={(e) => settime(e.target.value)}
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label>Description</Label>
                        <Input
                            value={description || ''}
                            onChange={(e) => setdescription(e.target.value)}
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label>Email</Label>
                        <Input
                            readOnly
                            // value={email || ''}
                            value={ThisUser.email || '...'}
                            onChange={(e) => setemail(e.target.value)}
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label>Phone</Label>
                        <Input
                            readOnly
                            // value={phone || ''}
                            value={ThisUser.phone || '...'}
                            onChange={(e) => setphone(e.target.value)}
                        />
                    </FormGroup>
                </Form>
                {/* <img src={p.locp} alt={'location '}></img> */}
            </ModalBody>
            {/* <ModalFooter>
                {
                    // Buttons goes here
                }
                {MapOpen && (
                    <Modal
                        className="map-container"
                        isOpen={MapOpen}
                        toggle={toggleMap}
                    >
                        <ModalHeader toggle={toggleMap}>
                            <SingleMap locname={p.locname} />
                        </ModalHeader>
                    </Modal>
                )}
                {renderSaveEditButton()}
                {getDeleteBtn(ActiveIdx)}
                <Button onClick={toCloseModal}>CLose</Button>
            </ModalFooter> */}
        </Modal>
    );
};

export default PostModalOwn;
