// pages/home.js
let app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goodsInfo:[],
    lunbo_info:[],
    ballList:[],
    selected_result:[],
    recommend_result:[]
  },

  getData() {
    var that = this;
    var is_new_member = wx.getStorageInfoSync("is_new_member")
    wx.request({
      url: `${app.globalData.url}/index.php?app=homepage&act=getHomepageInfo2`,
      data: {
        cate_id: 0,
        start: 0,
        is_history: 1
      },
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded',
      },
      success(res) {
        if (res.data.done) {
          res.data.retval.selected_result&&res.data.retval.selected_result.forEach((v,i)=>{
            v.default_image = app.virifyImg(v.default_image) 
            if(v.states_num != 3){
              app.countdowm(v.end_time, v)
            }
            
          })
          res.data.retval.recommend_result.forEach((v, i) => {
            v.default_image = app.virifyImg(v.default_image)
          })
          that.setData({
            goodsInfo: res.data.retval,
            lunbo_info: res.data.retval.rc_result,
            ballList: res.data.retval.special_result,
            selected_result: res.data.retval.selected_result,
            recommend_result: res.data.retval.recommend_result
          })
        } else {
          wx.showToast({
            icon: "none",
            title: res.data.msg,
          })
        }
      },
      fail(err) {
        console.log(err)
      },
      complete(data) {
        console.log(data)
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getData()
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