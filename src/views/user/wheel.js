import React from 'react'
import UserHeaderLayout from 'components/users/UserHeaderLayout'
import UserFooterLayout from 'components/users/UserFooterLayout'
import Wheel from "components/wheel"

const LuckyWheel = () => {
  const places = ['Pizzas', 'Sandwiches', 'Salads', 'Soup', 'Japanese food', 'Pastas', 'Test']
  return <>
    <UserHeaderLayout />
    <Wheel items={places} />
    <UserFooterLayout />
  </>
}

export default LuckyWheel