### Endpoints for Webpages controller

#### create a webpage
- uri: '/webpages' [POST]
- params:  
    <pre>
    {
        wbpFollowers:'string',
        wbpDescription: 'string',
        createdAt: 'date',
        updatedAt: 'date',
        createdBy: 'user'
        updatedBy: 'user'
    } 
    </pre>
  
- response:  
     <pre>
    {
        webpage: savedWebpage,
        success: 'web page created successfully, now you can start publish your content !'
    }
    </pre>

#### read webpages
- uri: '/webpages' [GET]
- params:  
    <pre>
    {
    } 
    </pre>
  
- response:  
    <pre>
    [Webpages array]
    </pre>


#### read a webpage
- uri: '/webpages/:id' [GET]
- params:  
    <pre>
    {
    } 
    </pre>
  
- response:  
    <pre>
    [webpage object]
    </pre>


#### update a template
- uri: '/webpages/:id' [PUT]
- params:  
    <pre>
    {
    } 
    </pre>
  
- response:  
    <pre>
    [webpage object]
    </pre>


#### delete a webpage
- uri: '/webpages/:id' [DELETE]
- params:  
    <pre>
    {id: 'webpage_id-string'}
    </pre>
- response:  
    <pre>
    {success: 'web page deleted.'}
    </pre>


#### delete a webpage
- uri: '/webpages/:id/delete' [GET]
- params:  
   <pre>
    {id: 'webpage_id-string'}
    </pre>
  
- response:  
  <pre>
    {success: 'webpage deleted.'}
    </pre>


