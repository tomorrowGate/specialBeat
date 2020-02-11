// components/goodCard/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    recommend_result:{
      type:Array,
      value:[]
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

    defaultImg: "/src/img/defaultGood.png"
  },

  /**
   * 组件的方法列表
   */
  methods: {
    showDown(e){
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
      console.log(e.currentTarget.dataset.goodid)
      wx.navigateTo({
        url: `/pages/normalGood/index?goodId=${e.currentTarget.dataset.goodid}`,
      })
    }
  }
})
