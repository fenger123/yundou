var app = getApp()
Page({
  data:{
    
    //这组变量用来获取用户信息
    baby_name:'',
    card_number:'',
    max_book:'',
    rentCount:'',
    rentCount1:'',

    //用来进行条件渲染
    borrow:'false',
    give:'false',
    pre_borrow:'false',

    //用来存储用户要借书的图书编号
    book_number:'',
    book_name:'',
    
    


   //用来显示已借图书的信息
    rent_book:[{
        rentbook_name:'',
        rentbook_code:'' ,
      rentbook_id:''   
    },
    {
        rentbook_name:'',
        rentbook_code:'' ,
      rentbook_id:''   
    },
    {
        rentbook_name:'',
        rentbook_code:'' ,
      rentbook_id:''   
    },
    {
        rentbook_name:'',
        rentbook_code:'' ,
      rentbook_id:''   
    },
    ],
   
   

    //用来post借书的信息用户id以及书的id
    mId1:'',
    bId1:'',

    recordId:'123',//用来记录还书的id



    confirm:'false',

    switch0:'false',
    switch1:'false',
    switch2:'false',
    switch3:'false'

  },



onLoad:function(options){
 

       var _this = this;  
         
        wx.getStorage({  
            key: 'book_information', //获取已借图书的名字 
            success: function (res) {

                    for(var i = 0; i<4; i++)                
                    {
                    _this.data.rent_book[i].rentbook_name =  res.data[i].rentbook_name;
                   _this.data.rent_book[i].rentbook_code =  res.data[i].rentbook_code;
                   

                    }
                
                _this.setData({
                         rent_book:_this.data.rent_book//存储_id信息，以便获取借书列表

                 })

                
            }  

           
        })
        
      
       wx.getStorage({  
            key: 'user_information',  //获取用户信息
            success: function (res) {  
                _this.setData({  
                    
                    baby_name:res.data.member.baby_name,
                    card_number:res.data.member.card_number,
                    max_book:res.data.member.max_book,
                    rentCount:res.data.rentCount,
                    rentCount1:res.data.rentCount,
                    mId1:res.data.member._id
                   
                })  
            }  
        })
    
   
      
},

//获取用户借书的编号
userNameInput:function(res){
     
    
        this.setData({
            book_number:res.detail.value

     })


},

scan:function(){
    var that = this
    wx.scanCode({
        success: (res) => {
            console.log(res)
            that.setData({
                book_number:res
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


preBorrow:function(){
    
    var that= this
    
    
   
    //发起请求，通过用户输入的编号，来获取该书的名字，用于预借阅显示,此时注意判断该书是否已经借出

   

    wx.request({
      url: 'http://120.25.227.156:8000/inventories/invCode/'+  that.data.book_number,
      data: {},
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      header: {
        'content-type': 'application/json'
      }, // 设置请求的 header
      success: function(res){
        // success

       if(res.data.isRent == false)  
       {
            that.setData({
                pre_borrow:'true',
                book_name:res.data.name,
                bId1:res.data._id,
               
                
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

switch0Change:function(e){

       
        console.log('switch0 发生 change 事件，携带值为', e.detail.value)

       this.setData({
        switch0:e.detail.value
     })
         
},

switch1Change:function(e){

       
        console.log('switch1 发生 change 事件，携带值为', e.detail.value)

       this.setData({
        switch1:e.detail.value
     })
          
},
switch2Change:function(e){

        console.log('switch2 发生 change 事件，携带值为', e.detail.value)

       this.setData({
        switch2: e.detail.value
     })
         
},
switch3Change:function(e){

        
        console.log('switch3 发生 change 事件，携带值为', e.detail.value)

       this.setData({
        switch3:e.detail.value
     })
          
},

 confirm:function(){

     var that = this
     
     console.log(that.data.switch0)
     console.log(that.data.switch1)
     console.log(that.data.switch2)
     console.log(that.data.switch3)
     
     if(that.data.switch0 == true){
console.log("0")
        
     wx.request({
      url: 'http://120.25.227.156:8000/records/mob/return/'+ that.data.rent_book[0].rentbook_id,
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
         that.data.rentCount = that.data.rentCount - 1 ;

         this.setData({
        switch0:'false'
     })
     }

     if(that.data.switch1 == true){

        console.log("1")
     wx.request({
      url: 'http://120.25.227.156:8000/records/mob/return/'+ that.data.rent_book[1].rentbook_id,
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
that.data.rentCount = that.data.rentCount - 1 ;

this.setData({
        switch1:'false'
     })
     }

     if(that.data.switch2 == true){
console.log("2")
        
     wx.request({
      url: 'http://120.25.227.156:8000/records/mob/return/'+ that.data.rent_book[2].rentbook_id,
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

     that.data.rentCount = that.data.rentCount - 1 ;
     this.setData({
        switch2:'false'
     })

     }

     if(that.data.switch3 == true){
console.log("3")
        
     wx.request({
      url: 'http://120.25.227.156:8000/records/mob/return/'+ that.data.rent_book[3].rentbook_id,
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

     that.data.rentCount = that.data.rentCount - 1 ;
this.setData({
        switch3:'false'
     })
     }

     wx.showModal({
        title:'提示',
        content:'还书成功',
        success:function(res){
        if(res.confirm){
          console.log('用户点击确定')
          }
        }
      })
     
      that.setData({
           give:'false',
           pre_borrow:'false',
           rentCount:that.data.rentCount
          

     })
 },

 confirm1:function(){

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
        that.data.rent_book[that.data.rentCount -1 ].rentbook_id = res.data._id

         that.setData({
           rent_book:that.data.rent_book
        })  
        console.log(that.data.rent_book)   
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

      that.setData({
           borrow:'false',
           pre_borrow:'false',
           confirm:'true',//点击“借书”按钮，则触发消息
          

     })
     

     that.data.rent_book[that.data.rentCount].rentbook_name =  that.data.book_name;
     that.data.rent_book[that.data.rentCount].rentbook_code =  that.data.book_number;
   
     that.data.rentCount = that.data.rentCount + 1 ;
    // console.log(that.data.rentCount)
    // console.log(that.data.rent_book)

      that.setData({
           rent_book:that.data.rent_book,
           rentCount:that.data.rentCount,
           rentCount1:that.data.rentCount//点击“借书”按钮，则触发消息

     })
     
 }


})
