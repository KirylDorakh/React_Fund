import React, {useState} from "react";
import Counter from "./components/Counter";
import ClassCounter from "./components/ClassCounter";

import "./styles/App.css"
import PostItem from "./components/PostItem";

function App() {
    // const state = useState(5)
    // const [count, setCount] = useState(5)
    // console.log(state)
    // console.log(count)
    // console.log(setCount)
    const [value, setValue] = useState('Text in input')



    function changeValue(event){
        return setValue(event.target.value)
    }

    return (
        <div className="App">
            <PostItem />
            <PostItem />
            <PostItem />
            <Counter />

            <ClassCounter />
            <h1>{value}</h1>
            <input
                type="text"
                value={value}
                onChange={changeValue}
            />
        </div>
    );
}

export default App;
