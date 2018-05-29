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
            '九州华辰国际影城（理工店）',
            '九州华辰国际影城（麦庐财大店）',
            '完美世界店（17.5乐买佳店）',
            '万达国际影院（红谷滩店）',
        ],
        multiArray: [['5月26日','5月27日','5月28日'],['10:15','12:25','13:15','14:20','15:10','16:15','18:10']],
        multi:[['1排','2排','3排','4排','5排','6排','7排','8排','9排','10排'],['1座','2座','3座','4座','5座','6座','7座','8座','9座','10座','11座','12座']],
        location:[{
            "price": "29",
            "addr": "青山湖经济技术开发区华东交大理工学院",
        }, {
            "price": "32",
            "addr": "青山湖经济技术开发区江西财经大学麦庐园店",
        }, {
            "price": "33",
            "addr": "青山湖区榴云路商业街88号乐麦佳四楼",
        }, {
            "price": "32",
            "addr": "红谷滩万达广场",
        }]
    },
    onLoad: function(options) {
        var that = this;
        this.setData({
            id: options.id
        })
        var id = this.data.id,
            url = 'https://m.maoyan.com/movie/' + id + '.json' 
        wx.request({
            url: url,
            success: function(res) {
                var detail = res.data.data.MovieDetailModel;
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
                content: '请选择影院,观影时段和座位',
                showCancel:false
              })
              return
        } 
    },
    bindMultiPickerChange: function (e) {
        // console.log('picker发送选择改变，携带值为', e.detail.value)
        this.setData({
            multiIndex: e.detail.value
          })
       var dateId = this.data.multiIndex[0];
       var date = this.data.multiArray[0][dateId];
       var timeId = this.data.multiIndex[1];
       var time = this.data.multiArray[1][timeId];
       var Time = date + ' '+time;
       this.setData({
           Time: Time
       })
      },
    bindMultiPicker: function(e) {
        this.setData({
            multiId: e.detail.value
        })
        var id = this.data.multiId[0];
        var row = this.data.multi[0][id];
        var Id = this.data.multiId[1];
        var column = this.data.multi[1][Id];
        var Seat = row + ' ' + column;
        this.setData({
            Seat:Seat
        })
      },
    bindPickerChange: function (e) {
        var index = e.detail.value;
        this.setData({
            index: e.detail.value,
            Cinema: this.data.cinema[index]
          })
        this.setData({
            location: this.data.location[index]
        });
        var Cinema = this.data.cinema[index];
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
     },
    numJiaTap: function() {
           var currentNum = this.data.buyNumber;
           currentNum++ ;
           this.setData({  
               buyNumber: currentNum
           })  
     },
    buyNow: function () {
        var price = this.data.location.price;
        var number = this.data.buyNumber;
        var Time = this.data.Time;
        var Cinema = this.data.Cinema;
        var Seat = this.data.Seat;
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
            url: '../order-list/index?price='+price+'&number='+number+'&Time='+Time+'&Cinema='+Cinema+'&Seat='+Seat
        });
    }
})