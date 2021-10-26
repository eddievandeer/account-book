import { getAccountList, getCategoryList, addAccountItem } from "src/service"

export interface IAccount {
    time: number,
    type: number,
    category: string,
    amount: number
}

export interface ICategory {
    id: string,
    name: string,
    type: number
}

export type IDataResource = IAccount[]

export type ICategoryList = ICategory[]

interface StateTypes {
    category: ICategoryList,
    dataResource: IDataResource
}

const account = {
    namespace: 'account',
    state: {
        category: [],
        dataResource: []
    },
    reducers: {
        setCategory(state: StateTypes, { payload: categoryList }: any) { 
            return {
                ...state,
                category: categoryList
            }
        },
        setList(state: StateTypes, { payload: dataResource }: any) {
            return {
                ...state,
                dataResource: dataResource
            }
        },
    },
    effects: {
        *getCategoryList(action : any, { put, call } : any) {
            const data: ICategoryList = yield call(getCategoryList)
            
            yield put({
                type: 'setCategory',
                payload: data
            })
        },
        *getAccountList({ payload } : any, { put, call } : any) {
            const data: IDataResource = yield call(getAccountList, payload)
            
            yield put({
                type: 'setList',
                payload: data
            })
        },
        *addBill({ payload: dataResource } : any, { put, call } : any) {
            const result: IDataResource = yield call(addAccountItem, dataResource)

            yield put({
                type: 'setList',
                payload: result
            })
        }
    }
}

export default account