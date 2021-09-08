### Endpoints for Posts controller

#### create a post
- uri: '/posts' [POST]
- params:  
    <pre>

        
        "pstOrder": "string"
        "pstTitle": "string",
        "pstContent":"string",
        "pstNumberOfLikes":"string",
        "pstNumberOfDislikes":"string",
        "attachmentIds": "string",
        "pstRate":"string",
        "createdAt": "date",
        "createdBy":"user"
        "updatedAt": "date",
        "createdBy": "user",
        "updatedBy": "user"

    } 
    </pre>
  
- response:  
    <pre>
    {
        post: addedPost,
        success: 'your post must be approved by the administrator, please wait!'
    }
    </pre>

#### read posts
- uri: '/allPosts' [GET]
- params:    
``
{} 
``  
- response:  
``
[Posts Array]
``



#### read a post
- uri: '/posts/:id' [GET]
- params:  
    <pre>
    {
    } 
    </pre>
  
- response:  
    <pre>
    [post object]
    </pre>


#### update a post
- uri: '/posts/:id' [PUT]
- params:  
    <pre>
       
        pstTitle: 'string',
        pstContent:'string',
        updatedAt: 'date',
        updatedBy: user,

    </pre>
  
- response:  
    <pre>
    {
        post: updatedPost,
        success: 'your update must be approved by the administrator, please wait!'
    }
    </pre>


#### delete a post
- uri: '/posts/:id' [DELETE]
- params:  
    <pre>
    {id: 'post_id-string'}
    </pre>
- response:  
    <pre>
    {success: 'post deleted.'}
    </pre>
  


#### delete a post
- uri: '/posts/:id/delete' [GET]
- params:  
   <pre>
    {id: 'post_id-string'}
    </pre>
  
- response:  
  <pre>
    {success: 'post deleted.'}
    </pre>


#### get count of new posts
- uri: '/posts?type=new' [GET]
- params:  
    <pre>
    {
    } 
    </pre>
  
- response:  
    <pre>
    {}
    </pre>

const getCountOfNewPosts = async () => {
    const request = await CallServerPromise.get_count_of_new_posts();
    if(request.success) {
        return request.data;
    }
    else return 0;
}

setInterval(()=>{
    const count = await getCountOfNewPosts();
    if(count > 0) showNotification();
}, 1000*20)

