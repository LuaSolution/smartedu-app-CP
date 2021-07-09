import React from 'react'
import { Empty } from 'antd'

export default ({ title = null }) => (
    <Empty
        style={{ margin: '0 auto' }}
        image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
        imageStyle={{ height: 60 }}
        description={<span>{title || 'Chưa có dữ liệu'}</span>}>
    </Empty>)