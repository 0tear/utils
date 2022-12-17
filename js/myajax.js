function myajax(url) {
	return new Promise((resolve, reject) => {
		let xhr = new XMLHttpRequest()
		xhr.onreadystatechange = function () {
			if (xhr.readyState === 1) {
			}
		}

		xhr.open(method, url, true)
		xhr.send()
	})
}
