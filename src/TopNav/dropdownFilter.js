import axios from 'axios';

const DropdownFilter = ({ loadPosts, filterOption, ThisUser }) => {
    const df = '-- Select An Option--';
    const a = 'Own Post';
    const b = 'Saved';
    const c = 'Helped By Me';

    function onSelect(value) {
        switch (value) {
            case df:
                filterOption.current.ownPost = false;
                filterOption.current.saved = false;
                filterOption.current.helpedByMe = false;
                loadPosts();
                break;
            case a:
                filterOption.current.ownPost = true;
                filterOption.current.saved = false;
                filterOption.current.helpedByMe = false;
                loadPosts();
                break;
            case b:
                filterOption.current.ownPost = false;
                filterOption.current.saved = true;
                filterOption.current.helpedByMe = false;
                loadPosts();
                break;
            case c:
                filterOption.current.ownPost = false;
                filterOption.current.saved = false;
                filterOption.current.helpedByMe = true;
                loadPosts();
                break;
            default:
                console.log('Error, cannot get here');
        }
    }

    return (
        <div>
            <select
                onChange={(e) => {
                    // console.log('change', e.target.value);
                    onSelect(e.target.value);
                }}
            >
                <option value={df}>{df}</option>
                <option value={a}>{a}</option>
                <option value={b}>{b}</option>
                <option value={c}>{c}</option>
            </select>
        </div>
    );
};

export default DropdownFilter;
