// 因为调用_$函数 之后要返回一个对象 并且这个对象要使用 _$构造函数的所有公有属性和方法，
// 那么首先想到的是返回一个由_$构造函数创建的实例化类 但是这样的话就是一个死循环
// 所以返回的是 继承该构造函数公有方法的另一个类的 实例化对象
function _$(selector){
  return new Selector(selector)
}

_$.prototype = {
  changeColor:function(color){
    // 改变某个dom的颜色
    for (let i = 0; i < this.dom.length; i++) {
      this.dom[i].style.color = color
    }
    return this
  },
  attr:function(attrName,attrValue){
    // 获取或修改
    var len = arguments.length
    if (len>1){
      // 修改
      for (let i = 0; i < this.dom.length; i++) {
        this.dom[i].setAttribute(attrName,attrValue)
      }
      // 不是值 就是this
      return this
    }else{
      // 获取只能获取一个值
      return this.dom[0].getAttribute(attrName)
    }
  },
  // css:function(cssName,cssValue){
  //   for (let i = 0; i < this.dom.length; i++) {
  //     this.dom[i].style[cssName] = cssValue
  //   }
  // }
  css:function(){
    var len = arguments.length
    var cssName = arguments[0]
    var domArr = this.dom
    if (len === 2) {
      // 设置
      var cssValue = arguments[1]
      for (var i = 0; i < domArr.length; i++) {
        domArr[i].style[cssName] = cssValue
      }
      return this
    }else if (len === 1){
      // 是否为自定义对象
      if (Object.prototype.toString.call(arguments[0]) === '[object Object]') {
        // 为对象的话执行修改操作
        for (var i = 0; i < domArr.length; i++) {
          for(var j in arguments[0]){
            domArr[i].style[j] = arguments[0][j]
          }
        }
      }else{
        return window.getComputedStyle(domArr[0],null)[cssName]
      } 
    }
  }
}
function Selector(selector){
    this.dom = document.querySelectorAll(selector)             
}
Selector.prototype = _$.prototype