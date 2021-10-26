import { useState, useEffect } from 'react'
import { connect } from 'dva'
import { Row, Col, Select, Empty, Card } from 'antd'
import { IAccount, ICategory } from '../model/account'
import AccountDetail from 'src/components/AccountDetail'
import { MonthOptions, getAccountDetail } from 'src/utils/index'

const DAYS = ['周日', '周一', '周二', '周三', '周四', '周五', '周六']

const AccountList = (props: any) => {
    const { category, dataResource, dispatch } = props
    const { Option } = Select

    const [filted, setFilted] = useState<any>(new Map())
    const [currentMonth, setCurrentMonth] = useState(0)
    const [currentCategory, setCurrentCategory] = useState('0')
    const [spend, setSpend] = useState(0)
    const [income, setIncome] = useState(0)

    useEffect(() => {
        dataResource.length === 0 && dispatch({ type: 'account/getAccountList' })
        category.length === 0 && dispatch({ type: 'account/getCategoryList' })
    }, [])

    useEffect(() => {
        const map = new Map()
        let spend = 0
        let income = 0

        if(category.length > 0) {
            dataResource.forEach((item: IAccount) => {
                const detail = getAccountDetail(category, item.category)
                if(!detail) {
                    console.log(item.category);
                }
                const time = new Date(item.time)
                const month = `${time.getFullYear()}年${time.getMonth()}月`
                const date = `${time.getMonth()}月${time.getDate()}日`
                const day = DAYS[time.getDay()]
                const temp = {
                    ...item,
                    date,
                    day,
                    category: detail.name,
                    time: `${time.getHours()}:${time.getMinutes()}`,
                }
    
                if (currentMonth === 0 || (currentMonth !== 0 && currentMonth === time.getMonth())) {
                    if(currentCategory === '0' || (currentCategory !== '0' && currentCategory === item.category)) {
                        item.type === 1 ? income += item.amount : spend += item.amount
        
                        if (map.get(month) !== undefined) {
                            map.get(month).push(temp)
                        } else {
                            map.set(month, [temp])
                        }
                    }
                }
            })
        }

        setFilted(map)
        setSpend(spend)
        setIncome(income)
    }, [dataResource, category, currentMonth, currentCategory])

    const renderList = () => {
        const resultList = []

        for (const [key, value] of filted) {
            resultList.push(<AccountDetail title={key} data={value} key={key}></AccountDetail>)
        }

        return resultList.length > 0
            ? resultList
            : (
                <Card>
                    <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
                </Card>
            )
    }

    const renderCategories = () => {
        return category.map((item: ICategory) => {
            return <Option value={item.id} key={item.id}>{item.name}</Option>
        })
    }

    const handleChange = (value: any) => {
        setCurrentMonth(parseInt(value))
    }

    const handleCategoryChange = (value: string) => {
        setCurrentCategory(value)
    }

    return (
        <div className="account-li">
            <Row style={{ padding: '1rem 0.5rem', backgroundColor: '#1890FF' }}>
                <Col md={{ span: 4, offset: 6 }} sm={12} xs={12}>
                    <Select defaultValue={0} style={{ width: 120 }} onChange={handleChange}>
                        {MonthOptions()}
                    </Select>
                </Col>
                <Col md={4} sm={12} xs={12}>
                    <Select defaultValue='0' style={{ width: 120 }} onChange={handleCategoryChange}>
                        <Option value='0' key={0}>所有分类</Option>
                        {renderCategories()}
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
                <Col md={{ span: 12, offset: 6 }} sm={24} xs={24}>
                    <div className="account-li-x">
                        {renderList()}
                    </div>
                </Col>
            </Row>
        </div>
    )
}

export default connect(({ account }: any) => ({
    category: account.category,
    dataResource: account.dataResource
}))(AccountList)