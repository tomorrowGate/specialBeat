let app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    redPackge: null,
    appurl: app.globalData.url,
    portrait:"",
    showSkeleton:true
  },
  goPrizeHead(){
    app.checkAuthorize()
    .then(()=>{
      let user_id = wx.getStorageSync('user_id')
      if (!wx.user_id && user_id == '0' && user_id == 'undefined' && user_id == 'null' ){
        wx.navigateTo({
          url: `/pages/specialBeatR/specialBeatR?redPackge=${this.data.redPackge.id}`,
        })
      }
      if (this.data.redPackge && this.data.redPackge.id){
        wx.navigateTo({
          url: `/pages/specialBeatR/specialBeatR?redPackge=${this.data.redPackge.id}`,
        })
      }else{
        wx.showToast({
          title: '服务器出现了问题',
          icon: 'none',
          mask: true,
        })
      }
      
    })
    .catch((err)=>{console.log(err)})
    
  },
  getRedData(){
    //console.log(app.globalData.options.rpshare_id)
    var that = this;
    wx.request({
      url: `${app.globalData.url}/?app=redpacket&act=getWechaRedpacketInfo`,
      data: {
        share_id: app.globalData.options.user_id,
        //share_id: 3075,
      },
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded',
      },
      success(res) {
        console.log(res, 22)
        if (res.data.done) {
          console.log(app.virifyImg(res.data.retval.portrait))
          that.setData({
            redPackge: res.data.retval,
            portrait: /* res.data.retval.portrait */ app.virifyImg(res.data.retval.portrait)
          })
        }else{
          wx.showToast({
            title: '服务器出现了问题',
            icon: 'none',
            mask: true,
          })
        }
      },
      fail(err) {
        console.log(err)
      },
      complete(data) {
        that.setData({
          showSkeleton: false
        })
        console.log(data)
      }
    })
  },
  imageLoad(e){
    
    console.log(e)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    /* wx.showToast({
      title: wx.getStorageSync("user_id"),
      icon: 'none',
    }) */
    this.getRedData()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})