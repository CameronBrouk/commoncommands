import pipe from 'lodash/fp/flow'
import * as R from 'ramda'

// Tic Tac Toe in Command Line
export const ticTacToe = (player: 'x' | 'o', board: string[][]) => {
  const newBoard = updateBoard(promptForNumber(), player)(board)
  if (isVictory(newBoard)) return `${player} wins!`
  ticTacToe(otherPlayer(player), newBoard)
}

export const updateBoard = (spaceNumber: number, player: 'o' | 'x') =>
  pipe(
    R.flatten,
    R.map((space: string) =>
      parseInt(space) === spaceNumber ? player : space,
    ),
    R.splitEvery(3),
  )

export const isVictory = (board: string[][]) => {
  const [row1, row2, row3] = board
  return [0, 1, 2].reduce((acc: boolean, curr) => {
    const currentRow = board[curr]
    if (isEqual(currentRow[0], currentRow[1], currentRow[2])) return true // Horizontal Victory
    if (isEqual(row1[curr], row2[curr], row3[curr])) return true // Vertical Victory
    if (isEqual(row1[0], row2[1], row3[2])) return true // Diagonal Victory
    if (isEqual(row1[2], row2[1], row3[0])) return true // Diagonal Victory
    return acc
  }, false)
}

export const promptForNumber = (): number => 1 // placeholder function
export const otherPlayer = (player: 'x' | 'o') => (player === 'x' ? 'o' : 'x')

export const isEqual = (spot1: string, spot2: string, spot3: string) =>
  R.equals(spot1, spot2) && R.equals(spot2, spot3)
