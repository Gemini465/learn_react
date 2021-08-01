import {NEW_PERSON} from "../constant";

export default function newPerson(preState = [], action) {
    const {type, data} = action
    switch (type) {
        case NEW_PERSON:
            return [data, ...preState]
        default:
            return preState
    }
}