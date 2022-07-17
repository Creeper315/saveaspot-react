import { Modal, ModalHeader, ModalFooter, ModalBody, Button } from 'reactstrap';
import { Form, FormGroup, Input, Label } from 'reactstrap';
import { useEffect, useState, Fragment, useRef } from 'react';
import SearchSingle from './searchSingle';
import axios from 'axios';
import { activities } from '../TopNav/data';

const CreatePostForm = ({
    ThisUser,
    CreateModalOpen,
    toggleCreate,
    AllLocation,
}) => {
    // location, activity, time, maxppl, description, email, phone,
    // 其中，email phone 已经在 ThisUser 里面固定了
    // console.log('create post render');
    const time = useRef('');
    const description = useRef('');
    const maxppl = useRef(5);
    const location = useRef('');
    const activity = useRef('');

    // username TINYTEXT NOT NULL,
    // locname not null,
    // time TINYTEXT NOT NULL,   -- 'YYYYMMDD'
    // description text,
    // activity tinytext not null, -- ENUM('biking', 'hiking', 'table tennis', 'party', 'basketball', 'gaming', 'studying', 'others'),
    // maxppl integer not null,
    // curppl integer default 0 not null,

    function handleCreate() {
        let postObj = {
            username: ThisUser.username,
            locname: location.current.locname,
            activity: activity.current.value,
            time: time.current,
            description: description.current,
            curppl: 0,
            maxppl: parseInt(maxppl.current),
        };
        axios.post('/api/postcreate', postObj).then((e) => {
            if (e.status === 200) {
                toggleCreate();
            }
        });
    }

    return (
        <Modal isOpen={CreateModalOpen} toggle={toggleCreate}>
            <ModalHeader toggle={toggleCreate}>
                Create Your Activity Post!
            </ModalHeader>
            <ModalBody>
                <SearchSingle optionData={AllLocation} thisvalue={location} />
                <SearchSingle optionData={activities} thisvalue={activity} />
                <FormGroup>
                    <Label>Time</Label>
                    <Input
                        // value={email.current}
                        onChange={(e) => {
                            time.current = e.target.value;
                        }}
                    />
                </FormGroup>

                <FormGroup>
                    <Label>Description</Label>
                    <Input
                        // value={email.current}
                        onChange={(e) => {
                            description.current = e.target.value;
                        }}
                    />
                </FormGroup>

                <FormGroup>
                    <Label>Max People</Label>
                    <Input
                        // value={email.current}
                        onChange={(e) => {
                            maxppl.current = e.target.value;
                        }}
                    />
                </FormGroup>
            </ModalBody>
            <ModalFooter>
                <Button onClick={handleCreate}>Create</Button>
                <Button onClick={toggleCreate}>Cancel</Button>
            </ModalFooter>
        </Modal>
    );
};

export default CreatePostForm;
