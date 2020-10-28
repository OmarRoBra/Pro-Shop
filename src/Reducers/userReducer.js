import {USER_LOGIN_FAILS,USER_LOGIN_SUCESS,USER_LOGIN_REQUEST,USER_LOGOUT,USER_REGISTER_FAILS,USER_REGISTER_REQUEST,USER_REGISTER_SUCESS,
USER_DATA_REQUEST,USER_DATA_FAILS,USER_DATA_SUCESS,
USER_UPDATE_REQUEST,USER_UPDATE_FAILS,USER_UPDATE_RESET,USER_UPDATE_SUCESS} from '../consts/userConsts'

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