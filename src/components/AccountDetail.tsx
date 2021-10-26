import { Card } from 'antd'
import { ReactElement } from 'react'
import AccountItem from './AccountItem'

export interface IFilted {
    date: string,
    day: string,
    time: string,
    type: number,
    category: string,
    amount: number,
}

interface AccountDetailProps {
    title: string,
    data: IFilted[]
}

const AccountDetail = (props: AccountDetailProps) => {
    const { title, data } = props

    const renderList = () => {
        const map = {}
        
        return data.map((item: IFilted, index: number) => {
            let title: ReactElement | null = null
            let { date } = item
            if(map[date] === undefined) {
                title = (
                    <div className="ac-card-title">
                        <span className='ac-card-date'>{ item.date }</span>
                        <span className='ac-card-day'>{ item.day }</span>
                    </div>
                )
                map[date] = item
            }

            return (
                <div key={index}>
                    { title ? title : ''}
                    <div className={ title ? 'ac-card-t' : 'ac-card' }>
                        <AccountItem data={item}></AccountItem>
                    </div>
                </div>
            )
        })
    }

    return (
        <div style={{ marginBottom: '1rem' }}>
            <Card title={title} bordered={false} >
                { renderList() }
            </Card>
        </div>
    )
}

export default AccountDetail