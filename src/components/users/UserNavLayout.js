import React from 'react'
import styled from 'styled-components'
import { RightOutlined } from '@ant-design/icons'

const UserNavLayout = () => <Breadcrumb>
    <nav className="breadcrumb">
        <a href="/" className="breadcrumb-item active">Trang chủ</a>
        <RightOutlined />
        <span className="breadcrumb-item">Thông báo</span>
    </nav>
</Breadcrumb>

export default UserNavLayout

const Breadcrumb = styled.div`
  .breadcrumb {
    max-width: 1440px;
    margin: 32px auto 0 40px;
    background-color: transparent;
    padding: 0;
    font-size: 14px;
    font-weight: 700;
    line-height: 20px;
    letter-spacing: 0.18px;
    color: #363E57;
    cursor: pointer;
    &-item{
        color: #363E57;
        &+&::before{
            content: 'a';
        }
    }
    .active {
        color: #0B46A9;
    }
    .anticon-right{
        display: flex;
        align-items: center;
        font-size: 18px;
        margin: 0 17px;
        color: #0B46A9;
    }
  }
  
`
