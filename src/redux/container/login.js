import React, {Component} from 'react';
import {Form, Input, Button} from "antd";
import {SmileOutlined, SendOutlined} from "@ant-design/icons";
import {connect} from 'react-redux';
import {Redirect} from "react-router-dom";
import {getUserInfo} from "../action/login";
import '../../style/login.less'

class Login extends Component {
   loginFormRef = React.createRef()
   state = {
      href: 'http://beian.miit.gov.cn/',
      target: '_black',
      text: '粤ICP备19121998号'
   }
   handleSubmit = async value => {
      console.log('props', this.props)
      console.log('form value', value)
      this.props.getUserInfo(
         {username: btoa(value.username), password: btoa(value.password)}
      )
   }
   validatorPwd = (rule, value, callback) => {
      // 无论验证成功与否callback()必须调用
      if (!value) {
         callback('请输入密码！')
      } else if (value.length < 4 || value.length > 12) {
         callback('密码长度应大于4小于12位！') //验证不通过传入错误提示
      }
      callback()//验证成功无提示
   }
   render() {
      const {userInfo} = this.props
      if(userInfo._id){
         return <Redirect to='/home'/>
      }
      return (
         <div className='login'>
            <div className='content'>
               <section className='login-form'>
                  <div className='login-label'><span>管理平台</span></div>
                  <Form ref={this.loginFormRef} onFinish={this.handleSubmit}>
                     <Form.Item name="username">
                        <Input
                           prefix={<SmileOutlined style={{color: 'rgba(0,0,0,.25)'}}/>}
                           placeholder="用户名"
                        />
                     </Form.Item>
                     <Form.Item name="password">
                        <Input
                           prefix={<SendOutlined style={{color: 'rgba(0,0,0,.25)'}}/>}
                           type="password"
                           placeholder="密码"
                        />
                     </Form.Item>
                     <Form.Item>
                        <Button
                           type="primary"
                           htmlType="submit"
                           className='login-btn'
                        >
                           登录
                        </Button>
                     </Form.Item>
                  </Form>
               </section>
            </div>
            <div className='footer'>
               <div className='content'>
                  Made with ❤ by XT
               </div>
            </div>
         </div>
      );
   }
}

export default connect(
   state => ({
      userInfo: state.login
   }),
   {
      getUserInfo
   }
)(Login);