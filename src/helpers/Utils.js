import {
  defaultColor,
  defaultDirection,
  defaultLocale,
  localeOptions,
  themeColorStorageKey,
  themeRadiusStorageKey,
} from 'defines'

export const mapOrder = (array, order, key) => {
  array.sort(function (a, b) {
    const A = a[key]
    const B = b[key]
    if (order.indexOf(`${A}`) > order.indexOf(`${B}`)) {
      return 1
    }
    return -1
  })
  return array
}

export const getDateWithFormat = () => {
  const today = new Date()
  let dd = today.getDate()
  let mm = today.getMonth() + 1 // January is 0!

  const yyyy = today.getFullYear()
  if (dd < 10) {
    dd = `0${dd}`
  }
  if (mm < 10) {
    mm = `0${mm}`
  }
  return `${dd}.${mm}.${yyyy}`
}

export const getCurrentTime = () => {
  const now = new Date()
  return `${now.getHours()}:${now.getMinutes()}`
}

export const getDirection = () => {
  let direction = defaultDirection

  try {
    if (localStorage.getItem('direction')) {
      const localValue = localStorage.getItem('direction')
      if (localValue === 'rtl' || localValue === 'ltr') {
        direction = localValue
      }
    }
  } catch (error) {
    console.log('>>>>: src/helpers/Utils.js : getDirection -> error', error)
    direction = defaultDirection
  }
  return {
    direction,
    isRtl: direction === 'rtl',
  }
}
export const setDirection = (localValue) => {
  let direction = 'ltr'
  if (localValue === 'rtl' || localValue === 'ltr') {
    direction = localValue
  }
  try {
    localStorage.setItem('direction', direction)
  } catch (error) {
    console.log('>>>>: src/helpers/Utils.js : setDirection -> error', error)
  }
}

export const getCurrentColor = () => {
  let currentColor = defaultColor
  try {
    if (localStorage.getItem(themeColorStorageKey)) {
      currentColor = localStorage.getItem(themeColorStorageKey)
    }
  } catch (error) {
    console.log('>>>>: src/helpers/Utils.js : getCurrentColor -> error', error)
    currentColor = defaultColor
  }
  return currentColor
}

export const setCurrentColor = (color) => {
  try {
    localStorage.setItem(themeColorStorageKey, color)
  } catch (error) {
    console.log('>>>>: src/helpers/Utils.js : setCurrentColor -> error', error)
  }
}

export const getCurrentRadius = () => {
  let currentRadius = 'rounded'
  try {
    if (localStorage.getItem(themeRadiusStorageKey)) {
      currentRadius = localStorage.getItem(themeRadiusStorageKey)
    }
  } catch (error) {
    console.log('>>>>: src/helpers/Utils.js : getCurrentRadius -> error', error)
    currentRadius = 'rounded'
  }
  return currentRadius
}
export const setCurrentRadius = (radius) => {
  try {
    localStorage.setItem(themeRadiusStorageKey, radius)
  } catch (error) {
    console.log('>>>>: src/helpers/Utils.js : setCurrentRadius -> error', error)
  }
}

export const getCurrentLanguage = () => {
  let language = defaultLocale
  try {
    if (window.localStorage && window.localStorage.getItem('currentLanguage')) {
      language =
        localStorage.getItem('currentLanguage') &&
        localeOptions.filter(
          (x) => x.id === localStorage.getItem('currentLanguage')
        ).length > 0
          ? localStorage.getItem('currentLanguage')
          : defaultLocale
    }
  } catch (error) {
    console.log(
      '>>>>: src/helpers/Utils.js : getCurrentLanguage -> error',
      error
    )
    language = defaultLocale
  }
  return language
}

export const setCurrentLanguage = (locale) => {
  try {
    localStorage.setItem('currentLanguage', locale)
  } catch (error) {
    console.log(
      '>>>>: src/helpers/Utils.js : setCurrentLanguage -> error',
      error
    )
  }
}

export const getCurrentUser = () => {
  let user = null
  try {
    user = null
  } catch (error) {
    console.log('>>>>: src/helpers/Utils.js  : getCurrentUser -> error', error)
    user = null
  }
  return user
}

export const setCurrentUser = (user) => {
  try {
    if (user) {
      console.log('user', user)
      localStorage.setItem('@current_user', JSON.stringify(user))
      localStorage.setItem('@token', user.token)
    } else {
      localStorage.removeItem('@current_user')
      localStorage.removeItem('@token')
    }
  } catch (error) {
    console.log('>>>>: src/helpers/Utils.js : setCurrentUser -> error', error)
  }
}

export const getBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => resolve(reader.result)
    reader.onerror = (error) => reject(error)
  })
}

export const toCurrency = (number) => {
  // return new Intl.NumberFormat('en-US', {
  //   style: 'currency',
  //   currency: 'VND',
  //   minimumFractionDigits: 0
  // }).format(number)
  return number
    ? number.toLocaleString('vi-VN', {
        style: 'currency',
        currency: 'VND',
      })
    : ''
};

export const RatePoint1 = 1;
export const RatePoint2 = 2;
export const RatePoint3 = 3;
export const RatePoint4 = 4;
export const RatePoint5 = 5;


export const makeCategoryQuestion = (listQuestion) => {
  const listNew = {};
  if(listQuestion?.result_map){
    Object.values(listQuestion?.result_map) && Object.values(listQuestion?.result_map).map((item, key) => {
      if (listNew[item?.survey_question_categories_info.id]) {
        listNew[item?.survey_question_categories_info.id].result_rate.push(item);
      } else {
        item.survey_question_categories_info.result_rate = [];
        item.survey_question_categories_info.result_rate.push(item);
        listNew[item?.survey_question_categories_info.id] = item?.survey_question_categories_info;
      }
    });
  }
  return listNew
};

export const makeCategoryQuestionRange = (listQuestion) => {
  const listNew = {};
  if(listQuestion?.result_map) {
    Object.values(listQuestion?.result_map).map((item, key) => {
      if(listNew[item?.id]){
        delete item.result_rate;
        listNew[item?.id].result_rate.push({
          rate_1: item?.rate_1,
          rate_2: item?.rate_2,
          rate_3: item?.rate_3,
          rate_4: item?.rate_4,
          rate_5: item?.rate_5,
          rate_empty: item?.rate_empty,
          second_rate_1: item?.second_rate_1,
          second_rate_2: item?.second_rate_2,
          second_rate_3: item?.second_rate_3,
          second_rate_4: item?.second_rate_4,
          second_rate_5: item?.second_rate_5,
          second_rate_empty: item?.second_rate_empty,
        });
      } else {
        item.result_rate = [];
        item.result_rate.push({
          rate_1: item?.rate_1,
          rate_2: item?.rate_2,
          rate_3: item?.rate_3,
          rate_4: item?.rate_4,
          rate_5: item?.rate_5,
          rate_empty: item?.rate_empty,
          second_rate_1: item?.second_rate_1,
          second_rate_2: item?.second_rate_2,
          second_rate_3: item?.second_rate_3,
          second_rate_4: item?.second_rate_4,
          second_rate_5: item?.second_rate_5,
          second_rate_empty: item?.second_rate_empty,
        });
        listNew[item?.id] = {
          id: item?.id,
          option: item?.option,
          result_rate: item?.result_rate
        };
      }
    });
  }

  return listNew
};

// export const rateTotal = (item) => {
//   item.totalRate = item?.rate_1 + item?.rate_2 + item?.rate_3 + item?.rate_4 + item?.rate_5;
//   item.totalRate1 = item?.rate_1 * RatePoint1;
//   item.totalRate2 = item?.rate_2 * RatePoint2;
//   item.totalRate3 = item?.rate_3 * RatePoint3;
//   item.totalRate4 = item?.rate_4 * RatePoint4;
//   item.totalRate5 = item?.rate_5 * RatePoint5;
//   item.totalRatePointAll = totalRate1 + totalRate2 + totalRate3 + totalRate4 + totalRate5;
//   return makeRate
// };