import React, { Component } from 'react';
import { Button } from 'react-bootstrap'
import _ from 'lodash'
import JSONPretty from 'react-json-pretty'
// import { EosApi } from 'eosjs-api'
import './App.css';

const CONFIG = {
  httpEndpoint: 'https://api.eosnewyork.io',
  chainId: 'aca376f206b8fc25a6ed44dbdc66547c36c6c33e3a119ffbeaef943642f0e906',
}
const HISTORY = 2
const FIELDS = [
  'block_num',
  'id',
  'producer',
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
      const block = _.pick(await eos.getBlock(i), FIELDS)
      // const block = await eos.getBlock(i)
      recent.push({ ...block, actionCnt: _.size(block.transactions) })
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
          LOAD
        </Button>
        <p>{`Block HISTORY list length : ${HISTORY}`}</p>
        { headBlockNum && <p>Most recent block: {headBlockNum}</p> }
        { !_.isEmpty(recent) && <JSONPretty id="on-load" json={recent}></JSONPretty> }
      </div>
    );
  }
}

export default App;
