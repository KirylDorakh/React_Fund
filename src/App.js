import React, {useState} from "react";
import Counter from "./components/Counter";
import ClassCounter from "./components/ClassCounter";

import "./styles/App.css"
import PostItem from "./components/PostItem";
import PostList from "./components/PostList";

function App() {
    // const state = useState(5)
    // const [count, setCount] = useState(5)
    // console.log(state)
    // console.log(count)
    // console.log(setCount)
    const [value, setValue] = useState('Text in input')

    const [posts, setPosts] = useState([
        {id: 1, title: "JS", body: "Description"},
        {id: 2, title: "JS2", body: "Description2"},
        {id: 3, title: "JS3", body: "Description3"},
    ])

    const [posts2, setPosts2] = useState([
        {id: 1, title: "Python", body: "Description"},
        {id: 2, title: "Python2", body: "Description2"},
        {id: 3, title: "Python3", body: "Description3"},
    ])

    function changeValue(event){
        return setValue(event.target.value)
    }

    return (
        <div className="App">
            <PostList posts={posts} title={'Posts List JS'}/>
            <PostList posts={posts2} title={'Posts List Python'}/>

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
