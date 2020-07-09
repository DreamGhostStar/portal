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

// const EditArticlePage = Loadable({
//     loader: () => import('./app/Page/editArticlePage'),
// });
  
// const Questionnaire = Loadable({
//     loader: () => import('./app/Page/questionnaire'),
// });
  
// const myInfoPage = Loadable({
//     loader: () => import('./app/Page/myInfoPage'),
// });
  
// const createQuestionNaire = Loadable({
//     loader: () => import('./app/Page/createQuestionNaire'),
// });

// const blogPage = Loadable({
//     loader: () => import('./app/Page/blogPage'),
// });

const HomePage = Loadable({
    loader: () => import('../containers/homePage_container'),
});

// const page_404 = Loadable({
//     loader: () => import('./app/Page/page_404'),
// });

// 前端路由
// TODO: 我的信息页面传递是文章还是消息
export default class Entry extends Component {
    render() {
        return (
            <Provider store={store}>
                <HashRouter>
                    <Switch>
                        <Route path='/home' component={HomePage} />
                        <Route path='/login' component={loginPage} />
                        {/* <Route path='/blog/:articleID' component={blogPage} />
                        <Route path='/edit/:articleID' component={EditArticlePage} />
                        <Route path='/question' component={Questionnaire} />
                        <Route path='/my/:type' component={myInfoPage} />
                        <Route path='/createQuestion' component={createQuestionNaire} />
                        <Route path='/404' component={page_404} /> */}
                        <Redirect to='/home' />
                    </Switch>
                </HashRouter>
            </Provider>
        )
    }
}