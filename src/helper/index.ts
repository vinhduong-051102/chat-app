const dotdotdot = (str: string, max: number) => {
  const strArr: Array<string> = str.split("")
  const len: number = strArr.length
  if(len > max) {
    const newStrArr: Array<string> = []
    for(let i = 0; i <= max; i++) {
      newStrArr.push(strArr[i])
    }
    newStrArr.push("...")
    const str = newStrArr.join("")
    return str
  }
  return str
}

export {dotdotdot}