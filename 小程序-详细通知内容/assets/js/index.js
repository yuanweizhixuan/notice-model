$(function () {
	let noticeId
	let noticeBody = $(".notice-body")

	function init() {
		handleBackBtnClick()
		noticeId = getUrlParam("12312321") // todo 改为需要获取的id
		getNoticeContent(noticeId)
	}

	init()


	/**
	 * 获取对应id 的通知具体内容
	 * @param noticeId
	 */
	function getNoticeContent(noticeId) {
		$.ajax({
			url: "",
			data: {noticeId},
			type: "POST",
			async: false,
			dataType: "json",
			success: function (data) {
			},
		});
	}


	/**
	 * 返回上一页按钮被点击
	 */
	function handleBackBtnClick() {
		$(".top-bar-left").on("click", function () {
			//todo   返回按钮 点击
			window.history.go(-1)
		})
	}

	/**
	 * 获取url中的参数
	 * @param name 需要获取的参数名称
	 * @returns {string|null} url中携带的参数
	 */
	function getUrlParam(name) {
		let reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
		let r = window.location.search.substr(1).match(reg);  //匹配目标参数
		if (r != null) return unescape(r[2]);
		return null; //返回参数值
	}


})