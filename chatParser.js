function parse (chat) {
  const regExp = /(\d\d:\d\d:\d\d (.+?(?= : )) : (.+?(?=\.)).)/g
  const lines = chat.match(regExp)

  return lines.map(parseLine)
}

function parseLine (line) {
  const [mention, sentence] = line.split(' : ')
  const [date, type] = mention.split(/ (.+)?/, 2)

  return {
    'date': date,
    'mention': mention + ' : ',
    'sentence': sentence,
    'type': type.includes('Customer') || type.includes('Agent') ? type.toLowerCase() : type
  }
}

module.exports = parse