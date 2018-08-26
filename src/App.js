import React, { Component } from 'react'
import { Button } from 'react-bootstrap'
import _ from 'lodash'
// import { EosApi } from 'eosjs-api'
import './App.css';
import CollapsePanel from './CollapsePanel'

const CONFIG = {
  httpEndpoint: 'https://api.eosnewyork.io',
  chainId: 'aca376f206b8fc25a6ed44dbdc66547c36c6c33e3a119ffbeaef943642f0e906',
}
const HISTORY = 2
const FIELDS = [
  'block_num',
  'id',
  'timestamp',
]

class App extends Component {
  constructor() {
    super()
    this.state = {
      headBlockNum: null,
      recent: [],
    }
  }

  async getMostRecentBlocks() {
    const recent = []
    const EosApi = require('eosjs-api')
    const eos = EosApi(CONFIG)
    // NOTE: getInfo() - Fetch most recent block from the blockchain
    const headBlockNum = (await eos.getInfo({})).head_block_num
    for (let i = headBlockNum; i > (headBlockNum-HISTORY); i--) {
      // NOTE: getBlock() - Fetch a (single) block from the blockchain
      const block = await eos.getBlock(i)
      recent.push({
        ...(_.pick(block, FIELDS)),
        action_cnt: _.size(block.transactions),
        raw: block,
      })
    }
    this.setState({ recent, headBlockNum })
  }

  async componentDidMount() {
    this.getMostRecentBlocks()
  }

  handleClick = async () => {
    this.getMostRecentBlocks()
  }

  render() {
    const { recent, headBlockNum } = this.state
    return (
      <div className="App">
        <h1>React Application to pull the most recent blocks</h1>
        <ul>
          <li>Page should update with the click of a “LOAD” button.  We should only show 10 most recent blocks, older blocks should dropped from the list when you hit load again.</li>
          <li>Block list entries should show the hash of the block (this is the id), it’s timestamp, and the count of actions included in that block (this will typically be 0)</li>
          <li>Clicking a block entry should expand that line to show the raw contents of the block output.</li>
        </ul>
        <hr />

        <Button id='load-button' onClick={this.handleClick}>
          {`LOAD (${HISTORY})`}
        </Button>
        { headBlockNum && ` -- Most recent block: ${headBlockNum}` }
        <CollapsePanel data={recent} />
      </div>
    )
  }
}

export default App;
