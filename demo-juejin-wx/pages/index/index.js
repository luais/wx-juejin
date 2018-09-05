//index.js
//获取应用实例
const app = getApp()
const config = getApp().globaData.config
let globalData = getApp().globalData

Page({
  data:{
    COUNT:20,
    timeline:[],
    hotRecomment:[],
    hotRrecommendShow:true,
    auth:{},
    logined:true,
    rotate:'',
  },
  onShow(){
    if(utils.pageReload(this.data.auth,[this.data.timeline])){
      wx.startPullDownRefresh({})
    }
  },

  onPullDownRefresh(){
    this.init()
  },

  init(){
    this.setData({
      hotRrecommendShow:this.data.hotRrecommendShow,
      auth:{},
      rotate:'', 
    })

    let auth = utils.ifLogined()
    this.setData({
      auth,
      logined:auth,
    })
    this.getBannerImgList()
    this.getEntryByTimeline(true)
    if(auth){
      this.getEntryByHotRecomment()
    }
  },

  getBannerImgList(){
    const auth = this.data.auth
    wx.request({
      url: `${config.bannerRequse}/get_banner`,
      data:{
        position:'explore',
        page:0,
        pageSize:20,
        platform:'android',
        device_id:auth.clientId,
        client_id:auth.clientId,
        token:auth.token,
        src:'android',
      },

      success:(res) =>{
        let data = res.data
        if(data.s === 1){
          let bannerImgList = (data.d && data.d.banner) || []
          wx.setStorage({
            key: 'bannerImgList',
            data: bannerImgList,
          })
        }else{
          wx.showToast({
            title: data.m.toString(),
            icon:'none',
          })
        }
      },
      fail:() =>{
        wx.showToast({
          title: 'error',
          icon:'none',
        })
      },
    })
  },
  
  

  onLoad: function () {
    
  },
})
