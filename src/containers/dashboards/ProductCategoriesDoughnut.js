import React from 'react'
import { Card, CardBody, CardTitle } from 'reactstrap'
import IntlMessages from 'helpers/IntlMessages'
import { DoughnutChart } from 'components/charts'
import { ThemeColors } from 'helpers/ThemeColors'

const colors = ThemeColors()

const doughnutChartData = {
    labels: ['Cakes', 'Cupcakes', 'Desserts'],
    datasets: [
        {
            label: '',
            borderColor: [colors.themeColor3, colors.themeColor2, colors.themeColor1],
            backgroundColor: [
                colors.themeColor3_10,
                colors.themeColor2_10,
                colors.themeColor1_10,
            ],
            borderWidth: 2,
            data: [15, 25, 20],
        },
    ],
}

const ProductCategoriesDoughnut = () => {
    return (
        <Card className="h-100">
            <CardBody>
                <CardTitle>
                    <IntlMessages id="dashboards.product-categories" />
                </CardTitle>
                <div className="dashboard-donut-chart">
                    <DoughnutChart shadow data={doughnutChartData} />
                </div>
            </CardBody>
        </Card>
    )
}

export default ProductCategoriesDoughnut