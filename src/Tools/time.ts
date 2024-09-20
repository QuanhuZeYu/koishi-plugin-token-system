import Data from "../Data/idnex"
import { timeObject } from "./interface/Type_time"

function getCurrentFormattedTime(): string {
    const now = new Date()

    const year = String(now.getFullYear()).slice(-2)    // 获取年后两位
    const month = String(now.getMonth() + 1).padStart(2, '0') // 月份从0开始，所以要+1
    const day = String(now.getDate()).padStart(2, '0')
    const hours = String(now.getHours()).padStart(2, '0')
    const minutes = String(now.getMinutes()).padStart(2, '0')
    const seconds = String(now.getSeconds()).padStart(2, '0')

    return `${year}-${month}-${day}-${hours}-${minutes}-${seconds}`
}

/**
 * 序列化时间字符串 YY-MM-DD-HH-MM-SS
 * @param timeString 
 */
function deserializeTimeString(timeString: string) {
    const debug = Data.Tools.debug
    const baseData = Data.baseData
    const { logger } = baseData
    const timeParts = timeString.match(/(\d{2})-(\d{2})-(\d{2})-(\d{2})-(\d{2})-(\d{2})/)

    if (!timeParts) {
        logger.warn('时间格式不正确，无法解析', timeString.trim().slice(0, 100))
    }
    const timeObj: timeObject = {
        year: parseInt(timeParts[1]),
        month: parseInt(timeParts[2]),
        day: parseInt(timeParts[3]),
        hour: parseInt(timeParts[4]),
        minute: parseInt(timeParts[5]),
        second: parseInt(timeParts[6])
    }
    return timeObj
}

/**
 * 判断A的时间是否小于B一天时间，函数忽略时分秒
 * @param A 
 * @param B 
 */
function isLessThanOneDay(A: string | timeObject, B: string | timeObject) {
    A = (typeof A === 'string' ? deserializeTimeString(A) : A)
    B = (typeof B === 'string' ? deserializeTimeString(B) : B)
    if (A.year < B.year) {
        return false
    } else if (A.month < B.month) {
        return false
    } else if (A.day > B.day) {
        return true
    } else if (A.day <= B.day) {
        return false
    }
    return false
}

const time = {
    getCurrentFormattedTime,
    deserializeTimeString,
    isLessThanOneDay
}

export default time