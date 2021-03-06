import React, { Component } from 'react'
import Loadable from "./components/common/Loadable";
import { HashRouter, Route, Switch, Redirect } from 'react-router-dom'
import 'antd/dist/antd.css'

import { Provider } from 'react-redux'
import store from '../redux/store'

// 异步分包处理

const loginPage = Loadable({
    loader: () => import('./pages/LoginPage'),
});

const EditArticlePage = Loadable({
    loader: () => import('./pages/EditArticlePage'),
});

const Question = Loadable({
    loader: () => import('./pages/Question'),
});

const myInfoPage = Loadable({
    loader: () => import('./pages/MyInfoPage'),
});

const createQuestionNaire = Loadable({
    loader: () => import('./pages/CreateQuestionNaire'),
});

const blogPage = Loadable({
    loader: () => import('./pages/BlogPage'),
});

const HomePage = Loadable({
    loader: () => import('../containers/homePage_container'),
});

const BackStage = Loadable({
    loader: () => import('./pages/BackStage'),
});

const UserShow = Loadable({
    loader: () => import('./pages/UserShow'),
});

// 前端路由
export default class Entry extends Component {
    render() {
        return (
            <Provider store={store}>
                <HashRouter>
                    <Switch>
                        <Route path='/home' component={HomePage} />
                        <Route path='/login' component={loginPage} />
                        <Route path='/blog/:articleID' component={blogPage} />
                        <Route path='/edit/:articleID' component={EditArticlePage} />
                        <Route path='/my/:type' component={myInfoPage} />
                        <Route path='/editQuestion/:id' component={createQuestionNaire} />
                        <Route path='/question/:type' component={Question} />
                        <Route path='/back/:type/:id' component={BackStage} />
                        <Route path='/user/:id' component={UserShow} />
                        <Redirect to='/home' />
                    </Switch>
                </HashRouter>
            </Provider>
        )
    }
}