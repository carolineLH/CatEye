//index.js
//获取应用实例
var app = getApp()
Page({
    data: {
        latitude: 23.099994,
        longitude: 113.324520,
        userInfo: {},
        canIUse: wx.canIUse('button.open-type.getUserInfo')
    },
    onLoad: function() {
        app.getUserInfo((data) => {
            this.setData({
                userInfo: data
            })
        })
        wx.getSetting({
            success: function(res){
              if (res.authSetting['scope.userInfo']) {
                wx.getUserInfo({
                  success: function(res) {
                  }
                })
              }
            }
          })
    },
    onShow: function () {
        this.getUserInfo();
    },
    bindGetUserInfo: function(e) {
        console.log(e.detail.userInfo)
        if (e.detail.userInfo){
          //用户按了允许授权按钮
        } else {
          //用户按了拒绝按钮
        }
      },
    getUserInfo: function (cb) {
        var that = this
        wx.login({
          success: function () {
            wx.getUserInfo({
              success: function (res) {
                that.setData({
                  userInfo: res.userInfo
                });
              }
            })
          }
        })
    },
    onReady: function() {
        // console.log('ready');
        wx.setNavigationBarTitle({
            title: '我的'
        })
        this.mapCtx = wx.createMapContext('myMap')
        wx.getLocation({
            type: 'wgs84',
            success: (res) => {
                var latitude = res.latitude
                var longitude = res.longitude
                this.setData({
                    latitude,
                    longitude
                })
            }

        })

    },
    getCenterLocation: function() {
        this.mapCtx.getCenterLocation({
            success: function(res) {
                console.log(res.longitude)
                console.log(res.latitude)
            }
        })
    },
    moveToLocation: function() {
        this.mapCtx.moveToLocation()
    }
})