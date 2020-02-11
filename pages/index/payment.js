// pages/index/payment.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
   
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //options.user_id
    console.log(options);

    console.log(options.payinfo);
    if (options.payinfo){
      var rut = JSON.parse(options.payinfo);
      console.log(rut.appId);

      wx.requestPayment({    //请求支付
        timeStamp: rut.timeStamp.toString(),
        nonceStr: rut.nonceStr,
        package: rut.package,
        signType: rut.signType,
        paySign: rut.paySign,
        success: function (res) {
          alert("支付成功，请返回APP查收！");
          console.log(res.data);
        },
        fail: function (error) {
          alert("支付失败，请返回APP重试！");
          console.log(error);
        }
      })


    }
    
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function (e) {
    // var aaa = wx.getLaunchOptionsSync();
    //   console.lo(aaa);

    // console.log(this.globalData.options);
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