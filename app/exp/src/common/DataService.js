import Fetch from "Fetch";

export function GetData(table,page,number,conditions,cb) {
    Fetch('/service/def/get_data',{
        table_name:table,
        page:page,
        number:number,
        conditions:conditions
    },(res)=>{
        cb(res)
    },(e)=>{
        cb(e)
    })
}