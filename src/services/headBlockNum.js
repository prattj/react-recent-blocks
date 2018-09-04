import EosApi from 'eosjs-api'
import { CONFIG } from '../constants'

export default async () => {
  const eos = EosApi(CONFIG)
  return (await eos.getInfo({})).head_block_num
}
