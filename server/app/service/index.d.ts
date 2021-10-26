interface IAccount {
    time: number,
    type: number,
    category: string,
    amount: number
}

interface ICategory {
    id: string,
    name: string,
    type: number
}

type IAccountList = IAccount[]

type ICategoryList = ICategory[]

declare module '*.json' {
    const value: any;
    export default value;
}
