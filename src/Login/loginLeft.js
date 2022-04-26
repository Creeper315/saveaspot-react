import party from '../svg/party.svg';
import tree from '../svg/tree.svg';

const LoginLeft = () => {
    return (
        <div className="login-left">
            <h4 id="login-left-title">Fun Together</h4>
            <p>
                Join activities with strangers or invite them to your own. The
                website to make friends & have fun :)
            </p>
            <img src={party} alt="party" id="party-svg" />
            {/* <img src={tree} alt="tree" id="tree-svg" /> */}
            <p id="login-left-foot">Yuncheng's self project</p>
        </div>
    );
};

export default LoginLeft;
