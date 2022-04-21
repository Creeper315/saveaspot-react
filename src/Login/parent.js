import { useEffect, useState, useRef } from 'react';
import Child from './child';

const Parent = () => {
    console.log('start !');
    const [Arr, setArr] = useState([
        [1, 2],
        [3, 4],
    ]);
    const [Val, setVal] = useState([{ hi: 'hi' }, { hi: 'oo' }, { hi: 'pp' }]);
    const ree = useRef([{ hi: 'hi' }, { hi: 'oo' }, { hi: 'pp' }]);

    useEffect(() => {}, []);

    return (
        <div>
            <span>Parent</span>
            {/* {Arr}
            <Child Arr={Arr} a0={Arr[0]} setArr={setArr} ree={ree} />
            <button onClick={() => console.log(Val)}>what's val</button>
            <button
                onClick={() => {
                    Val[0].hi = Math.random();
                    setVal(Val);
                }}
            >
                push val
            </button> */}
            <Child ree={ree} />
            <button
                onClick={() => {
                    ree.current[0].hi = 'open';
                }}
            >
                change ref [0]
            </button>
            <input
                onChange={(e) => (ree.current = e.target.value)}
                placeholder="parent"
            />
            <button onClick={() => console.log('parent:', ree.current)}>
                Show ree
            </button>
        </div>
    );
};

export default Parent;
