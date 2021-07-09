import {RowExport} from "../TableExport";
import React, {useEffect, useState} from "react";
import Profile from "../Export/Profile";
import ListCategory from "../Export/ListCategory";
import SummaryMedium from "../Export/SummaryMedium";
import DescriptionResult from "../Export/DescriptionResult";
import DetailCategory from "../Export/DetailCategory";
import OverallReview from "../Export/OverallReview";
import configChart from "../Export/configChart";
import axios from 'helpers/axios'

export default function Export2(props) {
  const id = props?.id;
  const [data, setData] = useState({});

  const getData = async () => {
    const res = await axios.get(`admin/surveys/reportType2/${id}`).then(res => {
      return res.data
    });
    console.log(res, id);
    if(res?.status === 200){
      setData(res);
      configChart(res?.data)
    }
  }

  useEffect(() => {
    if(id) {
      getData().then()
    }
  }, [id]);

  return (
    <>
      <table style={{display: 'none'}} id="report-survey">
        <thead>
        <RowExport listData={[{
          value: "Bảng đánh giá",
          colspan: 11,
          rowSpan: 0,
          style: {color: '#000', textAlign: 'center', fontSize: 20, fontWeight: 'bold'}
        }]}/>
        </thead>
        <tbody>
        <RowExport listData={[]}/>
        <Profile data={data} />
        <RowExport listData={[]}/>
        <RowExport listData={[]}/>
        <tr>
          <td><img id="chart" /></td>
        </tr>
        <RowExport listData={[]}/>
        <RowExport listData={[]}/>
        <RowExport listData={[]}/>
        <RowExport listData={[]}/>
        <RowExport listData={[]}/>
        <RowExport listData={[]}/>
        <RowExport listData={[]}/>
        <RowExport listData={[]}/>
        <RowExport listData={[]}/>
        <RowExport listData={[]}/>
        <RowExport listData={[]}/>
        <RowExport listData={[]}/>
        <RowExport listData={[]}/>
        <RowExport listData={[]}/>
        <RowExport listData={[]}/>
        <RowExport listData={[]}/>
        <RowExport listData={[]}/>
        <RowExport listData={[]}/>
        <RowExport listData={[]}/>
        <RowExport listData={[]}/>
        <RowExport listData={[]}/>
        <RowExport listData={[]}/>
        <RowExport listData={[]}/>
        {/*category list result ==========================*/}
        <ListCategory data={data?.data}/>
        <RowExport listData={[]}/>
        <RowExport listData={[]}/>
        <RowExport listData={[]}/>
        {/*  summary medium result ========================*/}
        <SummaryMedium data={data?.data}/>
        <RowExport listData={[]}/>
        {/*  description result ========================*/}
        <DescriptionResult/>
        {/*  overall review ========================*/}
        <OverallReview data={data?.data} />
        <RowExport listData={[]}/>
        {/*  detail category ========================*/}
        <DetailCategory data={data?.data}/>
        </tbody>
      </table>
      {/*<Button onClick={(e) => exportToCSV(apiData, fileName)}>Tải kết quả khảo sát</Button>*/}
    </>
  )
}