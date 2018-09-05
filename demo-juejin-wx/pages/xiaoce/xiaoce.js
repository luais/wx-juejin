// pages/xiaoce/xiaoce.js
const config = getApp().globalData.config
const utils = require('../../utils/util.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {

    xiaoceList:[],
    noResult:false,
    auth:{},
    pageNum:1,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.init()
  },

  onPullDownRefresh(){
    this.reload()
  },
  reload(reload){
    this.setData({
      noResult:false,
      auth:{},
      pageNum:1,
    })
    this.init(reload)
  },
  init(reload){
    let auth = utils.ifLogined()
    this.setData({
      auth,
    })
    this.getXiaoce(reload)
  },

  getXiaoce(reload){
    let auth = this.data.auth
    if(reload){
      this.setData({
        pageNum:1,
      })
    }
    wx.request({
      url: `${config.xiaoceRequestUrl}/getListByLastTime`,
      data:{
        src:'web',
        uid:auth.uid || '',
        device_id:auth.clientId,
        token:auth.token,
        pageNum:this.data.pageNum,
      },

      success: (res) => {
        let data = res.data
        if (data.s === 1) {
          let list = data.d
          if (!utils.isEmptyObject(list)) {
            let pageNum = this.data.pageNum + 1
            this.setData({
              pageNum,
              xiaoceList: reload ? list : this.data.xiaoceList.concat(list),
            })
          }
        }else{
          if(data.s == 2){
            this.setData({
              noResult:true,
            })
          }else{
            wx.showToast({
              title: data.m.toString(),
              icon:'none',
            })
          }
        }
      },

      fail:() => {
        wx.showToast({
          title:'errer',
          icon:'none',
        })
      },
      complete:() =>{
        wx.stopPullDownRefresh()
      },
    })
  },

  onReachBottom(){
    if(!this.data.xiaoceList.length || !this.data.noResult){
      this.getXiaoce()
    }
  },
  onShareAppMessage(res){
    return{}
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