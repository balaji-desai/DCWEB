import * as jwt from 'jsonwebtoken';
import { api } from "src/app/FW/AppSetting";
import { DateModel } from "src/app/app.model";

export function isEmptyObj(model:any):boolean
{
    if(!model)
    {
        return true;
    }else if(model == null)
    {
        return true;
    }else if(model.trim() == '')
    {
        return true
    }
    else false;
}

export function encrypt(hash:string)
{
    var sync = ((new Date().getMonth()+1)*(new Date().getHours()+1)+(new Date().getSeconds()));
    var token = jwt.sign({ password: hash, iat: Math.floor(Date.now() / 1000) - 3 }, api.passauth+sync.toString());
    return {token:token,val:sync*11};
}

export function toDateModel(date:any):DateModel
{
    var datemodel = new DateModel();
    datemodel.Day = date.day;
    datemodel.Month = date.month;
    datemodel.Year = date.year;
    return datemodel;
}