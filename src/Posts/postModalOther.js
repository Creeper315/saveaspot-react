import { Modal, ModalHeader, ModalFooter, ModalBody, Button } from 'reactstrap';
import { Form, FormGroup, Input, Label } from 'reactstrap';
import { useEffect, useState, Fragment } from 'react';
// import { Wrapper, Status } from '@googlemaps/react-wrapper';
import MyMap from './mymap';
import axios from 'axios';

const PostModalOther = ({
    PageData,
    ModalOpen,
    toCloseModal,
    ActiveIdx,
    renderHelpButton,
}) => {
    const p = PageData[ActiveIdx];
    const [isSaved, setisSaved] = useState(false);
    useEffect(() => {
        axios({
            method: 'post',
            url: 'https://fun-together.herokuapp.com/checksaved',
            data: { postId: p.postid },
        }).then((e) => {
            if (e.status === 200) {
                setisSaved(e.data);
            }
        });
    }, []);

    function renderAddSavedButton() {
        let click = () => {
            axios({
                method: 'POST',
                url: 'https://fun-together.herokuapp.com/postsave',
                data: { toSave: !isSaved, postId: p.postid }, // myId 在 server 的 req.info.id 里面，所以这里不用 pass 进去
            }).then((e) => {
                if (e.status === 200) {
                    setisSaved(!isSaved);
                }
            });
        };
        return (
            <Button onClick={click}>{isSaved ? 'Cancel Save' : 'Save'}</Button>
        );
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
                    <FormGroup>
                        <Label>Username</Label>
                        <Input value={p.username} readOnly />
                    </FormGroup>
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
            <ModalFooter>
                {renderHelpButton(ActiveIdx)}
                {renderAddSavedButton()}
                <Button onClick={toCloseModal}>Close</Button>
            </ModalFooter>
        </Modal>
    );
};

export default PostModalOther;
