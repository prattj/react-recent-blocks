const fakeData = {
  10000002: {
    action_cnt: '2',
    block_num: 10000002,
    id: 'uuid-2',
    raw: {
      id: 'uuid-2',
      more: 'fields',
    },
    timestamp: 'more-timestamp',
  },
  10000001: {
    action_cnt: '1',
    block_num: 10000001,
    id: 'uuid-1',
    raw: {
      id: 'uuid-1',
      more: 'fields',
    },
    timestamp: 'some-timestamp',
  },
}

export default async (id) => {
  return await new Promise(resolve => {
    process.nextTick(() => resolve(fakeData[id]))
  })
}