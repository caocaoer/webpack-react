/**
 * @desc 所有后台数据请求应封装在/services目录中, 文件名应与请求的一级url对应, 如/user/add, 文件名应该为user.js, 并且/user/xxx中的所有请求都写在该文件中.
 * Demo:
 * url: /user/xxxx/xxxx
 * 对应/services中目录结构为:
 *   service/user.js
 *     |-function addUser               /user/add
 *     |-function editUser              /user/edit
 *     |-function getUserDetailById     /user/detail
 *     |-function getUserList           /user/list
 */
import { HttpMethod } from '../constants/enum';
import HiggsPromise from '../utils/higgsPromise';

// url: 请求路径, type: 请求方法, 默认为get(可不填), data: 请求数据, 更多参数请查看HiggsPromise对象
export function addUser(user) {
    return HiggsPromise({
        url: '/demo/add',
        type: HttpMethod.POST,
        data: user
    });
}
// POST请求
export function editUser(user) {
    return HiggsPromise({
        url: `/demo/edit/${user.id}`,
        type: HttpMethod.POST,
        data: user
    });
}

// Get请求(默认)
export function getUserDetailById(id) {
    return HiggsPromise({
        url: `/demo/detail/${id}.do`
    });
}

export function getUserList() {
    return HiggsPromise({
        url: '/demo/list.do'
    });
}
