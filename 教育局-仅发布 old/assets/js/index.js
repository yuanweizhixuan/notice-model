$(function () {
	/** 消息通知内容框 */
	const noticeContentCloseBtn = $(".notice-content-close-btn") // 通知内容框关闭按钮
	const noticeContentBox = $(".notice-content") // 通知内容框
	/**  通知添加、历史 */
	const noticeCloseBtn = $(".notice-close-btn") //关闭通知列表
	const noticeUList = $(".notice-u-list")
	const noticeCategory = $(".notice-category-left>.nav-item")
	const customWrapper = $(".tips-tool-box-wrapper");
	const notificationGroupWrapper = $(".notification-group-wrapper")


	/** 分页信息 */
	const paginationEl = $(".m-pagination")
	let pageNumStr = "" // 生成分页具体页数内容
	let dottedStr = "..." // 生成分页中的点
	let paginationStr = '' // 生成分页的整个item


	/**
	 * 进入页面初始化调用
	 */
	function init() {
		initPagination()// 通知内容
		initNoticeDetail()// 通知内容
		initNoticeList()	//通知分类被点击
		initCustomBox() // 自定义群组功能
	}

	init()


	/**  自定义群组功能盒子	 开始*/


	function initCustomBox() {
		handleCustomCloseBtnClick()
		handleCustomCheckBtnClick()
	}

	/**
	 * 自定义群组关闭按钮
	 */
	function handleCustomCloseBtnClick() {
		$(".tips-tool-box-close").on("click", function () {
			customWrapper.hide()
		})
	}

	/**
	 * 确定按钮被点击
	 */
	function handleCustomCheckBtnClick() {
		$(".custom-check-btn").on("click", function () {
			customWrapper.hide()
			//todo 点击确定时候需要做的操作
		})
	}


	/**  自定义群组功能盒子	 结束*/


	/** 通知详情 开始 ***/

	/**
	 * 初始化通知详情
	 */
	function initNoticeDetail() {
		handleNoticeContentCloseBtnClick()
	}

	/**
	 * 获取通知内容并渲染
	 */
	function getNoticeDetail() {
		// todo 获取到点击的通知id 然后根据id获取最新的通知内容渲染到页面中
		$.ajax({
			url: "",
			data: {},
			type: "POST",
			async: false,
			dataType: "json",
			success: function (data) {
			},
		});
	}


	/**
	 * 关闭通知内容框
	 */
	function handleNoticeContentCloseBtnClick() {
		noticeContentCloseBtn.on("click", function () {
			noticeContentBox.toggle()
		})
	}

	/** 通知详情 结束 ***/


	/** 通知列表 开始  ***/

	function initNoticeList() {
		getNoticeList()
		handleNoticeCategoryClick()
		handleCheckBtnClick()
		handleNoticeCloseBtn()
		handleDeleteNoticeClick()
		editCustomGroupBtnClick()
	}

	/**
	 * 编辑自定义群组按钮被点击
	 */
	function editCustomGroupBtnClick() {
		notificationGroupWrapper.on("click", ".editor-icon", function () {
			console.log(123123123)
			customWrapper.show()
		})
	}


	/**
	 * 发送请求获取通知列表
	 */
	function getNoticeList() {
		$.ajax({
			url: "",
			data: {},
			type: "POST",
			async: false,
			dataType: "json",
			success: function (data) {
			},
		});
	}

	/**
	 * 生成每一个消息item
	 */
	function generateNoticeItem() {

		// todo

		let noticeItemStr = ""
		let data = [1, 2, 3, 4, 5, 6, 7, 8, 0, 9]
		// data = []
		if (data.length === 0) {
			noticeUList.html("<div class='no-notice'>别看了，没有人理你！</div>")
			// noticeUList.html("<div class='no-notice'>暂无消息</div>")
			return
		}
		data.forEach((item) => {
			noticeItemStr += `
				<li class="notice-u-item">
					<div class="notice-title">
						<span class="notice-title-txt">通知标题通知标题通知标题通知标题通知标题通知标题通知标题通知标题通知标题通知标题通知标题通知标题通知标题通知标题</span>
					</div>
					<div class="notice-datetime">2021.11.12 10:59:59</div>
					<div class="notice-controller">
						<div class="controller-item notice-check-btn">
							<span>查看</span>
						</div>
						<div class="controller-item more-controller">
							<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-trash-2"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>
						</div>
					</div>
				</li>
				`
		})
		noticeUList.html(noticeItemStr)
		noticeItemStr = ''
		console.log(noticeItemStr)

	}

	generateNoticeItem()

	/**
	 * 删除消息按钮被点击
	 */
	function handleDeleteNoticeClick() {
		noticeUList.on("click", ".delete-notice", function () {
			console.log("delete-notice")
		})
	}

	/**
	 * 通知框关闭
	 */
	function handleNoticeCloseBtn() {
		noticeCloseBtn.on("click", function () {
			noticeCloseBtn.parents("#primary-mask").hide()
		})
	}

	/**
	 * 通知分类被点击
	 */
	function handleNoticeCategoryClick() {
		noticeCategory.on("click", function () {
			let index = $(this).index()
			$(this).addClass("active-nav").siblings().removeClass("active-nav")
			$(".notice-body>.notice-container").children().eq(index).show().siblings().hide()
			// todo 切换时候重新请求数据
		})
	}

	/**
	 * 查看通知按钮被点击
	 */
	function handleCheckBtnClick() {
		noticeUList.on("click", ".notice-check-btn", function () {
			console.log($(this))
			noticeContentBox.toggle()
		})
	}

	/** 通知列表 结束  ***/


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
});
