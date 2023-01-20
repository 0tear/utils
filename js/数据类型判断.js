export default function DataTypeJugement(data) {
	let typeStr = Object.prototype.toString.call(data)
	let reg = /(?<=object\s)\w+/g
	let res = typeStr.match(reg)
	return res[0].toLowerCase()
}

console.log(DataTypeJugement(0))
console.log(DataTypeJugement({}))
console.log(DataTypeJugement(true))
console.log(DataTypeJugement(null))
console.log(DataTypeJugement(Symbol('foo')))
