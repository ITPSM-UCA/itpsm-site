/* eslint-disable prefer-template */
/* eslint-disable no-restricted-globals */

/**
 * Round number
 *
 *  @returns number
 */
const customRound = (value:any, decimals:any) => {
  const roundedNumber = parseFloat(value) + 'e' + decimals as any

  if (isNaN(Math.round(roundedNumber))) {
    return Number(Math.round(parseFloat(value)))
  }

  return Number(Math.round(roundedNumber) + 'e-' + decimals)
}

export default customRound
