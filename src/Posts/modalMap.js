import SingleMap from './singleMap';

const ModalMap = ({ SeeMap, locpic, lat, long }) => {
    return (
        <div className={'modal-map' + (SeeMap ? ' is-active' : '')}>
            {SeeMap && <img src={locpic} alt="location view" />}
            {SeeMap && (
                <div id="single-map-con">
                    <SingleMap />
                </div>
            )}
        </div>
    );
};

export default ModalMap;
