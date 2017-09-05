// http协议method
export const HttpMethod = {
    GET: 'get',
    POST: 'post'
};

// http协议头Content-Type
export const ContentType = {
    JSON: 'application/json',
    FORM_URLENCODED: 'application/x-www-form-urlencoded'
};

export const Event = {
    SHOW_LOADING: 'SHOW_LOADING',
    HIDE_LOADING: 'HIDE_LOADING'
};

/**
 * @desc Demo
 * 类型或状态封装示例代码, 正式开发时请删除 Demo代码段.
 * 后端返回类型或状态字段时一般为, 数字或字符串, 如: 0, 1 或 'BUSY', 'FREE'
 * 前端应封装为对象使用(如: UserLevel.NORMAL), 这样代码清晰, 便于维护.
 */
export const UserLevel = {
    NORMAL: 0,
    VIP: 1
};

export const UserStatus = {
    ENABLE: 'enable',
    DISABLE: 'disable'
};
/**
 * Demo end
 */