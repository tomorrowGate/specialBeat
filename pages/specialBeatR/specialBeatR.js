let app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    redPackge:null,
    portrait:"",
    appurl: app.globalData.url,
    downloadPercent:0
  },
  goBack(){
    wx.navigateBack()
  },
  getRedData(rpshare_id) {
    console.log(rpshare_id)
    var that = this;
    var is_new_member = wx.getStorageInfoSync("is_new_member")
    console.log(is_new_member)
    let user_id = wx.getStorageSync("user_id")
    console.log(user_id)
    wx.request({
      url: `${app.globalData.url}?app=redpacket&act=openShareRedpacket`,
      data: {
        is_new_member: is_new_member,
        rpshare_id: rpshare_id,
        user_id,
        
        // rpshare_id: 2,
        // user_id: 3081
      },
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded',
      },
      success(res) {
        //console.log(res, 59)
        if (res.data.done) {
          res.data.retval.get_log&&res.data.retval.get_log.forEach((v,i)=>{
            /* let imgurl = v.portrait
            if (imgurl && imgurl != "null" && imgurl != "undefined" && imgurl != "0") {
              console.log(imgurl)
              if (imgurl.substr(0, 8).toLowerCase() == "https://") {
                obj.portraitURL = imgurl
              } else {
                obj.portraitURL = this.globalData.url + imgurl
              }
            } else {
              return false
            } */

            v.portrait = app.virifyImgList(v.portrait,v)
            console.log(v.portrait)
          })
          that.setData({
            redPackge: res.data.retval,
          })
        }else{
          wx.showToast({
            icon:"none",
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
  launchAppError(e){
    if (e.detail.errMsg =="invalid scene")
      wx.showToast({
        title: '请前往app领奖',
        icon: 'none',
        duration: 2000
      })
  },
  toDownApp() {
    // wx.downloadFile({
    //   url: 'http://tepai.yunqigas.net/themes/mall/new/downloadapp.html', //仅为示例，并非真实的资源
    //   success(res) {
    //     // 只要服务器有响应数据，就会把响应内容写入文件并进入 success 回调，业务需要自行判断是否下载到了想要的内容
    //     if (res.statusCode === 200) {
    //       console.log(5566)
    //       wx.playVoice({
    //         filePath: res.tempFilePath
    //       })
    //     }
    //   }
    // })
    
    /* const downloadTask = wx.downloadFile({
      url: 'http://tepai.yunqigas.net/themes/mall/new/downloadapp.html', //仅为示例，并非真实的资源
      success(res) {
        wx.saveFile({//对临时资源进行永久保存
          tempFilePath: res.tempFilePath,//tempFilePath想要保存的文件的临时地址
          success: function (res) {
            console.log("保存成功啦")
            console.log(res)//res是保存成功的返回值，包含存储路径等
          }
        })
      }
    })

    downloadTask.onProgressUpdate((res) => {
      console.log('下载进度', res.progress)
      console.log('已经下载的数据长度', res.totalBytesWritten)
      console.log('预期需要下载的数据总长度', res.totalBytesExpectedToWrite)
      console.log('下载进度', res.progress)
      this.setData({
        downloadPercent: (res.progress * 100).toFixed(2)
      })
    }) */


    wx.navigateTo({
      url: '/pages/down/index',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)

    /* wx.showToast({
      title: wx.getStorageSync("user_id"),
      icon: 'none',
    }) */
    this.getRedData(options.redPackge)
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