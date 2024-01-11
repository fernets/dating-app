export function displayDate(data) {
  const date = new Date(data)
  const dateNow = new Date()
  const yearsDiff = dateNow.getFullYear() - date.getFullYear()

  if (yearsDiff === 0) {
    const daysDiff = dateNow.getDate() - date.getDate()

    if (daysDiff === 0) {
      const hoursDiff = dateNow.getHours() - date.getHours()

      if (hoursDiff === 0) {
        const minutesDiff = dateNow.getMinutes() - date.getMinutes()

        if (minutesDiff >= 0 && minutesDiff < 5) return '1 минуту назад'
        if (minutesDiff >= 5 && minutesDiff < 10) return '5 минут назад'
        if (minutesDiff >= 10 && minutesDiff < 30) {
          return '10 минут назад'
        }
        return '30 минут назад'
      }
      return `${doubleNumberDateFix(date.getHours())}:${doubleNumberDateFix(
        date.getMinutes()
      )}`
    }
    return `${date.getDate()} ${date.toLocaleString('default', {
      month: 'long'
    })}`
  }
  return date.getFullYear() + '.' + (date.getMonth() + 1) + '.' + date.getDate()
}

function doubleNumberDateFix(dateString) {
  return dateString.toString().length < 2 ? '0' + dateString : dateString
}

// export function displayDate(timestamp) {
//   const now = Date.now()
//   const diff = now - timestamp
//   const minute = 60 * 1000
//   const hour = 60 * minute
//   const day = 24 * hour
//   const week = 7 * day
//   const year = 365 * day

//   if (diff < minute) {
//     return 'только что'
//   } else if (diff < hour) {
//     const minutesAgo = Math.floor(diff / minute)
//     return `${minutesAgo} ${getMinutesDeclension(minutesAgo)} назад`
//   } else if (diff < day) {
//     const hoursAgo = Math.floor(diff / hour)
//     return `${hoursAgo} ${getHoursDeclension(hoursAgo)} назад`
//   } else if (diff < week) {
//     const daysAgo = Math.floor(diff / day)
//     return `${daysAgo} ${getDaysDeclension(daysAgo)} назад`
//   } else if (diff < year) {
//     return formatDate(timestamp, 'd MMMM в HH:mm')
//   } else {
//     return formatDate(timestamp, 'dd.MM.yyyy')
//   }
// }

// function formatDate(timestamp, format) {
//   const date = new Date(timestamp)
//   const locale = 'ru-RU'
//   return date.toLocaleString(locale, { dateStyle: 'long', timeStyle: 'short' })
// }

// function getMinutesDeclension(minutes) {
//   const lastDigit = Number(String(minutes).slice(-1))
//   if (lastDigit === 1) {
//     return 'минуту'
//   } else if (lastDigit >= 2 && lastDigit <= 4) {
//     return 'минуты'
//   } else {
//     return 'минут'
//   }
// }

// function getHoursDeclension(hours) {
//   const lastDigit = Number(String(hours).slice(-1))
//   if (lastDigit === 1) {
//     return 'час'
//   } else if (lastDigit >= 2 && lastDigit <= 4) {
//     return 'часа'
//   } else {
//     return 'часов'
//   }
// }

// function getDaysDeclension(days) {
//   const lastDigit = Number(String(days).slice(-1))
//   if (lastDigit === 1) {
//     return 'день'
//   } else if (lastDigit >= 2 && lastDigit <= 4) {
//     return 'дня'
//   } else {
//     return 'дней'
//   }
// }
