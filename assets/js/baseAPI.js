// 每次调用get post时会先调用这个函数，在这个函数中可以拿到给ajax提供的配置对象
$.ajaxPrefilter(function (options) {
    options.url = 'http://api-breakingnews-web.itheima.net' + options.url
 })