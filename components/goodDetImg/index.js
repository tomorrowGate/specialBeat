// components/goodDetImg/index.js
let app = getApp()
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    article_result:{
      type:String,
      value:""
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
  },

  /**
   * 组件的方法列表
   */
  methods: {

    /*获取文章详情*/
    getArticleInfoById(article_id) {
      var that = this
      wx.request({
        url: app.globalData.url + 'index.php?app=nyms_homepage&act=getArticleInfoById',
        method: 'POST',
        header: {
          'content-type': 'application/x-www-form-urlencoded',
        },
        data: {
          article_id: article_id,
          cOre: wx.getStorageSync("langIndex")
        },
        success: function (res) {
          if (res.data.done && res.data.retval.content) {
            res.data.retval.content = res.data.retval.content.replace(/\<img/gi, '< img style="max-width:100%;height:auto;width:700rpx;display:block" ')
            res.data.retval.content = res.data.retval.content.replace(/>\<br>\<\/p>/g, '></p >')
            that.setData({
              article_result: res.data.retval
            })
          } else {

          }
        },
        fail: function (err) {

        },
        complete: function (res) {
          console.log(res);
        }
      })
    },
  },

  pageLifetimes: {
    show: function () {
    },
  },
  lifetimes: {
    attached: function () {
      //this.getArticleInfoById(1)
    },
    detached: function () {
      // 在组件实例被从页面节点树移除时执行
    },
  },
})
