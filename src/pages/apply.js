/**
 * 计算请假时长
 * @param {Object} beginTime    开始时间
 * @param {Object} endTime      结束时间
 * @param {Object} stWorkTime   上班时间
 * @param {Object} enWrokTime   下班时间
 * @param {Object} isFreeTime  是否要去除午休工作时长
 * @param {Object} freeTimeMon  午休开始时间
 * @param {Object} freeTimeAft  午休结束时间
 * @param { Array } fillterDatas 节假日日期
 * 
 */
import Vue from 'vue'

export function getLeave(beginTime, endTime, stWorkTime, enWrokTime, isFreeTime, freeTimeMon, freeTimeAft, fillterDatas) {
	var days;
	var hours;
	var date;
	var freeTime = freeTimeAft - freeTimeMon;

	beginTime = beginTime.replace(/-/g, '/');
	var beginArr = beginTime.split(" ");
	var beginMonth = parseInt(beginArr[0].split("/")[1]);
	var beginDay = parseInt(beginArr[0].split("/")[2]);
	var beginHours = parseInt(beginArr[1].split(":")[0]);
	var beginMin = parseInt(beginArr[1].split(":")[1]);
	var beginHoursMin = beginHours + beginMin / 60;

	endTime = endTime.replace(/-/g, '/');
	var endArr = endTime.split(" ");
	var endMonth = parseInt(endArr[0].split("/")[1]);
	var endDay = parseInt(endArr[0].split("/")[2]);
	var endHours = parseInt(endArr[1].split(":")[0]);
	var endMin = parseInt(endArr[1].split(":")[1]);
	var endHoursMin = endHours + endMin / 60;
	//如果beginHoursMin时间小于上班时间都算上班时间
	if(beginHoursMin <= stWorkTime) {
		beginHoursMin = stWorkTime;
	}
	//如果endHoursMin时间大于上班时间都算下班时间
	if(endHoursMin >= enWrokTime) {
		endHoursMin = enWrokTime;
	}
	//如果endHoursMin时间小于上班时间都算下班时间
	if(endHoursMin <= stWorkTime) {
		endHoursMin = stWorkTime;
	}
	//如果结束时间在freeTimeMon和freeTimeAft之间都算freeTimeMon
	if(isFreeTime == true) {
		if(endHoursMin >= freeTimeMon && endHoursMin <= freeTimeAft) {
			endHoursMin = freeTimeMon;
		}
	}

	//获取结束时间-开始时间的天数
	var daysBetweenlist = daysBetween(beginTime, endTime);
	let effectiveLeaveDate = daysBetweenlist.filter(date => !fillterDatas.includes(date)).filter(date => (new Date(date).getDay() != 6 && new Date(date).getDay() != 0))
	console.log("有效的请假日期数组【过滤节假日期后的】", effectiveLeaveDate)
	if(beginTime > endTime){
		Vue.prototype.$Message.warning({
                content: '开始时间需小于结束时间',
                duration: 3
            });
		return false;
	}
	
	if(!effectiveLeaveDate.includes(beginTime.split(' ')[0]) || !effectiveLeaveDate.includes(endTime.split(' ')[0])){
		//如果开始或者结束时间不在工作日提醒重新选择
		Vue.prototype.$Message.warning({
                content: '调休开始、结束时间需在工作日，请您重新选择',
                duration: 3
            });
		return false;
	}
	if(effectiveLeaveDate.length > 0) {
		var daysBetweenLen = effectiveLeaveDate.length;
		//午休
		if(isFreeTime == true) {
			var hour = enWrokTime - stWorkTime - freeTime;
			if(daysBetweenLen == 1) {
				//同一天
				if(endHoursMin - freeTimeAft > 0) {
					hours = (endHoursMin) - (beginHoursMin) - freeTime;
				} else {
					hours = (endHoursMin) - (beginHoursMin)
				}
			} else if(daysBetweenLen == 2) {
				//跨一天   
				//第一天的时长
				hours = enWrokTime - beginHoursMin;
				//是否有午休         
				if(beginHoursMin <= freeTimeMon)
					hours = hours - freeTime;
				//第二天的时长    
				hours += endHoursMin - stWorkTime;
				//是否有午休 
				if(endHoursMin >= freeTimeAft)
					hours = hours - freeTime;

			} else {
				//跨两天以上 
				//第一天的时长
				hours = enWrokTime - beginHoursMin;
				//是否有午休             
				if(beginHoursMin <= freeTimeMon)
					hours = hours - freeTime;
				//中间时长
				hours += (daysBetweenLen - 2) * (hour);
				//最后一天时长
				hours += endHoursMin - stWorkTime;
				//是否有午休 
				if(endHoursMin >= freeTimeAft)
					hours = hours - freeTime;
			}
			days = Math.floor(hours / hour);
			hours = hours % hour;
			date = {
				"days": days,
				"hours": hours
			};

		} else {
			//非午休   
			var hour = enWrokTime - stWorkTime;
			if(daysBetweenLen == 1) {
				//同一天
				hours = (endHoursMin) - (beginHoursMin);
			} else if(daysBetweenLen == 2) {
				//跨一天   
				hours = enWrokTime - beginHoursMin;
				//第二天的时长
				hours += endHoursMin - stWorkTime;
			} else {
				//跨两天以上 
				//第一天的时长
				hours = enWrokTime - beginHoursMin;
				//中间时长
				hours += (daysBetweenLen - 2) * (hour);
				//最后一天时长
				hours += endHoursMin - stWorkTime;
			}
			days = Math.floor(hours / hour);
			hours = hours % hour;
			date = {
				"days": days,
				"hours": hours
			};
		}

	}
	return date;
}

/**
 * 根据两个日期，判断相差天数
 * @param sDate1 开始日期 如：2016-11-01
 * @param sDate2 结束日期 如：2016-11-02
 * @returns {number} 返回相差天数
 */
export function daysBetween(sDate1, sDate2) {
	var arr = [];
	sDate1 = sDate1.substring(0, 10);
	sDate2 = sDate2.substring(0, 10);
	var startTime = gDate(sDate1);
	var endTime = gDate(sDate2);
	while((endTime.getTime() - startTime.getTime()) >= 0) {
		var year = startTime.getFullYear();
		var month = startTime.getMonth().toString().length == 1 ? "0" + startTime.getMonth().toString() : startTime.getMonth();
		var day = startTime.getDate().toString().length == 1 ? "0" + startTime.getDate() : startTime.getDate();
		arr.push(year + "/" + month + "/" + day);
		startTime.setDate(startTime.getDate() + 1);
	}
	return arr;
}

export function gDate(datestr) {
	datestr = datestr.replace(/-/g, '/');
	var temp = datestr.split("/");
	var date = new Date(temp[0], temp[1], temp[2]);
	return date;
}

/**
 * 计算请假时长
 * @param {Object} beginTime    开始时间
 * @param {Object} endTime      结束时间
 * @param {Object} stWorkTime   上班时间
 * @param {Object} enWrokTime   下班时间
 * @param {Object} isFreeTime  是否要去除午休工作时长
 * @param {Object} freeTimeMon  午休开始时间
 * @param {Object} freeTimeAft  午休结束时间
 * 
 * 
 */

//获取请假时间-wjq
