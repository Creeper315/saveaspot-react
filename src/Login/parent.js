import { useEffect, useState, useRef } from 'react';
import Child from './child';

const Parent = () => {
    console.log('at parent !');
    const [NeedRender, setNeedRender] = useState(false);

    useEffect(() => {}, []);

    return (
        <div>
            Parent Rendered this..
            <button onClick={() => setNeedRender(!NeedRender)}>
                {'need render: ' + NeedRender}
            </button>
            {NeedRender && <Child />}
            {NeedRender ? <Child /> : null}
        </div>
    );
};

export default Parent;
