import React from 'react'
import Home from './pages/Home'
import UsersList from './pages/UsersList'
export default[
    {   ...Home,
        path:'/',
        exact:true
    },
    {  
        ...UsersList,
        path:'/users',
        
    },
]