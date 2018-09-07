let utils = require('../../utils/util.js')

Component({
  properties:{
    list:{
      type:Array,
      value:[]
    },
    graphics:{
      type:Boolean,
      value:false,
    },
  },

  methods:{
    toPostDeail(e){
      utils.toPostDeail(e)
    },
  },

  
})