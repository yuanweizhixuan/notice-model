$(function () {
	const noticeWrapper = $(".notice-wrapper")
	const navItemList = $(".notice-type-nav>.nav-item")
	let pageIndex = 0,		//分页码
		pageSize = 20,      // 每页条数
		loadEnded = false,   // 全部加载完成
		off_on = true; //  是否在加载中 默认不是在加载
	let data = [
		{
			dateTime: "Fri Dec 24 2021 14:40:14 GMT+0800 (中国标准时间)",
			content: "学校发布学校发布学校发布学校发布学校发布",
			status: 0
		},
		{
			dateTime: "Fri Dec 23 2021 14:40:14 GMT+0800 (中国标准时间)",
			content: "学校发布学校发布学校发布学校发布学校发布",
			status: 1
		}, {
			dateTime: "Fri Dec 22 2021 14:40:14 GMT+0800 (中国标准时间)",
			content: "学校发布学校发布学校发布学校发布学校发布",
			status: 0
		}, {
			dateTime: "Fri Dec 21 2021 14:40:14 GMT+0800 (中国标准时间)",
			content: "学校发布学校发布学校发布学校发布学校发布",
			status: 0
		}, {
			dateTime: "Fri Dec 1 2021 14:40:14 GMT+0800 (中国标准时间)",
			content: "学校发布学校发布学校发布学校发布学校发布",
			status: 1
		}, {
			dateTime: "Fri Dec 24 2021 14:40:14 GMT+0800 (中国标准时间)",
			content: "学校发布学校发布学校发布学校发布学校发布",
			status: 0
		}, {
			dateTime: "Fri Dec 24 2020 14:40:14 GMT+0800 (中国标准时间)",
			content: "学校发布学校发布学校发布学校发布学校发布",
			status: 1
		}
	]


	/**
	 * 页面初始化时候调用
	 */
	function init() {
		addLoadingAnimation(); //添加动画
		addScrollListener(); //监听滚动事件
		handleNavItemClick() // 处理分类被点击
		handleBackBtnClick() //返回上一页被点击
		handleNoticeItemClick() // 每一条通知被点击
	}

	init()


	/**
	 * 通知列表中的某个通知被点击
	 */
	function handleNoticeItemClick() {
		noticeWrapper.on("click", ".notice-item", function () {
			//todo 点击item时候跳转对应的页面
			console.log(123123)
		})
	}


	/**
	 * 导航被点击时候切换  顺便重置滚动状态以及页数
	 */
	function handleNavItemClick() {
		navItemList.on("click", function () {
			off_on = false
			noticeWrapper.html("")
			noticeWrapper.append("<div class='no-data'>暂无内容</div>")
			pageIndex = 0
			loadEnded = false
			$(this).addClass("active-nav").siblings().removeClass("active-nav")
		})
	}

	/**
	 * 返回上一页按钮被点击
	 */
	function handleBackBtnClick() {
		$(".top-bar-left").on("click", function () {
			window.history.go(-1)
		})

	}


	/**
	 * 网络请求之后调用该方法渲染数据
	 * @param noticeItemList  请求回来需要渲染到页面中的数据
	 */
	function renderNoticeItem(noticeItemList) {
		let currentDate = dateFormat(new Date(), "dateTimeObject");
		let noticeItemStr = '';
		let hasReadClass = "" // 是否要增加已读的类
		let dateMapping = {  //字符串映射表
			today: "今天",
			yesterday: "昨天",
			month: "月",
			day: "日",
			haveRead: "【已读】",
			unRead: "【未读】",
		}
		let currentDayStr = "" //当前世间，用于显示今天 昨天 等时间的字符串

		$.each(noticeItemList, function (i, item) {
			let itemDate = dateFormat(item.dateTime, "dateTimeObject")
			hasReadClass = item.status === 0 ? 'have-read' : '' //是否已读状态

			// 日期显示方式，如果是当前item时间 === 今天  则显示今天  item时间 === 当前日-1 显示昨天  如果 都不是 则判断是不是今年的，如果是显示月和日   否则显示年月日
			if (itemDate.d === currentDate.d && itemDate.y === currentDate.y && itemDate.m === currentDate.m) {//如果是当前item时间 === 今天
				currentDayStr = dateMapping.today + dateFormat(item.dateTime, "time")
			} else if (itemDate.d === currentDate.d - 1 && itemDate.y === currentDate.y && itemDate.m === currentDate.m) { //  item时间 === 当前日-1 显示昨天
				currentDayStr = dateMapping.yesterday + dateFormat(item.dateTime, "time")
			} else if (itemDate.y === currentDate.y) { // 则判断是不是今年的，如果是显示月和日
				currentDayStr = itemDate.m + dateMapping.month + itemDate.d + dateMapping.day + dateFormat(item.dateTime, "time")
			} else { //显示年月日
				currentDayStr = dateFormat(item.dateTime, 'dateTime')
			}

			noticeItemStr += `
			<li class="notice-item">
				<p class="notice-header">
				<span class="read-status ${hasReadClass}">${item.status === 0 ? dateMapping.haveRead : dateMapping.unRead}</span>
				<span>${currentDayStr}</span>
				</p>
				<div class="notice-body">${item.content}</div>
			</li>
			`
		})
		noticeWrapper.append(noticeItemStr);
		$(".loading-animation").hide();
		off_on = true;
		if (pageIndex > 3) loadEnded = true;
		if (noticeItemList.length < 20) loadEnded = true;
		if (loadEnded) noticeWrapper.append("<div class='load-ended'>没有更多内容了！</div>");
	}

	/**
	 * $(".main") 需要滚动加载的元素,loadEnded 在所有的分页数据加载完成之后设置为true
	 */
	function addScrollListener() {
		$('.notice-container').on("scroll", debounce(mainScrollFn, 300));

		/**
		 * 滚动监听方法
		 */
		function mainScrollFn() {
			let loadingAnimation = $(".loading-animation")
			//如果完全加载完成  则直接退出
			if (loadEnded) {
				return;
			}
			if ($(this)[0].scrollTop + $(this).height() + 60 >= $(this)[0].scrollHeight) {
				loadingAnimation.show();
				if (off_on) {
					console.log(loadingAnimation.css("display"));
					off_on = false;
					pageIndex++;
					$.ajax({
						url: "",
						data: {},
						type: "POST",
						async: false,
						dataType: "json",
						success: function (data) {
						},
					});
					renderNoticeItem(data); //调用执行上面的加载方法
				}
			}
		}
	}


	/**
	 * 加载动画
	 */
	function addLoadingAnimation() {
		$("body").append("<div class='loading-animation'><img src='./assets/images/loading/loading.gif' alt=''></div>");
	}


	/**
	 * 防抖函数
	 * @param {*} fn 回调函数
	 * @param {*} delay 延迟时间
	 * @returns 如果防抖函数有返回值则通过res 返回
	 */
	"use strict";

	function debounce(fn, delay) {
		let trigger = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

		let t = null;
		let res = null;
		let debounced = function debounced() {
			let _self = this;
			let args = arguments;
			if (t) {
				clearTimeout(t);
			}
			if (trigger) {
				let exec = !t;
				t = setTimeout(function () {
					t = null;
				}, delay);
				if (exec) {
					res = fn.apply(_self, args);
				}
			} else {
				t = setTimeout(function () {
					res = fn.apply(_self, args);
				}, delay);
			}
			return res;
		};
		debounced.remove = function () {
			clearTimeout(t);
			t = null;
		};
		return debounced;
	}


	/**
	 *
	 * @param {*} dateTime
	 * @returns {Object}

	/**
	 * 将传入的时间格式化为指定的格式返回   date 返回年月日  time 返回时分秒  dateTime返回年月日 时分秒 dateTimeObject 返回时间对象
	 * @param dateTime 时间戳或者一个时间字符串如:1633335091379 or 2021-10-04T08:11:46.830Z
	 * @param resultType
	 * @returns { Object }
	 */
	function dateFormat(dateTime, resultType) {
		let date = new Date(dateTime);
		let obj = {
			y: 0,
			m: 0,
			d: 0,
			hh: 0,
			mm: 0,
			ss: 0,
		};
		obj.y = date.getFullYear();
		obj.m = date.getMonth() + 1;
		obj.d = date.getDate();
		obj.hh = date.getHours();
		obj.mm = date.getMinutes();
		obj.ss = date.getSeconds();
		obj.m = obj.m >= 10 ? obj.m : "0" + obj.m
		obj.d = obj.d >= 10 ? obj.d : "0" + obj.d
		obj.hh = obj.hh >= 10 ? obj.hh : "0" + obj.hh
		obj.mm = obj.mm >= 10 ? obj.mm : "0" + obj.mm
		obj.ss = obj.ss >= 10 ? obj.ss : "0" + obj.ss

		if (resultType === "date") {
			return `${obj.y}-${obj.m}-${obj.d}`;
		}
		if (resultType === "time") {
			return `${obj.hh}:${obj.mm}:${obj.ss}`;
		}
		if (resultType === "dateTime") {
			return `${obj.y}-${obj.m}-${obj.d} ${obj.hh}:${obj.mm}:${obj.ss}`;
		}
		if (resultType === "dateTimeObject") {
			return obj;
		}
	}
})