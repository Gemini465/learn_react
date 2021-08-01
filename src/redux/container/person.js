import React, {Component} from 'react';
import {connect} from "react-redux";
import {newPerson} from "../action/person";

class Person extends Component {
    state = {
        name: 'aaa',
        age: 14
    }
    addPerson = () => {
        const obj = {
            name: this.newName.value,
            age: this.newAge.value
        }
        this.props.newPerson(obj)
    }
    setStateObj = () => {
        this.setState({
            name: 'bbbb'
        }, () => {
            // callback在render后执行
            console.log(this.state);
        })
    }
    setStateFunc = () => {
        this.setState((state, props) => {
            console.log(state, props);
            return {name: state.name + props.count}
        }, () => {
            // callback在render后执行
            console.log(this.state);
        })
    }
    render() {
        return (
            <div>
                <h3>上方组件和{this.props.count}</h3>
                <h4>{this.state.name}</h4>
                <input ref={c => this.newName = c} type="text"/>
                <input ref={c => this.newAge = c} type="text"/>
                <button onClick={this.addPerson}>addNewPerson</button>
                {
                    this.props.personArr.map(item => {
                        return <div key={Math.random()}>{item.name}---{item.age}</div>
                    })
                }
                <button onClick={this.setStateObj}>setStateObj</button>
                <button onClick={this.setStateFunc}>setStateFunc</button>
            </div>
        );
    }
}

export default connect(
    state => ({
        count: state.count,
        personArr: state.personArr
    }),
    {
        newPerson
    }
)(Person);