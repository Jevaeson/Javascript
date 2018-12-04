// 自定义轮播图插件 类似swiper
jQuery.fn.extend({
  loop:function(options){
    // 在 loop 内生成对应个数的按钮
    // 给按钮绑定事件
    // 自动播放  滑入停止自动播放  滑出继续自动播放

    // 由于某些函数内 this 指向会改变 所以先将 this 赋值给其他的变量 that
    var that = this
    // 窗口大小自定制
    // options 配置选项
    // 窗口大小  width  height
    // 是否有分页器     isPagination
    // 是否有左右箭头   isArrow
    // 是否自动播放   (setInterval)
    // 滑入loop是否停止自动播放  (clearInterval)
    // 滑出loop是否开始自动播放  (重新赋值 setInterval)
    var  defaultOptions = {
      width:590,
      height:470,
      isPagination: true,
      isArrow: true,
      autoPlay:true,
      mouseenterStop:true,
      mouseleaveStart:true,
    }
    // 合成对象
    var currentOptions = $.extend(defaultOptions,options)
    // 窗口大小  width  height
    that.width(currentOptions.width)
    that.height(currentOptions.height)


    that.addClass('loop')
    // 是否有分页器
    if (currentOptions.isPagination){
      // 获取图片个数
      var imgNum = that.find('a>img').length
      // 创建列表 ul
      var ul = $('<ul class="list"></ul>')
      // 给列表添加li
      for (let i = 0; i < imgNum; i++) {
        var li = $('<li>').html(`<span></span>`)
        ul.append(li)
      }
      // 将创建好的ul生成到页面中
      that.append(ul)
      // 点击事件的设计
      that.find('.list>li>span').click(function(){
        var ind = $(this).parent().index()
        num = ind
        // 图片的设计
        that.find('a>img').eq(ind).css({'z-index':1,opacity:1}).parent().siblings('a').children('img').css({'z-index':0,opacity:0})
        // 按钮的设计
        $(this).css('background-color','red').parent().siblings('li').children('span').css('background-color','#ccc')
      })
    }
    // 是否有左右箭头
    if (currentOptions.isArrow){
      var ul = $('<ul class="arrow"></ul>')
      var liLeft = $('<li>').html(`<span class="prev"><</span>`)
      ul.append(liLeft)
      var liRight = $('<li>').html(`<span class="next">></span>`)
      ul.append(liRight)
      that.append(ul)
      var num = 0
      // 下一个的设计
      that.find('.arrow>li>.next').click(function(){
          num = num + 1
          if(num > 3){
            num = 0
          }
        that.find('a>img').eq(num).css({'z-index':1,opacity:1}).parent().siblings('a').children('img').css({'z-index':0,opacity:0})
        that.find('.list li:eq('+num+') span').css('background-color','red').parent().siblings('li').children('span').css('background-color','#ccc')
      })
      // 上一个的设计
      that.find('.arrow>li>.prev').click(function(){
          num = num - 1
          if(num < 0){
            num = 3
          }
        that.find('a>img').eq(num).css({'z-index':1,opacity:1}).parent().siblings('a').children('img').css({'z-index':0,opacity:0})
        that.find('.list li:eq('+num+') span').css('background-color','red').parent().siblings('li').children('span').css('background-color','#ccc')
      })
    }
    var num = 0
    // 是否需要自动播放
    if (currentOptions.autoPlay){
        var a = setInterval(function(){
            num++
            if(num > 3){
              num = 0
            }
          that.find('a>img').eq(num).css({'z-index':1,opacity:1}).parent().siblings('a').children('img').css({'z-index':0,opacity:0})
          that.find('.list li:eq('+num+') span').css('background-color','red').parent().siblings('li').children('span').css('background-color','#ccc')
        },1500)
        // 滑入loop是否停止自动播放
        if (currentOptions.mouseenterStop){
          that.mouseenter(function(){
            clearInterval(a)
          })
        }else{
          return currentOptions.mouseleaveStart === false
        }
        console.log(currentOptions.mouseleaveStart)
        // 滑出loop是否开始自动播放
        if (currentOptions.mouseleaveStart){
          that.mouseleave(function(){
            a = setInterval(function(){
              num = num + 1
              if(num > 3){
                num = 0
              }
            that.find('a>img').eq(num).css({'z-index':1,opacity:1}).parent().siblings('a').children('img').css({'z-index':0,opacity:0})
            that.find('.list li:eq('+num+') span').css('background-color','red').parent().siblings('li').children('span').css('background-color','#ccc')
           },1500)
          })
        }
    }
  }
})