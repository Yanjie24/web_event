// 每次调用get post时会先调用这个函数，在这个函数中可以拿到给ajax提供的配置对象
$.ajaxPrefilter(function (options) {
    options.url = 'http://api-breakingnews-web.itheima.net' + options.url
    // 统一为有权限的接口设置headers请求头
    if (options.url.indexOf('/my') !== -1) {
        options.headers = {Authorization:localStorage.getItem('token') || ''}
    }


    options.complete = function (res) {
        if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
            localStorage.removeItem('token')
            location.href = '/login.html'
        }
    }
    
 })