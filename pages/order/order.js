//index.js
//获取应用实例
let app = getApp()
Page({
    data: {
        shopType: "addShopCar",
        buyNumber:1,
        buyNumMin:0,
        hideShopPopup:true,
        selCinema:'请选择',
        detail: '',
        cinema: [
            '博纳国际影城(铜锣湾店)',
            '大地影院(五湖国际店)',
            '恒大影城(南昌名都店)',
            '嘉华时代影城',
            '冷杉欢腾影城(上海北路店)',
            '南昌风云影城(领袖店)',
            '天智创客影城(江西财经大学麦庐店)',
            '万达国际影城(红谷滩店)',
            '万达影城(达观店)',
            '完美世界影城(17.5乐买佳店)',
            '星美国际商城(梦时代IMAX店)',
            '星天地国际影城',
            '星轶IMAX影城(南昌吾悦广场旗舰店)',
            '中影天幕国际影城(高新艺术中心店)',
            '亚影影城'
        ]
    },
    onLoad: function(options) {
        var that = this;
        this.setData({
            id: options.id
        })
        // console.log(this.data.id);
        var id = this.data.id,
            url = 'https://m.maoyan.com/movie/' + id + '.json' 
        wx.request({
            url: url,
            success: function(res) {
                var detail = res.data.data.MovieDetailModel;
                // console.log(detail);
                that.setData({
                    detail: detail
                })
            }
        })
    },
    onShow: function() {
        if (this.data.selCinema == "请选择") {
            wx.showModal({
                title: '提示',
                content: '请选择影院',
                showCancel:false
              })
              return
        } 
    },
    bindPickerChange: function (e) {
        const that = this;
        this.setData({
            index: e.detail.value
          })
        // console.log(e.detail.value);
        var index = e.detail.value;
        wx.request({
            url: 'https://m.maoyan.com/cinemas.json',
            method: "GET",
            header: {
                'content-type': 'application/json'
            },
            success(res){
                // console.log(res);
                var location = res.data.data;
                var locationArr = [];
                for (var i in location) {
                    locationArr.push(location[i]);
                }
                // console.log(locationArr[0]);
                that.setData({
                    location: locationArr[0][index]
                });
            }
        });
    },
    addToShopCart: function () {
        this.setData({
            shopType: "addShopCar"
          })
        this.bindGuiGeTap();
    },
    buyIt: function () {
        this.setData({
            shopType: "tobuy"
          });
          this.bindGuiGeTap();
    },
    bindGuiGeTap: function() {
        this.setData({  
           hideShopPopup: false 
       })  
     },
    numJianTap: function() {
        if(this.data.buyNumber > this.data.buyNumMin){
           var currentNum = this.data.buyNumber;
           currentNum--; 
           this.setData({  
               buyNumber: currentNum
           })  
        }
        console.log(this.data.buyNumber);
     },
    numJiaTap: function() {
           var currentNum = this.data.buyNumber;
           currentNum++ ;
           this.setData({  
               buyNumber: currentNum
           })  
     },
    buyNow: function () {
        var price = this.data.location.sellPrice;
        // console.log(price);
        var number = this.data.buyNumber;
        // console.log(number);
        if(this.data.buyNumber == 0){
            wx.showModal({
                title: '提示',
                content: '请选择商品数量哦',
                showCancel:false
              })
              return
        }
        wx.setStorage({
            key:"detail",
            data:{
                orderList: this.data.detail
            }
          })
        wx.navigateTo({
            url: '../order-list/index?price='+price+'&number='+number
        });
    }
})