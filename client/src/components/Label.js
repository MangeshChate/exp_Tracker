import React from 'react'
import {default as api} from '../store/apiSlice'

import { getLabels} from '../helper/helper';

export default function Label() {

    const {data,isFetching,isSuccess ,isError}  =  api.useGetLabelsQuery()

    
    let Transaction;

    if(isFetching){
        Transaction = <div className="">Fetching</div>
    }else if(isSuccess){
        console.log(getLabels(data ,'type'))
            //    console.log()
        Transaction = getLabels(data ,'type').map((v , i)=><LabelComponent key={i} data={v}/>)
     
    }else if(isError){
        Transaction = <div className="">Error</div>
    }


    return (
        <>
            { Transaction}
        </>
    )
}

function LabelComponent({data}) {
    if(!data)return<></>;

    return (
        <div className="labels flex justify-between">
            <div className="flex gap-2">
            <div className="w-2 h-2 rounded py-3" style={{background:data.color ??"#f9c74f"}}></div>
                <h3>
                    {data.type ??''}
                </h3>
                <h3 className="font-bold">{Math.round(data.percent)?? 0 }%</h3>
            </div>
        </div>
    )
}
