$(function () {
    var form = layui.form
    var layer = layui.layer
    var laypage = layui.laypage
    // 定义美化时间的过滤器
    template.defaults.imports.dataFormat = function (date) {
        const dt = new Date(date)
        var y = dt.getFullYear()
        var m = dt.getMonth()
        var d = dt.getDate()
        var hh = dt.getHours()
        var mm = dt.getMinutes()
        var ss = dt.getSeconds()
        return y + '-' + m + '-' + d + ' ' + hh + ':' + mm + ':' + ss
    }
    function padZero(n) {
        return n>9?n:'0'+n
    }
    // 参数对象
    var q = {
        pagenum: 1,
        pagesize: 2,
        cate_id: '',
        state:''
    }
    initTable()
    initCate()
    function initTable() {
        $.ajax({
          method: 'GET',
          url: '/my/article/list',
          data: q,
          success: function(res) {
            if (res.status !== 0) {
              return layer.msg('获取文章列表失败！')
            }
            // 使用模板引擎渲染页面的数据
            var htmlStr = template('tpl-table', res)
            $('tbody').html(htmlStr)
            renderPage(res.total)
          }
        })
    }
    function initCate() {
        $.ajax({
            method: 'GET',
            url: '/my/article/cates',
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('获取分类失败')
                }
                // 调用模板引擎
                var htmlStr = template('tpl-cate', res)
                $('[name=cate_id]').html(htmlStr)
                form.render()
            }
        })
    }
    
    $('#form-search').on('submit', function (e) {
        e.preventDefault()
        var cate_id = $('[name=cate_id]').val()
        var state = $('[]name=state').val()
        q.cate_id = cate_id
        q.state = state
        initTable()
    })
    function renderPage(total) {
        laypage.render({
            elem: 'pageBox',
            count: total,
            limit: q.pagesize,
            curr: q.pagenum,
            
            layout: ['count', 'limit', 'prev', 'page', 'next', 'skip'],
            limits:[2,3,5,10],
            // 分页发生切换处罚jump回调
            jump: function (obj,first) {
                q.pagenum = obj.curr
                q.pagesize = obj.limit
                if (!first) {
                    initTable()
                }
            }
        })
        
    }
    $('tbody').on('click', '.btn-delete', function () {
        var id = $(this).attr('data-id')
        var len = $('.btn-delete').length
        layer.confirm('确认删除？', {icon: 3, title:'提示'}, function(index){
            //do something
            $.ajax({
                method: 'GET',
                url: '/my/article/deletecate/' + id,
                success: function (res) {
                    if (res.status !== 0) {
                        return layer.msg('删除失败')
                    } layer.msg('删除成功')
                    // 当数据删除完成后，判断当前页是否有数据，页码减一
                    if (len === 1) {
                         q.pagenum=q.pagenum === 1? 1:q.pagenum-1
                    }
                    initTable()
                }
            })
            
            layer.close(index);
          });
    })
})