$(function () {
    function getUserInfo() {
        $.ajax({
            method: 'GET',
            url: '/my/userinfo',
            // 请求头配置对象
            // headers: {
            //     Authorization:localStorage.getItem('token') || ''
            // },
            success: function (res) {
                if (res.status !== 0) {
                    return layui.layer.msg('获取用户信息失败')
                }
                renderAvatar(res.data)
                
            }
            // 无论成功失败都会执行complete回调
            // complete: function (res) {
            //     if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
            //         localStorage.removeItem('token')
            //         location.href = '/login.html'
            //     }
            // }
           
        })
    }
    function renderAvatar(user) {
        var name = user.nickname || user.username
        $('#welcome').html('欢迎&nbsp;&nbsp' + name)
        if (user.user_pic !== null) {
            $('.layui-nav-img').attr('src', user.user_pic).show()
            $('.text-avatar').hide()
        } else {
            $('.layui-nav-img').hide()
            var first = name[0].toUpperCase()
            $('.text-avatar').html(first).show()
        }
    }
    var layer = layui.layer
    var form = layui.form
    form.verify({
        nickname: function (value) {
            if (value.length > 6) {
                return "昵称长度必须在1~6"
            }
        }
    })
    initUserInfo()
    function initUserInfo() {
        $.ajax({
            method: 'GET',
            url: '/my/userinfo',
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('获取用户信息失败')
                    
                }
                console.log(res);
                form.val('formUserInfo',res.data)
                
            }
            
        })
    }
    $('#btnReset').on('click', function (e) {
        e.preventDefault();
        // 阻止表单的默认重置事件
        initUserInfo()
    })
    $('.layui-form').on('submit', function(e) {
        // 阻止表单的默认提交行为
        e.preventDefault()
        // 发起 ajax 数据请求
        $.ajax({
          method: 'POST',
          url: '/my/userinfo',
          data: $(this).serialize(),
          success: function(res) {
            if (res.status !== 0) {
              return layer.msg('更新用户信息失败！')
            }
            layer.msg('更新用户信息成功！')
            // 调用父页面中的方法，重新渲染用户的头像和用户的信息
            getUserInfo()
          }
        })
      })
})