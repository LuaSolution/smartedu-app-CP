import React from 'react'
import { Row } from 'reactstrap'
import { Colxx, Separator } from 'components/common/CustomBootstrap'
import Breadcrumb from 'containers/navs/Breadcrumb'
import SalesChartCard from 'containers/dashboards/SalesChartCard'
import WebsiteVisitsChartCard from 'containers/dashboards/WebsiteVisitsChartCard'
import OrderStockRadarChart from 'containers/dashboards/OrderStockRadarChart'
import ProductCategoriesDoughnut from 'containers/dashboards/ProductCategoriesDoughnut'
import PieChart from 'containers/dashboards/PieChart'

export default ({ match }) =>
  <>
    <Row>
      <Colxx xxs="12">
        <Breadcrumb heading="menu.analytics" match={match} />
        <Separator className="mb-5" />
      </Colxx>
    </Row>
    <Row>
      <Colxx sm="12" md="6" className="mb-4">
        <ProductCategoriesDoughnut />
      </Colxx>
      <Colxx sm="12" md="6" className="mb-4">
        <OrderStockRadarChart />
      </Colxx>
    </Row>
    <Row>
      <Colxx sm="12" md="6" className="mb-4">
        <WebsiteVisitsChartCard />
      </Colxx>
      <Colxx sm="12" md="6" className="mb-4">
        <PieChart />
      </Colxx>
    </Row>
    <Row>
      <Colxx xxs="12" className="mb-4">
        <SalesChartCard />
      </Colxx>
    </Row>
  </>
