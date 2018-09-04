import EosApi from 'eosjs-api'
import _ from 'lodash'
import { CONFIG, FIELDS } from '../constants'

export default async (id) => {
  const eos = EosApi(CONFIG)
  const block = await eos.getBlock(id)
  return {
    ...(_.pick(block, FIELDS)),
    action_cnt: _.size(block.transactions),
    raw: block,
  }
}
