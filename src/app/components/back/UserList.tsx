import React, { useState, useEffect, useRef } from 'react'
import 'app/styles/back/userList.scss'
import staticUserList from 'model/userList.json'
import Loading2 from '../common/Loading2'
import { Table, Input, Button, Select } from 'antd'
import { IconFont, error } from '../common/config'
import { deepCopy } from '../common/utils'
const stylePrefix = 'back-userList'
const { Option } = Select;

interface userListItemConfig {
    key: number,
    username: string,
    nickname: string,
    role: number
}

export default function UserList() {
    const [userList, setUserList] = useState<userListItemConfig[]>([])
    const [loading, setLoading] = useState(false)
    const [mouseIndex, setMouseIndex] = useState<number | null>(null)
    const [editIndex, setEditIndex] = useState<number | null>(null) // 当前处于编辑状态的索引
    const [pageSize, setPageSize] = useState(1)
    const [current, setCurrent] = useState(1)
    const inputRef = useRef(null)
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
    // 表格的nav
    const columns = [
        {
            title: '昵称',
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
            title: '用户名',
            dataIndex: 'username',
        },
        {
            title: '角色',
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
            title: '操作',
            dataIndex: 'operation',
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
                    role: item.role
                }
            })
            setPageSize(staticUserList.data.pageSize)
            setUserList(handleUserList)
            setLoading(false)
        }, 1000);
    }
    const rowSelection = {
        onChange: (selectedRowKeys: any, selectedRows: any) => {
            console.log(selectedRowKeys)
            console.log(selectedRows)
        },
        //   getCheckboxProps: (record: userListItemConfig) => ({
        //     // disabled: record.name === 'Disabled User', // Column configuration not to be checked
        //     nickname: record.nickname,
        //   }),
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
                    : <Table
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
            }
        </div>
    )
}
