import {FETCH_USERS} from '../actions'
export default(state=[],action)=>{
    // const {type,payload}=action
    switch(action.type){
        
        case FETCH_USERS:
            return action.payload.data;
         default: 
          return state   
    }
}