import request from '../util/request';

class User {

    login(params) {
        return request({
            url: '/user/login',
            method: 'post',
            data: params
        })
    }

}

export default new User();