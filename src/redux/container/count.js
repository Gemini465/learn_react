import React, {Component, Fragment} from 'react';
import {connect} from "react-redux";
import {increment, decrement, incrementAsync} from "../action/count";

function CountFunc() {
    const [num, setNum] = React.useState(20)
    const [name, setName] = React.useState('ttttt')
    const inRef = React.useRef()
    React.useEffect(
        () => {
            // mounted
            console.log('watch', num, name);
            return () => {
                // 卸载前执行 todo
                console.log('destroy', num);
            }
        }, [num, name]
    )
    function addIt() {
        setNum(num => {
            console.log('setNum', num);
            return num + 2
        })
        setName(name => name + 1)
    }
    return (
        <Fragment key={Math.random()}>
            <h2>hooks测试----{num}----{name}</h2>
            <button onClick={addIt}>+1s</button>
            <input onInput={() => {console.log(inRef.current.value)}} ref={inRef} type="text"/>
        </Fragment>
    )
}

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
            <Fragment>
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
                <CountFunc/>
            </Fragment>
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