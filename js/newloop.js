;(function($){
  $.fn.loop = function(options){
    this.each(function(){
      // $(this)指的是每一个
      var loop = new Loop($(this))
      loop.settings = $.extend({},loop.defaultOptions,options)
      // extend 方法会把新合成的放到第一个 所以用{} 否则会影响默认配置
      loop.init()
    })
  }
  // 构造函数
  function Loop(element){
    this.dom = element
    this.settings = null
    this.ind = 0
  }
  // 原型
  Loop.prototype = {
    // 初始化loop轮播图的方法
    init:function(){
      this.dom.addClass('loop')
      this.setsize()
      // 是否创建分页
      if (this.settings.isPagination) {
        this.createPagination()
      }
      if (this.settings.isArrow) {
        this.createArrow()
      }
      if (this.settings.isAutoplay) {
        this.createAutoplay()
      } 
    },
    // 创建分页器
    createPagination:function(){
      // 获取图片个数
      var that = this
      var imgNum = that.dom.find('a>img').length
      // 创建列表 ul
      var ul = $('<ul class="list"></ul>')
      // 给列表添加li
      for (let i = 0; i < imgNum; i++) {
        var li = $('<li>').html(`<span></span>`)
        ul.append(li)
      }
      // 将创建好的ul生成到页面中
      that.dom.append(ul)
      // 点击事件的设计
      that.dom.find('.list>li>span').click(function(){
        var ind = $(this).parent().index()
        // 同步ind
        that.ind = ind
        // 图片的设计
        that.dom.find('a>img').eq(ind).css({'z-index':1,opacity:1}).parent().siblings('a').children('img').css({'z-index':0,opacity:0})
        // 按钮的设计
        $(this).css('background-color','red').parent().siblings('li').children('span').css('background-color','#ccc')
      })
    },
    // 创建左右箭头
    createArrow:function(){
      var that = this
      var ul = $('<ul class="arrow"></ul>')
      var liLeft = $('<li>').html(`<span class="prev"><</span>`)
      ul.append(liLeft)
      var liRight = $('<li>').html(`<span class="next">></span>`)
      ul.append(liRight)
      that.dom.append(ul)
      // 下一个的设计
      that.dom.find('.arrow>li>.next').click(function(){
          that.ind++
          if(that.ind > 3){
            that.ind = 0
          }
        that.dom.find('a>img').eq(that.ind).css({'z-index':1,opacity:1}).parent().siblings('a').children('img').css({'z-index':0,opacity:0})
        that.dom.find('.list li:eq('+that.ind+') span').css('background-color','red').parent().siblings('li').children('span').css('background-color','#ccc')
      })
      // 上一个的设计
      that.dom.find('.arrow>li>.prev').click(function(){
          that.ind--
          if(that.ind < 0){
            that.ind = 3
          }
        that.dom.find('a>img').eq(that.ind).css({'z-index':1,opacity:1}).parent().siblings('a').children('img').css({'z-index':0,opacity:0})
        that.dom.find('.list li:eq('+that.ind+') span').css('background-color','red').parent().siblings('li').children('span').css('background-color','#ccc')
      })
    },
    // 是否需要自动播放
    createAutoplay:function(){
        var that = this
        var a = setInterval(function(){
          that.ind++
          if(that.ind > 3){
            that.ind = 0
          }
          that.change()
      },1500)
      // 滑入loop是否停止自动播放
        that.dom.mouseenter(function(){
          clearInterval(a)
        })
      // 滑出loop是否开始自动播放
        that.dom.mouseleave(function(){
          a = setInterval(function(){
            that.ind++
            if(that.ind > 3){
              that.ind = 0
            }
            that.change()
        },1500)
        })
    },
    change:function(){
      var that = this
      that.dom.find('a>img').eq(that.ind).css({'z-index':1,opacity:1}).parent().siblings('a').children('img').css({'z-index':0,opacity:0})
      that.dom.find('.list li:eq('+that.ind+') span').css('background-color','red').parent().siblings('li').children('span').css('background-color','#ccc')
    },
    setsize:function(){
      // 设置窗口大小
      this.dom.width(this.settings.width)
      this.dom.height(this.settings.height)
    },
  }
  Loop.prototype.defaultOptions = {
    width:590,
    height:470,
    isPagination: true,
    isArrow: true,
    isAutoplay:true,
  }
})($)