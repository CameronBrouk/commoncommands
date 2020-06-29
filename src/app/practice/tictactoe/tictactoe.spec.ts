import * as T from './tictactoe'
test('update board', () => {
  expect(
    T.updateBoard(
      2,
      'x',
    )([
      ['1', '2', '3'],
      ['4', '5', '6'],
      ['7', '8', '9'],
    ]),
  ).toEqual([
    ['1', 'x', '3'],
    ['4', '5', '6'],
    ['7', '8', '9'],
  ])

  expect(
    T.updateBoard(
      8,
      'o',
    )([
      ['1', 'x', '3'],
      ['4', '5', '6'],
      ['7', '8', '9'],
    ]),
  ).toEqual([
    ['1', 'x', '3'],
    ['4', '5', '6'],
    ['7', 'o', '9'],
  ])
})

test('is vertical victory', () => {
  expect(
    T.isVictory([
      ['1', 'x', '3'],
      ['4', 'x', '6'],
      ['7', 'x', '9'],
    ]),
  ).toEqual(true)
})
test('is horizontal victory', () => {
  expect(
    T.isVictory([
      ['x', 'x', 'x'],
      ['4', '5', '6'],
      ['7', '8', '9'],
    ]),
  ).toEqual(true)

  expect(
    T.isVictory([
      ['o', 'o', ''],
      ['4', '5', '6'],
      ['7', '8', '9'],
    ]),
  ).toEqual(false)
})

test('is diaganol victory', () => {
  expect(
    T.isVictory([
      ['1', '2', 'x'],
      ['4', 'x', '6'],
      ['x', '8', '9'],
    ]),
  ).toEqual(true)

  expect(
    T.isVictory([
      ['o', '2', 'x'],
      ['4', 'o', '6'],
      ['x', '8', 'o'],
    ]),
  ).toEqual(true)
})
