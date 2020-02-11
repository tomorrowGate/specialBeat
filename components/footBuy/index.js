// components/footBuy/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    directBuy:{
      type:Number,
      value:0
    },
    inPrice:{
      type:Number,
      value:0
    },
    isNormalGood: {
      type: Boolean,
      value: false
    },
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    toDownApp(){
      wx.navigateTo({
        url: '/pages/down/index',
      })
    }
  }
})
