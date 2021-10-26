import { Menu } from 'antd'
import { useState } from 'react'


const AppHeader = (props: any) => {
    const { children } = props

    const [current, setCurrent] = useState('book')

    const handleClick = (e: any) => {
        setCurrent(e.key)
    }

    return (
        <div className="app-header">
            <div className="app-menu">
                <Menu
                    onClick={handleClick}
                    selectedKeys={[current]}
                    mode="horizontal"
                >
                    <Menu.Item key="book">
                        记账
                    </Menu.Item>
                    <Menu.Item key="statistic">
                        统计
                    </Menu.Item>
                </Menu>
            </div>
            {
                current === 'book' ? children[0] : children[1]
            }
        </div>
    )
}

export default AppHeader