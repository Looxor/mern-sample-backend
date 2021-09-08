### Endpoints for Users controller

#### register [POST]
- uri: '/register'  
- params:  
    <pre>
    {
        firstname: 'string',
        lastname: 'string',
        email: 'email-string',
        password: 'password-string',
        cnfPassword: 'password-string',
        address: 'string',
        telephone: 'string/number',
        organisation: 'string'
    } 
    </pre>
  
- response:  
    <pre>
    {
        user: savedUser,
        success: 'Congrats your registration has been approved !'
    }
    </pre>

#### login [POST]
- uri: '/login'  
- params:  
    <pre>
    {
        email: 'email-string',
        password: 'password-string'
    } 
    </pre>
  
- response:  
    <pre>
    {
        user: [User Object], 
        token: 'token-string'
    }
    </pre>


#### allUsers [GET]
- uri: '/allUsers'  
- params:  
``
{} 
``  
- response:  
``
[Users Array]
``

#### create [POST]
- uri: '/create'  
- params:  
    <pre>
    {
        firstname: 'string',
        lastname: 'string',
        email: 'email-string',
        password: 'password-string',
        address: 'string',
        telephone: 'string/number',
        organisation: 'string'
    }
    </pre>
- response:  
    <pre>
    {
        user: user,
        success: 'Success !'
    }
    </pre>

#### update [POST]
- uri: '/update/:id'
- params:  
    <pre>
    {
        firstname: 'string',
        lastname: 'string',
        email: 'email-string',
        password: 'password-string',
        address: 'string',
        telephone: 'string/number',
        organisation: 'string'
    }
    </pre>
- response:  
    <pre>
    {
        success: 'User updated!'
    }
    </pre>

#### deleteUser [DELETE/GET]
- uri: '/deleteUser/:id', auth  
- params:  
    <pre>
    {id: 'user_id-string'}
    </pre>
- response:  
    <pre>
    {success: 'User deleted.'}
    </pre>

#### profile [GET]
- uri: '/profile', auth  
- params:  
- params:  
    <pre>
    {token: 'user_token-string'}
    </pre>
- response:  
    <pre>
    {User Object}
    </pre>



