import {USER_LOGIN_FAILS,USER_LOGIN_SUCESS,USER_LOGIN_REQUEST,USER_LOGOUT,USER_REGISTER_FAILS,USER_REGISTER_REQUEST,USER_REGISTER_SUCESS,
USER_DATA_REQUEST,USER_DATA_FAILS,USER_DATA_SUCESS,
USER_UPDATE_REQUEST,USER_UPDATE_FAILS,USER_UPDATE_SUCESS,USER_DATA_RESET,
USER_LIST_FAILS,USER_LIST_REQUEST,USER_LIST_SUCESS,USER_LIST_RESET,
USER_DELETE_FAILS,USER_DELETE_REQUEST,USER_DELETE_SUCESS,
USER_UPDATES_FAILS,USER_UPDATES_REQUEST,USER_UPDATES_RESET,USER_UPDATES_SUCESS} from '../consts/userConsts'

export const userReducer=(state={},action)=>{
    switch(action.type){
        case USER_LOGIN_REQUEST:
            return{loading:true}
        case USER_LOGIN_SUCESS:
            return{loading:false, userInfo:action.payload}  
          
        case USER_LOGIN_FAILS:
              return{loading:false,error:action.payload}
        case USER_LOGOUT:
            return {}
        default:
            return state
     
        }
}
export const registerReducer=(state={},action)=>{
    switch(action.type){
        case USER_REGISTER_REQUEST:
            return{loading:true}
        case USER_REGISTER_SUCESS:
            return{loading:false, userInfo:action.payload}  
          
        case USER_REGISTER_FAILS:
              return{loading:false,error:action.payload}
        default:
            return state
     
        }
}
export const DataReducer=(state={userdata:{}},action)=>{
    switch(action.type){
        case USER_DATA_REQUEST:
            return{...state,loading:true}
        case USER_DATA_SUCESS:
            return{loading:false,userdata:action.payload}  
          
        case USER_DATA_FAILS:
            return{loading:false,error:action.payload}
        case USER_DATA_RESET:
            return{userdata:{}}   
              default:
            return state
     
        }
}
export const updateReducer=(state={},action)=>{
    switch(action.type){
        case USER_UPDATE_REQUEST:
            return{loading:true}
        case USER_UPDATE_SUCESS:
            return{loading:false,sucess:true, userInfo:action.payload}  
          
        case USER_UPDATE_FAILS:
            return{loading:false,error:action.payload}
              default:
            return state
     
        }
}
export const getUsersList=(state={usersLists:[]},action)=>{
    switch(action.type){
        case USER_LIST_REQUEST:
            return{loading:true}
        case USER_LIST_SUCESS:
            return{loading:false,sucess:true, usersLists:action.payload}  
          
        case USER_LIST_FAILS:
            return{loading:false,error:action.payload}
              
        case USER_LIST_RESET:
            return{usersLists:[]}
            default:
            return state
     
        }
}
export const deleteReducer=(state={usersLists:[]},action)=>{
    switch(action.type){
        case USER_DELETE_REQUEST:
            return{loading:true}
        case USER_DELETE_SUCESS:
            return{loading:false,success:true}  
          
        case USER_DELETE_FAILS:
            return{loading:false,success:false,error:action.payload}
              
            default:
            return state
     
        }
}
export const updateById=(state={user:{}},action)=>{
    switch(action.type){
        case USER_UPDATES_REQUEST:
            return{loading:true}
        case USER_UPDATES_SUCESS:
            return{loading:false,success:true}  
          
        case USER_UPDATES_FAILS:
            return{loading:false,success:false,error:action.payload}
        case USER_UPDATES_RESET:
            return{ user:{}}
            default:
            return state
     
        }
}