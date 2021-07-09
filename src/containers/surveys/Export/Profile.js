import {RowExport} from "../TableExport";
import React from "react";

export default function Profile(props) {
  const data = props?.data;

  let danhgia = '';
  if(-44 > data?.total_medium) {danhgia = 'Very bad'}
  else if(-44 <= data?.total_medium && data?.total_medium < -33){danhgia = 'Very bad'}
  else if(-33 <= data?.total_medium && data?.total_medium < 0){danhgia = 'Bad'}
  else if(0 <= data?.total_medium && data?.total_medium < 11){danhgia = 'Not Good'}
  else if(11 <= data?.total_medium && data?.total_medium < 33){danhgia = 'Good'}
  else if(33 <= data?.total_medium && data?.total_medium < 44){danhgia = 'Very Good'}
  else if(data?.total_medium > 44){danhgia = 'Very Good'}

  return <>
    <RowExport listData={[
      {value: ''},
      {value: 'Họ và tên', colspan: 0, rowSpan: 0, style: {fontWeight: 'bold', border: '1px solid #000'}},
      {value: data?.surveyList?.title, colspan: 0, rowSpan: 0, style: {fontWeight: 'bold', border: '1px solid #000'}},
    ]}/>
    <RowExport listData={[
      {value: ''},
      {value: 'Bộ phận', colspan: 0, rowSpan: 0, style: {fontWeight: 'bold', border: '1px solid #000'}},
      {value: 'SDC', colspan: 0, rowSpan: 0, style: {fontWeight: 'bold', border: '1px solid #000'}},
    ]}/>
    <RowExport listData={[]}/>
    <RowExport listData={[]}/>
    <RowExport listData={[
      { value: 'Tên',  colspan: 3,  rowSpan: 0,  style: {fontWeight: 'bold', backgroundColor: 'rgba(255, 218, 238, 1)', border: '1px solid #000'}},
      { value: 'Số mẫu khảo sát',  colspan: 2,  rowSpan: 0,  style: {fontWeight: 'bold', backgroundColor: 'rgba(255, 218, 238, 1)', border: '1px solid #000'}},
      { value: 'Điểm trung bình',  colspan: 2,  rowSpan: 0,  style: {fontWeight: 'bold', backgroundColor: 'rgba(255, 218, 238, 1)', border: '1px solid #000'}},
      { value: 'Kết quả',  colspan: 4,  rowSpan: 0,  style: {fontWeight: 'bold', backgroundColor: 'rgba(255, 218, 238, 1)', border: '1px solid #000'}},
    ]}/>
    <RowExport listData={[
      {
        value: data?.surveyList?.title,
        colspan: 3,
        rowSpan: 0,
        style: {fontWeight: 'bold', backgroundColor: 'rgba(255, 218, 238, 1)', border: '1px solid #000'}
      },
      {
        value: data?.total,
        colspan: 2,
        rowSpan: 0,
        style: {fontWeight: 'bold', backgroundColor: 'rgba(255, 218, 238, 1)', border: '1px solid #000'}
      },
      {
        value: data?.total_medium,
        colspan: 2,
        rowSpan: 0,
        style: {fontWeight: 'bold', backgroundColor: 'rgba(255, 218, 238, 1)', border: '1px solid #000'}
      },
      {
        value: danhgia,
        colspan: 4,
        rowSpan: 0,
        style: {fontWeight: 'bold', backgroundColor: 'rgba(255, 218, 238, 1)', border: '1px solid #000'}
      },
    ]}/>
  </>
}