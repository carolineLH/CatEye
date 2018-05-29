//index.js
//获取应用实例
let app = getApp()
Page({
    data: {
        city: "南昌市",
        isShow: false,
        items: [{
            "nm": "天智创客影城（江西财经大学麦庐店）",
            "price": "29",
            "addr": "青山湖区南昌经济开发区",
            "discount": "超凡战队等五部电影特惠",
            "card": "开卡购票首单更优惠",
            "distance": "1.8km",
            "ways": [{
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
            }]
        }, {
            "nm": "九州华辰国际影城（麦庐财大店）",
            "price": "32",
            "addr": "青山湖经济技术开发区江西财经大学麦庐园店",
            "ways": [{
                "w": "座",
                "color": "#589daf"
            }, {
                "w": "退",
                "color": "#589daf"
            }, {
                "w": "改签",
                "color": "#589daf"
            }, {
                "w": "小吃",
                "color": "#ff9900"
            }, {
                "w": "折扣卡",
                "color": "#ff9900"
            }],
            "discount": "提着心，吊着胆等5部电影特惠",
            "card": "开卡购票首单更优惠",
            "distance": "2.5km"
        }, {
            "nm": "完美世界店（17.5乐买佳店）",
            "price": "33",
            "addr": "青山湖区榴云路商业街88号乐麦佳四楼",
            "ways": [{
                "w": "座",
                "color": "#589daf"
            }, {
                "w": "退",
                "color": "#589daf"
            }, {
                "w": "改签",
                "color": "#589daf"
            }, {
                "w": "小吃",
                "color": "#ff9900"
            }, {
                "w": "折扣卡",
                "color": "#ff9900"
            }],
            "discount": "提着心，吊着胆等5部电影特惠",
            "card": "开卡购票首单更优惠",
            "distance": "2.5km"
        }, {
            "nm": "万达国际影院（红谷滩店）",
            "price": "32",
            "addr": "红谷滩万达广场",
            "ways": [{
                "w": "座",
                "color": "#589daf"
            }, {
                "w": "退",
                "color": "#589daf"
            }, {
                "w": "改签",
                "color": "#589daf"
            }, {
                "w": "小吃",
                "color": "#ff9900"
            }, {
                "w": "折扣卡",
                "color": "#ff9900"
            }],
            "discount": "提着心，吊着胆等5部电影特惠",
            "card": "开卡购票首单更优惠",
            "distance": "3.5km"
        }],
        "ways": [{
            "w": "座",
            "color": "#589daf"
        }, {
            "w": "退",
            "color": "#589daf"
        }, {
            "w": "改签",
            "color": "#589daf"
        }, {
            "w": "小吃",
            "color": "#ff9900"
        }, {
            "w": "折扣卡",
            "color": "#ff9900"
        }],
        desc: []
    },
    onLoad: function() {
        // 发送请求获取数据
        // this.loadCinema();
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
    // loadCinema(){
    //     const that = this;
    //     wx.request({
    //         url: 'https://m.maoyan.com/cinemas.json',
    //         method: "GET",
    //         header: {
    //             'content-type': 'application/json'
    //         },
    //         success(res){
    //             var location = res.data.data;
    //             var locationArr = [];
    //             for (var i in location) {
    //                 locationArr.push(location[i]);
    //             }
    //             that.setData({
    //                 location: locationArr[0]
    //             });
    //         }
    //     });
    // },
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