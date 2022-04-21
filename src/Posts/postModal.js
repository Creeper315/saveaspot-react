import { Modal, ModalHeader, ModalFooter, ModalBody, Button } from 'reactstrap';
import { Form, FormGroup, Input, Label } from 'reactstrap';
import { useEffect, useState, Fragment } from 'react';
// import { Wrapper, Status } from '@googlemaps/react-wrapper';
import MyMap from './mymap';
import axios from 'axios';

const PostModal = ({
    ThisUser,
    x,
    isOwnPost,
    IsOpen,
    toggleOpen,
    renderHelpButton,
    renderDeleteButton,
    handleHelp,
    handleSave,
    handleDelete,
}) => {
    // console.log('Post Modal Render', x.helper);
    useEffect(() => {
        // console.log('Post Modal Effect');
    }, []);
    // console.log('Modal Data：', x);
    let initSaved = () => {
        axios({
            method: 'post',
            url: 'checksaved',
            data: { postId: x.postid },
        }).then((e) => {
            // console.log('init save', e);
            setIsSaved(e.data);
        });
    };
    const [IsSaved, setIsSaved] = useState(initSaved()); // toggle
    const [MapOpen, setMapOpen] = useState(false);

    function toggleMap(bool) {
        if (bool === true || bool === false) {
            setMapOpen(bool);
        }
        setMapOpen(!MapOpen);
    }

    function renderEditButton() {
        return (
            <Button
                onClick={() => {
                    axios({ method: 'POST', url: 'postupdate', data: { x } });
                }}
            >
                Edit
            </Button>
        );
    }

    return (
        <Fragment>
            <Modal isOpen={IsOpen} toggle={() => toggleOpen()}>
                <ModalHeader toggle={() => toggleOpen()}>
                    header here
                </ModalHeader>
                <ModalBody>
                    <img
                        src={
                            'https://www.gamehelper.top/wp-content/uploads/2020/06/spike-brawl-stars-guide.jpg'
                        }
                        alt={'user profile'}
                    ></img>
                    <Form>
                        <FormGroup>
                            <Label>Username</Label>
                            <Input value={x.username} />
                        </FormGroup>
                        <FormGroup>
                            <Label>Location</Label>
                            <Input value={x.locName} />
                        </FormGroup>
                        <FormGroup>
                            <Label>Time</Label>
                            <Input value={x.time} />
                        </FormGroup>
                        <FormGroup>
                            <Label>Description</Label>
                            <Input value={x.description} />
                        </FormGroup>
                        <FormGroup>
                            <Label>Email</Label>
                            <Input value={x.email} />
                        </FormGroup>
                        <FormGroup>
                            <Label>Phone</Label>
                            <Input value={x.phone} />
                        </FormGroup>
                        <FormGroup>
                            <Label>Reward</Label>
                            <Input value={x.reward} />
                        </FormGroup>
                        <FormGroup>
                            <Label>Helper</Label>
                            <Input value={x.helper} />
                        </FormGroup>
                    </Form>
                    <img src={x.locp} alt={'location '}></img>
                    <img src={x.postp} alt={'seat detail '}></img>
                </ModalBody>
                <ModalFooter>
                    <Button onClick={() => toggleMap()}>View Map</Button>
                    {isOwnPost && renderEditButton()}
                    {isOwnPost && renderDeleteButton()}
                    {!isOwnPost && renderHelpButton()}
                    {!isOwnPost && (
                        <Button
                            onClick={() =>
                                handleSave(IsSaved, x.postid).then((e) => {
                                    setIsSaved(e);
                                })
                            }
                        >
                            {IsSaved ? 'Cancel Save' : 'Save'}
                        </Button>
                    )}
                    <Button onClick={() => toggleOpen(false)}>Cancel</Button>
                </ModalFooter>
            </Modal>
            {MapOpen && (
                <Modal
                    className="map-container"
                    isOpen={MapOpen}
                    toggle={toggleMap}
                >
                    <ModalHeader toggle={toggleMap}>
                        <MyMap locname={x.locName} />
                    </ModalHeader>
                </Modal>
            )}
        </Fragment>
    );
};

export default PostModal;
