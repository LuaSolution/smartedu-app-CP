import {RowExport} from "../TableExport";
import React from "react";

export default function DescriptionResult() {
  return <>
    <RowExport listData={[
      { value: '3. ĐÁNH GIÁ KẾT QUẢ', colspan: 7, rowSpan: 0, style: { fontWeight: 'bold' } },
    ]} />
    <RowExport listData={[
      { value: '3.1 Thang đo tiêu chuẩn đánh giá theo chuyên gia 6G (Scancom)', colspan: 6, rowSpan: 5, style: { fontWeight: 'bold' } },
      { value: '33-44', colspan: 0, rowSpan: 0, style: { fontWeight: 'bold' } },
      { value: 'Very good', colspan: 0, rowSpan: 0, style: { fontWeight: 'bold' } },
    ]} />
    <RowExport listData={[
      { value: '11-33', colspan: 0, rowSpan: 0, style: { fontWeight: 'bold' } },
      { value: 'Good', colspan: 0, rowSpan: 0, style: { fontWeight: 'bold' } },
    ]} />
    <RowExport listData={[
      { value: '0-11', colspan: 0, rowSpan: 0, style: { fontWeight: 'bold' } },
      { value: 'Not good', colspan: 0, rowSpan: 0, style: { fontWeight: 'bold' } },
    ]} />
    <RowExport listData={[
      { value: '(33)-0', colspan: 0, rowSpan: 0, style: { fontWeight: 'bold' } },
      { value: 'Bad', colspan: 0, rowSpan: 0, style: { fontWeight: 'bold' } },
    ]} />
    <RowExport listData={[
      { value: '(44)-(33)', colspan: 0, rowSpan: 0, style: { fontWeight: 'bold' } },
      { value: 'Very bad', colspan: 0, rowSpan: 0, style: { fontWeight: 'bold' } },
    ]} />
  </>
}