import { useState } from 'react';
const Child = ({ Arr, a0, setArr, ree }) => {
    console.log('top', Arr, 'a0', a0);
    const [hi, sethi] = useState(true);
    return (
        <div>
            <span>Child</span>
            {/* {Arr[0]}
            {a0}
            <button
                onClick={() => {
                    a0.push('wow');
                    console.log(a0);
                }}
            >
                change arr
            </button>
            {a0}
            <button
                onClick={() => {
                    sethi(!hi);
                }}
            >
                run ef
            </button> */}
            <input onChange={(e) => (ree.current = e.target.value)} />
            <button onClick={() => console.log('child:', ree.current)}>
                Show ree
            </button>
        </div>
    );
};

export default Child;
