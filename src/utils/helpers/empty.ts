/* eslint-disable no-unreachable-loop */
/* eslint-disable guard-for-in */
/* eslint-disable no-restricted-syntax */
/* eslint-disable consistent-return */

/**
 * JavaScript equivalent to PHP's empty
 *
 * @param mixed mixedVar
 *
 * @returns boolean
 * example 1: empty(null);
 * returns 1: true
 * example 2: empty(undefined);
 * returns 2: true
 * example 3: empty([]);
 * returns 3: true
 * example 4: empty({});
 * returns 4: true
 * example 5: empty({'aFunc' : function () { alert('humpty'); } });
 * returns 5: false
 */
const empty = (mixedVar: any) => {
  const emptyValues = [
    undefined,
    null,
    false,
    0,
    '',
    '0',
    '0.0',
    '0.00',
    '0.000',
    '0.0000',
    '0.00000',
    '0.000000',
  ]

  emptyValues.forEach((element:any) => {
    if (mixedVar === element) {
      return true
    }
  });

  if (typeof mixedVar === 'object') {
    for (const key in mixedVar) {
      return false
    }

    return true
  }

  return false
}

export default empty
