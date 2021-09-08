### Endpoints for Templates controller

#### create a template
- uri: '/templates' [POST]
- params:  
    <pre>
    {
        "tplname": "string",
        "tplcategory": "string",
        "tpldescription": "string",
        "createdAt": "date",
        "updatedAt": "date",
        
    } 
    </pre>
  
- response:  
     <pre>
    {
        template: savedTemplate,
        success: 'Template added successfully !'
    }
    </pre>

#### read templates
- uri: '/templates' [GET]
- params:  
    <pre>
    {
    } 
    </pre>
  
- response:  
    <pre>
    [Templates array]
    </pre>


#### read a template
- uri: '/templates/:id' [GET]
- params:  
    <pre>
    {
    } 
    </pre>
  
- response:  
    <pre>
    [template object]
    </pre>


#### update a template
- uri: '/templates/:id' [PUT]
- params:  
    <pre>
    {
    } 
    </pre>
  
- response:  
    <pre>
    [template object]
    </pre>


#### delete a template
- uri: '/templates/:id' [DELETE]
- params:  
    <pre>
    {id: 'template_id-string'}
    </pre>
- response:  
    <pre>
    {success: 'template deleted.'}
    </pre>


#### delete a template
- uri: '/templates/:id/delete' [GET]
- params:  
   <pre>
    {id: 'template_id-string'}
    </pre>
  
- response:  
  <pre>
    {success: 'template deleted.'}
    </pre>


