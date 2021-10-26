import { Modal, Button, Form, Input, Radio, Select } from 'antd'
import { PlusOutlined } from '@ant-design/icons';
import { connect } from 'dva'
import { useState } from 'react';
import { ICategory } from '../model/account'

interface Values {
    type: number;
    amount: string;
    category: string;
}

const BottomBar = (props: any) => {
    const { dispatch, category } = props

    const [open, setOpen] = useState(false)

    const [form] = Form.useForm();
    const { Option } = Select

    const addAccount = (values: Values) => {
        const time = +new Date()
        dispatch({
            type: 'account/addBill',
            payload: {
                ...values,
                amount: parseInt(values.amount),
                time
            }
        })
        console.log(values);
        console.log(time)
    }

    const handleClick = () => {
        setOpen(true)
    }

    const handleOk = () => {
        form
            .validateFields()
            .then(values => {
                form.resetFields();
                setOpen(false)
                addAccount(values)
            })
            .catch(info => {
                console.log('Validate Failed:', info);
            });
    }

    const handleCancel = () => {
        setOpen(false)
    }

    const renderOptions = () => {
        return category.map((item: ICategory) => {
            return (
                <Option value={item.id} key={item.id}>
                    {item.name}
                </Option>
            )
        })
    }

    return (
        <div className="bottom-bar">
            <div className="bottom-bar-btn">
                <Button
                    size="large"
                    shape="circle"
                    icon={<PlusOutlined />}
                    onClick={handleClick}
                ></Button>
            </div>
            <Modal
                visible={open}
                title="创建新帐单"
                onOk={handleOk}
                onCancel={handleCancel}
            >
                <Form
                    form={form}
                    onFinish={addAccount}
                >
                    <Form.Item
                        label="类型"
                        name="category"
                        rules={[{ required: true, message: '该项为必选项！' }]}
                        initialValue={category[0] && category[0].id}
                    >
                        <Select style={{ width: 120 }}>
                            {renderOptions()}
                        </Select>
                    </Form.Item>
                    <Form.Item
                        label="金额"
                        name="amount"
                        rules={[{ required: true, message: '该项为必填项！' }]}
                    >
                        <Input type="number" />
                    </Form.Item>
                    <Form.Item
                        label="类型"
                        name="type"
                        rules={[{ required: true, message: '该项为必选项！' }]}
                    >
                        <Radio.Group>
                            <Radio value={1}>收入</Radio>
                            <Radio value={0}>支出</Radio>
                        </Radio.Group>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    )
}

export default connect(({ account }: any) => ({
    category: account.category
}))(BottomBar)