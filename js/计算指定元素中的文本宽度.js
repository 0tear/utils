export default function calculatingTextWidth(el) {
	// 1.接受一个element, 获取它的文本节点
	let child = Array.from(el.childNodes)
	let textNode = null
	child.some((item, index, arr) => {
		if (item.nodeType === 3) {
			textNode = item
			return true
		}
	})
	// 2.对这个文本节点得到1.文本字符串 2.文本样式(font-size weight) 3.文本字体样式
	const text = textNode.nodeValue
	const fontSize = getComputedStyle(el, null).getPropertyValue('font-size')
	const fontWeight = getComputedStyle(el, null).getPropertyValue('font-weight')
	const fontFamily = getComputedStyle(el, null).getPropertyValue('font-family')
	const idx = fontFamily.indexOf(' ') === -1 ? undefined : fontFamily.indexOf(' ') + 1
	let firstFontFamily = fontFamily.slice(0, idx)
	let cvs = document.createElement('canvas')
	if (cvs.getContext) {
		let ctx = cvs.getContext('2d')
		ctx.textAlign = 'start'
		// 注意fontweight值要写最前面
		ctx.font = fontWeight + ' ' + fontSize + ' ' + firstFontFamily
		const { width } = ctx.measureText(text)
		return width
	} else {
		return console.error('canvas.getContext()不存在')
	}
}
