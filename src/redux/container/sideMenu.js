import React, {Component} from 'react'
import {Menu} from "antd"
import { ChromeOutlined } from '@ant-design/icons'
import { Link, withRouter } from "react-router-dom";
import {connect} from 'react-redux'
import menuList from '../../config/menuConfig'
import {setHeaderTitle} from "../action/sideMenu";
import '../../style/leftMneu.less'

class LeftNav extends Component {
    geneMenu = arr => {
        return arr.map(item => {
            if (item.children) {
                return (
                    <Menu.SubMenu
                        key={item.key}
                        title={<span>{item.title}</span>}
                    >
                        {this.geneMenu(item.children)}
                    </Menu.SubMenu>
                )
            } else {
                return (
                    <Menu.Item key={item.key}>
                        <Link to={item.key}>
                            <span>{item.title}</span>
                        </Link>
                    </Menu.Item>
                )
            }
        })
    }

    getCurrentReqParentPath(arr, getCurrentReqPath) {
        arr.forEach((element) => {
            if (element.children) {
                element.children.forEach((cItem) => {
                    if (getCurrentReqPath.includes(cItem.key)) {
                        // 得到需要展开的key
                        this.getCurrentReqParentPath = element.key;
                    }
                });
            }
        });
    }

    render() {
        let getCurrentReqPath = this.props.location.pathname;
        if (getCurrentReqPath.includes("/product")) {
            getCurrentReqPath = "/product";
        }
        const getCurrentReqParentPath = this.getCurrentReqParentPath;
        return (
            <div>
                <div className="left-nav">
                    <Link to="/">
                        <div className="left-nav-header">
                            <h1 className="left-nav-header-content">
                                <ChromeOutlined /> 欢迎使用
                            </h1>
                        </div>
                    </Link>
                    <div className='left-nav-content'>
                        <Menu
                            mode="inline"
                            theme="dark"
                            selectedKeys={[getCurrentReqPath]}
                            defaultOpenKeys={[getCurrentReqParentPath]}
                        >
                            {this.geneMenu(menuList)}
                        </Menu>
                    </div>
                </div>
            </div>
        )
    }
}

// LeftNav.propTypes = {
//     setHeadTitle: PropTypes.func.isRequired,
//     userInfo: PropTypes.object.isRequired,
// }

const mapStateToProps = state => ({
    userInfo: state.login
})

const mapDispatchToProps = dispatch => ({
    setHeadTitle: title => {
        dispatch(setHeaderTitle(title))
    }
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withRouter(LeftNav))
