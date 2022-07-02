import { useRef, useState } from 'react';
import ToggleSwitch from './toggleSwitch';

const SideButton = ({ text, isActive, activeFun, hoverFun }) => {
    const [Hovered, setHovered] = useState(false);

    const getClass = () => {
        let res = '';
        if (Hovered) {
            res += ' mouse-in';
        }
        if (isActive) {
            res += ' is-active';
        }
        return res;
    };
    return (
        <div
            className={'side-button' + getClass()}
            // onMouseEnter={() => setHovered(true)}
            // onMouseLeave={() => setHovered(false)}
            onClick={() => {
                // setActive(!Active);
                activeFun();
            }}
        >
            <ToggleSwitch {...{ getClass }} />
            <span>{text}</span>
        </div>
    );
};

export default SideButton;
