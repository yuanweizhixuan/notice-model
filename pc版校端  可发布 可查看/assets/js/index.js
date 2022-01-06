$(function () {


	//  测试用
	$(".test").click(function () {
		$(".notice-list-box").show()
	})
	$(".test1").click(function () {
		$(".notice-publish-box").show()
	})

	//  测试用

	/**  switch */
	const xSwitchArr = $(".x-switch");

	/** 分页信息 */
	const paginationEl = $(".m-pagination")
	const dottedStr = "..." // 生成分页中的点
	let pageNumStr = "" // 生成分页具体页数内容
	let paginationStr = '' // 生成分页的整个item

	/**  dialog 弹出框 */
	const categoryList = $(".left-box>.category-item")
	const customCloseBtn = $(".tips-tool-box-close")


	/****   公共的dialog 方法 开始 */
	function initCommonDialogMethods() {
		handleDialogCloseBtnClick()
		handleCustomCloseBtnClick()
		handleCustomOptionCheckBtnClick()
	}


	/**
	 * dialog 关闭
	 */
	function handleDialogCloseBtnClick() {
		$(".x-close-btn").on("click", function () {
			$(this).parents(".common-primary-mask").hide();
		})
	}

	/**   自定义群组  开始  */
	/**
	 * 自定义群组dialog 关闭
	 */
	function handleCustomCloseBtnClick() {
		customCloseBtn.on("click", function () {
			$(this).parents(".tips-tool-box-wrapper").hide()
		})
	}

	/**
	 * 自定义群组确定按钮被点击
	 */
	function handleCustomOptionCheckBtnClick() {
		$(".custom-check-btn").on("click", function () {
			console.log("自定义群组确定按钮被点击")
			//todo
			customCloseBtn.click()

		})
	}

	/**   自定义群组  结束  */

	/****   公共的dialog 方法  结束*/

	/**
	 *
	 */
	function init() {
		renderSwitch();
		initPagination()
		initNotice()
		initCommonDialogMethods()
	}

	init()


	/**  通知功能  开始*/
	function initNotice() {
		handleCategoryItemClick()
		handleUnReadMessageOnlyClick()
		handleSetAllReadMessageClick()
		handleNoticeCheckBtnClick()
		handleSetAsReadBtnClick()
		handleNoticeDeleteBtnClick()
		editorCustomGroupBtnClick()
		handleAddCustomGroupBtnClick()
		handleGroupCheckAllClick()
		handleGroupCheckIptClick()
		handleToggleUnfoldBtnClick()
	}

	/**
	 * 切换展开 收起功能
	 */
	function handleToggleUnfoldBtnClick() {
		$(".toggle-unfold").on("click", function () {
			if ($(this).text() === '收起') {
				$(this).siblings(".notification-group-wrapper").hide()
				$(this).text("展开")
			} else {
				$(this).siblings(".notification-group-wrapper").show()
				$(this).text("收起")
			}
		})
	}


	/**
	 * 全选或者全不选
	 */
	function handleGroupCheckAllClick() {
		$(".publish-box").on("click", ".group-item-check-all", function () {
			$(".group-item-check-ipt").prop("checked", $(this).prop("checked"));
		})
	}

	/**
	 * 每一个checkbox 被点击的时候检查是不是全选了
	 */
	function handleGroupCheckIptClick() {
		$(".publish-box").on("click", ".group-item-check-ipt", function () {
			if ($(".group-item-check-ipt:checked").length === $(".group-item-check-ipt").length) {
				$(".group-item-check-all").prop("checked", true);
			} else {
				$(".group-item-check-all").prop("checked", false);
			}
		})
	}


	/**
	 * 编辑用户群组按钮被点击 显示自定义群组对话框
	 */
	function editorCustomGroupBtnClick() {
		$(".publish-box").on("click", ".editor-icon", function () {
			$(".tips-tool-box-wrapper").show()
		})
	}

	/**
	 * 自定义添加按钮被点击
	 */
	function handleAddCustomGroupBtnClick() {
		$(".publish-box").on("click", ".add-custom-group", function () {
			$(".tips-tool-box-wrapper").show()
		})
	}


	/**
	 * 设为已读按钮被点击
	 */
	function handleSetAsReadBtnClick() {
		$(".common-u-list").on("click", ".set-as-read", function () {
			console.log($(this).parents(".u-item"));
		})
	}

	/**
	 * 删除通知按钮被点击
	 */
	function handleNoticeDeleteBtnClick() {
		$(".common-u-list").on("click", ".delete-notice", function () {
			console.log($(this).parents(".u-item"));
		})
	}

	/**
	 * 查看按钮被点击
	 */
	function handleNoticeCheckBtnClick() {
		$(".common-u-list").on("click", ".notice-check-btn", function () {
			console.log(12312)
			$(".notice-detail-box").show()
		})
	}


	/**
	 * 全部已读
	 */
	function handleSetAllReadMessageClick() {
		$(".set-all-read").on("click", function () {
			//todo
			console.log(12312)
		})
	}

	/**
	 * 仅未读消息被点击
	 */
	function handleUnReadMessageOnlyClick() {
		$(".unread-message-only").on("click", function () {
			xSwitchArr.click()
		})
	}

	/**
	 * 分类被点击
	 */
	function handleCategoryItemClick() {
		categoryList.on("click", function () {
			let index = $(this).index()
			$(this).addClass("active-category").siblings().removeClass("active-category")
			$(this).parents(".container-body").children(".body-content").children().eq(index).show().siblings().hide()
			// 设置通知标题
			if ($(this).text() === '发布通知') {
				$(this).parents(".container-body").siblings(".container-header").children(".header-title-txt").text("发布通知")
			} else if ($(this).text() === '历史记录') {
				$(this).parents(".container-body").siblings(".container-header").children(".header-title-txt").text("消息")
			}
		})
	}

	/**  通知功能  结束*/


	/** 分页器 开始 ***/

	/**
	 * 初始化分页器
	 */
	function initPagination() {
		setDefaultPagination()
		handlePrevCLick()
		handleNextCLick()
		paginationItemClick()
		regTestIpt()
		jumpPage()
	}

	function getPaginationData() {
		console.log('paginationEl.attr("data-pageIndex")', paginationEl.attr("data-pageIndex") - 1)
		console.log('paginationEl.attr("data-pageIndex")', paginationEl.attr("data-pageSize"))

		//todo 分页网络请求

		// $.ajax({
		// 	url: "",
		// 	data: {
		// 		pageIndex: paginationEl.attr("data-pageIndex"),
		// 		pageSize: paginationEl.attr("data-pageSize"),
		// 	},
		// 	type: "POST",
		// 	async: false,
		// 	dataType: "json",
		// 	success: function (data) {
		// 	},
		// });
	}

	/**
	 * 设置初始化的分页器
	 */
	function setDefaultPagination() {
		for (let i = 0; i < paginationEl.length; i++) {
			generatePagination($(paginationEl[i]))
		}

	}


	/**
	 * 生成页数  每次都会调用该方法 将最后的结果拼接到  pageNumStr 中  pageNumStr 在插入页面后会被复制为“”
	 * @param pageIndex 当前页数
	 * @param pageTotal 总页数
	 * @param index 每次拼接字符串的类型是什么   每次调用时候的index 值
	 */
	function generatePageItem(pageIndex, pageTotal, index) {
		if (pageIndex === index) {
			pageNumStr += `<div class="m-pagination-item page-num current-page">${index}</div>`
		} else if (1 === index) {
			pageNumStr += `<div class="m-pagination-item page-num start-page">${index}</div>`
		} else if (pageTotal === index) {
			pageNumStr += `<div class="m-pagination-item page-num end-page">${index}</div>`
		} else {
			pageNumStr += `<div class="m-pagination-item page-num ">${index}</div>`
		}
	}

	/**
	 * 生成分页器中的每一页
	 */
	function generatePagination(element) {
		let pageTotal = parseInt(element.attr("data-pageTotal")) // 总页数
		let pageIndex = parseInt(element.attr("data-pageIndex")) //当前页
		// 如果总页面小于等于6  则直接渲染即可
		if (pageTotal <= 5) {
			for (let i = 1; i <= pageTotal; i++) {
				generatePageItem(pageIndex, pageTotal, i)
			}
		} else {  // 总页面大于6的时候 判断他的当前页面是否大于4条 如果不是则渲染前面的  后面需要加。。。
			if (pageIndex <= 4) {
				for (let i = 0; i <= 4; i++) {
					generatePageItem(pageIndex, pageTotal, i + 1)
				}
				pageNumStr += dottedStr
				generatePageItem(pageIndex, pageTotal, pageTotal)
			} else if (pageIndex > pageTotal - 4) {   //如果大于总页数-4 则渲染最后的   前面需要加。。。
				generatePageItem(pageIndex, pageTotal, 1)
				pageNumStr += dottedStr
				for (let i = pageTotal - 4; i <= pageTotal; i++) {
					generatePageItem(pageIndex, pageTotal, i)
				}
			} else { // 如果当前页面是在中间的 则两边都加。。。
				generatePageItem(pageIndex, pageTotal, 1)
				pageNumStr += dottedStr
				for (let i = pageIndex - 1; i <= pageIndex + 1; i++) {
					generatePageItem(pageIndex, pageTotal, i)
				}
				pageNumStr += dottedStr
				generatePageItem(pageIndex, pageTotal, pageTotal)
			}
		}
		paginationStr = `
			<input type="text" class="m-p-ipt" placeholder="页码">
			<div class="m-pagination-item m-p-go">跳转</div>
			<div class="m-pagination-item m-p-prev">&lt</div>
				${pageNumStr}
			<div class="m-pagination-item m-p-next">&gt</div>
			<div class="m-pagination-item">共 ${pageTotal} 页</div>
		`
		element.html(paginationStr)
		pageNumStr = ''
		paginationStr = ''
	}

	/**
	 * 上一页被点击
	 */
	function handlePrevCLick() {
		paginationEl.on("click", ".m-p-prev", function () {
			let _this = $(this).parents(".m-pagination")
			let pageIndex = parseInt(_this.attr("data-pageIndex")) //当前页
			if (pageIndex > 1) {
				pageIndex -= 1
				_this.attr("data-pageIndex", pageIndex) //当前页
				generatePagination(_this)
			} else {
				return
			}
			console.log("handlePrevCLick")
			getPaginationData()
		})
	}

	/**
	 * 下一页被点击
	 */
	function handleNextCLick() {
		paginationEl.on("click", ".m-p-next", function () {
			let _this = $(this).parents(".m-pagination")
			let pageTotal = parseInt(_this.attr("data-pageTotal")) // 总页数
			let pageIndex = parseInt(_this.attr("data-pageIndex")) //当前页


			if (pageIndex < pageTotal) {
				pageIndex += 1
				_this.attr("data-pageIndex", pageIndex) //当前页
				generatePagination(_this)
			} else {
				return
			}
			console.log("handleNextCLick")
			getPaginationData()
		})
	}

	/**
	 * 中间的每一个页面被点击
	 */
	function paginationItemClick() {
		paginationEl.on("click", ".page-num", function () {
			let index = parseInt($(this).text())

			let _this = $(this).parents(".m-pagination")
			let pageTotal = parseInt(_this.attr("data-pageTotal")) // 总页数
			let pageIndex = parseInt(_this.attr("data-pageIndex")) //当前页

			if (index !== 1 && index !== pageTotal) {
				if (index === pageIndex) {
					return;
				}
				pageIndex = index
				_this.attr("data-pageIndex", pageIndex) //当前页
				generatePagination(_this)
			} else if (index === 1) {
				pageIndex = 1
				_this.attr("data-pageIndex", pageIndex) //当前页
				generatePagination(_this)
			} else if (index === pageTotal) {
				pageIndex = pageTotal
				_this.attr("data-pageIndex", pageIndex) //当前页
				generatePagination(_this)
			} else {
				return
			}
			console.log("handlePageClick")
			getPaginationData()
		})
	}

	/**
	 * 通过输入页码进行跳转
	 */
	function jumpPage() {
		paginationEl.on("click", ".m-p-go", function () {
			let _this = $(this).parents(".m-pagination")
			let pageTotal = parseInt(_this.attr("data-pageTotal")) // 总页数
			let pageIndex = parseInt(_this.attr("data-pageIndex")) //当前页
			let index = _this.children(".m-p-ipt").val()
			// 如果文本框没有输入页码则直接return  否则将输入的页码转换为整型
			if (index === "") {
				return;
			} else {
				index = parseInt(index)
			}
			// 如果当前输入的页码等于 当前已经跳转的页码 则直接return
			if (index === pageIndex) {
				return
			}
			// 如果当前输入的页码 大于总页码  则跳转到最后一页
			if (index > pageTotal) {
				index = pageTotal
			}

			pageIndex = index
			_this.attr("data-pageIndex", pageIndex) //当前页
			generatePagination(_this)
			_this.children(".m-p-ipt").val(pageIndex)
			console.log("输入页码后点击跳转")
			getPaginationData()
		})
	}


	/** 如果文本框被输入了非整数之外的字符 则替换为空 只保留整数部分 */
	function regTestIpt() {
		paginationEl.on("keyup", ".m-p-ipt", function (e) {
			let _this = $(this).parents(".m-pagination")

			if (this.value.length === 1) {
				this.value = this.value.replace(/[^1-9]/g, "");
			} else {
				this.value = this.value.replace(/\D/g, "");
			}
			if (e.keyCode === 13) {
				_this.children(".m-p-go").click()
			}
		})
	}

	/** 分页器 结束 ***/


	/** switch 开始 ***/
	/**
	 * 渲染 Switch到页面中
	 */
	function renderSwitch() {
		let switchStr =
			'<span class="x-switch-core"><span class="x-switch-button"></span></span>';
		for (let i = 0; i < xSwitchArr.length; i++) {
			$(xSwitchArr[i]).html(switchStr);
			setDefaultStyle(xSwitchArr[i]);
		}

		/**
		 * 如果默认就是选中状态的，需要给他添加相应的类并且val的值改为：true
		 * @param  { HTMLElement } el 需要设置样式或者取消样式的element元素
		 */
		function setDefaultStyle(el) {
			let value = $(el).attr("data-value");
			//如果默认就是true  则添加 is-check
			if (value === "true") {
				$(el).children(".x-switch-core").addClass("is-check");
			}
		}
	}


});


/**
 * switch 被点击 切换switch 状态和自定义属性的值
 * @param _this 被点击的switch
 */
function switchClick(_this) {
	let value = $(_this).attr("data-value");
	if (value === "true") {
		$(_this).attr("data-value", "false");
		$(_this).children(".x-switch-core").removeClass("is-check");
	} else {
		$(_this).attr("data-value", "true");
		$(_this).children(".x-switch-core").addClass("is-check");
	}
}

/** switch 结束 ***/
