import React, {Component} from 'react';
import {connect} from "react-redux";
import {increment, decrement, incrementAsync} from "../action/count";

class Count extends Component {
    numRef = React.createRef()
    increment = () => {
        this.props.increment(+this.numRef.current.value)
    }
    decrement = () => {
        this.props.decrement(+this.numRef.current.value)
    }
    incrementOdd = () => {
        const {value} = this.numRef.current
        if (this.props.count % 2 !== 0) {
            this.props.increment(+value)
        } else {
            alert('error')
        }
    }
    incrementAsync = () => {
        this.props.incrementAsync(+this.numRef.current.value, 1000)
    }
    render() {
        return (
            <div>
                <h2>Count组件求和{this.props.count}，下方组件总人数为{this.props.personCount}</h2>
                <select ref={this.numRef}>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                </select>
                <button onClick={this.increment}>+</button>
                <button onClick={this.decrement}>-</button>
                <button onClick={this.incrementOdd}>奇数时加</button>
                <button onClick={this.incrementAsync}>异步加</button>
            </div>
        );
    }
}

export default connect(
    state => ({
        count: state.count,
        personCount: state.personArr.length
    }),
    {
        increment,
        decrement,
        incrementAsync
    }
)(Count);