$(function () {
    $('#link_reg').on('click', function () {
        $('.login-box').hide()
        $('.reg-box').show()
    })
    $('#link_login').on('click', function () {
        $('.login-box').show()
        $('.reg-box').hide()
    })

    var form = layui.form
    form.verify({
        pwd: [
            /^[\S]{6,12}$/
            ,'密码必须6到12位，且不能出现空格'
        ],
        repwd: function (value) {
            var pwd = $('.reg-box [name=password]').val()
            if (pwd !== value) {
                return "两次密码不一致"
            }
        }
        
    })
    // 监听注册表单的提交事件
    var layer = layui.layer
    $('#form_reg').on('submit', function (e) {
        e.preventDefault()
        $.post('/api/reguser',
            { username: $('#form_reg [name=username]').val(), password: $('#form_reg [name=password]').val() }, function (res) {
                if (res.status !== 0) {
               return layer.msg(res.message);
               
                } layer.msg('注册成功')
                $('#link_login').click()
           
            })
        $('#form_login').on('submit', function (e) {
            e.preventDefault()
            $.ajax({
                url: '/api/login',
                method: 'POST',
                data: $(this).serialize(),
                success: function (res) {
                    if (res.status !== 0) {
                        return layer.msg('登陆失败')
                    } layer.msg('登陆成功')
                    // 将得到的token字符串保存到localstorage中
                    localStorage.setItem('token',res.token)
                    // location.href = '/index.html'
                    // console.log(res.token);
                    
                }
            }
            )
        })
    })
})