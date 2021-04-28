function parse (chat) {
  const regExp = /(\d\d:\d\d:\d\d (Customer|Agent) : (.+?(?=\.)).)/g;
  const lines = chat.match(regExp)

  return lines.map(parseLine)
}

function parseLine (line) {
  const [mention, sentence] = line.split(' : ')
  const [date,] = mention.split(' ')

  return {
    'date': date,
    'mention': mention + ' : ',
    'sentence': sentence,
    'type': isCustomer(line) ? 'customer' : 'agent'
  }
}

function isCustomer (line) {
  return line.includes('Customer')
}

module.exports = parse