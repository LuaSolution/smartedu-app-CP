import $ from "jquery";

export default function config(data) {
  let listValue = [];
  Object.values(data).map((item) => {
    listValue.push({
      name: item?.title,
      y: item?.total_medium,
      drilldown: item?.title
    },)
  });
  var options = {
    chart: {
      type: 'column'
    },
    title: {
      text: 'Biểu đồ 6G'
    },
    xAxis: {
      type: 'category'
    },
    yAxis: {
      title: {
        text: '',
        enabled: false
      }

    },
    legend: {
      enabled: false,
    },

    series: [
      {
        label: {
          enabled: false,
        },
        colorByPoint: true,
        data: listValue
      }
    ],
  }

  var exportUrl = 'https://export.highcharts.com/';

  var object = {
    options: JSON.stringify(options),
    type: 'image/png',
    async: true
  };

  $.ajax({
    type: 'post',
    url: exportUrl,
    data: object,
    success: function (data) {
      $('#chart').attr('src', exportUrl + data);
    }
  });
  return options
}