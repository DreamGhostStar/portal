import React, { useEffect, useState } from 'react'
import 'app/styles/homeSeconds/friend.scss'
import PointImg from 'images/point.png'
import AvatarShow from '../common/AvatarShow'
import classnames from 'classnames'
import { error, IconFont } from '../common/config'
import { goToElement, isSuccess } from '../common/utils'
import { get_friend_api } from 'app/http/user'

interface FrinedsInYear {
    year: string;
    data: FriendItemConfig[]
}

interface FriendItemConfig {
    id: number;
    nickname: string;
    avatar: string;
    isDefault: boolean;
    description: string;
}

export default function Friend() {
    const [friends, setFriends] = useState<FrinedsInYear[]>([])
    const [page, setPage] = useState(1)
    useEffect(() => {
        getFriend()
    }, [])
    const getFriend = async () => {
        const res = await get_friend_api();
        if (isSuccess(res.code)) {
            setFriends(res.data)
        } else {
            error(res.message)
        }
    }
    const buildControlPage = () => {
        const arr: any[] = [];
        for (let index = 0; index < friends.length / 3; index++) {
            arr.push(
                <div
                    key={index}
                    className={
                        classnames('select-point', {
                            'select-point-active': page === index + 1
                        })
                    }
                    onClick={() => setPage(index + 1)}
                ></div>
            )
        }
        return arr
    }
    return (
        <div className='friend' id='friend'>
            <h1 className='title'>虚心, 勇敢</h1>
            <img src={PointImg} className='img' alt="" />
            <div className='friend-show-layout' >
                {
                    friends.map((friendList, index) => {
                        if (index >= 3 * (page - 1) && index < 3 * page) {
                            return <div
                                key={index}
                                className='friend-list-layout'
                            >
                                <h2 className='year' >{friendList.year}</h2>
                                <div className='friend-list' >
                                    {
                                        friendList.data.map((friendItem, index) => {
                                            return <div
                                                key={index}
                                                className='friend-item'
                                            >
                                                {
                                                    friendItem.isDefault
                                                        ? <div className='img-default' >{friendItem.nickname[0]}</div>
                                                        : <AvatarShow
                                                            src={friendItem.avatar}
                                                            userID={friendItem.id}
                                                        />
                                                }
                                                <div className='info-layout'>
                                                    <p>{friendItem.nickname}</p>
                                                    <p>{friendItem.description}</p>
                                                </div>
                                            </div>
                                        })
                                    }
                                </div>
                            </div>
                        }
                    })
                }
            </div>
            <div className='select-layout'>
                {buildControlPage()}
            </div>
            <div className='love-up-layout' >
                <IconFont type='anticonicon4' className='love-icon' />
                <p className='description' >9999 次up</p>
                <h2 className='love-title'>来自隔着一个屏幕的 U</h2>
                <div className='up-arrow-layout' >
                    <IconFont type='anticonqianjin' className='up-arrow' onClick={() => goToElement('firstContent')} />
                </div>
            </div>
        </div>
    )
}