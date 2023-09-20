import React, {useContext} from 'react';
import {Route, Routes} from "react-router-dom";
import About from "../pages/About";
import Posts from "../pages/Posts";
import PostIdPage from "../pages/PostIdPage";
import Login from "../pages/Login";

import {publicRoutes, privateRoutes} from "../router";
import {AuthContext} from "../context";
import Loader from "./UI/Loader/Loader";

const AppRouter = () => {
    const {isAuth, isLoading} = useContext(AuthContext)
    console.log(isAuth)
    // const isAuth = true;
    if (isLoading){
        return <Loader />
    }
    return (

            isAuth ?
                    <Routes>
                        <Route path="/about" element={<About/>}/>
                        <Route exact path="/posts" element={<Posts/>}/>
                        <Route exact path="/posts/:id" element={<PostIdPage/>}/>
                    </Routes>
                    :
                    <Routes>
                        <Route exact path="/login" element={<Login/>}/>
                    </Routes>

            // {/*{privateRoutes.map(route => {*/}
            // {/*    <Route path={route.path} element={route.component} exact={route.exact}/>*/}
            // {/*})}*/}

    );
};

export default AppRouter;