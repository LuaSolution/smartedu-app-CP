import React from 'react'

export const RowExport = (props) => {
  const listData = props?.listData;
  return (
    <tr>
      {
        listData && listData.length > 0 ? listData.map((item, key) => {
          return <td key={key} style={item?.style} rowSpan={item?.rowSpan} colSpan={item?.colspan}>{item?.value}</td>
        }) : null
      }
    </tr>
  )
}