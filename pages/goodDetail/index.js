// pages/goodDetail/index.js
let app = getApp()
Page({
  data: {
    lunbo_info:[],
    goods_info:{},
    auction_info:{},
    goods_video:[],
    isToTopShow:false,
    countTime:{
      day:0,
      hour:0,
      min:0,
      sec:0,
    },
    timeDownTittle:"未开始",
    swiperLook:0,
    swiperActiveI:1
  },
  goTop(){
    wx.pageScrollTo({
      scrollTop: 0,
      duration: 500
    })
  },
  getGood: function () {
    //获取物品信息
    let that = this;
    let id = app.globalData.options.good_id
    let user_id = app.globalData.options.user_id
    wx.request({
      url: `${app.globalData.url}/index.php?app=auction&act=getAuctionGoodsInfoById`,
      data: {
        type: 'auction',
        /* id:"60",
        user_id: 't6146v61300b82282', */
        id,
        user_id
      },
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded',
      },
      success(res) {
        //console.log(res, 59)
        if (res.data.done) {
          let auction_info = res.data.retval.auction_info
          if (res.data.retval.goods_info.description) {
            res.data.retval.goods_info.description = res.data.retval.goods_info.description.replace(/\<img/gi, '< img style="max-width:100%;height:auto;width:700rpx;display:block" ')
            res.data.retval.goods_info.description = res.data.retval.goods_info.description.replace(/>\<br>\<\/p>/g, '></p >')

            console.log(res.data.retval.goods_info.description)
          } 
          if (auction_info.time_status == 1) {//未开始
            that.setData({
              timeDownTittle: "距开始",
            })
            app.countdowm(auction_info.start_time,that)
          }
          if (auction_info.time_status == 2) {//已经开始
            that.setData({
              timeDownTittle: "距结束",
            })
            app.countdowm(auction_info.end_time,that)
          }
          that.setData({
            'lunbo_info': res.data.retval.goods_image,
            'auction_info': res.data.retval.auction_info,
            'goods_info': res.data.retval.goods_info,
            'goods_video': res.data.retval.goods_info,
          })
          //console.log(that.data.goods_info.description)
        }
      },
      fail(err) {
        console.log(err)
      },
      complete(data) {
        //console.log(data)
      }
    })
  },
  changeSwiper(e){
    this.setData({
      swiperLook: e.currentTarget.dataset.i
    })
  },
  changeDot(e){
    this.setData({
      swiperActiveI : e.detail+1
    })
  },
  countDowmCB(){
    this.timeDownTittle = "已结束"
  },
  onLoad: function (options) {
    //app.checkUser()
    this.getGood()
  },

  onReady: function () {

  },

  onShow: function () {

  },

  onHide: function () {

  },

  onUnload: function () {

  },

  onPageScroll: function (e) {
    if(e.scrollTop>=150){
      this.setData({
        isToTopShow:true
      })
    }else{
      this.setData({
        isToTopShow: false
      })
    }
  },

  onPullDownRefresh: function () {

  },

  onReachBottom: function () {

  },

  
  onShareAppMessage: function () {
    return {
      title: 'swiper',
      path: 'page/component/pages/swiper/swiper'
    }
  }
})