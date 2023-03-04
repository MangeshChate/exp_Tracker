import React from "react";
import 'boxicons'
import {default as api} from '../store/apiSlice'

export default function List() {
    let Transactions;

    const {data,isFetching,isSuccess ,isError}  =  api.useGetLabelsQuery()
    const[deleteTransaction] = api.useDeleteTransactionMutation()
    // console.log(data)

    const handlerClick = (e) =>{
        if(!e.target.dataset.id){
            return 0
        }
        deleteTransaction({_id:e.target.dataset.id})
    }

    if(isFetching){
        Transactions = <div className="">Fetching</div>
    }else if(isSuccess){
               
        Transactions = data.map((v,i)=><Transaction key={i} category={v} handler={handlerClick}/>)
     
    }else if(isError){
        Transactions = <div className="">Error</div>
    }
   


  return (
    <div className="flex flex-col py-6 gap-3">
      <h1 className="py-4 text-md font-bold text-xl">Histroy</h1>
      {Transactions}
    </div>

  );
}

function Transaction({category , handler}){
    if(!category)return null;
    return(
        <div className="item flex justify-center bg-gray-50 py-2 rounded-r" style={{borderRight:`8px solid ${category.color ?? "#e5e5e5"}`}}>
            <button className="px-3" onClick={handler}>
            <box-icon size="15px"color={category.color ?? "#e5e5e5"} name="trash" data-id={category._id ?? ''}/>
            </button>
            <span className="block w-full"> 
            {category.name??''}
               
            </span>
        </div>
    )
}