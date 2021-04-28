const parse = require('./chatParser')

describe('chat parser tests', () => {
  describe('Step 1 (single sentence)', () => {
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

  test('Step 2 (two sentences)', () => {
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

  test('Step 3 (two customer mentions as start)', () => {
    const input = '14:24:32 Customer : Lorem ipsum dolor sit amet, consectetur adipiscing elit.\n' +
      '14:27:00 Customer : Pellentesque cursus maximus felis, pharetra porta purus aliquet viverra.\n' +
      '14:27:47 Agent : Vestibulum tempor diam eu leo molestie eleifend.\n' +
      '14:28:28 Customer : Contrary to popular belief, Lorem Ipsum is not simply random text.'
    const expectedOutput = [{
      date: '14:24:32',
      mention: '14:24:32 Customer : ',
      sentence: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      type: 'customer'
    }, {
      date: '14:27:00',
      mention: '14:27:00 Customer : ',
      sentence: 'Pellentesque cursus maximus felis, pharetra porta purus aliquet viverra.',
      type: 'customer'
    }, {
      date: '14:27:47',
      mention: '14:27:47 Agent : ',
      sentence: 'Vestibulum tempor diam eu leo molestie eleifend.',
      type: 'agent'
    }, {
      date: '14:28:28',
      mention: '14:28:28 Customer : ',
      sentence: 'Contrary to popular belief, Lorem Ipsum is not simply random text.',
      type: 'customer'
    }]

    expect(parse(input)).toEqual(expectedOutput)
  })

  test('Step 4 (date splitting)', () => {
    const input = '14:24:32 Customer : Lorem ipsum dolor sit amet, consectetur adipiscing elit.14:26:15 Agent : Aliquam non cursus erat, ut blandit lectus.'
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