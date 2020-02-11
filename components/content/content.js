let app = getApp()
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    goods_info: {
      type: Object,
      value: {

      },
      observer: function () {
        //console.log(this.properties.goods_info)
      }
    },
    auction_info: {
      type: Object,
      value: {

      },
      observer: function () {
        //console.log(this.properties.auction_info)
      }
    },
    isNormalGood:{
      type:Boolean,
      value:false
    },
    appurl: {
      type: String,
      value: app.globalData.url,
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    shopNum:1
  },

  /**
   * 组件的方法列表
   */
  methods: {
    showDown(){
      wx.showModal({
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
      }) 
    },
    addShopNum(){
      console.log(32165165)
      let shopNum = this.data.shopNum +1
      this.setData({
        shopNum
      })
    },
    decShopNum(){
      let shopNum = this.data.shopNum <= 1 ? this.data.shopNum : this.data.shopNum-1
      this.setData({
        shopNum
      })
    }
  }
})
