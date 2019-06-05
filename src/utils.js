
const utils = {
    /**
     * 是否是由字母或数字组成的字符串
     *
     * @param {}
     *            letVale
     */
    checkLetOrNum: function (letVale) {
        var regex = /^([a-zA-Z_]{1})([\w]*)$/g;
        var b = regex.test(letVale);
        return b;
    },

    /**
     * 取字符串的第index的字符
     *
     * @param {}
     *            source
     * @param {}
     *            index
     */
    interceptStr: function (source, index) {
        var temp = source.charAt(index);
        return parseInt(temp);
    },


    /**
     * 判断两个字符串是否想等 相等返回true否则返回false
     *
     * @param {}
     *            source
     * @param {}
     *            target
     */
    decideString: function (source, target) {
        return (source == target) ? true : false;
    },


    /**
     * 验证是否是整数或小数
     * @param source
     * @return
     */
    checkIntAndFloat: function (source) {
        var regex = /^[0-9]+(\.[0-9]+)?$/g;
        return regex.test(source);
    },

    /**
     * 验证是否两位数以内的正整数
     *
     * @param {}
     *            source
     * @return {}
     */
    checkTwoInt: function (source) {
        var regex = /^[1-9][0-9]?$/g;  //两位数以内的正整数
        return regex.test(source);
    },

    /**
     * 验证数字
     *
     * @param {}
     *            source
     * @return {}
     */
    checkNumber: function (source) {
        var regex = /^(\-|\+)?\d+(\.\d+)?$/;
        return regex.test(source);
    },
    /** 
     * 时间变化
     * @param {} source
     * @param {} addval
     */
    dateToString: function (source, addval) {
        var paddval = parseInt(addval);//增量(秒)
        var temp = source.split(":");
        var thrs = parseInt(temp[0]) * 3600;//小时化成秒
        var tmis = parseInt(temp[1]) * 60;//分钟化成秒;
        var tss = parseInt(temp[2]);//秒
        var totals = parseInt(thrs) + parseInt(tmis) + parseInt(tss) + parseInt(paddval);
        var result = timeTohhmmss(totals);
        return result;
    },

    /**
     * 由秒数转化成hh:mm:ss格式
     * @param {} seconds
     */
    timeTohhmmss: function (seconds) {
        var hh;
        var mm;
        var ss;
        if (seconds == null || seconds < 0) {
            return;
        }
        var pseconds = parseInt(seconds);
        //得到小时
        hh = pseconds / 3600 | 0;
        pseconds = parseInt(pseconds) - parseInt(hh) * 3600;
        if (parseInt(hh) < 10) {
            hh = "0" + hh;
        }
        if (parseInt(hh) >= 24) {
            hh = "00";
        }
        //得到分钟
        mm = parseInt(pseconds) / 60 | 0;
        //得到秒
        ss = parseInt(pseconds) - parseInt(mm) * 60;
        if (parseInt(mm) < 10) {
            mm = "0" + mm;
        }
        if (parseInt(ss) < 10) {
            ss = "0" + ss;
        }
        return hh + ":" + mm + ":" + ss;
    },

    /**
     验证身份证号是否正确
     **/
    isCardNo: function (num) {
        if (isNaN(num)) {
            alert("输入的身份证号不是数字！");
            return false;
        }
        var len = num.length;
        if (len < 15 || len > 18) {
            alert("输入的身份证号码长度不正确定！应为15位或18位");
            return false;
        }
        var re15 = /^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$/;
        var re18 = /^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{4}$/;
        var res = (re15.test(num) || re18.test(num));
        if (res == false) {
            alert("输入的身份证号格式不正确！");
            return false;
        }
        return res;
    },

    /**
     * 判断字符串是否为空，若为空则返回true否则返回false
     * @param source
     * @return true或者false
     **/
    isEmpty: function (source) {
        var str = source.replace(/(^\s*)|(\s*$)/g, "");
        if (str == "" || str.toLowerCase() == "null" || str.length <= 0) {
            return true;
        } else {
            return false;
        }
    },

    /**
     * 验证是否为电话号码（座机）
     *
     * @param {}
     *            source
     */

    isTelephone: function (source) {
        var regex = /^(0[0-9]{2,3}\-)?([2-9][0-9]{6,7})+(\-[0-9]{1,4})?$/
        return regex.test(source);  //search(/^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/) != -1
    },

    /**
     * 验证是否为手机号码（移动手机）
     *
     * @param {}
     *            source
     */

    isMobilePhone: function (source) {
        var regex = /^((\(\d{3}\))|(\d{3}\-))?1\d{10}/;
        if(! regex.test(source)){
            alert("手机号格式不对")
        }
        return regex.test(source);
    },

    /**
     * 验证是否为电子邮箱
     *
     * @param {}
     *            source
     */
    isEmail: function (source) {
        var regex = /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/;
        if (source.search(/^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/) != -1) {
            return true;
        } else {
            alert("电子邮箱格式不正确");
            return false;
        }
    },

    /**
     *
     *验证是否为邮编
     * @param
     *      source
     */
    isZip: function (source) {
        var regex = /^[1-9]\d{5}$/;
        return regex.test(source);
    },

    /**
     *
     *验证字符串是否是中文
     *
     **/
    isChines: function (source) {
        var regex = /^[\u4E00-\u9FA5]+$/;
        return regex.test(source);
    },


    /*
     *判断包含关系
     *string:原始字符串
     *substr:子字符串
     *isIgnoreCase:忽略大小写
     */


    jsContains: function (string, substr, isIgnoreCase) {
        if (isIgnoreCase) {
            string = string.toLowerCase();
            substr = substr.toLowerCase();
        }
        var startChar = substr.substring(0, 1);
        var strLen = substr.length;
        for (var j = 0; j < string.length - strLen + 1; j++) {
            if (string.charAt(j) == startChar)//如果匹配起始字符,开始查找
            {
                if (string.substring(j, j + strLen) == substr)//如果从j开始的字符与str匹配，那ok
                {
                    return true;
                }
            }
        }
        return false;
    },

    /**
     * 随机数UUID
     * @return
     */
    makeUUID: function () {
        var S4 = function () {
            return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
        };
        //return (S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4());
        return (S4() + S4() + S4() + S4() + S4() + S4() + S4() + S4());
    },

    /**
     *  显示提示信息
     * @param {Object} msg
     */
    showInfoMessage: function showInfoMessage(msg) {
        Ext.MessageBox.show({
            width: 320,
            buttons: Ext.Msg.OK,
            msg: msg,
            icon: Ext.MessageBox.INFO,
            title: "系统提示"
        });
    },

    /**
     * 得到文件的扩展名
     * @param {} filename
     */
    getFileExt: function (filename) {
        var d = /\.[^\.]+$/.exec(filename);
        var ext = new String(d);
        var s = ext.toLowerCase();
        return s;
    },


    //字符串编码
    strEncode: function strEncode(source) {
        return encodeURIComponent(source);
    },
    //字符串解码
    strDencode: function (source) {
        return decodeURIComponent(source);
    },
    /**
     * 字符串转正形
     * @param source
     * @returns
     */
    strParseInt: function (source) {
        if (isEmpty(source) || isNaN(source)) {
            return 0;
        }
        return parseInt(source);
    },

    /**
     * 获取今天日期，星期几
     * @returns
     */
    getTodayDate: function () {
        var now = new Date();
        var yy = now.getFullYear();
        var mm = now.getMonth() + 1;
        var dd = now.getDate();
        var day = new Array();
        day[0] = "星期日";
        day[1] = "星期一";
        day[2] = "星期二";
        day[3] = "星期三";
        day[4] = "星期四";
        day[5] = "星期五";
        day[6] = "星期六";
        return (yy + '年' + mm + '月' + dd + '日 ' + day[now.getDay()]);
    },

    /**
     * 获取一段时间中含有的周末数量
     * @param beginDate
     * @param endDate
     * @returns {number}
     */
    getIntervalWeekends: function (beginDate, endDate) {
        var weekends = 0;
        var dateDiffDays = dateDiff("d", beginDate, endDate) + 1;
        if (dateDiffDays > 0) {
            for (var i = 0; i < dateDiffDays; i++) {
                var newDate = dateAdd("d", i, beginDate);
                if (newDate.getDay() == 0 || newDate.getDay() == 6) {
                    weekends++;
                }
            }
        }
        return weekends;
    },

    /**
     * 时间戳转成时间
     * @param time
     * @returns
     */
    timeStamp2String: function (time) {
        var datetime = new Date();
        datetime.setTime(time);
        var year = datetime.getFullYear();
        var month = datetime.getMonth() + 1 < 10 ? "0" + (datetime.getMonth() + 1) : datetime.getMonth() + 1;
        var date = datetime.getDate() < 10 ? "0" + datetime.getDate() : datetime.getDate();
        var hour = datetime.getHours() < 10 ? "0" + datetime.getHours() : datetime.getHours();
        var minute = datetime.getMinutes() < 10 ? "0" + datetime.getMinutes() : datetime.getMinutes();
        var second = datetime.getSeconds() < 10 ? "0" + datetime.getSeconds() : datetime.getSeconds();
        return year + "-" + month + "-" + date + " " + hour + ":" + minute + ":" + second;
    },

    /**
     * 判断是否为空
     * @param val
     * @returns
     */
    isNull: function (val) {
        if (val == undefined || val == null || val == "" || val == ''
            || val == "undefined" || val == "null" || val == "NULL") {
            return true;
        }
        return false;
    },


    /**
     * 判断字符串是否为日期格式
     * @param str string 字符串
     * @param formatStr string 日期格式， 如下 yyyy-MM-dd
     */
    isDate: function (str, formatStr) {
        if (formatStr == null) {
            formatStr = "yyyyMMdd";
        }
        var yIndex = formatStr.indexOf("yyyy");
        if (yIndex == -1) {
            return false;
        }
        var year = str.substring(yIndex, yIndex + 4);
        var mIndex = formatStr.indexOf("MM");
        if (mIndex == -1) {
            return false;
        }
        var month = str.substring(mIndex, mIndex + 2);
        var dIndex = formatStr.indexOf("dd");
        if (dIndex == -1) {
            return false;
        }
        var day = str.substring(dIndex, dIndex + 2);
        if (!isNumber(year) || year > "2100" || year < "1900") {
            return false;
        }
        if (!isNumber(month) || month > "12" || month < "01") {
            return false;
        }
        if (day > getMaxDay(year, month) || day < "01") {
            return false;
        }
        return true;
    },

    getMaxDay: function (year, month) {
        if (month == 4 || month == 6 || month == 9 || month == 11)
            return "30";
        if (month == 2)
            if (year % 4 == 0 && year % 100 != 0 || year % 400 == 0)
                return "29";
            else
                return "28";
        return "31";
    },

    /**
     *    变量是否为数字
     */
    isNumber : function (str) {
        var regExp = /^\d+$/g;
        return regExp.test(str);
    },

    /**
     * 日期对象转换为指定格式的字符串
     * @param f 日期格式,格式定义如下 yyyy-MM-dd HH:mm:ss
     * @param date Date日期对象, 如果缺省，则为当前时间
     *
     * YYYY/yyyy/YY/yy 表示年份
     * MM/M 月份
     * W/w 星期
     * dd/DD/d/D 日期
     * hh/HH/h/H 时间
     * mm/m 分钟
     * ss/SS/s/S 秒
     * @return string 指定格式的时间字符串
     */
    dateToStr: function (formatStr, date) {
        formatStr = arguments[0] || "yyyy-MM-dd HH:mm:ss";
        date = arguments[1] || new Date();
        var str = formatStr;
        var Week = ['日', '一', '二', '三', '四', '五', '六'];
        str = str.replace(/yyyy|YYYY/, date.getFullYear());
        str = str.replace(/yy|YY/, (date.getYear() % 100) > 9 ? (date.getYear() % 100).toString() : '0' + (date.getYear() % 100));
        str = str.replace(/MM/, date.getMonth() > 9 ? (date.getMonth() + 1) : '0' + (date.getMonth() + 1));
        str = str.replace(/M/g, date.getMonth());
        str = str.replace(/w|W/g, Week[date.getDay()]);

        str = str.replace(/dd|DD/, date.getDate() > 9 ? date.getDate().toString() : '0' + date.getDate());
        str = str.replace(/d|D/g, date.getDate());

        str = str.replace(/hh|HH/, date.getHours() > 9 ? date.getHours().toString() : '0' + date.getHours());
        str = str.replace(/h|H/g, date.getHours());
        str = str.replace(/mm/, date.getMinutes() > 9 ? date.getMinutes().toString() : '0' + date.getMinutes());
        str = str.replace(/m/g, date.getMinutes());

        str = str.replace(/ss|SS/, date.getSeconds() > 9 ? date.getSeconds().toString() : '0' + date.getSeconds());
        str = str.replace(/s|S/g, date.getSeconds());

        return str;
    },

    /**
     * 日期计算
     * @param strInterval string  可选值 y 年 m月 d日 w星期 ww周 h时 n分 s秒
     * @param num int
     * @param date Date 日期对象
     * @return Date 返回日期对象
     */
    dateAdd: function (strInterval, num, date) {
        date = arguments[2] || new Date();
        switch (strInterval) {
            case 's': return new Date(date.getTime() + (1000 * num));
            case 'n': return new Date(date.getTime() + (60000 * num));
            case 'h': return new Date(date.getTime() + (3600000 * num));
            case 'd': return new Date(date.getTime() + (86400000 * num));
            case 'w': return new Date(date.getTime() + ((86400000 * 7) * num));
            case 'm': return new Date(date.getFullYear(), (date.getMonth()) + num, date.getDate(), date.getHours(), date.getMinutes(), date.getSeconds());
            case 'y': return new Date((date.getFullYear() + num), date.getMonth(), date.getDate(), date.getHours(), date.getMinutes(), date.getSeconds());
        }
    }
}


export default utils;