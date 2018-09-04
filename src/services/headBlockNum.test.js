jest.mock('./headBlockNum')

import headBlockNum from './headBlockNum'

it('returns head block number', async () => {
  expect.assertions(1)
  expect(await headBlockNum()).toEqual(10000002)
})