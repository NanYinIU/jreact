import request from "@/utils/request";
import { stringify } from "qs";

export async function userLogin(param){
    return request(`/api/user/login?${stringify(param)}`);
}

export function userLogout(){
    return request(`/user/logout`)
}