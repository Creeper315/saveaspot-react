import { BsCheckLg } from 'react-icons/bs';
import { useRef, forwardRef } from 'react';

const ToggleSwitch = ({ getClass }) => {
    return (
        <div className="toggle-switch">
            <div className={'toggle-switch-circle' + getClass()}>
                <BsCheckLg className={'toggle-switch-check' + getClass()} />
            </div>
        </div>
    );
};

export default ToggleSwitch;
