import React, {useContext, useEffect, useState} from 'react';

import "./styles/App.css"
import {BrowserRouter} from "react-router-dom";
import Navbar from "./components/UI/Navbar/Navbar";
import AppRouter from "./components/AppRouter";
import {AuthContext} from "./context";

const App = () => {
    const [isAuth, setIsAuth] = useState(false)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        if (localStorage.getItem('auth')){
            setIsAuth(true)
        }
        setIsLoading(false);
    }, [])

    return (
        <AuthContext.Provider value={{
            isAuth,
            setIsAuth,
            isLoading
        }}>
            <BrowserRouter>
                <Navbar />
                <AppRouter />
            </BrowserRouter>
        </AuthContext.Provider>
    );
};

export default App;

// import React, {useEffect, useState} from "react";
// // import Counter from "./components/Counter";
// // import ClassCounter from "./components/ClassCounter";
//
// import "./styles/App.css"
// // import PostItem from "./components/PostItem";
// import PostList from "./components/PostList";
// import MyButton from "./components/UI/button/MyButton";
// // import MyInput from "./components/UI/input/MyInput";
// import PostForm from "./components/UI/PostForm/PostForm";
// // import MySelect from "./components/UI/select/MySelect";
// import PostFilter from "./components/PostFilter";
// import MyModal from "./components/UI/MyModal/MyModal";
// import {usePosts} from "./hooks/usePosts";
// // import axios from "axios";
// import PostService from "./API/PostService";
// import Loader from "./components/UI/Loader/Loader";
// import {useFetching} from "./hooks/useFetching";
// import {getPagesCount} from "./utils/pages";
// // import {usePagination} from "./hooks/usePagination";
// import Pagination from "./components/UI/pagination/Pagination";
//
// function App() {
//     // const state = useState(5)
//     // const [count, setCount] = useState(5)
//     // console.log(state)
//     // console.log(count)
//     // console.log(setCount)
//
//     const [posts, setPosts] = useState([])
//
//     const [value, setValue] = useState('Text in input')
//     // const [selectedSort, setSelectedSort] = useState('')
//     // const [searchQuery, setSearchQuery] = useState('')
//     const [filter, setFilter] = useState({sort: '', query: ''})
//     const [modal, setModal] = useState(false)
//     const [totalPages, setTotalPages] = useState(0)
//     const [limit, setLimit] = useState(10)
//     const [page, setPage] = useState(1)
//
//     // const [fetchPosts, isPostsLoading, postError] = useFetching(async  () => {
//     const [fetchPosts, isPostsLoading, postError] = useFetching(async  (limit, page) => {
//         const response = await PostService.getAll(limit, page);
//         setPosts(response.data)
//         const totalCount = response.headers['x-total-count']
//         setTotalPages(getPagesCount(totalCount, limit))
//     })
//
//     const sortedAndSearchedPosts = usePosts(posts, filter.sort, filter.query)
//
//     // async function fetchPosts() {
//     //     setIsPostLoading(true);
//     //     setTimeout(async () => {
//     //
//     //         setIsPostLoading(false);
//     //     }, 5000)
//     // }
//
//     useEffect(() => {
//     //     fetchPosts()
//     // }, [page])
//         fetchPosts(limit, page)
//     }, [])
//
//     // const pagesArray = usePagination(totalPages)
//
//     const changePage = (page) => {
//         setPage(page)
//         // way 2
//         fetchPosts(limit, page)
//     }
//
//     // function getSortedPosts () {
//     //     console.log('SORTED')
//     //     if(selectedSort) {
//     //         return [...posts].sort((a, b) => a[selectedSort].localeCompare(b[selectedSort]))
//     //     }
//     //     return posts;
//     // }
//
//     // const sortedPosts = useMemo(()=>{
//     //     console.log('SORTED')
//     //     if(filter.sort) {
//     //         return [...posts].sort((a, b) => a[filter.sort].localeCompare(b[filter.sort]))
//     //     }
//     //     return posts;
//     // }, [filter.sort, posts])
//
//     // const sortedAndSearchedPosts = useMemo(() => {
//     //     return sortedPosts.filter(post => post.title.toLowerCase().includes(filter.query))
//     // }, [filter.query, sortedPosts])
//
//     // const [posts2, setPosts2] = useState([
//     //     {id: 1, title: "Python", body: "Description"},
//     //     {id: 2, title: "Python2", body: "Description2"},
//     //     {id: 3, title: "Python3", body: "Description3"},
//     // ])
//
//     function changeValue(event) {
//         return setValue(event.target.value)
//     }
//
//     // const [title, setTitle] = useState('')
//     // const [body, setBody] = useState('')
//     // const [post, setPost] = useState({title: '', body: ''})
//
//     // const bodyInputRef = useRef()
//
//     // const addNewPost = (e) => {
//     //     e.preventDefault()
//     //     // console.log(title)
//     //     // console.log(bodyInputRef.current.value)
//     //     // const newPost = {
//     //     //     id: Date.now(),
//     //     //     title,
//     //     //     body
//     //     // }
//     //     // console.log(newPost)
//     //
//     //
//     //     // setTitle('')
//     //     // setBody('')
//     //     setPost({title: '', body: ''})
//     // }
//
//     const createPost = (newPost) => {
//         setPosts([...posts, newPost])
//         setModal(false)
//     }
//
//     // Получаем post из дочернего компонента
//     const removePost = (post) => {
//         setPosts(posts.filter(p => p.id !== post.id))
//     }
//
//     // const sortPosts = (sort) => {
//     //     setSelectedSort(sort)
//     // setPosts([...posts].sort((a, b) => a[sort].localeCompare(b[sort])))
//     // }
//
//     return (
//         <div className="App">
//             <button onClick={fetchPosts}>GET POSTS</button>
//             <MyButton style={{marginTop: 30}} onClick={() => setModal(true)}>
//                 Create Post
//             </MyButton>
//             <MyModal visible={modal} setVisible={setModal}>
//                 <PostForm create={createPost}/>
//             </MyModal>
//             <hr style={{margin: '15px 0'}}/>
//             <PostFilter
//                 filter={filter}
//                 setFilter={setFilter}
//             />
//             {/*<PostList remove={removePost} posts={posts} title={'Posts List JS'}/>*/}
//             { postError && <h1>Error ${postError}</h1>
//             }
//
//             {isPostsLoading
//                 ? <div style={{display: 'flex', justifyContent: 'center', marginTop: 50}}>
//                     <Loader/>
//                   </div>
//                 : <PostList remove={removePost} posts={sortedAndSearchedPosts} title={'Posts List'}/>
//             }
//
//             <Pagination
//                 totalPages={totalPages}
//                 changePage={changePage}
//                 page={page}
//             />
//
//             {/*<PostList posts={posts2} title={'Posts List Python'}/>*/}
//
//             {/*<Counter />*/}
//
//             {/*<ClassCounter />*/}
//             {/*<h1>{value}</h1>*/}
//             {/*<input*/}
//             {/*    type="text"*/}
//             {/*    value={value}*/}
//             {/*    onChange={changeValue}*/}
//             {/*/>*/}
//             {/*<div className="page__wrapper">*/}
//             {/*    {pagesArray.map(p =>*/}
//             {/*        <span className={*/}
//             {/*            page === p ? 'page page__current' : 'page'*/}
//             {/*        }*/}
//             {/*              key={p}*/}
//             {/*              onClick={() => changePage(p)}*/}
//             {/*        >{p}</span>*/}
//             {/*    )}*/}
//             {/*</div>*/}
//         </div>
//     );
// }
//
// export default App;
