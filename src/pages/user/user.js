import React, { Component } from "react";
import { Card, Button, Modal, Form, Input, message, Table, Popconfirm} from "antd";
import userApi from '../../api/user'

const {Item} = Form

export default class User extends Component {
    userRef = React.createRef()
    wsRef = React.createRef()
    state = {
        visible: false,
        confirmLoading: false,
        loading: false,
        isUpdate: false,
        record: {},
        roles: [],
        tableData: [],
        initialValues: {username: '', password: ''},
        cardTitle: (
            <Button
                type="primary"
                onClick={e => {
                    e.stopPropagation()
                    this.showModal(false)
                }}
            >新增用户</Button>
        ),
        columns: [
            {
                title: 'username',
                dataIndex: 'username',
            },
            {
                title: 'password',
                dataIndex: 'password',
            },
            {
                title: '创建时间',
                dataIndex: 'create_time',
                sorter: (a, b) => a.create_time - b.create_time,
                sortDirections: ['descend', 'ascend'],
                render: create_time => create_time
            },
            {
                title: '操作',
                render:(record)=>(
                    <Popconfirm
                        title="确认删除?"
                        onConfirm={(e)=>{e.stopPropagation();this.deleteUser(record)}}
                        okText="确定"
                        cancelText="取消"
                    >
                        <Button type='link'>删除</Button>
                        <Button type='link' onClick={(e)=>{e.stopPropagation();this.showModal(record)}}>更新</Button>
                    </Popconfirm>
                )
            },
        ]
    }
    showModal = record => {
        this.setState({
            visible: true,
            isUpdate: record ? true : false,
            record
        })
    }
    hideModal = () => {
        this.userRef.current.resetFields()
        this.setState({
            visible: false,
            confirmLoading: false
        })
    }
    newUser = async values => {
        const {username, password} = values
        const res = await userApi.newUser({username, password: btoa(password)})
        this.userRef.current.resetFields()
        this.hideModal()
        if (res.status === 0) {
            message.success('添加成功')
            this.queryUserList()
        } else {
            message.error(res.msg)
        }
    }
    deleteUser = async record => {
        this.setState({loading: true})
        const res = await userApi.deleteUser({_id: record._id})
        if (res) {
            this.setState({loading: false})
            message.success('删除成功')
            this.queryUserList()
        }
    }
    queryUserList = async() => {
        this.setState({loading: true})
        const res = await userApi.queryUserList({userName: ''})
        this.setState({
            loading: false,
            tableData: res.data.users
        })
    }
    createUser = async () => {
        const res = await userApi.newUser({username: 'root', password: btoa('admin')})
        if (res.status === 0) {
            message.success("添加成功")
        }
    }
    updateUser = async () => {
        const res = await userApi.updateUser({_id: "61758a92f2de034b24f61877", username: 'admin', password: btoa('admin')})
        if (res.status === 0) {
            message.success("更新成功")
        }
    }
    graphqlUser = async () => {
        const query = `
            query UserList($username: String) {
                userList(username: $username) {
                    username
                }
            } 
        `
        const variables = { username: 'admin' }
        const res = await userApi.userGraphql({query, variables})
        console.log('===', res);
    }
    sendText = () => {
        const t = this.wsRef.current.state.value
        const ws = new WebSocket('ws://127.0.0.1:8888')
        /**
         * readyState
         * 0 链接还没建立（链接正在建立）
         * 1 链接建立完成
         * 2 链接正在关闭
         * 3 链接已经关闭
         */
        console.log(ws.readyState);
        ws.onopen = () => {
            console.log(ws.readyState)
            ws.send(t)
        }
        ws.onmessage = msg => {
            console.log('msg', msg);
        }
    }
    componentDidMount() {
        this.queryUserList()
    }

    render() {
        const { visible, confirmLoading, loading, tableData, isUpdate, initialValues, cardTitle, columns } = this.state
        return (
            <Card title={cardTitle}>
                <Modal
                    title={isUpdate ? '更新用户' : '创建用户'}
                    visible={visible}
                    onOk={this.newUser}
                    confirmLoading={confirmLoading}
                    onCancel={this.hideModal}
                    footer={null}
                >
                    <Form ref={this.userRef} initialValues={initialValues} onFinish={this.newUser} className="login-Form">
                        <Item label="用户名" name="username">
                            <Input placeholder="用户名"/>
                        </Item>
                        <Item label="密&nbsp;&nbsp;&nbsp;&nbsp;码" name="password">
                            <Input type="password" placeholder={isUpdate ? '旧密码' : '请输入密码'}/>
                        </Item>
                        {isUpdate ? <Item label="新密码" name="newpwd"><Input placeholder="新密码"/></Item> : null}
                        {isUpdate ? <Item label="新密码" name="newpwdtwo"><Input placeholder="重复新密码"/></Item> : null}
                        <Item>
                            <Button onClick={this.hideModal}>取消</Button>
                            <Button type="primary" htmlType="submit">确认</Button>
                        </Item>
                    </Form>
                </Modal>
                <Table
                    dataSource={tableData}
                    columns={columns}
                    bordered
                    loading={loading}
                    rowKey={'_id'}
                    size={'small'}
                    pagination={{
                        defaultCurrent: 1,
                        pageSize: 20,
                        total: tableData.length
                    }}
                />
                <Button onClick={this.graphqlUser}>列表查询</Button>
                <Button onClick={this.queryUserList}>新增用户</Button>
                <Button onClick={this.deleteUser}>删除用户</Button>
                <Button onClick={this.updateUser}>修改用户</Button>
                <Input ref={this.wsRef}/>
                <Button onClick={this.sendText}>发送</Button>
            </Card>
        )
    }
}