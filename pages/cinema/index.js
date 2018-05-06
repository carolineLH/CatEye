//index.js
//获取应用实例
let app = getApp()
Page({
    data: {
        city: "南昌市",
        items:[],
        isShow: false,
        ways: [{
            "w": "座",
            "color": "#589daf"
        }, {
            "w": "退",
            "color": "#589daf"
        }, {
            "w": "改签",
            "color": "#589daf"
        }, {
            "w": "小吃"
        }, {
            "w": "折扣卡"
        }],
        desc: []
    },
    onLoad: function() {
        // 发送请求获取数据
        this.loadCinema();
        // wx 是微信的缩写
        let that = this;
    },
    onShow: function() {
        console.log('Onshow')
        let that = this;
        wx.getStorage({
            key: 'key',
            success: function(res) {
                console.log(res.data.cardmes.city);
                that.setData({
                    city: res.data.cardmes.city,
                })

            }
        })
    },
    loadCinema(){
        const that = this;
        wx.request({
            url: 'https://m.maoyan.com/cinemas.json',
            method: "GET",
            header: {
                'content-type': 'application/json'
            },
            success(res){
                console.log(res);
                var location = res.data.data;
                var locationArr = [];
                for (var i in location) {
                    locationArr.push(location[i]);
                }
                console.log(locationArr[0]);
                that.setData({
                    location: locationArr[0]
                });
            }
        });
    },
    goLocaltion:function () {
        wx.navigateTo({
            url: '../switchcity/switchcity'
        });
    },
    buyPage: function () {
        wx.switchTab({
            url: '../home/index'
        })
    }
})