/**
 * 时间戳转为多久之前
 * @param String timestamp 时间戳
 * @param String | Boolean format 如果为时间格式字符串，超出一定时间范围，返回固定的时间格式；
 * 如果为布尔值false，无论什么时间，都返回多久以前的格式
 */
function timeFrom(dateInfo = null, format: string | boolean = 'yyyy-mm-dd') {
  let dateTime
  // 如果为null,则格式化当前时间
  if (!dateInfo)
    dateTime = Number(new Date())
  else dateTime = new Date(dateInfo).getTime()
  // 如果dateTime长度为10或者13，则为秒和毫秒的时间戳，如果超过13位，则为其他的时间格式
  if (dateTime.toString().length === 10)
    dateTime *= 1000
  const timestamp = +new Date(Number(dateTime))
  const timer = (Number(new Date()) - timestamp) / 1000
  // 如果小于5分钟,则返回"刚刚",其他以此类推
  let tips = ''
  switch (true) {
    case timer < 300:
      tips = '刚刚'
      break
    case timer >= 300 && timer < 3600:
      tips = `${parseInt((timer / 60).toString())}分钟前`
      break
    case timer >= 3600 && timer < 86400:
      tips = `${parseInt((timer / 3600).toString())}小时前`
      break
    case timer >= 86400 && timer < 2592000:
      tips = `${parseInt((timer / 86400).toString())}天前`
      break
    default:
      // 如果format为false，则无论什么时间戳，都显示xx之前
      if (format === false) {
        if (timer >= 2592000 && timer < 365 * 86400)
          tips = `${parseInt((timer / (86400 * 30)).toString())}个月前`
        else tips = `${parseInt((timer / (86400 * 365)).toString())}年前`
      }
      else {
        tips = dateInfo
      }
  }
  return tips
}

export default timeFrom
