var wxpay = require('../../utils/pay.js')
var app = getApp()
Page({
  data:{
    orderList:true,
    show:true,
    price:32,
    number:1,
    model:false,
    Time:'',
    Cinema:'',
    Seat:''
  },
  onLoad:function(options){
    // 生命周期函数--监听页面加载
    var that = this;
    this.setData({
        price: options.price,
        number: options.number,
        Time: options.Time,
        Cinema: options.Cinema,
        Seat: options.Seat
    })
    var price = this.data.price;
   
    var number = this.data.number;
    var Time = this.data.Time;
    var Cinema = this.data.Cinema;
    var Seat = this.data.Seat;
  }, 
  onReady:function(){
    // 生命周期函数--监听页面初次渲染完成
  },
  onShow:function(){
    // 获取订单列表
    var that = this;
    wx.getStorage({
        key: 'detail',
        success: function(res) {
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
            success: function(res) {
              if(res.confirm){
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
            }
        })
  },
  closed: function () {
    var that = this;
    wx.removeStorage({
      key: 'detail',
      success: function(res) {
        that.setData({
            orderList:true,
            show: false,
            model: false
        })
      } 
    })
  },
  toPayTap: function (e) {
    var that = this;
    var money = e.currentTarget.dataset.money;
    if (money) {
      wx.showLoading({
        title: '支付中',
      })
      setTimeout(function(){
        wx.hideLoading();
        that.setData({
          model:true
      })
      },2000)
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
