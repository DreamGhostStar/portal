import React, { useState, useEffect, useRef } from 'react'
import 'app/styles/back/userList.scss'
import staticUserList from 'model/userList.json'
import Loading2 from '../common/Loading2'
import { Table, Input, Button, Select } from 'antd'
import { IconFont, error, info, userConfig, success } from '../common/config'
import { deepCopy, isSuccess } from '../common/utils'
import store from 'redux/store'
import AlterUserInfo from './AlterUserInfo'
import SendMessaeModal from './SendMessaeModal'
import { admin_alter_user_nickname_api, admin_alter_user_role_api, admin_delete_user_info_api, get_user_detail_api } from 'app/http/user'
const stylePrefix = 'back-userList'
const { Option } = Select;

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
    const [userInfo, setUserInfo] = useState<userConfig | null>(null) // 对话框中用户数据
    const [selectUsers, setSelectUsers] = useState<number[]>([]) // 选中用户状态的id列表
    const inputRef = useRef(null)
    // 管理员修改用户昵称
    const changeNickname = async (key: number) => {
        const tempUserList: userListItemConfig[] = deepCopy(userList);
        const inputValue: string = (inputRef.current as any).state.value
        if (!inputValue) {
            error('昵称不允许为空')
            return;
        }
        const res = await admin_alter_user_nickname_api({ userID: key, nickname: inputValue })
        if (isSuccess(res.code)) {
            success('修改成功')
            tempUserList.map(userItem => {
                if (userItem.key === key) {
                    userItem.nickname = inputValue
                }
                return null
            })
            setUserList(tempUserList)
            setEditIndex(null) // 退出编辑状态
        } else {
            error(res.message)
        }
    }
    // 管理员修改用户权限
    const changeRole = async (value: number, key: number) => {
        const res = await admin_alter_user_role_api({ userID: key, role: value })
        if (isSuccess(res.code)) {
            success('修改成功')
            const tempUserList: userListItemConfig[] = deepCopy(userList);
            tempUserList.map(userItem => {
                if (userItem.key === key) {
                    userItem.role = value
                }
                return null
            })
            setUserList(tempUserList)
        } else {
            error(res.message)
        }
    }
    // 删除用户
    const deleteUser = async (id: number, role: number) => {
        if (role !== 3) {
            info('你没有权限进行该操作')
            return
        }
        const res = await admin_delete_user_info_api({ userID: id })
        if (isSuccess(res.code)) {
            success('删除成功')
        } else {
            error(res.message)
        }
    }
    // 打开修改用户对话框
    const modifyUser = async (id: number, role: number) => {
        if (role === 3 || id === (store.getState().user as any).id) {
            setUserInfoVisible(true)
            // 获取用户详细数据
            const res = await get_user_detail_api({ userID: id })
            if (isSuccess(res.code)) {
                setUserInfo(res.data)
            } else {
                error(res.message)
            }
        } else {
            info('你没有权限进行该操作')
        }
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
                                onClick={index === 0
                                    ? () => modifyUser(record.key, record.role)
                                    : () => deleteUser(record.key, record.role)}
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
                                pageSize: 10,
                                total: 10 * pageSize, // 每页10个
                                showSizeChanger: false, // 不展示pageSize切换器
                            }}
                            columns={columns}
                            dataSource={userList}
                            onChange={handleTableChange}
                        />
                        <AlterUserInfo
                            visible={userInfoVisible}
                            setVisible={setUserInfoVisible}
                            userInfo={userInfo}
                            setUserInfo={setUserInfo}
                        />
                        <SendMessaeModal
                            visible={messageVisible}
                            setVisible={setMessageVisible}
                            selectUsers={selectUsers}
                        />
                    </>
            }
        </div>
    )
}
