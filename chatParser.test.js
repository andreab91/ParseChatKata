const parse = require('./chatParser')

describe('chat parser tests', () => {
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

  test('parse two sentences', () => {
    const input = '14:24:32 Customer : Lorem ipsum dolor sit amet, consectetur adipiscing elit.\n' +
      '14:26:15 Agent : Aliquam non cursus erat, ut blandit lectus.'
    const expectedOutput = [{
      date: '14:24:32',
      mention: '14:24:32 Customer : ',
      sentence: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      type: 'customer'
    }, {
      date: '14:26:15',
      mention: '14:26:15 Agent : ',
      sentence: 'Aliquam non cursus erat, ut blandit lectus.',
      type: 'agent'
    }]

    expect(parse(input)).toEqual(expectedOutput)
  })
})