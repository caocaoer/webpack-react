/**
 * @desc 项目配置文件
 */
import info from '../constants/info';
import messager from '../utils/messager';
import { isNotEmpty } from '../utils/util';
import { HttpMethod, ContentType } from '../constants/enum';

export default {
    messagerDuration: 3,                        // 系统提示信息显示时间, 默认3秒
    higgsPromise: {                                // higgsPromise默认配置
        cache: false,
        timeout: 10000,
        handleError: true,
        messager: messager,
        enableLoading: null,                       // 默认post请求时会显示loading动画
        type: HttpMethod.GET,                      // 默认请求方式
        contentType: ContentType.JSON   // API接口请求默认发送的contentType
    }
};