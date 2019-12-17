
const range = (start, stop, step = 1) => {
    return Array(Math.ceil((stop - start) / step)).fill(start).map((x, y) => x + y * step)
  }

  const doesRepeat = (number) => {
      const strNum = number.toString()
      const arrNum = strNum.split("")
      let repeats = false
      arrNum.map((c,i) => {
          if (i == 0)
              return c
          const reg = new RegExp(c,'g')
          const matches = strNum.match(reg)
          if (matches.length == 2)
              repeats = true
      })
      return repeats
  }

  const doesDescrease = (number) => {

      const strNum = number.toString().split("")
      let decreases = false
      strNum.map((c, i) => {

          if (i === 0)
              return c

          if (parseInt(c) < parseInt(strNum[i-1]))
              decreases = true

          return c
      })

      return decreases
  }

  const findNumber = (numbers) => {
      return numbers.filter(number => {
          const repeats = doesRepeat(number)
          const noDecrease = doesDescrease(number)
          return repeats && !noDecrease
      }).length
  }
  console.log(findNumber(range(136818,685979,1)))