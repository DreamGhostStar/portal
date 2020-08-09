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

const Questionnaire = Loadable({
    loader: () => import('./pages/Questionnaire'),
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

const page_404 = Loadable({
    loader: () => import('./pages/Page_404'),
});

const BackStage = Loadable({
    loader: () => import('./pages/BackStage'),
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
                        {/* <Route path='/question' component={Questionnaire} /> */}
                        <Route path='/my/:type' component={myInfoPage} />
                        <Route path='/editQuestion/:id' component={createQuestionNaire} />
                        <Route path='/404' component={page_404} />
                        <Route path='/question/:type' component={Question} />
                        <Route path='/back/:type/:id' component={BackStage} />
                        <Redirect to='/home' />
                    </Switch>
                </HashRouter>
            </Provider>
        )
    }
}