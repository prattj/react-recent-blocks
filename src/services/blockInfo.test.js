jest.mock('./blockInfo')

import blockInfo from './blockInfo'

it('returns block info', async () => {
  const EXPECTED_VALUE = {
    action_cnt: '2',
    block_num: 10000002,
    id: 'uuid-2',
    raw: { id: 'uuid-2', more: 'fields' },
    timestamp: 'more-timestamp',
  }
  expect.assertions(1)
  expect(await blockInfo('10000002')).toEqual(EXPECTED_VALUE)
})