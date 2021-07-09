import React, {useEffect, useState} from 'react'
import ReactToExcel from 'react-html-table-to-excel'
import axios from 'helpers/axios'
import Export1 from "./Export/Export1";
import Export2 from "./Export2/Export2";

export default function ExportToExcel({id}) {
  const [data, setData] = useState({});

  const getData = async () => {
    const res = await axios.get(`admin/surveys/report/${id}`).then(res => {
      return res.data
    });

    if(res?.status === 200){
      setData(res);
    }
  }

  useEffect(() => {
    getData().then()
  }, [id]);

  return (
    <>
      {
        data?.surveyList?.type === 1 ? <Export1 data={data} /> : null
      }
      {
        data?.surveyList?.type === 2 ? <Export2 id={id} /> : null
      }
      <ReactToExcel
        table="report-survey"
        filename={`Bang ket qua -  ${data?.surveyList?.title}`}
        sheet={`Bang ket qua -  ${data?.surveyList?.title}`}
        buttonText="Tải kết quả khảo sát"
      />
      {/*<Button onClick={(e) => exportToCSV(apiData, fileName)}>Tải kết quả khảo sát</Button>*/}
    </>
  );
};