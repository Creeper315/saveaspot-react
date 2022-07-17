import { Modal, ModalHeader, ModalFooter, ModalBody, Button } from 'reactstrap';
import { Form, FormGroup, Input, Label } from 'reactstrap';
import { useEffect, useState, useRef } from 'react';
import axios from 'axios';

const EditContactForm = ({
    ThisUser,
    setThisUser,
    EditModalOpen,
    toggleEdit,
}) => {
    // const email = useRef(ThisUser.email || '');
    // const phone = useRef(ThisUser.phone || '');
    const [Email, setEmail] = useState(ThisUser.email || '');
    const [Phone, setPhone] = useState(ThisUser.phone || '');

    function saveEdit() {
        let newObj = {
            ...ThisUser,
            email: Email,
            phone: Phone,
        };
        axios({
            method: 'post',
            url: '/api/userUpdate',
            data: newObj,
        })
            .then((e) => {
                setThisUser(newObj);
                toggleEdit();
                // Update Success
            })
            .catch((e) => {
                alert('Error, update failed ');
                // Failed
            });
    }

    return (
        <Modal isOpen={EditModalOpen} toggle={toggleEdit}>
            <ModalHeader toggle={toggleEdit}>
                Edit Your Contact Info
            </ModalHeader>
            <ModalBody>
                <Form>
                    <FormGroup>
                        <Label>Email</Label>
                        <Input
                            value={Email}
                            onChange={(e) => {
                                setEmail(e.target.value);
                            }}
                        />
                    </FormGroup>

                    <FormGroup>
                        <Label>Phone</Label>
                        <Input
                            value={Phone}
                            onChange={(e) => {
                                setPhone(e.target.value);
                            }}
                        />
                    </FormGroup>
                </Form>
            </ModalBody>

            <ModalFooter>
                <Button onClick={saveEdit}>Save</Button>
                <Button onClick={toggleEdit}>Cancel</Button>
            </ModalFooter>
        </Modal>
    );
};

export default EditContactForm;
