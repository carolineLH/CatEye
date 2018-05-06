var wxpay = require('../../utils/pay.js')
var app = getApp()
Page({
  data:{
    orderList:true,
    show:true,
    price:32,
    number:1
  },
  cancelOrderTap:function(e){
    var that = this;
    var orderId = e.currentTarget.dataset.id;
     wx.showModal({
      title: '确定要取消该订单吗？',
      content: '',
      success: function(res) {
        if (res.confirm) {
          wx.showLoading();
          wx.request({
            url: 'https://api.it120.cc/' + app.globalData.subDomain + '/order/close',
            data: {
              token: app.globalData.token,
              orderId: orderId
            },
            success: (res) => {
              wx.hideLoading();
              if (res.data.code == 0) {
                that.onShow();
              }
            }
          })
        }
      }
    })
  },
  toPayTap:function(e){
    var that = this;
    var orderId = e.currentTarget.dataset.id;
    var money = e.currentTarget.dataset.money;
    wx.request({
      url: 'https://api.it120.cc/' + app.globalData.subDomain + '/user/amount',
      data: {
        token: app.globalData.token
      },
      success: function (res) {
        if (res.data.code == 0) {
          // res.data.data.balance
          money = money - res.data.data.balance;
          if (money <= 0) {
            // 直接使用余额支付
            wx.request({
              url: 'https://api.it120.cc/' + app.globalData.subDomain + '/order/pay',
              method:'POST',
              header: {
                'content-type': 'application/x-www-form-urlencoded'
              },
              data: {
                token: app.globalData.token,
                orderId: orderId
              },
              success: function (res2) {
                that.onShow();
              }
            })
          } else {
            wxpay.wxpay(app, money, orderId, "/pages/order-list/index");
          }
        } else {
          wx.showModal({
            title: '错误',
            content: '无法获取用户资金信息',
            showCancel: false
          })
        }
      }
    })    
  },
  onLoad:function(options){
    // 生命周期函数--监听页面加载
    var that = this;
    this.setData({
        price: options.price,
        number: options.number
    })
    var price = this.data.price;
    console.log(price);
    var number = this.data.number;
    console.log(number);
  }, 
  onReady:function(){
    // 生命周期函数--监听页面初次渲染完成
  },
  onShow:function(){
    // 获取订单列表
    // wx.showLoading();
    var that = this;
    wx.getStorage({
        key: 'detail',
        success: function(res) {
            console.log(res.data.orderList);
            that.setData({
                goodsMap: res.data.orderList
            })
        } 
      });
    that.setData({
        orderList:null
    })
  },
  cancelOrderTap: function () {
        var that = this;
        wx.showModal({
            title:'确定要取消该订单吗?',
            content:'',
            success: function() {
                wx.removeStorage({
                    key: 'detail',
                    success: function(res) {
                      that.setData({
                          orderList:true,
                          show: false
                      })
                    } 
                  })
            }
        })
  },
  toPayTap: function (e) {
    var that = this;
    var money = e.currentTarget.dataset.money;
    if (money) {
        wxpay.wxpay(app, money, '', "..s/order-list/index");
    } else {
        wx.showModal({
            title: '错误',
            content: '无法获取用户资金信息',
            showCancel: false
          })
    }
  },
  onHide:function(){
    // 生命周期函数--监听页面隐藏
 
  },
  onUnload:function(){
    // 生命周期函数--监听页面卸载
 
  },
  onPullDownRefresh: function() {
    // 页面相关事件处理函数--监听用户下拉动作
   
  },
  onReachBottom: function() {
    // 页面上拉触底事件的处理函数
  
  }
})
