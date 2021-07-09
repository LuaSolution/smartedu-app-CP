import {RowExport} from "../TableExport";
import React from "react";

export default function DetailCategory(props) {
  const data = props?.data;
  return <>
    <RowExport listData={[
      { value: '3.3. Đánh giá chi tiết cho từng tiêu chí', colspan: 7, rowSpan: 0, style: { fontWeight: 'bold' } },
    ]} />
    <RowExport listData={[
      { value: 'Các tiêu chí đạt giá trị khảo sát thấp hơn khi so với giá trị trung bình, cần lưu ý khi xây dựng kế hoạch cải tiến chất lượng hoạt động:', colspan: 7, rowSpan: 0, style: {  } },
    ]} />
    {
      data && Object.values(data).length > 0 ? Object.values(data).map((item, key) => {
        return (
          <div key={key}>
            <RowExport listData={[
              {value: `Tiêu chuẩn ${key + 1}: ` + item?.title, colspan: 7, style: {fontWeight: 'bold'}},
            ]}/>
            <RowExport listData={[
              {value: 'STT', colspan: 0, rowSpan: 0, style: {fontWeight: 'bold', border: '1px solid #000'}},
              {value: 'Nội dung đánh giá', colspan: 5, rowSpan: 0, style: {fontWeight: 'bold', border: '1px solid #000'}},
              {value: 'ĐTB', colspan: 0, rowSpan: 0, style: {fontWeight: 'bold', border: '1px solid #000'}},
              {value: 'Kết quả', colspan: 4, rowSpan: 0, style: {fontWeight: 'bold', border: '1px solid #000'}},
            ]}/>
            {
              item?.list_rate.map((value, keyValue) => {
                return (
                  <>
                    <RowExport listData={[
                      {value: keyValue + 1, colspan: 0, rowSpan: 0,style: {fontWeight: 'bold', border: '1px solid #000'}},
                      {value: value?.option, colspan: 5, rowSpan: 0,style: {fontWeight: 'normal', border: '1px solid #000'}},
                      {value: value?.medium_total ? value?.medium_total : 0, colspan: 0, rowSpan: 0, style: {fontWeight: 'normal', border: '1px solid #000'}},
                      {value: '', colspan: 4, rowSpan: 0, style: {border: '1px solid #000'}},
                    ]}/>
                  </>
                )
              })
            }
            <RowExport listData={[]}/>
          </div>
        )
      }) : null
    }
  </>
}