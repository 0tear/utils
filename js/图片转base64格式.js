function asyncImgToBase64(imgUrl) {
	let cvs = document.createElement('canvas')
	if (cvs.getContext) {
		let ctx = cvs.getContext('2d')
		// 将图像绘制到ctx上
		let oImg = document.createElement('img')
		oImg.src = imgUrl
		return new Promise((resolve, reject) => {
			oImg.onload = function () {
				let { w, h } = { w: this.width, h: this.height }
				cvs.width = w
				cvs.height = h
				/* 绘制图像 */
				ctx.drawImage(this, 0, 0, w, h)
				/* 获取图像url */
				let url = cvs.toDataURL('image/png')
				resolve(url)
			}
		})
	}
}

export default asyncImgToBase64
