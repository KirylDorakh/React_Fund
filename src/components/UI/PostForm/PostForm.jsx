import React, {useState} from 'react';
import MyInput from "../input/MyInput";
import MyButton from "../button/MyButton";

const PostForm = ({create}) => {
    const [post, setPost] = useState({title: '', body: ''})

    const addNewPost = (e) => {
        e.preventDefault()
        const newPost = {
            ...post, id: Date.now()
        }
        create(newPost)
        setPost({title: '', body: ''})
    }

    return (
        <form>
            {/*управляемый компонент*/}
            <MyInput
                // value={title}
                value={post.title}
                // onChange={e => setTitle(e.target.value)}
                onChange={e => setPost({...post, title: e.target.value})}
                type="text"
                placeholder="Post name"/>
            {/*<input ref={bodyInputRef} type="text"/>*/}
            {/*неуправляемый/некотролируемый компонент*/}
            <MyInput
                // ref={bodyInputRef}
                // value={body}
                value={post.body}
                // onChange={e => setBody(e.target.value)}
                onChange={e => setPost({...post, body: e.target.value})}
                type="text"
                placeholder="Description"/>
            <MyButton onClick={addNewPost}>Create post</MyButton>
        </form>
    );
};

export default PostForm;