/**
 * @author Stephen Liu
 * @desc 封装了localStorage和sessionStorage的使用, 可直接保存, 获取对象.
 */
export function setLocal(name, value) {
    var data = value;
    if (typeof(data) !== 'string') {
        if (typeof(data) === 'undefined') {
            data = null;
        } else {
            data = JSON.stringify(data);
        }
    }
    localStorage.setItem(name, data);
}

export function getLocal(name) {
    var data = localStorage.getItem(name);
    try {
        return JSON.parse(data);
    } catch (e) {
        return data;
    }
}

export function setSession(name, value) {
    var data = value;
    if (typeof(data) !== 'string') {
        if (typeof(data) === 'undefined') {
            data = null;
        } else {
            data = JSON.stringify(data);
        }
    }
    sessionStorage.setItem(name, data);
}

export function getSession(name) {
    var data = sessionStorage.getItem(name);
    try {
        return JSON.parse(data);
    } catch (e) {
        return data;
    }
}

export function remove(name) {
    if (sessionStorage.getItem(name)) {
        sessionStorage.removeItem(name);
    }
    if (localStorage.getItem(name)) {
        localStorage.removeItem(name);
    }
}

export function clear(){
    sessionStorage.clear();
    localStorage.clear();
}