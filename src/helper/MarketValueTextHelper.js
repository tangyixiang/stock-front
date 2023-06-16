export function getText(key) {
  let text = ''
  if (key == 1) {
    text = '0~50亿'
  } else if (key == 2) {
    text = '50~100亿'
  } else if (key == 3) {
    text = '100~200亿'
  } else if (key == 4) {
    text = '200~500亿'
  } else if (key == 5) {
    text = '500~1000亿'
  } else if (key == 6) {
    text = '1000~5000亿'
  } else if (key == 7) {
    text = '5000亿以上'
  }
  return text
}
