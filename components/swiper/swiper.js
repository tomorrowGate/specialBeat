// find/components/swiper.js
let app = getApp()
Component({
  properties: {
    swiper: {
      type: Object,
      value: {
        imgUrls: [],
      }
    },
    lunbo_info: {
      type: Array,
      value:[
      
      ],
      observer:function (){
        console.log(this.properties.lunbo_info)
      }
    },
    isNormal:{
      type:Boolean,
      value:true
    },
    appurl:{
      type: String,
      value: app.globalData.url,
    }
  },

  data: {
    swiperStatic: {
      indicatorDots: false,
      indicatorColor: "rgba(255,255,255,0.6)",
      indicatorActiveColor: "#fff",
      autoplay: true,
      interval: 4000,
      duration: 400,
      circular: true,
      activeIndex:1
    },
  },

  /**
   * 组件的方法列表
   */
  methods: {
    get_lunbo: function () {
      //获取轮播图
      var that = this;
      wx.request({
        url: `${app.globalData.url}/index.php?app=auction&act=getAuctionGoodsInfoById`,
        data:{
          id: '60',
          type: 'auction',
          user_id: 't6146v61300b82282 '
        },
        method: 'POST',
        header: {
          'content-type': 'application/x-www-form-urlencoded',
        },
        success(res) {
          console.log(res,59)
          if (res.data.done) {
            /* that.setData({
              'lunbo_info': res.data.retval.goods_image,
            }) */
          }
          console.log(that.data.goods_image, 65)
        },
        fail(err) {
          console.log(err)
        },
        complete(data) {
          console.log(data)
        }
      })
    },
    displayDot(e){
      this.triggerEvent('displayDot', e.detail.current, true)
    }
  },
  pageLifetimes: {
    show: function () {
    },
  },
  lifetimes: {
    attached: function () {

    },
    detached: function () {
      // 在组件实例被从页面节点树移除时执行
    },
  },
})

