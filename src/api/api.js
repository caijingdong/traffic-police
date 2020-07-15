import request from './http'

export function MY_GET(url, params) {
    return request({
        method: 'get',
        url,
        params
    })
}
/*判断民警与辅警*/ 
export function ID_GET(url) {
    return request({
        method: 'get',
        url
    })
}
/*请求辅警列表信息*/ 
export function POLICE_GET_DATA(url) {
    return request({
        method: 'get',
        url
    })
}
/*请求辅警请假列表信息*/ 
export function LEAVE_GET_DATA(url,params) {
    return request({
        method: 'get',
        url,
        params
    })
}
/*登出*/ 
export function LAY_OUT(url) {
    return request({
        method: 'post',
        url
    })
}
export function PERSON_GET_DATA(url,params) {
    return request({
        method: 'get',
        url,
        params
    })
}
export function MY_POST_DATA(url, data) {
    return request({
        method: 'post',
        url,
        data
    })
}
/*登入账号*/ 
export function MY_POST_QUERY(url, params) {
    return request({
        method: 'post',
        url,
        params
    })
}

export function MY_POST_UPLOAD(url, data, params) {
    return request({
        url,
        method: 'post',
        headers: {
            'Content-Type': 'multipart/form-data'
        },
        data,
        params
    })
}