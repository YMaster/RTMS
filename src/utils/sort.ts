export const sortByUnicode = (a: string, b: string) => {
  if (!b) {
    return 1
  }
  const strA = a || ''
  const strB = b || ''
  let res = 0
  for (let i = 0; i < strB.length; i++) {
    const charA = strA[i]
    const charB = strB[i]
    if (!charA) {
      res = -1
      break;
    }
    if (charA.codePointAt(0)! > charB.codePointAt(0)!) {
      res = 1
      break
    } else if (charA.codePointAt(0)! < charB.codePointAt(0)!) {
      res = -1
      break
    }
  }
  return res
}