const app = getApp()

const WXBizDataCrypt = require('../../utils/cryptojs/RdWXBizDataCrypt.js');
const isTel = (value) => !/^1[34578]\d{9}$/.test(value)
import { $wuxCountDown } from '../../dist/index'
Page({
  data: {
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),

    unionId: '',
    open_id:"",
    visible2: false,
    value:"",//手机号
    error:false,
    codeErr: false,//邀请码错误
    code:"",//邀请码
    codeInput:""//输入的邀请码
  },
  onAuthLocation() {
    wx.authorize({
      scope: 'scope.userLocation',
      success: (res) => {
        console.log('成功：', res)
      },
      fail: (res) => {
        console.log('失败：', res)
      },
    })
  },

  open2() {
    this.setData({
      visible2: true,
    })
  },
  close2() {
    if (this.data.error){
      //手机号不对
      wx.showToast({
        title: '手机号码不正确。',
        icon: 'none',
        duration: 0,
        mask: true,
      })
      return 
    }
    if (!this.data.codeErr) {
      //验证码不对
      wx.showToast({
        title: '验证码不正确。',
        icon: 'none',
        duration: 0,
        mask: true,
      })
      return
    }
    //关闭弹窗
    this.setData({
      visible2: false,
    })
    this.sendReq()
  },
  sendReq(){
    let that = this
    let phone_mob = this.data.value
    let open_id = this.data.open_id
    let invite_code = app.globalData.options.invite_code
    let unionid = this.data.unionid
    console.log(phone_mob, open_id, invite_code)
    wx.request({
      url: app.globalData.url +'/index.php?app=glogin&act=bind_phone',
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded',
      },
      data: {
        phone_mob,
        open_id,
        unionid,
        invite_code,
      },
      success: function (res) {
        if (res.data.done) {
          wx.navigateBack({ delta: 1 })
          wx.setStorageSync("user_id", res.data.retval.user_id)
        } else {
          wx.showToast({
            title: 'err',
            icon: 'none',
            mask: true,
          })
        }
      },
      fail: function (err) {
      },
      complete: function (res) {
        console.log(res);
      }
    })
  },
  sendCode(){
    let that = this
    let telephone = this.data.value
    let verify = this.data.code
    console.log(telephone, verify)
    wx.request({
      url: app.globalData.url + '/index.php?app=sms&act=app_crsms',
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded',
      },
      data: {
        telphone:telephone,
        verify,
      },
      success: function (res) {
        wx.showToast({
          title: res.data.msg,
          icon: 'none',
          mask: true,
        })
      },
      fail: function (err) {
      },
      complete: function (res) {
        console.log(res);
      }
    })
  },
  onClose(key) {
    this.setData({
      [key]: false,
    })
  },
  onClose2() {
    this.onClose('visible2')
  },
  onChange(e) {
    this.setData({
      error:isTel(e.detail.value),
      value: e.detail.value,
    })
    console.log(this.data.error)
  },
  onCode(e){
    this.setData({
      codeErr: this.verify(e.detail.value),
      codeInput: e.detail.value,
    })
    console.log(this.data.codeErr)
  },
  verify(str){
    console.log(this.data.code, str)
    if (str === this.data.code){
      return true
    }else{
      return false
    }
  },
  vcode() {
    //如果在手机号码填错时点击
    if (this.error) {
      wx.showToast({
        title: '手机号码不正确',
        icon: 'none',
        duration: 0,
        mask: true,
      })
      return 
    }
    //如果在两次验证码之间点击
    if (this.c2 && this.c2.interval) return !1
    //否则
    let Num = ""
    for (let i = 0; i < 6; i++) {
      Num += Math.floor(Math.random() * 10);
    }
    this.setData({
      code: Num
    })
    console.log(Num)
    this.c2 = new $wuxCountDown({
      date: +(new Date) + 60000,
      onEnd() {
        this.setData({
          c2: '重新获取验证码',
        })
      },
      render(date) {
        const sec = this.leadingZeros(date.sec, 2) + ' 秒 '
        date.sec !== 0 && this.setData({
          c2: sec,
        })
      },
    })
    this.sendCode()
  },

  getUserInfo(e) {
    console.log(e)
    let that = this;
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
    wx.getSetting({
      success(res) {
        if (res.authSetting['scope.userInfo']) {
          wx.showLoading({
            title: "正在自动登录",
          })
          wx.getUserInfo({
            withCredentials: true,
            success(res) {
              console.log(res,"已经授权，可以直接调用 getUserInfo 获取头像昵称");
              that.setData({
                nickname: res.userInfo.nickName,
                headimgurl: res.userInfo.avatarUrl
              })
              /* that.nickname = res.userInfo.nickName;
              that.headimgurl = res.userInfo.avatarUrl; */
              var encryptedData = res.encryptedData
              var iv = res.iv
              wx.login({
                success(res) {
                  //console.log(res);
                  if (res.code) {
                    var code = res.code //用来获取userId的code
                    console.log(code)
                    
                    that.postUserInfo(code,encryptedData, iv)
                      .then((data) => { 
                        console.log(data)
                        that.postUnion(that.data.open_id, that.data.unionid, that.data.nickname, that.data.headimgurl)
                      })
                      .catch(err=>wx.showToast({
                        title: err,
                        icon:"none"
                      }))
                  } else {
                    return "getUserInfo err"+ res.errMsg
                    console.log('登录失败！' + res.errMsg)
                  }
                }
              })
            }
          })
        }
      }
    })
  },
  postUserInfo(code, encryptedData, iv) {
    let that = this
    return new Promise((resolve,rej)=>{
      wx.request({
        url: `${app.globalData.url}index.php?app=glogin&act=getOpenid`,
        data: {
          code: code,
        },
        header: { 'content-type': 'application/json' },
        method: 'GET',
        dataType: 'json',
        responseType: 'text',
        success(res) {
          console.log(res,"postUserInfo--success")
          if (res.data.done) {
            //console.log(res.data.retval.session_key)  
            //拿到session_key实例化WXBizDataCrypt（）这个函数在下面解密用
            var pc = new WXBizDataCrypt('wxb13802190d1a6e2b', res.data.retval.session_key)
           /*  var pc = new WXBizDataCrypt('wxb13802190d1a6e2b', "HwYRCGIEHEj0XegeWJLk2g==") */
     
                var data = pc.decryptData(encryptedData, iv)
                app.globalData.unionid = data.unionId
                that.setData({
                  open_id: res.data.retval.open_id,
                  unionid: data.unionId
                })
                console.log('解密后 unionid: ', app.globalData.unionid)
                resolve(app.globalData.unionid)
              
          }
          else {
              rej("返回值出现问题")
              /* wx.showToast({
                title: "返回值出现问题",
                icon: "none"
              }) */
          }
        },
        fail: function (res) {
          rej("服务器出现了问题")
          /* wx.showToast({
            title: "服务器出现了问题",
            icon: "none"
          }) */
        },
        complete: function (res) {

        },
      })
    })
    
  },
  postUnion(open_id, unionid, nickname, headimgurl) {
    let that = this
    console.log(open_id, unionid, nickname, headimgurl)
    console.log(that.data.open_id, that.data.unionid, that.data.nickname, that.data.headimgurl)
    return new Promise((resove,rej)=>{
      wx.request({
        url: `${app.globalData.url}index.php?app=glogin`,
        data: {
          open_id,
          unionid,
          nickname,
          headimgurl
        },
        header: { 'content-type': 'application/x-www-form-urlencoded', },
        method: 'POST',
        dataType: 'json',
        responseType: 'text',
        success(res) {
          console.log(res, "login---success")
          if (res.data.done) {
            if (res.data.retval.need_phone == "yes") {
              wx.setStorageSync("is_new_member", "is_new");//存是否新用户
            } else {
              wx.setStorageSync("is_new_member", "not_new");
              wx.setStorageSync("user_id", res.data.retval.user_id);
            }
            //app.get_info()
            if (res.data.retval.need_phone == "yes") {
              //如果是新用户
              that.open2()
            } else {
              wx.navigateBack({ delta: 1 })
            }
          }
          else {
            rej("返回值出现问题")
            /* wx.showToast({
              title: "返回值出现问题",
              icon: "none"
            }) */
          }
        },
        fail: function (res) {
          rej("服务器出现了问题")
          /* wx.showToast({
            title: "服务器出现了问题",
            icon: "none"
          }) */
        },
        complete: function (res) {
          wx.hideLoading()
        },
      })
    })
  },
  onLoad: function () {
    let pageStack = getCurrentPages()
    console.log(app.globalData.prevRoute, '页面路径')
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }

  }
})
