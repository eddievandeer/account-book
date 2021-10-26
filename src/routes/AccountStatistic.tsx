import { connect } from 'dva'
import { Row, Col, Select, Progress, Card } from 'antd'
import { useEffect, useState } from 'react'
import { IAccount } from '../model/account'
import { MonthOptions, getAccountDetail, numberFormat } from 'src/utils'

interface IProgressData {
    name: string,
    total: number,
    type: number
}

const AccountStatistic = (props: any) => {
    const { category, dataResource, dispatch } = props
    const { Option } = Select

    const [total, setTotal] = useState(0)
    const [spend, setSpend] = useState(0)
    const [income, setIncome] = useState(0)
    const [currentMonth, setCurrentMonth] = useState(0)
    const [currentType, setCurrentType] = useState('2')
    const [progressData, setProgressData] = useState<IProgressData[]>([])

    useEffect(() => {
        dataResource.length === 0 && dispatch({ type: 'account/getAccountList' })
        category.length === 0 && dispatch({ type: 'account/getCategoryList' })
    }, [])

    useEffect(() => {
        const result: IProgressData[] = []
        const map = new Map()
        let totalCount = 0
        let spend = 0
        let income = 0

        dataResource.forEach((item: IAccount) => {
            const { name } = getAccountDetail(category, item.category)
            const temp = map.get(name)
            const time = new Date(item.time)
            let amount = Math.abs(item.amount)

            if (currentMonth === 0 || (currentMonth !== 0 && currentMonth === time.getMonth())) {
                if (currentType === '2' || (currentType !== '2' && parseInt(currentType) === item.type)) {
                    totalCount += amount
                    item.type === 1 ? income += amount : spend += amount

                    if (temp !== undefined) {
                        temp.total += amount
                    } else {
                        map.set(name, {
                            name,
                            total: amount,
                            type: item.type
                        })
                    }
                }
            }
        })

        for (const [, value] of map) {
            result.push(value)
        }

        setProgressData(result.sort((a, b) => b.total - a.total))
        setTotal(totalCount)
        setSpend(spend)
        setIncome(income)
    }, [category, dataResource, currentMonth, currentType])

    const handleChange = (value: any) => {
        setCurrentMonth(parseInt(value))
    }

    const handleTypeChange = (value: string) => {
        setCurrentType(value)
    }

    const renderProgress = () => {
        return progressData.map((data: IProgressData) => (
            <Progress
                percent={data.total / total * 100} key={data.name}
                format={() => (
                    <div>
                        <span className="st-name">{data.name}</span>
                        <span className="st-total" style={{ color: data.type === 1 ? 'red' : '#0DB474' }}>{numberFormat(data.total)}</span>
                        <span className="st-percent">{(data.total / total * 100).toFixed(2)}%</span>
                    </div>
                )}
                style={{ height: '3rem', padding: '1rem 4rem 0 0' }}
            />
        ))
    }

    return (
        <div className="statistic-li">
            <Row style={{ padding: '1rem 0.5rem', backgroundColor: '#1890FF' }}>
                <Col md={{ span: 4, offset: 6 }} sm={12} xs={12}>
                    <Select defaultValue={0} style={{ width: 120 }} onChange={handleChange}>
                        {MonthOptions()}
                    </Select>
                </Col>
                <Col md={4} sm={12} xs={12}>
                    <Select defaultValue='2' style={{ width: 120 }} onChange={handleTypeChange}>
                        <Option value='2' key={2}>所有分类</Option>
                        <Option value='1' key={1}>收入</Option>
                        <Option value='0' key={0}>支出</Option>
                    </Select>
                </Col>
                <Col md={3} sm={12} xs={12}>
                    <p className="account-spend-t" style={{ marginTop: '1rem' }}>总支出: </p>
                    <p className="account-spend">{spend}</p>
                </Col>
                <Col md={3} sm={12} xs={12}>
                    <p className="account-income-t" style={{ marginTop: '1rem' }}>总收入: </p>
                    <p className="account-income">{income}</p>
                </Col>
            </Row>
            <Row>
                <Col md={{ span: 12, offset: 6 }}>
                    <div className="statistic-li-x">
                        <Card>
                            {renderProgress()}
                        </Card>
                    </div>
                </Col>
            </Row>
        </div>
    )
}

export default connect(({ account }: any) => ({
    category: account.category,
    dataResource: account.dataResource
}))(AccountStatistic)