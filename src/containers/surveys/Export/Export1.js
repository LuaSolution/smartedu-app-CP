import {RowExport} from "../TableExport";
import React from "react";
import * as moment from "moment";
import {
  makeCategoryQuestion,
  makeCategoryQuestionRange,
  RatePoint1,
  RatePoint2,
  RatePoint3,
  RatePoint4,
  RatePoint5
} from "helpers/Utils";

export default function Export1(props) {
  const data = props?.data;
  const totalQuestion = Object.values(data?.data).length;
  const listQuestionType = {};

  Object.values(data.data).map((item, key) => {
    listQuestionType[`questionType${item?.survey_question_info?.id}`] = data?.data?.[item?.survey_question_info?.id];
  });

  let listQuestion = {};
  if (listQuestionType?.questionType8) {
    listQuestion = makeCategoryQuestion(listQuestionType?.questionType8);
  }

  let categoryQuestionAll = {
    categoryQEmpty: 0,
    categoryQRate1: 0,
    categoryQRate2: 0,
    categoryQRate3: 0,
    categoryQRate4: 0,
    categoryQRate5: 0,
    categoryQRatePointAll: 0,
    categoryQRateSumAll: 0,
  };
  let categoryRow = [];

  const makePushCategory = (item, categoryRate) => {
    categoryRow.push({
      title: item?.title,
      rateEmpty: categoryRate.rateEmpty,
      rate1: categoryRate.rate1,
      rate2: categoryRate.rate2,
      rate3: categoryRate.rate3,
      rate4: categoryRate.rate4,
      rate5: categoryRate.rate5,
      ratePointAll: categoryRate.ratePointAll,
      rateSumAll: categoryRate.rateSumAll,
    });
    return null
  };

  return (
    <table style={{display: 'none'}} id="report-survey">
      <thead>
      <RowExport listData={[{
        value: data?.surveyList?.title,
        colspan: 11,
        rowSpan: 0,
        style: {color: '#000', textAlign: 'center', fontSize: 20, fontWeight: 'bold', height: 100}
      }]}/>
      </thead>
      <tbody>
      <RowExport listData={[]}/>
      <RowExport listData={[]}/>
      <RowExport listData={[
        {
          value: 'Số câu hỏi trong khảo sát',
          colspan: 3,
          rowSpan: 0,
          style: {fontWeight: 'bold', border: '1px solid #5c5c5c'}
        },
        {
          value: 'Ngày xuất báo cáo',
          colspan: 2,
          rowSpan: 0,
          style: {fontWeight: 'bold', border: '1px solid #5c5c5c'}
        },
        {
          value: 'Số người làm khảo sát',
          colspan: 2,
          rowSpan: 0,
          style: {fontWeight: 'bold', border: '1px solid #5c5c5c'}
        },
      ]}/>
      <RowExport listData={[
        {value: totalQuestion, colspan: 3, rowSpan: 0, style: {fontWeight: 'bold', border: '1px solid #5c5c5c'}},
        {
          value: moment().format("DD/MM/YYYY HH:mm:ss"),
          colspan: 2,
          rowSpan: 0,
          style: {fontWeight: 'bold', border: '1px solid #5c5c5c'}
        },
        {value: data?.totalResult, colspan: 2, rowSpan: 0, style: {fontWeight: 'bold', border: '1px solid #5c5c5c'}},
      ]}/>
      <RowExport listData={[]}/>
      <RowExport listData={[]}/>
      <RowExport listData={[]}/>
      <RowExport listData={[]}/>
      {
        data?.surveyQuestionMapping.map((itemMapping, keyMapping) => {
          let questionSumType2 = {
            rate1: 0,
            rate2: 0,
            rate3: 0,
            rate4: 0,
            rate5: 0,
          };
          const listQuestionType23 = [];
          const listAnswerType23 = [];

          const keyStt = keyMapping + 1;
          if(itemMapping?.survey_question?.type === 6) {return listQuestionType?.[`questionType${itemMapping?.survey_id}`] ? <>
            <RowExport listData={[
              {
                value: `${keyStt}. ${listQuestionType?.[`questionType${itemMapping?.survey_id}`]?.survey_question_info?.title}`,
                colspan: 7,
                rowSpan: 0,
                style: {fontWeight: 'bold'}
              },
            ]}/>
            {
              Object.values(listQuestion).length > 0 ? Object.values(listQuestion).map((item, key) => {
                let categoryRate = {
                  rateEmpty: 0,
                  rate1: 0,
                  rate2: 0,
                  rate3: 0,
                  rate4: 0,
                  rate5: 0,
                  ratePointAll: 0,
                  rateSumAll: 0,
                };
                return (
                  <>
                    <RowExport listData={[
                      {
                        value: `1.${key + 1} ${item?.title}`,
                        colspan: 7,
                        rowSpan: 0,
                        style: {fontWeight: 'bold', border: '1px solid #5c5c5c'}
                      },
                    ]}/>
                    <RowExport listData={[
                      {value: `STT`, colspan: 1, rowSpan: 2, style: {fontWeight: 'bold', border: '1px solid #5c5c5c'}},
                      {value: `Criteria`, colspan: 3, rowSpan: 2, style: {fontWeight: 'bold', border: '1px solid #5c5c5c'}},
                      {value: `Bỏ trống`, colspan: 0, rowSpan: 2, style: {fontWeight: 'bold', border: '1px solid #5c5c5c'}},
                      {value: `Kém`, colspan: 1, rowSpan: 0, style: {fontWeight: 'bold', border: '1px solid #5c5c5c'}},
                      {
                        value: `Trung bình`,
                        colspan: 1,
                        rowSpan: 0,
                        style: {fontWeight: 'bold', border: '1px solid #5c5c5c'}
                      },
                      {value: `Khá`, colspan: 1, rowSpan: 0, style: {fontWeight: 'bold', border: '1px solid #5c5c5c'}},
                      {value: `Tốt`, colspan: 1, rowSpan: 0, style: {fontWeight: 'bold', border: '1px solid #5c5c5c'}},
                      {value: `Xuất sắc`, colspan: 1, rowSpan: 0, style: {fontWeight: 'bold', border: '1px solid #5c5c5c'}},
                      {value: `Tổng`, colspan: 0, rowSpan: 2, style: {fontWeight: 'bold', border: '1px solid #5c5c5c'}},
                      {
                        value: `Số đánh giá`,
                        colspan: 0,
                        rowSpan: 2,
                        style: {fontWeight: 'bold', border: '1px solid #5c5c5c'}
                      },
                      {value: `ĐTB`, colspan: 0, rowSpan: 2, style: {fontWeight: 'bold', border: '1px solid #5c5c5c'}},
                    ]}/>
                    <RowExport listData={[
                      {value: `1`, colspan: 1, rowSpan: 0, style: {fontWeight: 'bold', border: '1px solid #5c5c5c'}},
                      {value: `2`, colspan: 1, rowSpan: 0, style: {fontWeight: 'bold', border: '1px solid #5c5c5c'}},
                      {value: `3`, colspan: 1, rowSpan: 0, style: {fontWeight: 'bold', border: '1px solid #5c5c5c'}},
                      {value: `4`, colspan: 1, rowSpan: 0, style: {fontWeight: 'bold', border: '1px solid #5c5c5c'}},
                      {value: `5`, colspan: 1, rowSpan: 0, style: {fontWeight: 'bold', border: '1px solid #5c5c5c'}},
                    ]}/>
                    {
                      item?.result_rate.map((itemRate, keyRate) => {
                        categoryRate.rateEmpty += itemRate?.rate_empty;
                        categoryQuestionAll.categoryQEmpty += itemRate?.rate_empty;

                        const totalRate1 = itemRate?.rate_1 * RatePoint1;
                        categoryRate.rate1 += totalRate1;
                        categoryQuestionAll.categoryQRate1 += totalRate1;

                        const totalRate2 = itemRate?.rate_2 * RatePoint2;
                        categoryRate.rate2 += totalRate2;
                        categoryQuestionAll.categoryQRate2 += totalRate2;

                        const totalRate3 = itemRate?.rate_3 * RatePoint3;
                        categoryRate.rate3 += totalRate3;
                        categoryQuestionAll.categoryQRate3 += totalRate3;

                        const totalRate4 = itemRate?.rate_4 * RatePoint4;
                        categoryRate.rate4 += totalRate4;
                        categoryQuestionAll.categoryQRate4 += totalRate4;

                        const totalRate5 = itemRate?.rate_5 * RatePoint5;
                        categoryRate.rate5 += totalRate5;
                        categoryQuestionAll.categoryQRate5 += totalRate5;

                        const totalRatePointRow = totalRate1 + totalRate2 + totalRate3 + totalRate4 + totalRate5;
                        categoryRate.ratePointAll += totalRatePointRow;
                        categoryQuestionAll.categoryQRatePointAll += totalRatePointRow;

                        const totalRateSumRow = itemRate?.rate_1 + itemRate?.rate_2 + itemRate?.rate_3
                          + itemRate?.rate_4 + itemRate?.rate_5;
                        categoryRate.rateSumAll += totalRateSumRow;
                        categoryQuestionAll.categoryQRateSumAll += totalRateSumRow;

                        const totalRateAvgRow = totalRateSumRow > 0 ? totalRatePointRow / totalRateSumRow : 0;

                        return (
                          <>
                            <RowExport listData={[
                              {value: keyRate + 1, colspan: 0, rowSpan: 0, style: {border: '1px solid #5c5c5c'}},
                              {value: itemRate?.option, colspan: 3, rowSpan: 0, style: {border: '1px solid #5c5c5c'}},
                              {value: itemRate?.rate_empty, colspan: 0, rowSpan: 0, style: {border: '1px solid #5c5c5c'}},
                              {value: itemRate?.rate_1, colspan: 0, rowSpan: 0, style: {border: '1px solid #5c5c5c'}},
                              {value: itemRate?.rate_2, colspan: 0, rowSpan: 0, style: {border: '1px solid #5c5c5c'}},
                              {value: itemRate?.rate_3, colspan: 0, rowSpan: 0, style: {border: '1px solid #5c5c5c'}},
                              {value: itemRate?.rate_4, colspan: 0, rowSpan: 0, style: {border: '1px solid #5c5c5c'}},
                              {value: itemRate?.rate_5, colspan: 0, rowSpan: 0, style: {border: '1px solid #5c5c5c'}},
                              {value: totalRatePointRow, colspan: 0, rowSpan: 0, style: {border: '1px solid #5c5c5c'}},
                              {value: totalRateSumRow, colspan: 0, rowSpan: 0, style: {border: '1px solid #5c5c5c'}},
                              {
                                value: totalRateAvgRow.toFixed(2),
                                colspan: 0,
                                rowSpan: 0,
                                style: {border: '1px solid #5c5c5c'}
                              },
                            ]}/>
                          </>
                        )
                      })
                    }
                    {makePushCategory(item, categoryRate)}
                    <RowExport listData={[
                      {value: `ĐTB`, colspan: 4, rowSpan: 0, style: {border: '1px solid #5c5c5c'}},
                      {value: categoryRate?.rateEmpty, colspan: 0, rowSpan: 0, style: {border: '1px solid #5c5c5c'}},
                      {value: categoryRate?.rate1, colspan: 1, rowSpan: 0, style: {border: '1px solid #5c5c5c'}},
                      {value: categoryRate?.rate2, colspan: 1, rowSpan: 0, style: {border: '1px solid #5c5c5c'}},
                      {value: categoryRate?.rate3, colspan: 1, rowSpan: 0, style: {border: '1px solid #5c5c5c'}},
                      {value: categoryRate?.rate4, colspan: 1, rowSpan: 0, style: {border: '1px solid #5c5c5c'}},
                      {value: categoryRate?.rate5, colspan: 1, rowSpan: 0, style: {border: '1px solid #5c5c5c'}},
                      {value: categoryRate?.ratePointAll, colspan: 0, rowSpan: 0, style: {border: '1px solid #5c5c5c'}},
                      {value: categoryRate?.rateSumAll, colspan: 0, rowSpan: 0, style: {border: '1px solid #5c5c5c'}},
                      {
                        value: categoryRate?.rateSumAll > 0 ? (categoryRate?.ratePointAll / categoryRate?.rateSumAll).toFixed(2) : 0,
                        colspan: 0,
                        rowSpan: 0,
                        style: {fontWeight: 'bold', border: '1px solid #5c5c5c'}
                      },
                    ]}/>
                  </>
                )
              }) : null
            }
            <RowExport listData={[]}/>
            <RowExport listData={[]}/>
            <RowExport listData={[
              {value: 'Tổng hợp đánh giá', colspan: 13, rowSpan: 0, style: {fontWeight: 'bold'}},
            ]}/>
            <RowExport listData={[
              {value: `STT`, colspan: 0, rowSpan: 2, style: {fontWeight: 'bold', border: '1px solid #5c5c5c'}},
              {value: `Loại`, colspan: 3, rowSpan: 2, style: {fontWeight: 'bold', border: '1px solid #5c5c5c'}},
              {value: `Bỏ trống`, colspan: 0, rowSpan: 2, style: {fontWeight: 'bold', border: '1px solid #5c5c5c'}},
              {value: `Kém`, colspan: 1, rowSpan: 0, style: {fontWeight: 'bold', border: '1px solid #5c5c5c'}},
              {value: `Trung bình`, colspan: 1, rowSpan: 0, style: {fontWeight: 'bold', border: '1px solid #5c5c5c'}},
              {value: `Khá`, colspan: 1, rowSpan: 0, style: {fontWeight: 'bold', border: '1px solid #5c5c5c'}},
              {value: `Tốt`, colspan: 1, rowSpan: 0, style: {fontWeight: 'bold', border: '1px solid #5c5c5c'}},
              {value: `Xuất sắc`, colspan: 1, rowSpan: 0, style: {fontWeight: 'bold', border: '1px solid #5c5c5c'}},
              {value: `Tổng`, colspan: 0, rowSpan: 2, style: {fontWeight: 'bold', border: '1px solid #5c5c5c'}},
              {value: `Số đánh giá`, colspan: 0, rowSpan: 2, style: {fontWeight: 'bold', border: '1px solid #5c5c5c'}},
              {value: `ĐTB`, colspan: 0, rowSpan: 2, style: {fontWeight: 'bold', border: '1px solid #5c5c5c'}},
            ]}/>
            <RowExport listData={[
              {value: `1`, colspan: 1, rowSpan: 0, style: {fontWeight: 'bold', border: '1px solid #5c5c5c'}},
              {value: `2`, colspan: 1, rowSpan: 0, style: {fontWeight: 'bold', border: '1px solid #5c5c5c'}},
              {value: `3`, colspan: 1, rowSpan: 0, style: {fontWeight: 'bold', border: '1px solid #5c5c5c'}},
              {value: `4`, colspan: 1, rowSpan: 0, style: {fontWeight: 'bold', border: '1px solid #5c5c5c'}},
              {value: `5`, colspan: 1, rowSpan: 0, style: {fontWeight: 'bold', border: '1px solid #5c5c5c'}},
            ]}/>
            {
              categoryRow.length > 0 ? categoryRow.map((itemCate, keyCate) => {
                return (
                  <>
                    <RowExport listData={[
                      {value: keyCate + 1, colspan: 0, rowSpan: 0, style: {border: '1px solid #5c5c5c'}},
                      {value: itemCate?.title, colspan: 3, rowSpan: 0, style: {border: '1px solid #5c5c5c'}},
                      {value: itemCate?.rateEmpty, colspan: 0, rowSpan: 0, style: {border: '1px solid #5c5c5c'}},
                      {value: itemCate?.rate1, colspan: 0, rowSpan: 0, style: {border: '1px solid #5c5c5c'}},
                      {value: itemCate?.rate2, colspan: 0, rowSpan: 0, style: {border: '1px solid #5c5c5c'}},
                      {value: itemCate?.rate3, colspan: 0, rowSpan: 0, style: {border: '1px solid #5c5c5c'}},
                      {value: itemCate?.rate4, colspan: 0, rowSpan: 0, style: {border: '1px solid #5c5c5c'}},
                      {value: itemCate?.rate5, colspan: 0, rowSpan: 0, style: {border: '1px solid #5c5c5c'}},
                      {value: itemCate?.ratePointAll, colspan: 0, rowSpan: 0, style: {border: '1px solid #5c5c5c'}},
                      {value: itemCate?.rateSumAll, colspan: 0, rowSpan: 0, style: {border: '1px solid #5c5c5c'}},
                      {
                        value: itemCate.rateSumAll > 0 ? (itemCate.ratePointAll / itemCate.rateSumAll).toFixed(2) : 0,
                        colspan: 0,
                        rowSpan: 0,
                        style: {border: '1px solid #5c5c5c'}
                      },
                    ]}/>
                  </>
                )

              }) : null
            }
            <RowExport listData={[
              {value: 'ĐTB', colspan: 4, rowSpan: 0, style: {border: '1px solid #5c5c5c'}},
              {value: categoryQuestionAll?.categoryQEmpty, colspan: 0, rowSpan: 0, style: {border: '1px solid #5c5c5c'}},
              {value: categoryQuestionAll?.categoryQRate1, colspan: 0, rowSpan: 0, style: {border: '1px solid #5c5c5c'}},
              {value: categoryQuestionAll?.categoryQRate2, colspan: 0, rowSpan: 0, style: {border: '1px solid #5c5c5c'}},
              {value: categoryQuestionAll?.categoryQRate3, colspan: 0, rowSpan: 0, style: {border: '1px solid #5c5c5c'}},
              {value: categoryQuestionAll?.categoryQRate4, colspan: 0, rowSpan: 0, style: {border: '1px solid #5c5c5c'}},
              {value: categoryQuestionAll?.categoryQRate5, colspan: 0, rowSpan: 0, style: {border: '1px solid #5c5c5c'}},
              {
                value: categoryQuestionAll?.categoryQRatePointAll,
                colspan: 0,
                rowSpan: 0,
                style: {border: '1px solid #5c5c5c'}
              },
              {value: categoryQuestionAll?.categoryQRateSumAll, colspan: 0, rowSpan: 0, style: {border: '1px solid #5c5c5c'}},
              {
                value: categoryQuestionAll.categoryQRateSumAll > 0 ? (categoryQuestionAll.categoryQRatePointAll / categoryQuestionAll.categoryQRateSumAll).toFixed(2) : 0,
                colspan: 0,
                rowSpan: 0,
                style: {fontWeight: 'bold', border: '1px solid #5c5c5c'}
              },
            ]}/>
          </> : null}
          else if(itemMapping?.survey_question?.type === 2) {return listQuestionType?.[`questionType${itemMapping?.survey_id}`] ? <>
            <RowExport listData={[]}/>
            <RowExport listData={[]}/>
            <RowExport listData={[
              {
                value: `${keyStt}. ${listQuestionType?.[`questionType${itemMapping?.survey_id}`]?.survey_question_info?.title}`,
                colspan: 13,
                rowSpan: 0,
                style: {fontWeight: 'bold'}
              },
            ]}/>
            {
              (listQuestionType?.[`questionType${itemMapping?.survey_id}`]?.result_map &&
                  listQuestionType?.[`questionType${itemMapping?.survey_id}`]?.result_map.length > 0)
                  ? listQuestionType?.[`questionType${itemMapping?.survey_id}`]?.result_map.map((item, key) => {
                const rowArray = [
                  {value: `STT ${key + 1}`, colspan: 0, rowSpan: 0, style: {border: '1px solid #5c5c5c'}},
                ];
                item.map((itemValue) => {
                  rowArray.push({value: `${itemValue}`, colspan: 0, rowSpan: 0, style: {border: '1px solid #5c5c5c'}});
                });
                return (
                  <RowExport listData={rowArray}/>
                )
              }) : null
            }
          </> : null}
          else if(itemMapping?.survey_question?.type === 3) {return listQuestionType?.[`questionType${itemMapping?.survey_id}`] ? <>
            <RowExport listData={[]}/>
            <RowExport listData={[]}/>
            <RowExport listData={[
              {
                value: `${keyStt}. ${listQuestionType?.[`questionType${itemMapping?.survey_id}`]?.survey_question_info?.title}`,
                colspan: 13,
                rowSpan: 0,
                style: {fontWeight: 'bold'}
              },
            ]}/>
            <RowExport listData={[
              {value: `Đáp án 1`, colspan: 0, rowSpan: 0, style: {fontWeight: 'bold', border: '1px solid #5c5c5c'}},
              {value: `Đáp án 2`, colspan: 0, rowSpan: 0, style: {fontWeight: 'bold', border: '1px solid #5c5c5c'}},
              {value: `Đáp án 3`, colspan: 0, rowSpan: 0, style: {fontWeight: 'bold', border: '1px solid #5c5c5c'}},
              {value: `Đáp án 4`, colspan: 0, rowSpan: 0, style: {fontWeight: 'bold', border: '1px solid #5c5c5c'}},
              {value: `Đáp án 5`, colspan: 0, rowSpan: 0, style: {fontWeight: 'bold', border: '1px solid #5c5c5c'}},
            ]}/>
            {
              (listQuestionType?.[`questionType${itemMapping?.survey_id}`]?.result_map &&
                  listQuestionType?.[`questionType${itemMapping?.survey_id}`]?.result_map.length > 0) ?
                  listQuestionType?.[`questionType${itemMapping?.survey_id}`]?.result_map.map((item, key) => {
                questionSumType2.rate1 += item[0] === '1' ? 1 : 0;
                questionSumType2.rate2 += item[0] === '2' ? 1 : 0;
                questionSumType2.rate3 += item[0] === '3' ? 1 : 0;
                questionSumType2.rate4 += item[0] === '4' ? 1 : 0;
                questionSumType2.rate5 += item[0] === '5' ? 1 : 0;
              }) : null
            }
            {console.log(questionSumType2)}
            <RowExport listData={[
              {value: `${questionSumType2.rate1}`, colspan: 0, rowSpan: 0, style: {border: '1px solid #5c5c5c'}},
              {value: `${questionSumType2.rate2}`, colspan: 0, rowSpan: 0, style: {border: '1px solid #5c5c5c'}},
              {value: `${questionSumType2.rate3}`, colspan: 0, rowSpan: 0, style: {border: '1px solid #5c5c5c'}},
              {value: `${questionSumType2.rate4}`, colspan: 0, rowSpan: 0, style: {border: '1px solid #5c5c5c'}},
              {value: `${questionSumType2.rate5}`, colspan: 0, rowSpan: 0, style: {border: '1px solid #5c5c5c'}},
            ]}/>
          </> : null}
          else if(itemMapping?.survey_question?.type === 7) {return listQuestionType?.[`questionType${itemMapping?.survey_id}`] ? <>
            <RowExport listData={[]}/>
            <RowExport listData={[]}/>
            <RowExport listData={[
              {
                value: `${keyStt}. ${listQuestionType?.[`questionType${itemMapping?.survey_id}`]?.survey_question_info?.title}`,
                colspan: 13,
                rowSpan: 0,
                style: {fontWeight: 'bold'}
              },
            ]}/>
            <RowExport listData={[
              {value: `Đáp án 1`, colspan: 0, rowSpan: 0, style: {fontWeight: 'bold', border: '1px solid #5c5c5c'}},
              {value: `Đáp án 2`, colspan: 0, rowSpan: 0, style: {fontWeight: 'bold', border: '1px solid #5c5c5c'}},
              {value: `Đáp án 3`, colspan: 0, rowSpan: 0, style: {fontWeight: 'bold', border: '1px solid #5c5c5c'}},
              {value: `Đáp án 4`, colspan: 0, rowSpan: 0, style: {fontWeight: 'bold', border: '1px solid #5c5c5c'}},
              {value: `Đáp án 5`, colspan: 0, rowSpan: 0, style: {fontWeight: 'bold', border: '1px solid #5c5c5c'}},
            ]}/>
            {
              (listQuestionType?.[`questionType${itemMapping?.survey_id}`]?.result_map &&
                  listQuestionType?.[`questionType${itemMapping?.survey_id}`]?.result_map.length > 0) ?
                  listQuestionType?.[`questionType${itemMapping?.survey_id}`]?.result_map.map((item, key) => {
                    questionSumType2.rate1 += item[0] === '1' ? 1 : 0;
                    questionSumType2.rate2 += item[0] === '2' ? 1 : 0;
                    questionSumType2.rate3 += item[0] === '3' ? 1 : 0;
                    questionSumType2.rate4 += item[0] === '4' ? 1 : 0;
                    questionSumType2.rate5 += item[0] === '5' ? 1 : 0;
                  }) : null
            }
            <RowExport listData={[
              {value: `${questionSumType2.rate1}`, colspan: 0, rowSpan: 0, style: {border: '1px solid #5c5c5c'}},
              {value: `${questionSumType2.rate2}`, colspan: 0, rowSpan: 0, style: {border: '1px solid #5c5c5c'}},
              {value: `${questionSumType2.rate3}`, colspan: 0, rowSpan: 0, style: {border: '1px solid #5c5c5c'}},
              {value: `${questionSumType2.rate4}`, colspan: 0, rowSpan: 0, style: {border: '1px solid #5c5c5c'}},
              {value: `${questionSumType2.rate5}`, colspan: 0, rowSpan: 0, style: {border: '1px solid #5c5c5c'}},
            ]}/>
          </> : null}
          else if(itemMapping?.survey_question?.type === 8) {return listQuestionType?.[`questionType${itemMapping?.survey_id}`] ? <>
            <RowExport listData={[]}/>
            <RowExport listData={[]}/>
            <RowExport listData={[
              {
                value: `${keyStt}. ${listQuestionType?.[`questionType${itemMapping?.survey_id}`]?.survey_question_info?.title}`,
                colspan: 13,
                rowSpan: 0,
                style: {fontWeight: 'bold'}
              },
            ]}/>
            {
              (listQuestionType?.[`questionType${itemMapping?.survey_id}`]?.result_map &&
                  listQuestionType?.[`questionType${itemMapping?.survey_id}`]?.result_map.length > 0) ?
                  listQuestionType?.[`questionType${itemMapping?.survey_id}`]?.result_map.map((item, key) => {
                listQuestionType23.push({
                  value: item?.option,
                  colspan: 0,
                  rowSpan: 0,
                  style: {fontWeight: 'bold', border: '1px solid #5c5c5c'}
                })
                listAnswerType23.push({
                  value: item?.rate,
                  colspan: 0,
                  rowSpan: 0,
                  style: {fontWeight: 'bold', border: '1px solid #5c5c5c'}
                })
              }) : null
            }
            <RowExport listData={listQuestionType23}/>
            <RowExport listData={listAnswerType23}/>
          </> : null}
          else if(itemMapping?.survey_question?.type === 4) {return listQuestionType?.[`questionType${itemMapping?.survey_id}`] ? <>
            <RowExport listData={[]}/>
            <RowExport listData={[]}/>
            <RowExport listData={[
              {
                value: `${keyStt}. ${listQuestionType?.[`questionType${itemMapping?.survey_id}`]?.survey_question_info?.title}`,
                colspan: 13,
                rowSpan: 0,
                style: {fontWeight: 'bold'}
              },
            ]}/>
            {
              (listQuestionType?.[`questionType${itemMapping?.survey_id}`]?.result_map &&
                  listQuestionType?.[`questionType${itemMapping?.survey_id}`]?.result_map.length > 0) ?
                  listQuestionType?.[`questionType${itemMapping?.survey_id}`]?.result_map.map((item, key) => {
                const listQuestion4 = [{
                  value: `STT ${key + 1}`,
                  colspan: 0,
                  rowSpan: 0,
                  style: {fontWeight: 'bold', border: '1px solid #5c5c5c'}
                }];
                item.map((itemValue) => {
                  listQuestion4.push({value: itemValue, colspan: 0, rowSpan: 0, style: {border: '1px solid #5c5c5c'}})
                });
                return (
                  <RowExport listData={listQuestion4}/>
                )
              }) : null
            }
          </> : null}
          else if(itemMapping?.survey_question?.type === 5) {return listQuestionType?.[`questionType${itemMapping?.survey_id}`] ? <>
            <RowExport listData={[]}/>
            <RowExport listData={[]}/>
            <RowExport listData={[
              {
                value: `${keyStt}. ${listQuestionType?.[`questionType${itemMapping?.survey_id}`]?.survey_question_info?.title}`,
                colspan: 13,
                rowSpan: 0,
                style: {fontWeight: 'bold'}
              },
            ]}/>
            {
              (listQuestionType?.[`questionType${itemMapping?.survey_id}`]?.result_map &&
                  listQuestionType?.[`questionType${itemMapping?.survey_id}`]?.result_map.length > 0) ?
                  listQuestionType?.[`questionType${itemMapping?.survey_id}`]?.result_map.map((item, key) => {
                const listQuestion6 = [{
                  value: `Người số ${key + 1}`,
                  colspan: 0,
                  rowSpan: 0,
                  style: {fontWeight: 'bold', border: '1px solid #5c5c5c'}
                }];
                item.map((itemValue) => {
                  let typeFreq = '';
                  if (itemValue?.freq === 1) {
                    typeFreq = 'Rất ít';
                  } else if (itemValue?.freq === 2) {
                    typeFreq = 'Thỉnh thoảng';
                  } else if (itemValue?.freq === 3) {
                    typeFreq = 'Nhiều lần';
                  }
                  listQuestion6.push({
                    value: `${itemValue?.result} - ${typeFreq}`,
                    colspan: 0,
                    rowSpan: 0,
                    style: {border: '1px solid #5c5c5c'}
                  })
                });

                return (
                  <RowExport listData={listQuestion6}/>
                )
              }) : null
            }
          </> : null}
        })
      }
      </tbody>
    </table>
  )
}