
### REST
#### REpresentational State Transfer  

Rest is a way to represent and transfer of the state of RESOURCE    

* Resource stands for something like to be stored, updated, deleted, read from a database.  
ex: Template is a resource to be saved, updated, delete or read from a database  
    (which is mongodb/elastic-search-driven db in our case)  

We can design the REST of the template resource here.  
<pre>
     [C]   CREATE: /templates [POST]
     [R]   READ:   /templates [GET]
           READ:   /templates/:id [GET]
     [U]   UPDATE: /templates/:id [PUT or POST]
     [D]   DELETE: /templates/:id [DELETE]
           DELETE: /templates/:id/delete [GET]
     CRUD  
</pre>