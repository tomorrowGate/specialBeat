
App({
  onLaunch: function () {
    // 展示本地存储能力

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
  onShow(e) {
    this.globalData.prevRoute = '/' + e.path
    this.globalData.options = e.query
    console.log(e, 11111)
    //this.checkAuthorize()
    //this.checkAuthorize(e.path) //检查有没有授权
    //this.checkUserId()
  },
  checksession: function () {
    wx.checkSession({
      success: function (res) {
        /*  wx.showToast({
           title: '欢迎回来',
           icon: 'none',
           duration: 1000
         }) */
      },
      fail: function (res) {
        wx.reLaunch({
          url: "/pages/index/index"
        });
      }
    })
  },
  checkAuthorize(path) {
    return new Promise((resolve,rej)=>{
      let that = this
      wx.getSetting({
        success(res) {
          console.log(res)
          if (res.authSetting['scope.userInfo']) {
            //已经授权
            console.log("已经授权，可以直接调用 getUserInfo 获取头像昵称");
            //检查登录有没有过期
            that.checksession()
            that.checkUserId()
            resolve("OK")
          } else {
            console.log('res')
            wx.navigateTo({
              url: '/pages/index/index',
            })
            rej("err")
            /* wx.reLaunch({
              url: "/pages/index/index"
            }) */
          }
        }
      })
    })
    
  },
  checkUserId() {
    if (!wx.getStorageSync('user_id')) {
      wx.navigateTo({
        url: '/pages/index/index',
      })
    }
  },
  globalData: {
    userInfo: null,
    url: "https://tepai.yunqigas.net/",
    options:{
      userId:"",
      rpshare_id:"",//红包分享id
      invite_code:"",//邀请码
    }
  },
  get_info: function () {
    return new Promise((resove, rej) => {
      var user_id = wx.getStorageSync('user_id')
      var cOre = wx.getStorageSync("langIndex")
      var that = this;
      if (!user_id || user_id == "undefined" || user_id == "null") {
        // wx.reLaunch({
        //   url: '/pages/index/index.wxml',
        // })
        // return;
      } else {
        //查询好多数据
        wx.request({
          url: that.globalData.url + 'index.php?app=nyms_myinfo&act=get_info',
          method: 'POST',
          header: {
            'content-type': 'application/x-www-form-urlencoded',
          },
          data: {
            user_id,
          },
          success: function (res) {
            if (res.data.done) {
              var identity = res.data.retval.im_aliww;
              //member数据
              wx.setStorageSync("real_name2", res.data.retval.real_name2);
              wx.setStorageSync("phone_mob", res.data.retval.phone_mob);
              wx.setStorageSync("portrait", res.data.retval.portrait);
              wx.setStorageSync("real_name", res.data.retval.real_name);
              wx.setStorageSync("openid", res.data.retval.openid);

              resove("OK")
            } else {
              rej("err")
            }
          },
          fail: function (err) {
            rej("err")
          },
          complete: function (res) {
            //console.log(res);
          }
        })
      }
    })

  },
  //倒计时
  countdowm: function (timestamp,bindObj) {
      //countTime
      var self = bindObj;
      var timer = setInterval(function () {
      var nowTime = new Date();
      var endTime = new Date(timestamp * 1000);
      /*  var endTime = new Date(timestamp); */
      var t = endTime.getTime() - nowTime.getTime();
      if (t > 0) {
        var day = Math.floor(t / (3600000 * 24));
        var hour = Math.floor((t / 3600000) % 24);
        //var hour = Math.floor((t / 3600000));
        var min = Math.floor((t / 60000) % 60);
        var sec = Math.floor((t / 1000) % 60);
        hour = hour < 10 ? "0" + hour : hour;
        min = min < 10 ? "0" + min : min;
        sec = sec < 10 ? "0" + sec : sec;
        if (self.setData){
          self.setData({
            countTime: {
              day,
              hour,
              min,
              sec
            }
          })
        }else{
          self.countTime = {
            day,
            hour,
            min,
            sec
          }
        }
        
      } else {
        clearInterval(timer);
        self.countDowmCB&&self.countDowmCB();
      }
    }, 1000);
  },

  virifyImg(imgurl){
    if (imgurl && imgurl != "null" && imgurl != "undefined" && imgurl != "0"){
      if ( imgurl.substr(0, 8).toLowerCase() == "https://") {
        return imgurl
      } else {
        return this.globalData.url +imgurl
      }
    }else{
      return false
    }
   
  },

  virifyImgList(imgurl,obj) {
    if (obj&&imgurl && imgurl != "null" && imgurl != "undefined" && imgurl != "0") {
      console.log(imgurl)
      if (imgurl.substr(0, 8).toLowerCase() == "https://") {
        obj.portraitURL = imgurl
      } else {
        obj.portraitURL =  this.globalData.url + imgurl
      }
    } else {
      return false
    }

  }
})