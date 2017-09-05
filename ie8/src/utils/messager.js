
import { message } from 'antd';
import config from '../conf/base';

/**
 * @desc 封装了系统提示消息, 方便做全局配置或全局修改, 默认使用mtui的message组件
 */
export default {
    error: function(msg, durationTime = config.messagerDuration){
        
        message.error(msg, durationTime);
    }
};

