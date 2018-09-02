const fakeData = 10000002

export default async () => {
  return await new Promise(resolve => {
    process.nextTick(() => resolve(fakeData))
  })
}