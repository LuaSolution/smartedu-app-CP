import React from 'react'
import UserHeaderLayout from 'components/users/UserHeaderLayout'
import UserFooterLayout from 'components/users/UserFooterLayout'
import { Result } from 'antd'

export default () => <>
  <UserHeaderLayout />
  <Result
    status="404"
    title="404"
    subTitle="Trang bạn tìm không tồn tại, vui lòng thử lại."
  />
  <UserFooterLayout />
</>