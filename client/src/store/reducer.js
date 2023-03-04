import {createSlice} from "@reduxjs/toolkit"

const intialState = {
    categories:[],
    transactions:[]
}
export const expenceSlice = createSlice({
    name:"expense",
    intialState,
    reducers:{
        getTransactions:(state)=>{
            //get code 
        }
    }
})


export const {getTransactions} = expenceSlice.actions;
export default expenceSlice.reducer;