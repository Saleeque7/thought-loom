import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    user:null,
    isAuthenticated:false
}


const userSlice = createSlice({
    name:'user',
    initialState,
    reducers:{
        setUserInfo(state,action){
            state.user = action.payload
        },
        setIsAuthenticated(state){
            state.isAuthenticated = true
        },
        userLogout(state){
            state.user = null,
            state.isAuthenticated =false
            localStorage.removeItem('accessTokenuserKey')
        }
    }

})

export const  {setUserInfo , setIsAuthenticated , userLogout } = userSlice.actions
export default userSlice.reducer