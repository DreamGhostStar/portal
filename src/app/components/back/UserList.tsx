import React, { useState, useEffect, useRef } from 'react'
import 'app/styles/back/userList.scss'
import staticUserList from 'model/userList.json'
import Loading2 from '../common/Loading2'
import { Table, Input, Button, Select, Modal } from 'antd'
import { IconFont, error, info, userConfig } from '../common/config'
import { deepCopy } from '../common/utils'
import store from 'redux/store'
import userDataModel from 'model/userInfo.json'
import UploadAvator from '../common/UploadAvator'
const stylePrefix = 'back-userList'
const { Option } = Select;
const { TextArea } = Input;

interface userListItemConfig {
    key: number,
    username: string,
    nickname: string,
    role: number,
    operation: string[]
}

export default function UserList() {
    const [userList, setUserList] = useState<userListItemConfig[]>([])
    const [loading, setLoading] = useState(false)
    const [mouseIndex, setMouseIndex] = useState<number | null>(null)
    const [editIndex, setEditIndex] = useState<number | null>(null) // 当前处于编辑状态的索引
    const [pageSize, setPageSize] = useState(1) // 总页数
    const [current, setCurrent] = useState(1) // 当前页数
    const [userInfoVisible, setUserInfoVisible] = useState(false) // 用户信息对话框开关
    const [messageVisible, setMessageVisible] = useState(false) // 用户信息对话框开关
    const [modalLoading, setModalLoading] = useState(false) // 对话框加载中状态
    const [userInfo, setUserInfo] = useState<userConfig | null>(null) // 对话框中用户数据
    const [selectUsers, setSelectUsers] = useState<number[]>([]) // 选中用户状态的id列表
    const inputRef = useRef(null)
    const nicknameRef = useRef(null)
    const yearRef = useRef(null)
    const mottoRef = useRef(null)
    const emailRef = useRef(null)
    const messageRef = useRef(null)
    const changeNickname = (key: number) => {
        const tempUserList: userListItemConfig[] = deepCopy(userList);
        const inputValue: string = (inputRef.current as any).state.value
        if (!inputValue) {
            error('昵称不允许为空')
            return;
        }
        tempUserList.map(userItem => {
            if (userItem.key === key) {
                userItem.nickname = inputValue
            }
            return null
        })
        setUserList(tempUserList)
        setEditIndex(null) // 退出编辑状态
        // TODO: 发送数据
    }
    const changeRole = (value: number, key: number) => {
        const tempUserList: userListItemConfig[] = deepCopy(userList);
        tempUserList.map(userItem => {
            if (userItem.key === key) {
                userItem.role = value
            }
            return null
        })
        setUserList(tempUserList)
        // TODO: 发送数据
    }
    const deleteUser = (id: number, role: number) => {
        if (role !== 3) {
            info('你没有权限进行该操作')
            return
        }
        console.log(id);
    }
    const modifyUser = (id: number, role: number) => {
        if (role === 3 || id === (store.getState().user as any).id) {
            setUserInfoVisible(true)
            //TODO: 获取数据
            setUserInfo(userDataModel)
            console.log(id);
        } else {
            info('你没有权限进行该操作')
        }
    }
    const handleOk = () => {
        const nickname = (nicknameRef.current as any).state.value;
        const year = (yearRef.current as any).state.value;
        const motto = (mottoRef.current as any).state.value;
        const email = (emailRef.current as any).state.value;
        setModalLoading(true)
        setTimeout(() => {
            console.log(nickname, year, motto, email);
            setUserInfoVisible(false)
            setModalLoading(false)
        }, 1000);
    }
    const sendMesage = () => {
        const value = (messageRef.current as any).state.value;
        console.log(value)
        console.log(selectUsers)
    }
    // 表格的nav
    const columns = [
        {
            title: selectUsers.length ? `已选择${selectUsers}个` : '昵称',
            dataIndex: 'nickname',
            width: '20%',
            render: (text: string, record: userListItemConfig) => {
                if (editIndex === record.key) {
                    return <div className={`${stylePrefix}-nickname-layout`}>
                        <Input placeholder="请输入昵称" ref={inputRef} />
                        <Button
                            type="primary"
                            className={`${stylePrefix}-save-btn`}
                            onClick={() => changeNickname(record.key)}
                        >保存</Button>
                    </div>
                } else {
                    return <div className={`${stylePrefix}-nickname-layout`}>
                        <div>{text}</div>
                        <IconFont
                            type='anticonxiugai1'
                            style={{
                                display: (mouseIndex === record.key ? 'block' : 'none')
                            }}
                            onClick={() => setEditIndex(record.key)}
                            className={`${stylePrefix}-icon`}
                        />
                    </div>
                }
            },
        },
        {
            title: selectUsers.length ? '' : '用户名',
            dataIndex: 'username',
        },
        {
            title: selectUsers.length ? '' : '角色',
            dataIndex: 'role',
            render: (text: number, record: userListItemConfig) => {
                return <Select defaultValue={text} style={{ width: 120 }} onChange={(value: number) => { changeRole(value, record.key) }} >
                    <Option value={1}>待考核</Option>
                    <Option value={2}>正式成员</Option>
                    <Option value={3}>管理员</Option>
                </Select>
            },
        },
        {
            title: selectUsers.length ? <Button type="primary" onClick={() => setMessageVisible(true)}>发送消息</Button> : '操作',
            dataIndex: 'operation',
            render: (text: string[], record: userListItemConfig) => {
                return <div className={`${stylePrefix}-operation-layout`}>
                    {
                        text.map((item, index) => {
                            return <Button
                                type="link"
                                key={index}
                                onClick={index === 0 ? () => modifyUser(record.key, record.role) : () => deleteUser(record.key, record.role)}
                            >{item}</Button>
                        })
                    }
                </div>
            },
        },
    ]
    useEffect(() => {
        getUserList()
    }, [])
    const getUserList = async () => {
        setLoading(true)
        setTimeout(() => {
            const handleUserList: userListItemConfig[] = staticUserList.data.data.map(item => {
                return {
                    key: item.id,
                    username: item.username,
                    nickname: item.nickname,
                    role: item.role,
                    operation: item.id === (store.getState().user as any).id ? ['修改'] : ['修改', '删除']
                }
            })
            setPageSize(staticUserList.data.pageSize)
            setUserList(handleUserList)
            setLoading(false)
        }, 1000);
    }
    const rowSelection = {
        onChange: (selectedRowKeys: any, selectedRows: any) => {
            setSelectUsers(selectedRowKeys)
            console.log(selectedRowKeys)
            console.log(selectedRows)
        },
    };
    const handleTableChange = (pagination: any) => {
        setCurrent(pagination.current)
        getUserList();
    };
    return (
        <div className={`${stylePrefix}-layout`}>
            {
                loading && userList.length
                    ? <div className={`${stylePrefix}-loading-layout`}>
                        <Loading2 backgroundColor='#eee' />
                    </div>
                    : <>
                        <Table
                            onRow={record => {
                                return {
                                    onMouseEnter: () => setMouseIndex(record.key), // 鼠标移入行
                                    onMouseLeave: () => setMouseIndex(null), // 移出
                                };
                            }}
                            rowSelection={{
                                ...rowSelection,
                            }}
                            pagination={{
                                current: current,
                                pageSize: 6,
                                total: 6 * pageSize,
                                showSizeChanger: false, // 不展示pageSize切换器
                            }}
                            columns={columns}
                            dataSource={userList}
                            onChange={handleTableChange}
                        />
                        <Modal
                            visible={userInfoVisible}
                            onOk={handleOk}
                            onCancel={() => setUserInfoVisible(false)}
                            footer={[
                                <Button key="back" onClick={() => setUserInfoVisible(false)}>
                                    返回
                                </Button>,
                                <Button key="submit" type="primary" loading={modalLoading} onClick={handleOk}>
                                    提交
                                </Button>,
                            ]}
                        >
                            {
                                userInfo && <div className={`${stylePrefix}-info-layout`}>
                                    <div className={`${stylePrefix}-img-layout`}>
                                        <UploadAvator
                                            img={userInfo.avatar}
                                            saveImg={(url: string) => setUserInfo({
                                                ...userInfo,
                                                avatar: url
                                            })}
                                        />
                                    </div>
                                    <div className={`${stylePrefix}-input-layout`}>
                                        <Input defaultValue={userInfo.nickname} placeholder="请输入用户的昵称" className={`${stylePrefix}-input`} ref={nicknameRef} />
                                        <Input defaultValue={userInfo.year} placeholder="请输入用户的年级" className={`${stylePrefix}-input`} ref={yearRef} />
                                        <TextArea rows={4} defaultValue={userInfo.motto} placeholder='请输入用户简介' className={`${stylePrefix}-input`} ref={mottoRef} />
                                        <Input defaultValue={userInfo.email} placeholder="请输入用户的邮箱" className={`${stylePrefix}-input`} ref={emailRef} />
                                    </div>
                                </div>
                            }
                        </Modal>
                        <Modal
                            visible={messageVisible}
                            onOk={handleOk}
                            onCancel={() => setMessageVisible(false)}
                            footer={[
                                <Button key="back" onClick={() => setMessageVisible(false)}>
                                    返回
                                </Button>,
                                <Button key="submit" type="primary" loading={modalLoading} onClick={sendMesage}>
                                    提交
                                </Button>,
                            ]}
                        >
                            <TextArea
                                rows={4}
                                className={`${stylePrefix}-message`}
                                placeholder='请输入你想发送的消息内容'
                                ref={messageRef}
                            />
                        </Modal>
                    </>
            }
        </div>
    )
}
