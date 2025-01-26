function dshbChart(data) {
  console.log(data);

  // 차트별 데이터 초기화
  const labels = {
    chart02: [],
    chart03: [],
    chart04: [
      "01월", "02월", "03월", "04월", "05월", "06월", "07월", 
      "08월", "09월", "10월", "11월", "12월"
    ]
  };

  const values = {
    chart02: [],
    chart03: [],
    chart04_1: [],  // 첫 번째 라인 데이터
    chart04_2: []   // 두 번째 라인 데이터
  };
  // SUM02 (주식 수량 데이터)
  processChartData(data[1]?.SUM02, labels.chart02, values.chart02, "STOCK_NAME", "STOCK_QUANTITY");

  // SUM03 (배당금 상위 5개 데이터)
  processChartData(data[2]?.SUM03, labels.chart03, values.chart03, "STOCK_NAME", "EACH_MONEY");

  // SUM04 (배당금 추세 데이터 - 두 개의 라인 처리)
  if (data[3]?.SUM04) {
    if (data[3].SUM04.length > 0) {
      const stock01 = data[3].SUM04[0]; // 첫 번째 객체
      values.chart04_1 = extractMonthlyValues(stock01);
    }

    if (data[3].SUM04.length > 1) {
      const stock02 = data[3].SUM04[1]; // 두 번째 객체
      values.chart04_2 = extractMonthlyValues(stock02);
    }
  }
  // 차트 생성 함수 호출
  renderChart("chart02", "bar", "주식 수량", labels.chart02, values.chart02);
  renderChart("chart03", "line", "배당금 상위 5개", labels.chart03, values.chart03);
  renderMultiLineChart("chart04", data[3].SUM04[0].TRNSCDATE, data[3].SUM04[1].TRNSCDATE, labels.chart04, values.chart04_1, values.chart04_2);
}

/**
 * 월별 데이터를 추출하는 함수
 * @param {Object} data - 월별 데이터 객체
 * @returns {Array} - 월별 값 배열
 */
function extractMonthlyValues(data) {
  return [
    data.JANUARY, data.FEBRUARY, data.MARCH, data.APRIL, data.MAY, data.JUNE,
    data.JULY, data.AUGUST, data.SEPTEMBER, data.OCTOBER, data.NOVEMBER, data.DECEMBER
  ];
}

/**
 * 데이터 처리 함수
 * @param {Array} dataArray - 데이터 배열
 * @param {Array} labelArray - 라벨 배열
 * @param {Array} valueArray - 값 배열
 * @param {string} labelKey - 라벨 키
 * @param {string} valueKey - 값 키
 */
function processChartData(dataArray, labelArray, valueArray, labelKey, valueKey) {
  if (!dataArray || !Array.isArray(dataArray)) return;
  dataArray.forEach(item => {
    labelArray.push(item[labelKey]);
    valueArray.push(parseInt(item[valueKey], 10)); // 문자열을 숫자로 변환
  });
}

/**
 * 단일 차트 생성 함수
 * @param {string} id - 차트 ID
 * @param {string} type - 차트 유형 (bar, line 등)
 * @param {string} label - 차트 제목
 * @param {Array} labels - 라벨 배열
 * @param {Array} values - 값 배열
 */
function renderChart(id, type, label, labels, values) {
  var ctx = document.getElementById(id);
  new Chart(ctx, {
    type: type,
    data: {
      labels: labels,
      datasets: [{
        label: label,
        data: values,
        backgroundColor: fn_chartColor(1),
        borderColor: fn_chartColor(2),
        borderWidth: 1
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
          legend: {
              display: true,
              position: 'top'
          }
      }
    }
  });
}

/**
 * 두 개의 데이터 라인을 가진 차트 생성 함수
 * @param {string} id - 차트 ID
 * @param {string} label - 차트 제목
 * @param {Array} labels - 라벨 배열
 * @param {Array} values1 - 첫 번째 데이터 값 배열
 * @param {Array} values2 - 두 번째 데이터 값 배열
 */
function renderMultiLineChart(id, label01, label02, labels, values1, values2) {
  var ctx = document.getElementById(id);
  new Chart(ctx, {
    type: "line",
    data: {
      labels: labels,
      datasets: [
        {
          label: label01,
          data: values1,
          borderColor: "rgba(54, 162, 235, 1)",  // 파란색
          backgroundColor: "rgba(54, 162, 235, 0.2)",
          borderWidth: 2
        },
        {
          label: label02,
          data: values2,
          borderColor: "rgba(255, 99, 132, 1)",  // 빨간색
          backgroundColor: "rgba(255, 99, 132, 0.2)",
          borderWidth: 2
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: true,
          position: "top"
        }
      }
    }
  });
}
