import { Spin } from 'antd'
import React from 'react'
import nyancat from './nyancat.svg'

const icon = <img src={nyancat} style={{ fontSize: 180 }} />

const Spinner = ({ spinning, ...props }) => {
    return <Spin indicator={icon} spinning={spinning} >
        {props.children}
    </Spin>
}
export default Spinner