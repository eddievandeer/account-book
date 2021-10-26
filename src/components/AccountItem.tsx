import { Row, Col } from 'antd'
import { IFilted } from './AccountDetail'

interface AccountItemProps {
    data: IFilted
}

const AccountItem = (props: AccountItemProps) => {
    const { data } = props

    return (
        <Row>
            <Col span={6}>
                <p className="ac-category">{ data.category }</p>
                <p className="ac-time">{ data.time }</p>
            </Col>
            <Col span={6} offset={12}>
                <p className="ac-type">{ data.type === 1 ? '收入' : '支出' }</p>
                {
                    data.type === 1
                        ? <p className="ac-amount" style={{ color: 'red' }}>{ data.amount }</p>
                        : <p className="ac-amount">{ data.amount }</p>
                }
            </Col>
        </Row>
    )
}

export default AccountItem