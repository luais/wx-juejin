let utils = require('../../utils/util.js')

Component({
  properties:{
    list:{
      type:Array,
      value:[]
    },
  },

  metheds:{
    toPostDetail(e){
      utils.toPostDetail(e)
    },

    toPerdonal(e){
      let item = e.currentTarget.dataset.item
      wx.navigateTo({
        url: '',
      })
    }
  }

})