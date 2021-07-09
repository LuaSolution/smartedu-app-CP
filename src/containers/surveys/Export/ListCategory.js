import {RowExport} from "../TableExport";
import React from "react";

export default function ListCategory(props) {
  const data = props?.data;
  return <>
    <RowExport listData={[
      { value: '1. KẾT QUẢ KHẢO SÁT 6G', colspan: 7, rowSpan: 0, style: { fontWeight: 'bold' } },
    ]} />
    {
      data && Object.values(data).length > 0 ? Object.values(data).map((item, key) => {
        return (
          <div key={key}>
            <RowExport listData={[
              {value: item?.title, colspan: 7, style: {fontWeight: 'bold'}},
            ]}/>
            <RowExport listData={[
              {value: 'TT', colspan: 0, rowSpan: 0, style: {fontWeight: 'bold', border: '1px solid #000'}},
              {value: 'Tiêu Chí', colspan: 3, rowSpan: 0, style: {fontWeight: 'bold', border: '1px solid #000'}},
              {value: 'Bỏ trống', colspan: 0, rowSpan: 0, style: {fontWeight: 'bold', border: '1px solid #000'}},
              {value: 'Very Bad', colspan: 0, rowSpan: 0, style: {fontWeight: 'bold', border: '1px solid #000'}},
              {value: 'Bad', colspan: 0, rowSpan: 0, style: {fontWeight: 'bold', border: '1px solid #000'}},
              {value: 'Not Good', colspan: 0, rowSpan: 0, style: {fontWeight: 'bold', border: '1px solid #000'}},
              {value: 'Good', colspan: 0, rowSpan: 0, style: {fontWeight: 'bold', border: '1px solid #000'}},
              {value: 'Very Good', colspan: 0, rowSpan: 0, style: {fontWeight: 'bold', border: '1px solid #000'}},
              {value: 'ĐTB', colspan: 0, rowSpan: 0, style: {fontWeight: 'bold', border: '1px solid #000'}},
            ]}/>
            {
              item?.list_rate.map((value, keyValue) => {
                return (
                  <>
                    <RowExport listData={[
                      {value: keyValue + 1, colspan: 0, rowSpan: 0,style: {fontWeight: 'bold', border: '1px solid #000'}},
                      {value: value?.option, colspan: 3, rowSpan: 0,style: {fontWeight: 'normal', border: '1px solid #000'}},
                      {
                        value: value?.not_selected ? value?.not_selected : 0,
                        colspan: 0,
                        rowSpan: 0,
                        style: {fontWeight: 'normal', border: '1px solid #000'}
                      },
                      {
                        value: value?.rate_1 ? value?.rate_1 : 0,
                        colspan: 0,
                        rowSpan: 0,
                        style: {fontWeight: 'normal', border: '1px solid #000'}
                      },
                      {
                        value: value?.rate_2 ? value?.rate_2 : 0,
                        colspan: 0,
                        rowSpan: 0,
                        style: {fontWeight: 'normal', border: '1px solid #000'}
                      },
                      {
                        value: value?.rate_3 ? value?.rate_3 : 0,
                        colspan: 0,
                        rowSpan: 0,
                        style: {fontWeight: 'normal', border: '1px solid #000'}
                      },
                      {
                        value: value?.rate_4 ? value?.rate_4 : 0,
                        colspan: 0,
                        rowSpan: 0,
                        style: {fontWeight: 'normal', border: '1px solid #000'}
                      },
                      {
                        value: value?.rate_5 ? value?.rate_5 : 0,
                        colspan: 0,
                        rowSpan: 0,
                        style: {fontWeight: 'normal', border: '1px solid #000'}
                      },
                      {
                        value: value?.medium_total ? value?.medium_total : 0,
                        colspan: 0,
                        rowSpan: 0,
                        style: {fontWeight: 'normal', border: '1px solid #000'}
                      },
                    ]}/>
                  </>
                )
              })
            }
            <RowExport listData={[
              {value: 'Điểm trung bình', colspan: 4, rowSpan: 0, style: {fontWeight: 'bold', border: '1px solid #000'}},
              {value: item?.total_empty, colspan: 0, rowSpan: 0, style: {fontWeight: 'bold', border: '1px solid #000'}},
              {value: item?.total_rate_1, colspan: 0, rowSpan: 0, style: {fontWeight: 'bold', border: '1px solid #000'}},
              {value: item?.total_rate_2, colspan: 0, rowSpan: 0, style: {fontWeight: 'bold', border: '1px solid #000'}},
              {value: item?.total_rate_3, colspan: 0, rowSpan: 0, style: {fontWeight: 'bold', border: '1px solid #000'}},
              {value: item?.total_rate_4, colspan: 0, rowSpan: 0, style: {fontWeight: 'bold', border: '1px solid #000'}},
              {value: item?.total_rate_5, colspan: 0, rowSpan: 0, style: {fontWeight: 'bold', border: '1px solid #000'}},
              {value: item?.total_medium, colspan: 0, rowSpan: 0, style: {fontWeight: 'bold', border: '1px solid #000'}},
            ]}/>
            <RowExport listData={[]}/>
          </div>
        )
      }) : null
    }
  </>
}