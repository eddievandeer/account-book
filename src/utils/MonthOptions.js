import { Select } from 'antd'

const MONTHS = ['所有月份', '一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月']

const MonthOptions = () => {
    const result = []

    const { Option } = Select

    for (let i = 0; i <= 12; i++) {
        result.push(<Option value={i} key={i}>{MONTHS[i]}</Option>)
    }

    return result
}

export default MonthOptions