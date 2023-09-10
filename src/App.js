import React, {useMemo, useRef, useState} from "react";
import Counter from "./components/Counter";
import ClassCounter from "./components/ClassCounter";

import "./styles/App.css"
import PostItem from "./components/PostItem";
import PostList from "./components/PostList";
import MyButton from "./components/UI/button/MyButton";
import MyInput from "./components/UI/input/MyInput";
import PostForm from "./components/UI/PostForm/PostForm";
import MySelect from "./components/UI/select/MySelect";
import PostFilter from "./components/PostFilter";
import MyModal from "./components/UI/MyModal/MyModal";

function App() {
    // const state = useState(5)
    // const [count, setCount] = useState(5)
    // console.log(state)
    // console.log(count)
    // console.log(setCount)

    const [value, setValue] = useState('Text in input')
    // const [selectedSort, setSelectedSort] = useState('')
    // const [searchQuery, setSearchQuery] = useState('')
    const [filter, setFilter] = useState({sort: '', query: ''})
    const [modal, setModal] = useState(false)

    const [posts, setPosts] = useState([
        {id: 1, title: "JS", body: "2 JavaSript"},
        {id: 2, title: "Python", body: "1 Python"},
        {id: 3, title: "Django", body: "3 Django"},
    ])

    // function getSortedPosts () {
    //     console.log('SORTED')
    //     if(selectedSort) {
    //         return [...posts].sort((a, b) => a[selectedSort].localeCompare(b[selectedSort]))
    //     }
    //     return posts;
    // }

    const sortedPosts = useMemo(()=>{
        console.log('SORTED')
        if(filter.sort) {
            return [...posts].sort((a, b) => a[filter.sort].localeCompare(b[filter.sort]))
        }
        return posts;
    }, [filter.sort, posts])

    const sortedAndSearchedPosts = useMemo(() => {
        return sortedPosts.filter(post => post.title.toLowerCase().includes(filter.query))
    }, [filter.query, sortedPosts])

    // const [posts2, setPosts2] = useState([
    //     {id: 1, title: "Python", body: "Description"},
    //     {id: 2, title: "Python2", body: "Description2"},
    //     {id: 3, title: "Python3", body: "Description3"},
    // ])

    function changeValue(event){
        return setValue(event.target.value)
    }

    // const [title, setTitle] = useState('')
    // const [body, setBody] = useState('')
    // const [post, setPost] = useState({title: '', body: ''})

    // const bodyInputRef = useRef()

    // const addNewPost = (e) => {
    //     e.preventDefault()
    //     // console.log(title)
    //     // console.log(bodyInputRef.current.value)
    //     // const newPost = {
    //     //     id: Date.now(),
    //     //     title,
    //     //     body
    //     // }
    //     // console.log(newPost)
    //
    //
    //     // setTitle('')
    //     // setBody('')
    //     setPost({title: '', body: ''})
    // }

    const createPost = (newPost) => {
        setPosts([...posts, newPost])
        setModal(false)
    }

    // Получаем post из дочернего компонента
    const removePost = (post) => {
        setPosts(posts.filter(p => p.id !== post.id))
    }

    // const sortPosts = (sort) => {
    //     setSelectedSort(sort)
        // setPosts([...posts].sort((a, b) => a[sort].localeCompare(b[sort])))
    // }

    return (
        <div className="App">
            <MyButton style={{marginTop: 30}} onClick={() => setModal(true)}>
                Create User
            </MyButton>
            <MyModal visible={modal} setVisible={setModal}>
                <PostForm create={createPost}/>
            </MyModal>
            <hr style={{margin: '15px 0'}}/>
            <PostFilter
                filter={filter}
                setFilter={setFilter}
            />
            {/*<PostList remove={removePost} posts={posts} title={'Posts List JS'}/>*/}
            <PostList remove={removePost} posts={sortedAndSearchedPosts} title={'Posts List JS'}/>


            {/*<PostList posts={posts2} title={'Posts List Python'}/>*/}

            {/*<Counter />*/}

            {/*<ClassCounter />*/}
            {/*<h1>{value}</h1>*/}
            {/*<input*/}
            {/*    type="text"*/}
            {/*    value={value}*/}
            {/*    onChange={changeValue}*/}
            {/*/>*/}
        </div>
    );
}

export default App;
