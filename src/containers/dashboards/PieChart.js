import React from 'react'
import { Card, CardBody, CardTitle } from 'reactstrap'

import IntlMessages from 'helpers/IntlMessages'
import { PieChart } from 'components/charts'

import { pieChartData } from 'data/charts'

const OrderStockRadarChart = () => {
  return (
    <Card className="h-100">
      <CardBody>
        <CardTitle>
          <IntlMessages id="dashboards.order-stock" />
        </CardTitle>
        <div className="chart-container">
          <PieChart shadow data={pieChartData} />
        </div>
      </CardBody>
    </Card>
  )
}

export default OrderStockRadarChart
