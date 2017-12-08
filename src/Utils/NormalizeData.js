import moment from "moment";
// =============================
// const
// =============================

const FIELD_HOT_WATER = "field1";
const FIELD_HUMIDITY = "field3";
const FIELD_FAN = "field4";

export function NormalizeData(data_arr, interval) {
  let arrHotWaterPerDay;
  let arrHotWater;
  let arrHumidity;
  let newData;
  let fan = false;
  let vals40 = 0;
  let vals45 = 0;

  arrHotWaterPerDay = [];
  arrHotWater = [];
  arrHumidity = [];
  newData = [];


  let nextTimeMarker = getRoundNextTimeMarker(
    getNextTimeMarker(data_arr[0].created_at, interval),
    interval,
    true
  );

  let isNewMonth =
    moment(data_arr[0].created_at).format("MM") !==
    moment(data_arr[data_arr.length - 1].created_at).format("MM");

  let period =
    (isNewMonth
      ? moment(data_arr[0].created_at).format("DD MMMM")
      : moment(data_arr[0].created_at).format("DD")) +
    " • " +
    moment(data_arr[data_arr.length - 1].created_at).format("DD MMMM • YYYY");
  for (var i = 0; i < data_arr.length; ++i) {
    let curDate = data_arr[i].created_at;
    let created_at = moment(curDate).format("HH:mm");

    // custom compare time end day --------
    if (nextTimeMarker === "24:00" && moment(curDate).format("HH") === "00") {
      nextTimeMarker = "00:00";
    }
    // -----------------------------------

    if (nextTimeMarker <= created_at || i === (data_arr.length - 1) ) {
      nextTimeMarker = getRoundNextTimeMarker(
        getNextTimeMarker(curDate, interval),
        interval,
        true
      );
      // start new day -------------------
      if (nextTimeMarker === "00:00") {
        nextTimeMarker = "24:00";
      }

      newData.push({
        period: period, // moment.utc(curDate).format("HH:mm:ss"),
        created_at: moment(curDate).format("HH:mm"),
        time: (i === (data_arr.length - 1)) ? "" : getRoundNextTimeMarker(curDate, interval, false),
        date: moment(curDate)
          .format("DD.MMM")
          .toUpperCase(),
        tHotMin: Math.min.apply(null, arrHotWater),
        tHotAvg: getAverageValueOfArray(arrHotWater),
        tHotMax: Math.max.apply(null, arrHotWater),
        humidityMin: Math.min.apply(null, arrHumidity),
        humidityMax: Math.max.apply(null, arrHumidity),
        fanOn: fan,
        tHot: data_arr[i][FIELD_HOT_WATER],
        humidity: data_arr[i][FIELD_HUMIDITY],
        fan:  (data_arr[i][FIELD_FAN] === "1")
      });

      arrHotWater.length = 0; // [];
      arrHumidity.length = 0; // [];
      fan = false;
    }
    arrHotWater.push(data_arr[i][FIELD_HOT_WATER]);
    arrHumidity.push(data_arr[i][FIELD_HUMIDITY]);

    arrHotWaterPerDay.push(data_arr[i][FIELD_HOT_WATER]);
    if (data_arr[i][FIELD_FAN] === "1") {
      fan = true;
    }
    if (data_arr[i][FIELD_HOT_WATER] >= 45) {
      vals45++;
    } else {
      if (data_arr[i][FIELD_HOT_WATER] >= 40) {
        vals40 = vals40 + 1;
      }
    }
  }

  let last = newData.length - 1;
  newData[last].vals40 = parseFloat(vals40 / data_arr.length * 100).toFixed(1);
  newData[last].vals45 = parseFloat(vals45 / data_arr.length * 100).toFixed(1);
  newData[last].tHotWaterPerDayMin = parseFloat(
    Math.min.apply(null, arrHotWaterPerDay)
  ).toFixed(1);
  newData[last].tHotWaterPerDayMax = parseFloat(
    Math.max.apply(null, arrHotWaterPerDay)
  ).toFixed(1);
  newData[last].tHotWaterPerDayAvg = parseFloat(
    getAverageValueOfArray(arrHotWaterPerDay)
  ).toFixed(1);
  newData[last].fanOn = data_arr[data_arr.length - 1][FIELD_FAN] === "1";
  newData[last].created_at = moment(
    data_arr[data_arr.length - 1]["created_at"]
  ).format("HH:mm");
  // console.info(i, "newData", JSON.stringify(newData[last]));
  return newData;
}

//===============================================
function getRoundNextTimeMarker(curTime, interval, all_value) {
  //let valueMin = moment.utc(curTime).minute();
  //let valueHour = moment.utc(curTime).hour();
  let valueMin = moment(curTime).minute();
  let valueHour = moment(curTime).hour();

  let min = Math.round(valueMin / interval) * interval;
  if (min === 60) {
    min = 0;
    valueHour++;
  }
  let result = getFormatStrXX(valueHour) + ":" + getFormatStrXX(min);
  let show = false;
  switch (interval) {
    case 5:
      show = min === 0 || min === 30;
      break;
    case 10:
      show = min === 0;
      break;
    case 15:
      show = valueHour % 2 === 0 && min === 0;
      break;
    case 30:
      show = valueHour % 4 === 0 && min === 0;
      break;
    default:
      show = min === 0;
      break;
  }
  return show || all_value ? result : "";
}

//===============================================
function getNextTimeMarker(currentTime, interval) {
  //let nextTimeMarker = moment.utc(currentTime).add({ minutes: interval });
  let nextTimeMarker = moment(currentTime).add({ minutes: interval });
  return nextTimeMarker;
}

// ===============================================
function getFormatStrXX(val) {
  var str = String(val);
  if (str.length === 1) {
    str = "0" + str;
  }
  return str;
}

//===============================================
function getAverageValueOfArray(array) {
  var sum = 0;
  for (var i = 0; i < array.length; i++) {
    sum += Number(array[i]);
  }
  return sum / array.length;
}
