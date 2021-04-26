const parse = require('./chatParser')

describe('parse single sentence', () => {
  test('with customer', () => {
    const input = '14:24:32 Customer : Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
    const expectedOutput = [{
      date: '14:24:32',
      mention: '14:24:32 Customer : ',
      sentence: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      type: 'customer'
    }]

    expect(parse(input)).toEqual(expectedOutput)
  })

  test('with agent', () => {
    const input = '14:24:32 Agent : Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
    const expectedOutput = [{
      date: '14:24:32',
      mention: '14:24:32 Agent : ',
      sentence: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      type: 'agent'
    }]

    expect(parse(input)).toEqual(expectedOutput)
  })
})