/**
 * Created by seven on 2017/3/28.
 */
/**
 * 获取当前时间之前的日期
 * @param day
 * @returns {string}：2017-03-28
 */
export const getLastTime = (day) => {

    var date = new Date()
    var time = date.getTime() - day * 24 * 60 * 60 * 1000
    var newDate = new Date(time)
    var year = (1900 + newDate.getYear())
    var month = (newDate.getMonth() + 1) >= 10 ? (newDate.getMonth() + 1) : "0" + (newDate.getMonth() + 1)
    var day = newDate.getDate() >= 10 ? newDate.getDate() : "0" + newDate.getDate()
    return year + "-" + month + "-" + day
}

/**
 * 获取本月第一天
 * @param day
 * @returns {string}：2017-03-28
 */
export const getFirstDayOfMonth = () => {
    var date = new Date()
    var year = (1900 + date.getYear())
    var month = (date.getMonth() + 1) >= 10 ? (date.getMonth() + 1) : "0" + (date.getMonth() + 1)
    var day = "01"
    return year + "-" + month + "-" + day
}

/**
 * 获取本周第一天
 * @param day
 * @returns {string}：2017-03-28
 */
export const getFirstDayOfWeek = () => {
    var now = new Date();
    var nowTime = now.getTime() ;
    var day = now.getDay();
    var oneDayLong = 24*60*60*1000 ;
    var MondayTime = nowTime - (day-1)*oneDayLong  ;
    var mondayDate = new Date(MondayTime);

    var year = (1900 + mondayDate.getYear())
    var month = (mondayDate.getMonth() + 1) >= 10 ? (mondayDate.getMonth() + 1) : "0" + (mondayDate.getMonth() + 1)
    var day = mondayDate.getDate() >= 10 ? mondayDate.getDate() : "0" + mondayDate.getDate()
    return year + "-" + month + "-" + day
}

/**
 * 获得本周的开端日期--》周日
 */
export const getWeekStartDate = () => {
  var now = new Date(); //当前日期
  var nowDayOfWeek = now.getDay(); //今天本周的第几天
  var nowYear = now.getYear(); //当前年
  var nowMonth = now.getMonth(); //月
  var nowDay = now.getDate(); //日
  nowYear += (nowYear < 2000) ? 1900 : 0;
  nowDayOfWeek = nowDayOfWeek==0?7:nowDayOfWeek; // 如果是周日，就变成周七
  var weekStartDate = new Date(nowYear, nowMonth, nowDay - nowDayOfWeek);
  return weekStartDate;
}


/**
 * 获得上一月的最后一天日期
 */
export const getPriorMonthLastDay = () => {
  let now = new Date();
  //年份为0代表,是本年的第一月,所以不能减
  let month = now.getMonth();
  let year = now.getFullYear();
  if (month == 0) {
    month = 11; //月份为上年的最后月份
    year--; //年份减1
  }else {
    //否则,只减去月份
    month--;
  }

  //获得某月的天数
  var monthStartDate = new Date(year, month, 1);
  var monthEndDate = new Date(year, month + 1, 1);
  var days = (monthEndDate - monthStartDate)/(1000 * 60 * 60 * 24);

  //获得上一月的最后一天
  var priorMonthLastDay = new Date(year, month, days);
  //返回
  return priorMonthLastDay;
};


/**
 * 获得上N个月的第一天日期
 */
export const getLastXMonthStartDate = (m) => {
  var now = new Date();
  var month = now.getMonth() + m;
  if (month == 0) {
    month = 11; //月份为上年的最后月份
    year--; //年份减1
  }else {
    //否则,只减去月份
    month--;
  }
  var LastXMonthStartDate = new Date(now.getFullYear(), month, 1);

  return LastXMonthStartDate;
};


export const getDateString = (date) => {
  return date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate() + " " + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
};


export const getAge = (d) => {
  let b = "";
  if(d){
    let birthday = Number(new Date(d).format('yyyyMMdd'));
    let now = Number(new Date().format("yyyyMMdd"));
    b = parseInt((now - birthday)/10000);
  }
  return b;
}



export const isOutMonth = (fm, lm) => {
  fm = fm.split("-");
  lm = lm.split("-");
  return (lm[0] - fm[0]) * 12 + (lm[1] - fm[1]) + (lm[2] - fm[2] > -1 ? 1 : 0);
}

export const addDays = (date, d) => {
  return date.setDate(date.getDate() + d);
}

Date.prototype.format = function (format) {
  var o = {
    "M+": this.getMonth() + 1,
    "d+": this.getDate(),
    "h+": this.getHours(),
    "m+": this.getMinutes(),
    "s+": this.getSeconds(),
    "q+": Math.floor((this.getMonth() + 3) / 3),
    "S": this.getMilliseconds()
  };
  if (/(y+)/.test(format)) {
    format = format.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
  }
  for (var k in o) {
    if (new RegExp("(" + k + ")").test(format)) {
      format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
    }
  }
  return format;
};

export const getDateRangeStrArray = (startDate, endDate) => {
  console.log("======dateStrArray=======begin=======");
  let startTime = new Date(startDate);
  let endTime = new Date(endDate);
  let dateStrArray = [];
  let date = startTime;

  for(var i = 0; date.getTime() <= endTime.getTime(); i++){
    if(date.getTime() <= endTime.getTime()){
      dateStrArray.push(date.format('MM.dd'));
      date = new Date(date.setDate(date.getDate() + 1));
    }
  }
  console.log("dateStrArray===="+dateStrArray);
  return dateStrArray;
}

/**
 * 获取两个日期之间的天数目
 * @param startTime
 * @param endTime
 * @returns {number}
 */
export const getDays = (startTime, endTime) => {
  let startDate = new Date(startTime);
  let endDate = new Date(endTime);
  var days = (endDate - startDate)/(1000 * 60 * 60 * 24);
  return days;
}


/**
 * 获取两个日期之间的周数目
 * @param startTime
 * @param endTime
 * @returns {number}
 */
export const getWeeks = (startTime, endTime) => {
  let startDate = new Date(startTime);
  let endDate = new Date(endTime);
  let weeks = (endDate - startDate)/(1000 * 60 * 60 * 24 * 7);
  return weeks;
}


/**
 * 获取两个日期之间的月数目
 * @param startTime
 * @param endTime
 * @returns {number}
 */
export const getMonths = (startTime, endTime) => {
  let startDate = new Date(startTime);
  let endDate = new Date(endTime);
  //获取,月数
  let year1 =  startDate.getFullYear();
  let month1 = startDate.getMonth() ;

  let year2 =  endDate.getFullYear();
  let month2 = endDate.getMonth() ;
  // 月差计算月份差
  let months = (year2 - year1) * 12 + (month2-month1) + 1;
  return months;
}

