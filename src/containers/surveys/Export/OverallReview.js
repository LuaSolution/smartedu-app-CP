import {RowExport} from "../TableExport";
import React from "react";

export default function OverallReview(props) {
  const data = props?.data;
  let quantityMedium = 0;

  return <>
    <RowExport listData={[
      {value: '3.2. Đánh giá tổng hợp dựa trên kết quả khảo sát', colspan: 7, rowSpan: 0, style: {fontWeight: 'bold'}},
    ]}/>
    <RowExport listData={[
      {value: 'TT', colspan: 0, rowSpan: 0, style: {fontWeight: 'bold', border: '1px solid #000'}},
      {value: 'Tiêu chuẩn', colspan: 0, rowSpan: 0, style: {fontWeight: 'bold', border: '1px solid #000'}},
      {value: 'ĐTB', colspan: 0, rowSpan: 0, style: {fontWeight: 'bold', border: '1px solid #000'}},
      {
        value: 'Đánh giá căn cứ trên thang đo',
        colspan: 8,
        rowSpan: 0,
        style: {fontWeight: 'bold', border: '1px solid #000'}
      },
    ]}/>
    {
      data && Object.values(data).length > 0 ? Object.values(data).map((item, key) => {
        quantityMedium += item?.total_medium ? item?.total_medium : 0;
        return (
          <RowExport listData={[
            {value: key + 1, colspan: 0, rowSpan: 0, style: {fontWeight: 'bold', border: '1px solid #000'}},
            {value: item?.title, colspan: 0, rowSpan: 0, style: {fontWeight: 'bold', border: '1px solid #000'}},
            {value: item?.total_medium, colspan: 0, rowSpan: 0, style: {fontWeight: 'bold', border: '1px solid #000'}},
            {value: '', colspan: 8, rowSpan: 0, style: {fontWeight: 'bold', border: '1px solid #000'}},
          ]}/>
        )
      }) : null
    }

    <RowExport listData={[
      {
        value: 'ĐTB TỔNG HỢP',
        colspan: 2,
        rowSpan: 0,
        style: {fontWeight: 'bold', border: '1px solid #000', backgroundColor: '#ffdaee'}
      },
      {
        value: quantityMedium,
        colspan: 0,
        rowSpan: 0,
        style: {fontWeight: 'bold', border: '1px solid #000', backgroundColor: '#ffdaee'}
      },
      {
        value: '',
        colspan: 8,
        rowSpan: 0,
        style: {fontWeight: 'bold', border: '1px solid #000', backgroundColor: '#ffdaee'}
      },
    ]}/>
  </>
}