import { Modal, ModalHeader, ModalFooter, ModalBody, Button } from 'reactstrap';
import { Form, FormGroup, Input, Label } from 'reactstrap';
import { useEffect, useState, Fragment } from 'react';
// import { Wrapper, Status } from '@googlemaps/react-wrapper';
import MyMap from './mymap';
import axios from 'axios';

const PostModalOwn = ({
    // 可以 Edit, Delete, Close, ViewMap
    PageData,
    setPageData,
    ModalOpen,
    toCloseModal,
    ActiveIdx,
    renderDeleteButton,
}) => {
    const p = PageData[ActiveIdx];
    // const [username, setusername] = useState(p.username);
    const [locname, setlocname] = useState(p.locName);
    const [time, settime] = useState(p.time);
    const [description, setdescription] = useState(p.description);
    const [email, setemail] = useState(p.email);
    const [phone, setphone] = useState(p.phone);
    const [reward, setreward] = useState(p.reward);

    const [MapOpen, setMapOpen] = useState(false);
    function toggleMap(bool) {
        if (bool === true || bool === false) {
            setMapOpen(bool);
        }
        setMapOpen(!MapOpen);
    }

    function castPostObj(o) {
        let r = {};
        r.postid = o.postid;
        r.userid = o.userid;
        r.time = o.time;
        r.description = o.description;
        r.locname = o.locname;
        r.helper = o.helper;
        r.reward = o.reward;
        r.picture = o.postp;
        return r;
    }
    function newUpdateObj() {
        let r = {};
        r.postid = p.postid;
        // r.userid = p.userid;
        r.time = time;
        r.description = description;
        r.locname = locname;
        r.reward = reward;
        let u = {};
        // u.id = p.userid;
        u.email = email;
        u.phone = phone;
        return { postObj: r, userObj: u };
    }

    function renderSaveEditButton() {
        let click = () => {
            axios({
                method: 'post',
                url: 'https://fun-together.herokuapp.com/postedit',
                data: newUpdateObj(),
            }).then((e) => {
                if (e.status === 200) {
                    // Also, modify PostData at ActiveIdx
                    toCloseModal();
                }
            });
        };
        return <Button onClick={click}>Save</Button>;
    }

    return (
        <Modal isOpen={ModalOpen} toggle={toCloseModal}>
            <ModalHeader toggle={toCloseModal}>Your Own Post</ModalHeader>
            <ModalBody>
                <img
                    style={{ width: '100px', height: '100px' }}
                    src={
                        'https://www.gamehelper.top/wp-content/uploads/2020/06/spike-brawl-stars-guide.jpg'
                    }
                    alt={'user profile'}
                ></img>
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
                            value={locname}
                            onChange={(e) => setlocname(e.target.value)}
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label>Time</Label>
                        <Input
                            value={time}
                            onChange={(e) => settime(e.target.value)}
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label>Description</Label>
                        <Input
                            value={description}
                            onChange={(e) => setdescription(e.target.value)}
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label>Email</Label>
                        <Input
                            value={email}
                            onChange={(e) => setemail(e.target.value)}
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label>Phone</Label>
                        <Input
                            value={phone}
                            onChange={(e) => setphone(e.target.value)}
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label>Reward</Label>
                        <Input
                            value={reward}
                            onChange={(e) => setreward(e.target.value)}
                        />
                    </FormGroup>
                </Form>
                <img src={p.locp} alt={'location '}></img>
                <img src={p.postp} alt={'seat detail '}></img>
            </ModalBody>
            <ModalFooter>
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
                            <MyMap locname={p.locName} />
                        </ModalHeader>
                    </Modal>
                )}
                {renderSaveEditButton()}
                {renderDeleteButton(ActiveIdx)}
                <Button onClick={toCloseModal}>CLose</Button>
            </ModalFooter>
        </Modal>
    );
};

export default PostModalOwn;
