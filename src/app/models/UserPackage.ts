import { Package } from "./Package";

export interface UserPackage extends Package{
    internetPackageId: string,
    callMessagePackageId: string
}