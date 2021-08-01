import React, {Component} from 'react';
import {connect} from "react-redux";
import {newPerson} from "../action/person";

class Person extends Component {
    addPerson = () => {
        const obj = {
            name: this.newName.value,
            age: this.newAge.value
        }
        this.props.newPerson(obj)
    }
    render() {
        return (
            <div>
                <h3>上方组件和{this.props.count}</h3>
                <input ref={c => this.newName = c} type="text"/>
                <input ref={c => this.newAge = c} type="text"/>
                <button onClick={this.addPerson}>addNewPerson</button>
                {
                    this.props.personArr.map(item => {
                        return <div key={Math.random()}>{item.name}---{item.age}</div>
                    })
                }
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