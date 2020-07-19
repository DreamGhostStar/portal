import React from 'react'
import logo from '../../../images/TechF5veBlack.png'
import '../../styles/comon/header.scss'
import AvatorShowContainer from '../../../containers/AvatorShow_container'
import { useHistory } from 'react-router-dom'

import store from '../../../redux/store'
import { Provider } from 'react-redux'

interface HeaderConfig {
    title: string
}

export default function Header({ title }: HeaderConfig) {
    let history = useHistory()
    const backHome = () => {
        history.push(`/home`);
    }
    return (
        <div className='header'>
            <img src={logo} alt="logo" className='logo' onClick={backHome} />
            <p className='label'>{title}</p>
            <Provider store={store}>
                <AvatorShowContainer
                    top={1}
                    labelTop={65}
                />
            </Provider>
        </div>
    )
}