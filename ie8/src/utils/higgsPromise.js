import qs from 'qs';
import axios from 'axios';
import emitter from './emitter';
import config from '../conf/base';
import info from '../constants/info';
import { HttpMethod, ContentType, Event } from '../constants/enum';
import { isString, isArray, isFormData, isIE, isBlank, isEmpty, isNotEmpty, isNotBlank } from './util';

/**
 * @author Stephen Liu
 * @desc 使用axios第三方库访问后台服务器, 返回封装过后的Promise对象.
 * @param {string} url 请求的接口地址, 格式: "/xxx...".
 * @param {string} domain 跨域请求的域名地址, 如: http://www.baidu.com
 * @param {object} data 请求的数据, object对象格式.
 * @param {function} onUpload 上传文件过程中的回调函数, 接收progressEvent参数.
 * @param {function} onDownload 下载文件过程中的回调函数, 接收progressEvent参数.
 * @param {function} cancel 取消请求的回调函数, 接收cancel参数, 当执行cancel()参数时请求被取消.
 * @param {boolean} enableLoading 是否开启loading动画, 默认 type 为 POST 时显示.
 * @param {boolean} handleError 是否自动处理接口报错情况, 默认true.
 * @param {string} type HTTP请求方式, 默认GET.
 * @param {boolean} cache 是否开启缓存, 开启后同样的请求(url相同, 参数相同), 第二次请求时会直接返回缓存数据, 不会请求后台数据, 默认false.
 * @param {number} timeout 配置请求超时时间, 为毫秒数, 默认从配置文件读取.
 * @param {boolean} messager 错误信息提示插件, 该插件为一个对象, 并且该对象需要有一个error方法, 方法接收一个错误消息.
 * @param {string} contentType HTTP请求头的Content-Type, 如: 'application/x-www-form-urlencoded'
 * @param {function} beforeSend 在发送请求前对请求数据进行预处理, 函数接收1个参数, 为请求的数据, 返回处理后的数据.
 * @param {function} dataFilter 接受到响应后对响应数据进行过滤处理, 函数接受2个参数, 返回的数据和请求时的config对象, 返回过滤后的数据.
 * @param {function} handleResponse 对响应数据进行解析, 可根据不同业务场景自定义Promise是resolve还是reject.
 * @return {object} - 返回一个promise的实例对象.
 */
export default function HiggsPromise(options) {

    var {
        url = null,
        domain = null,
        data = null,
        onUpload = null,
        onDownload = null,
        cancel = null,
        enableLoading = config.higgsPromise.enableLoading,
        handleError = config.higgsPromise.handleError,
        type = config.higgsPromise.type,
        cache = config.higgsPromise.cache,
        timeout = config.higgsPromise.timeout,
        messager = config.higgsPromise.messager,
        contentType = config.higgsPromise.contentType,
        beforeSend  = config.higgsPromise.beforeSend,
        dataFilter = config.higgsPromise.dataFilter,
        handleResponse = config.higgsPromise.handleResponse
    } = options;

    var getData;
    var postData;
    var cancelToken;
    var crossDomain = false;

    if (isEmpty(url)) {
        return Promise.resolve();
    }

    // 预处理数据
    if(beforeSend){
        data = beforeSend(data);
    }

    // type 为 POST 的请求会将参数转化为 formData 传递
    if (type === HttpMethod.POST) {
        postData = data;
        // 根据配置的 contentType 对数据进一步处理
        switch (contentType){
            case ContentType.FORM_URLENCODED:
                if(isNotEmpty(postData) && !isFormData(postData)){
                    postData = qs.stringify(postData, {allowDots: true});
                }
                break;
        }
    } else {
        getData = data;
    }

    if (isNotEmpty(domain)) {
        crossDomain = true;
    }

    if (__DEV__) {
        // 满足某些接口需要解析域名的情况
/*        if(isEmpty(domain) && isNotEmpty(localDomain)){
            domain = localDomain;
        }*/
    }

    if (isNotEmpty(cancel)) {
        cancelToken = new axios.CancelToken(cancel);
    }

    if(!/^\//.test(url)){
        url = '/' + url;
    }

    if(!cache) {
        url += '?t=' + new Date().getTime();
    }

    if (__DEV__) {
        if(__MOCK__){
            url = '/mock' + url;
        }else{
            url = '/api' + url;
        }
        log({url, domain, type, data}, 'Request');
    }

    showLoading(type, enableLoading);

    var promise = new Promise(function (resolve, reject) {
        axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
        axios.defaults.headers.post['Content-Type'] = contentType;

        var httpRequest = axios({
            method: type,
            baseURL: domain,
            url: url,
            timeout: timeout,
            params: getData,
            data: postData,
            withCredentials: crossDomain,       // 跨域请求带cookie
            onUploadProgress: onUpload,
            onDownloadProgress: onDownload,
            cancelToken: cancelToken
        }).then(function (response) {
            hideLoading(response.config, enableLoading);

            if (isBlank(response.data)) {
                console.error(info['RESPONSE_ERROR'], response);
                reject(response);
            } else {
                var responseData = response.data;
                if (isString(responseData)) {
                    try {
                        responseData = JSON.parse(responseData);
                    } catch (e) {
                        try {
                            /* eslint-disable no-eval */
                            responseData = eval('(' + responseData + ')');
                            /* eslint-enable no-eval */
                        } catch (e) {
                            console.error(info['DATA_TRANSFORM_ERROR'], e);
                            reject(e);
                            return;
                        }
                    }
                }
                // 后台新老接口返回字段兼容性处理, 并将后台返回数据统一封装为{data, code, msg, success}格式
                if(dataFilter){
                    responseData = dataFilter.call(options, responseData);
                }

                if (__DEV__) {
                    log(responseData, 'Response');
                }

                if(handleResponse){
                    handleResponse.call(options, responseData, resolve, reject);
                }else{
                    resolve(responseData);
                }
            }
        }).catch(function (error) {
            hideLoading(error.config, enableLoading);
            // 服务端返回的异常
            if (error.response) {
                if(handleError){
                    messager.error(info['SYSTEM_ERROR']);
                }
                console.error(error.response);
                reject(error.response);
            // 浏览器抛出的异常, 不同浏览器可能有不同的行为
            } else {
                if(handleError){
                    /*
                     * HACK: 此处做延迟处理是为解决firefox上多请求的弹窗bug
                     */
                    setTimeout(() => {
                        messager.error(info['BROWSER_ERROR']);
                    }, 1000);
                }
                console.error(error);
                reject(error);
            }
        });
    });

    return promise;
}

function showLoading(method, isShow) {
    if (isShow || (isShow === null && method === HttpMethod.POST)) {
        emitter.emit(Event.SHOW_LOADING);
    }
}

function hideLoading(config, isShow) {
    if (isShow || (isShow === null && config.method === HttpMethod.POST)) {
        emitter.emit(Event.HIDE_LOADING);
    }
}

function log(data, title) {
    /* eslint-disable no-console */
    if (title) {
        console.log(title + ' start');
    }

    if(isIE()){
        console.log(JSON.stringify(data));
    }else{
        console.log(data);
    }

    if (console.table && isArray(data.data)) {
        console.table(data.data);
    }

    if (title) {
        console.log(title + ' end');
    }
    /* eslint-enable no-console */
}

Promise.prototype.done = function (onFulfilled, onRejected) {
    this.then(onFulfilled, onRejected)
        .catch(function (reason) {
            // 抛出一个全局错误
            setTimeout(() => {
                throw reason;
            }, 0);
        });
};

Promise.prototype.finally = function (callback) {
    let P = this.constructor;
    return this.then(
        value => P.resolve(callback(value)).then(() => value),
        reason => P.resolve(callback(reason)).then(() => {
            throw reason;
        })
    );
};