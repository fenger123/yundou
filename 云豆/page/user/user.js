
var app = getApp()
Page({
  data:{
    phone:'',
  
    _id:'',//用来找借书列表
    
    response:''//记录反馈回来的语句
  },

  userNameInput:function(e){

      this.setData({
          phone: e.detail.value
     })
  },


  loginIn:function(){
    var that= this
    
    wx.request({
      url: 'http://120.25.227.156:8000/members/mob/phone/'+that.data.phone,
      data: {},
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      header: {
        'content-type': 'application/json'
      }, // 设置请求的 header
      success: function(res){
        // success
  console.log(res.data)
        that.setData({
            response:res.data,
            _id:res.data.member._id//存储_id信息，以便获取借书列表

     })
     console.log(that.data.response)
        wx.setStorage({
          key: 'xin',//存储用户信息
          data: res.data,
          
          success: function(r){
           
          },
          fail: function() {
            // fail
          },
          complete: function() {
            // complete
          }
          
        })

        
      
  }, 
      
    fail: function() {
        // fail
      },
      complete: function() {
        // complete
      }
    })        

        console.log(that.data.response)
        //判断没有注册过的用户，根据response服务器反馈的语句
        if( that.data.response == "没有手机号为"+that.data.phone+"的会员"  )
        {
            wx.showModal({
                title:'提示',
                content:'没有手机用户'+that.data.phone+'没有注册',
                success:function(res){
                if(res.confirm){
                  console.log('用户点击确定')
                  }
                }
              }) 

        }

        else{
        wx.navigateTo({
              
              url: '../books/books'
              
        })

        //根据_id信息再次发起请求，获取用户已经借书的信息

        wx.request({
          url: 'http://120.25.227.156:8000/records/mob/'+that.data._id,
          data: {},
          method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
          header: {
            'content-type': 'application/json'
          }, // 设置请求的 header

          success: function(res){
            // success
            
          //已经获取的书的信息比较多，此处根据最大借书量只判断了四次，想把借的书都存起来，但是setStorage只能存最后一次

        
          for (var i = 0; i<4 ; i++){

                if (res.data[i].inventory.isRent == 'true'){
                    
                    wx.setStorage({
                      key: 'dan',
                      data: res.data[i].inventory.name,
              
                      success: function(r){
              
                      },
                      fail: function() {
                      // fail
                      },
                      complete: function() {
                      // complete
                    }
                  })
                }

                
              }  
               
          },
          
          fail: function() {
            // fail
          
          },
          complete: function() {
            // complete
          }
        })
      } 
   },

  //设置小程序分享
  onShareAppMessage: function() {
    // 用户点击右上角分享
    return {
      title: '我的主页', // 分享标题
      desc: '我的第一个小程序', // 分享描述
      path: 'path' // 分享路径
    }
  }
})


