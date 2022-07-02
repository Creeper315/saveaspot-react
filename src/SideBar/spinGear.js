import { BsGear } from 'react-icons/bs';
import { FcSettings } from 'react-icons/fc';

const SpinGear = ({ clickFun }) => {
    return (
        <div className="gear-main" onClick={clickFun}>
            <div className="spinning-gear-contain">
                <FcSettings className="spinning-gear" />
                {/* <div className="spinning-gear">hah</div> */}
            </div>
        </div>
    );
};

export default SpinGear;
