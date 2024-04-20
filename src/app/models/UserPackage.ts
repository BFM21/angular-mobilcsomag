import { Package } from "./Package";

export interface UserPackage extends Package{
    userId:string,
    internetPackage: any,
    callMessagePackage: any
}