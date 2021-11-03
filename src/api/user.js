import request from '../util/request';

class User {

    login(params) {
        return request({
            url: '/api/login',
            method: 'post',
            data: params
        })
    }

    queryUserList(params) {
        return request({
            url: '/api/user/list',
            method: 'get',
            params
        })
    }

    newUser(params) {
        return request({
            url: '/api/user/create',
            method: 'post',
            data: params
        })
    }

    deleteUser(params) {
        return request({
            url: '/api/user/delete',
            method: 'post',
            data: params
        })
    }

    updateUser(params) {
        return request({
            url: '/api/user/update',
            method: 'post',
            data: params
        })
    }

    userGraphql(params) {
        return request({
            url: '/graphql',
            method: 'post',
            data: params
        })
    }

}

export default new User();