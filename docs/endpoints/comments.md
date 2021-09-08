### Endpoints for Comments controller

#### create a comment
- uri: '/comments' [POST]
- params:  
    <pre>
    {
        "cmtValue": "string",
        "cmtHelpfulCounts": "string",
        "cmtUnhelpfulCounts": "string",
        "cmtFlagCounts": "string",
        "createdAt": "date",
        "createdBy": "user",
        "updatedAt": "date",
        "updatedBy": "user",
    } 
    </pre>
  
- response:  
    <pre>
    {
        comment: addedcomment,
    }
    </pre>

#### read comments
- uri: '/allComments' [GET]
- params:    
``
{} 
``  
- response:  
``
[Comments Array]
``

#### update a comment
- uri: '/comments/:id' [PUT]
- params:  
    <pre>
       
        cmtValue:'string',
        updatedAt: 'date',
        updatedBy: user,

    </pre>
  
- response:  
    <pre>
    {
        comment: updatedComment
    }
    </pre>


#### delete a comment
- uri: '/comments/:id' [DELETE]
- params:  
    <pre>
    {id: 'comment_id-string'}
    </pre>
- response:  
    <pre>
    {success: 'comment deleted.'}
    </pre>
  


#### delete a comment
- uri: '/comments/:id/delete' [GET]
- params:  
   <pre>
    {id: 'comment_id-string'}
    </pre>
  
- response:  
  <pre>
    {success: 'comment deleted.'}
    </pre>


