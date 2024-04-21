import { Package } from "./Package";

export interface UserPackage extends Package{
    userId:string,
    internetPackageId: string,
    callMessagePackageId: string
}