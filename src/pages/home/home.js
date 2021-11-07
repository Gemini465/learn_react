import React, {Component} from 'react'
import '../../style/homepage.less'

export default class Home extends Component {
    state = {
        homeClassname: 'homepage',
    }
    shiftName = () => {
        this.setState(state => {
            return {
                homeClassname: state.homeClassname === 'homepage' ? 'wholeHomepage' : 'homepage'
            }
        })
    }
    render() {
        return (
            <div onClick={this.shiftName} className={this.state.homeClassname}>welcome to NYs2QeMWy</div>
        )
    }
}