import React, {useEffect, useState} from "react";
import {useFetching} from "../hooks/useFetching";
import PostService from "../API/PostService";
import {getPagesCount} from "../utils/pages";
import {usePosts} from "../hooks/usePosts";
import MyButton from "../components/UI/button/MyButton";
import MyModal from "../components/UI/MyModal/MyModal";
import PostForm from "../components/UI/PostForm/PostForm";
import PostFilter from "../components/PostFilter";
import Loader from "../components/UI/Loader/Loader";
import PostList from "../components/PostList";
import Pagination from "../components/UI/pagination/Pagination";


const Posts = () => {
    const [posts, setPosts] = useState([])
    const [value, setValue] = useState('Text in input')
    const [filter, setFilter] = useState({sort: '', query: ''})
    const [modal, setModal] = useState(false)
    const [totalPages, setTotalPages] = useState(0)
    const [limit, setLimit] = useState(10)
    const [page, setPage] = useState(1)

    const [fetchPosts, isPostsLoading, postError] = useFetching(async (limit, page) => {
        const response = await PostService.getAll(limit, page);
        setPosts(response.data)
        const totalCount = response.headers['x-total-count']
        setTotalPages(getPagesCount(totalCount, limit))
    })

    const sortedAndSearchedPosts = usePosts(posts, filter.sort, filter.query)

    useEffect(() => {
        fetchPosts(limit, page)
    }, [])

    const changePage = (page) => {
        setPage(page)
        fetchPosts(limit, page)
    }

    function changeValue(event) {
        return setValue(event.target.value)
    }

    const createPost = (newPost) => {
        setPosts([...posts, newPost])
        setModal(false)
    }

    const removePost = (post) => {
        setPosts(posts.filter(p => p.id !== post.id))
    }

    return (
        <div className='app'>
            <button onClick={fetchPosts}>GET POSTS</button>
            <MyButton style={{marginTop: 30}} onClick={() => setModal(true)}>
                Create Post
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
            {postError && <h1>Error ${postError}</h1>
            }

            {isPostsLoading
                ? <div style={{display: 'flex', justifyContent: 'center', marginTop: 50}}>
                    <Loader/>
                </div>
                : <PostList remove={removePost} posts={sortedAndSearchedPosts} title={'Posts List'}/>
            }

            <Pagination
                totalPages={totalPages}
                changePage={changePage}
                page={page}
            />
        </div>
    );
};

export default Posts;