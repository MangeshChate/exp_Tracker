import {createApi ,fetchBaseQuery} from '@reduxjs/toolkit/query/react'
// import { get_Labels } from '../../../server/controller/controller';


const baseURI = 'http://localhost:8080'

export const apiSlice = createApi({
    baseQuery:fetchBaseQuery({baseUrl:baseURI}),
    endpoints:builder => ({
        //getCategories
        getCategories:builder.query({
            query:()=> './api/categories',
            providesTags:['categories']
        }),
        // get_Labels
        getLabels:builder.query({
            query:()=> './api/labels',
            providesTags:['transactions']

        }),
        // add new Transactions
        addTransaction:builder.mutation({
            query:(intialTransaction)=>({
                url:"/api/transaction",
                method:'POST',
                body:intialTransaction,
                
            }),
            invalidatesTags:['transactions']
        }),
        
        //delete record transaction
        deleteTransaction:builder.mutation({
            query:recordId=>({
                // DELETE http://localhost:8080
                url:'./api/transaction',
                method:"DELETE",
                body:recordId
                
            }),
            invalidatesTags:['transactions']
        })




    })
})





export default apiSlice;