
var app = getApp()
Page({
  data:{
    phone:'',
  
    _id:'',//用来找借书列表
    
    response:'false',//记录反馈回来的语句

    rentbook_list:[{
      rentbook_name:'',
      rentbook_code:'',
      rentbook_id:''
      },
      {
      rentbook_name:'',
      rentbook_code:'',
      rentbook_id:''
      },
      {
      rentbook_name:'',
      rentbook_code:'',
      rentbook_id:''
      },
      {
      rentbook_name:'',
      rentbook_code:'',
      rentbook_id:''
      }
      
      ],//用来记录借书列表
    
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
        
        if( res.data == "没有手机号为"+that.data.phone+"的会员"  )
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
        that.setData({
          _id:res.data.member._id,//存储_id信息，以便获取借书列表
          response:'true' 
            
        
     })
        
        wx.setStorage({
          key: 'user_information',//存储用户信息
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

    }  
      
  }, 
      
    fail: function() {
        // fail
      },
      complete: function() {
        // complete
      }
    })        

        
        //判断没有注册过的用户，根据response服务器反馈的语句
        if( that.data.response == 'true'  )
        {
            
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
         
          var j =0 ;
          
          for (var i = 0; i<40 ; i++){

                if (res.data[i].inventory.isRent == true && res.data[i].inventory.inv_code == 104100009893 ){

                   that.data.rentbook_list[j].rentbook_name = res.data[i].inventory.name;
                   that.data.rentbook_list[j].rentbook_code = '104100009893' ;
                   
                   j++ ;
                   break;
                }
          }

          for (var i = 0; i<40 ; i++){

              
                if (res.data[i].inventory.isRent == true && res.data[i].inventory.inv_code == 104100009901 ){
                  

                   that.data.rentbook_list[j].rentbook_name = res.data[i].inventory.name;
                   that.data.rentbook_list[j].rentbook_code = '104100009901' ;

                   
                   j++ ;
                   break;
                }
          }
          for (var i = 0; i<40 ; i++){

              
                if (res.data[i].inventory.isRent == true && res.data[i].inventory.inv_code == 104100009786 ){
                  
                   that.data.rentbook_list[j].rentbook_name = res.data[i].inventory.name;
                   that.data.rentbook_list[j].rentbook_code = '104100009786' ;
                 
                   j++ ;
                   break;
                }
          }
          for (var i = 0; i<40 ; i++){

              
                if (res.data[i].inventory.isRent == true && res.data[i].inventory.inv_code == 104100009877 ){

                   that.data.rentbook_list[j].rentbook_name = res.data[i].inventory.name;
                   that.data.rentbook_list[j].rentbook_code = '104100009877'  ;
                  
                   j++ ;
                   break;
                }
          }
       
          that.setData({
                rentbook_list:that.data.rentbook_list//存储_id信息，以便获取借书列表

     })

            console.log(that.data.rentbook_list)


             wx.setStorage({
                      key: 'book_information',
                      data: that.data.rentbook_list,
              
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


