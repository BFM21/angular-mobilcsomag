export interface Package{
    id: string,
    name: string,
    description: string,
    price: string,
    type: PackageType
}


export enum PackageType{
    'USER_MADE',
    'STANDARD',
    'INTERNET',
    'CALL_MESSAGE'
}