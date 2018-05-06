Page({
    data: {
        detail:''
    },
    onLoad: function () {
        var that = this;
        wx.getStorage({
            key: 'love',
            success: function(res) {
                console.log(res.data.detail)
                that.setData({
                    detail: res.data.detail
                })
            } 
          })
    },
    onShow: function () {

    }
})
