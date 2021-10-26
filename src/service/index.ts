import { IAccount, IDataResource, ICategoryList } from '../model/account'

export function getCategoryList() : Promise<ICategoryList> {
    return fetch('http://127.0.0.1:7001/getCategories', {
        method:'GET',
    }).then(res => res.json())
}

export function getAccountList() : Promise<IDataResource> {
    return fetch('http://127.0.0.1:7001/getAccountList', {
        method:'GET',
    }).then(res => res.json())
}

export function addAccountItem(payload: IAccount) : Promise<IDataResource> {
    return fetch('http://127.0.0.1:7001/addNewAccount', {
        method:'POST',
        headers: {
            'content-type': 'application/json'
          },
        body: JSON.stringify(payload)
    }).then(res => res.json())
}