// components/ballList/index.js
const app = getApp()
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    ballList:{
      type:Array,
      value:[]
    },
  },

  /**
   * 组件的初始数据
   */
  data: {
    appurl: app.globalData.url
  },

  /**
   * 组件的方法列表
   */
  methods: {
    showDown(){
      /* wx.showModal({
        title: '下载特拍',
        content: '前往下载特拍APP',
        success(res) {
          if (res.confirm) {
            wx.navigateTo({
              url: '/pages/down/index',
            })
          } else if (res.cancel) {

          }
        }
      }) */
      wx.navigateTo({
        url: '/pages/normalGood/index',
      })
    }
  }
})
