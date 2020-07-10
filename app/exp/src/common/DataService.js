import Fetch from "./Fetch";

export function GetData(table,page,number,conditions,orders,cb) {
    Fetch('/service/def/get_data',{
        table_name:table,
        page:page,
        number:number,
        conditions:conditions,
        orders:orders??[]
    },(res)=>{
        cb(res)
    },(e)=>{
        cb(e)
    })
}

export function ProcessData(table,type,data,cb) {
    Fetch('/service/data/process',{
        table:table,
        type:type,
        data:data,
    },(res)=>{
        cb(res)
    },(e)=>{
        cb(e)
    })
}

export function ComboSearch(source,rowSource) {
    let condition = {
        field:source,
        value:'',
        flag:'like'
    };
    condition[source] = '';
    return (search,callback)=>{
        condition.value = search+'%';
        GetData(rowSource,1,50,[
            condition
        ],null,(res)=>{
            if (res.status) {
                callback(res.data.list);
            } else {
                callback(null);
            }
        });
    };
}

export function TableLoad(opt,callback) {
    GetData(opt.source,opt?.page||1,opt?.number || 50,[],null,(res)=>{
        if (res.status) {
            callback({
                data:res.data.list,
                page:opt.page,
                count:res.data.count
            });
        } else {
            callback(null);
        }
    });
}