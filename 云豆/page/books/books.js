var app = getApp()
Page({
  data:{
    
    //这组变量用来获取用户信息
    baby_name:'',
    card_number:'',
    max_book:'',
    rentCount:'',

    //用来进行条件渲染
    borrow:'false',
    give:'false',
    jieYue:'false',

    //用来存储用户要借书的图书编号
    shu_number:'',
    shu_name:'',
    
   //用来显示已借图书的信息
    rent_shu_name1:'',

    //用来post借书的信息用户id以及书的id
    mId1:'',
    bId1:''

  },



onLoad:function(options){
 

       var _this = this;  
         
        wx.getStorage({  
            key: 'dan', //获取已借图书的名字 
            success: function (res) {  
                _this.setData({  
                    rent_shu_name1: res.data
                   
                })  
            }  
        })
        
       wx.getStorage({  
            key: 'xin',  //获取用户信息
            success: function (res) {  
                _this.setData({  
                    
                    baby_name:res.data.member.baby_name,
                    card_number:res.data.member.card_number,
                    max_book:res.data.member.max_book,
                    rentCount:res.data.rentCount,
                    mId1:res.data.member._id
                   
                })  
            }  
        })
    
   
      
},

//获取用户借书的编号
userNameInput:function(res){
     
    
        this.setData({
            shu_number:res.detail.value

     })


},


saomiao:function(){
    var that = this
    wx.scanCode({
        success: (res) => {
            console.log(res)
            that.setData({
                shu_number:res
            })
        }
    })
},

 
 borrow:function(){

     var that = this
        that.setData({
           borrow:'true'//点击“借书”按钮，则触发消息
     })

 },


yuJieYue:function(){
    
    var that= this
    
    
   
    //发起请求，通过用户输入的编号，来获取该书的名字，用于预借阅显示,此时注意判断该书是否已经借出

   

    wx.request({
      url: 'http://120.25.227.156:8000/inventories/invCode/'+  that.data.shu_number,
      data: {},
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      header: {
        'content-type': 'application/json'
      }, // 设置请求的 header
      success: function(res){
        // success
        
         that.setData({
             shu_name:res.data.name,
             bId1:res.data._id
        })

       if(res.data.isRent == 'false')  
       {
            that.setData({
                jieYue:'true',
                shu_name:res.data.name,
                bId1:res.data._id
            })  
       }

       else
       {
            wx.showModal({
            title:'警告',
            content:'所选图书已借出',
            success:function(res){
            if(res.confirm){
            console.log('用户点击确定')
            }
            }
        })

       }
      }
    })

},


  give:function(){

    this.setData({
        give:'true'
     })

 },


 queren:function(){

     var that = this

     console.log(that.data.bId1)
     wx.request({
      url: 'http://120.25.227.156:8000/records/mob/return/'+ that.data.bId1,
      data: {

      },
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      header: {
        'content-type': 'application/json'
      }, // 设置请求的 header
      success: function(res){
        // success
      } 
     })


     wx.showModal({
        title:'提示',
        content:'还书成功',
        success:function(res){
        if(res.confirm){
          console.log('用户点击确定')
          }
        }
      })
 },

 queren1:function(){

     var that = this


     wx.request({
      url: 'http://120.25.227.156:8000/records/mob/create',
      data: {

          mId: that.data.mId1,
          bId: that.data.bId1,
          status:'R'
      },
      method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      header: {
        'content-type': 'application/json'
      }, // 设置请求的 header
      success: function(res){
        // success
         
           
      }
    })

     wx.showModal({
        title:'提示',
        content:'借书成功',
        success:function(res){
        if(res.confirm){
          console.log('用户点击确定')
          }
        }
      })
 }


})
