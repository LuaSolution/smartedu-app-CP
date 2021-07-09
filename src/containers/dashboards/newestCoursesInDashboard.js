/* eslint-disable react/no-array-index-key */
import momentTime from 'helpers/moment'
import React from 'react'
import { Card, CardBody, CardTitle } from 'reactstrap'

const Logs = ({ data }) => {
  return <Card style={{ height: '100%' }}>
    <CardBody>
      <CardTitle>
        Khóa học đã tạo gần đây
      </CardTitle>
      <table className="table table-sm table-borderless">
        <tbody>
          {data && data.map((item, index) =>
            <tr key={index}>
              <td>
                <span
                  className={`log-indicator align-middle `}
                />
              </td>
              <td>
                <a href={'/app/managers/courses?p=' + item.id} className="font-weight-medium">
                  {item.title}
                </a>
              </td>
              <td className="text-right">
                <span className="text-muted">{momentTime(item.created_at)}</span>
              </td>
            </tr>)}
        </tbody>
      </table>
    </CardBody>
  </Card>
}
export default Logs
