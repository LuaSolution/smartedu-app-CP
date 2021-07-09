import {RowExport} from "../TableExport";
import React from "react";

export default function SummaryMedium(props) {
  const data = props?.data;
  let quantityMedium = 0;
  let quantityAll = 0;
  let quantityEmpty = 0;
  let quantityRate_1 = 0;
  let quantityRate_2 = 0;
  let quantityRate_3 = 0;
  let quantityRate_4 = 0;
  let quantityRate_5 = 0;

  return <>
    <RowExport listData={[
      { value: '2. BẢNG TỔNG HỢP ĐIỂM TRUNG BÌNH CÁC TIÊU CHUẨN 6G', colspan: 7, rowSpan: 0, style: { fontWeight: 'bold' } },
    ]} />
    <RowExport listData={[
      {value: 'TT', colspan: 0, rowSpan: 2, style: {fontWeight: 'bold', border: '1px solid #000'}},
      {value: 'Tiêu chuẩn', colspan: 0, rowSpan: 2, style: {fontWeight: 'bold', border: '1px solid #000'}},
      {value: 'Bỏ trống', colspan: 0, rowSpan: 2, style: {fontWeight: 'bold', border: '1px solid #000'}},
      {value: 'Very Bad', colspan: 0, rowSpan: 0, style: {fontWeight: 'bold', border: '1px solid #000'}},
      {value: 'Bad', colspan: 0, rowSpan: 0, style: {fontWeight: 'bold', border: '1px solid #000'}},
      {value: 'Not Good', colspan: 0, rowSpan: 0, style: {fontWeight: 'bold', border: '1px solid #000'}},
      {value: 'Good', colspan: 0, rowSpan: 0, style: {fontWeight: 'bold', border: '1px solid #000'}},
      {value: 'Very Good', colspan: 0, rowSpan: 0, style: {fontWeight: 'bold', border: '1px solid #000'}},
      {value: 'Số Lượng', colspan: 0, rowSpan: 2, style: {fontWeight: 'bold', border: '1px solid #000'}},
      {value: 'ĐTB', colspan: 2, rowSpan: 2, style: {fontWeight: 'bold', border: '1px solid #000'}},
    ]}/>
    <RowExport listData={[
      {value: '-2', colspan: 0, rowSpan: 0, style: {fontWeight: 'bold', border: '1px solid #000'}},
      {value: '-1', colspan: 0, rowSpan: 0, style: {fontWeight: 'bold', border: '1px solid #000'}},
      {value: '0', colspan: 0, rowSpan: 0, style: {fontWeight: 'bold', border: '1px solid #000'}},
      {value: '1', colspan: 0, rowSpan: 0, style: {fontWeight: 'bold', border: '1px solid #000'}},
      {value: '2', colspan: 0, rowSpan: 0, style: {fontWeight: 'bold', border: '1px solid #000'}},
    ]}/>
    {
      data && Object.values(data).length > 0 ? Object.values(data).map((item, key) => {
        let quantity = 0;
        quantity += item?.total_rate_1 ? item?.total_rate_1 : 0;
        quantity += item?.total_rate_2 ? item?.total_rate_2 : 0;
        quantity += item?.total_rate_3 ? item?.total_rate_3 : 0;
        quantity += item?.total_rate_4 ? item?.total_rate_4 : 0;
        quantity += item?.total_rate_5 ? item?.total_rate_5 : 0;

        quantityAll += quantity;
        quantityEmpty += item?.total_empty ? item?.total_empty : 0;
        quantityRate_1 += item?.total_rate_1 ? item?.total_rate_1 : 0;
        quantityRate_2 += item?.total_rate_2 ? item?.total_rate_2 : 0;
        quantityRate_3 += item?.total_rate_3 ? item?.total_rate_3 : 0;
        quantityRate_4 += item?.total_rate_4 ? item?.total_rate_4 : 0;
        quantityRate_5 += item?.total_rate_5 ? item?.total_rate_5 : 0;

        quantityMedium += item?.total_medium ? item?.total_medium : 0;
        return (
          <div key={key}>
            <RowExport listData={[
              {value: key + 1, colspan: 0, rowSpan: 0, style: {fontWeight: 'bold', border: '1px solid #000'}},
              {value: item?.title, colspan: 0, rowSpan: 0, style: {fontWeight: 'bold', border: '1px solid #000'}},
              {value: item?.total_empty, colspan: 0, rowSpan: 0, style: {fontWeight: 'bold', border: '1px solid #000'}},
              {value: item?.total_rate_1, colspan: 0, rowSpan: 0, style: {fontWeight: 'bold', border: '1px solid #000'}},
              {value: item?.total_rate_2, colspan: 0, rowSpan: 0, style: {fontWeight: 'bold', border: '1px solid #000'}},
              {value: item?.total_rate_3, colspan: 0, rowSpan: 0, style: {fontWeight: 'bold', border: '1px solid #000'}},
              {value: item?.total_rate_4, colspan: 0, rowSpan: 0, style: {fontWeight: 'bold', border: '1px solid #000'}},
              {value: item?.total_rate_5, colspan: 0, rowSpan: 0, style: {fontWeight: 'bold', border: '1px solid #000'}},
              {value: quantity, colspan: 0, rowSpan: 0, style: {fontWeight: 'bold', border: '1px solid #000'}},
              {value: item?.total_medium, colspan: 2, rowSpan: 0, style: {fontWeight: 'bold', border: '1px solid #000'}},
            ]}/>
          </div>
        )
      }) : null
    }
    <RowExport listData={[
      {value: 'ĐTB TỔNG HỢP', colspan: 2, rowSpan: 0, style: {fontWeight: 'bold', border: '1px solid #000'}},
      {value: quantityEmpty, colspan: 0, rowSpan: 0, style: {fontWeight: 'bold', border: '1px solid #000'}},
      {value: quantityRate_1, colspan: 0, rowSpan: 0, style: {fontWeight: 'bold', border: '1px solid #000'}},
      {value: quantityRate_2, colspan: 0, rowSpan: 0, style: {fontWeight: 'bold', border: '1px solid #000'}},
      {value: quantityRate_3, colspan: 0, rowSpan: 0, style: {fontWeight: 'bold', border: '1px solid #000'}},
      {value: quantityRate_4, colspan: 0, rowSpan: 0, style: {fontWeight: 'bold', border: '1px solid #000'}},
      {value: quantityRate_5, colspan: 0, rowSpan: 0, style: {fontWeight: 'bold', border: '1px solid #000'}},
      {value: quantityAll, colspan: 0, rowSpan: 0, style: {fontWeight: 'bold', border: '1px solid #000'}},
      {value: quantityMedium, colspan: 2, rowSpan: 0, style: {fontWeight: 'bold', border: '1px solid #000'}},
    ]}/>
  </>
}