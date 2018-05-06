// detail.js

Page({
	data: {
		
	},
	onLoad(){
		const that = this;
		wx.getStorage({
            key: 'key',
            success: function(res) {
				// console.log(res.data.comment);
                that.setData({
                    comment: res.data.comment
                })

            }
        })
    }
})