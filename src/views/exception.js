import React from 'react'
import { Result } from 'antd'
import UserHeaderLayout from 'components/users/UserHeaderLayout'
import UserFooterLayout from 'components/users/UserFooterLayout'

export default () => <>
  <UserHeaderLayout />
  <Result
    status="500"
    title="500"
    subTitle="Sorry, something went wrong."
  />
  <UserFooterLayout />
</>
