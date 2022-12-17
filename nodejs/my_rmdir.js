/*
 * @Author: donglei 2116815040@qq.com
 * @Date: 2022-10-04 16:36:04
 * @LastEditors: donglei 2116815040@qq.com
 * @LastEditTime: 2022-10-10 11:55:38
 * @FilePath: \utils\nodejs\my_rmdir.js
 * @Description: 用于执行异步清空指定文件夹内的文件,并最后删除空文件夹的函数
 * @example:
 *  import my_rmdir from './my_rmdir'
 *  my_rmdir('相对路径目录名')
 *
 */
import { resolve, dirname, join } from 'path'
import { fileURLToPath } from 'url'
import { readdir, unlink, rmdir, stat } from 'fs/promises'

export default async function my_rmdir(dn) {
	const __filename = fileURLToPath(import.meta.url)
	const __dirname = dirname(__filename)
	// 读取指定文件夹下的文件/目录信息
	console.log('读取文件夹' + dn)
	const aFile = await readdir(resolve(__dirname, dn))
	let arr = []

	for (let name of aFile) {
		// 如果使用forEach,那么stat必须是同步的, 否则跳出foreach的回调直接调用promise.all
		let path = resolve(__dirname, dn, name)
		const result = await chkFileOrDir(path)
		if (result.code === 1) {
			return console.log('文件地址不存在')
		} else if (result.isFile) {
			// 是文件
			console.log('进行异步删除文件' + name)
			arr.push(unlink(path))
		} else {
			// 是目录
			let newDirPath = join(dn, name)
			console.log('发现文件夹: ' + newDirPath + '进入遍历文件')
			arr.push(my_rmdir(newDirPath))
		}
	}

	await Promise.all(arr)
	let dirPath = resolve(__dirname, dn)
	console.log('正在删除' + dirPath)
	return rmdir(dirPath)
}

async function chkFileOrDir(path) {
	const result = await stat(path).catch(err => err)
	if (result.code === 'ENOENT') {
		return { code: 1 }
	}
	return { code: 0, isFile: result.isFile() }
}
