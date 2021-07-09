import React from 'react'
import UserHeaderLayout from 'components/users/UserHeaderLayout'
import UserFooterLayout from 'components/users/UserFooterLayout'
import { Result } from 'antd'

export default () => <>
  <UserHeaderLayout />
  <Result
    status="500"
    title="Chưa xác thực"
    subTitle="Bạn không thể truy cập trang này !"
  />
  <UserFooterLayout />
</>