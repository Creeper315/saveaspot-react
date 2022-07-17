import SingleMap from './singleMap';

const ModalMap = ({ SeeMap, locpic, lat, long }) => {
    // console.log('m m ', locpic);
    return (
        <div className={'modal-map' + (SeeMap ? ' is-active' : '')}>
            {SeeMap && <img src={locpic} alt="location view" />}
            {SeeMap && (
                <div id="single-map-con">
                    <SingleMap lat={lat} long={long} />
                </div>
            )}
        </div>
    );
};

export default ModalMap;
