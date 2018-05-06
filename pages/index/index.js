// detail.js

Page({
	data: {
		hideText: true,
        hideClass: 'up',
        Common:[],
        id:'',
        zan:'/image/zan.png',
        score:'/image/score.png',
        like:'想看',
        love:'评分'
	},
	onLoad(params){
		const that = this;
		var id = params.id,
			  url = 'https://m.maoyan.com/movie/' + id + '.json'
		// console.log(id)
		wx.request({
			url: url,
			success(res){
				// console.log(res);
                let detail = res.data.data.MovieDetailModel,
                    comment = res.data.data.CommentResponseModel.hcmts.splice(0,3)// 获取热门评论前三
               
                detail.dra = detail.dra.replace(/(<p>)|(<\/p>)/g,'');
                var Common = res.data.data.CommentResponseModel.hcmts.splice(0,20);
                var reply = res.data.data.CommentResponseModel.cmts.splice(0,10);
                var all = Common.concat(reply);
                console.log(all);
				that.setData({
					detail: detail,
                    comment: comment,
                    all: all,
                    id: id
                });
                wx.setStorage({
                    key: "key",
                    data: {
                        comment:all
                    }
                });
			}
        })
    },
    commentsPage: function () {
        wx.navigateTo({
            url: '../comments/comments'
        });
    },
	toggleText(){
		let hideText = this.data.hideText,
			hideClass = this.data.hideClass == 'up' ? 'down' : 'up';
		this.setData({
			hideText: !hideText,
			hideClass: hideClass
		})
    },
    buy: function () {
        var id = this.data.id;
        // console.log(id);
        wx.navigateTo({
            url: '../order/order?id='+id,
          });
    },
    love: function(e) {
        this.setData({
            zan:'/image/love.png',
            like:'已想看'
        })
        var detail = this.data.detail;
        wx.setStorage({
            key:"love",
            data:{
                detail:this.data.detail
            }
          })
    },
    score: function() {
        this.setData({
            score:'/image/rename.png',
            love:'已评分'
        })
    }
})