import React, { Component } from 'react'
import { Button } from 'react-bootstrap'
import { v1 } from 'uuid'
import CollapsePanel from './CollapsePanel'
import './App.css'
import { HISTORY } from './constants'
import HeadBlockNum from './services/headBlockNum'
import BlockInfo from './services/blockInfo'

class App extends Component {
  _currentId = null

  state = {
    isLoading: false,
    blocks: [],
  }

  componentDidMount() {
    this.handleFetch()
  }

  componentWillUnmount() {
    this._currentId = null
  }

  handleFetch = () => {
    this.fetchRecentBlocks(v1())
  }

  fetchRecentBlocks = async (id) => {
    if (id !== this._currentId) {
      this._currentId = id
      this.setState({ isLoading: true })
      const blockNum = await HeadBlockNum()
      let blocks = []
      for (let blockId = blockNum; blockId > (blockNum-HISTORY); blockId--) {
        blocks.push(await BlockInfo(blockId))
      }
      if (this._currentId === id) {
        this.setState({ isLoading: false, blocks })
      }
    }
  }

  render() {
    const { isLoading, blocks } = this.state
    return (
      <div className="App">
        <Button id='load-button' children={`LOAD (${HISTORY})`}
            onClick={this.handleFetch} disabled={isLoading} />
        <hr />
        { !isLoading ? <CollapsePanel blocks={blocks} /> : <p>Loading...</p> }
      </div>
    )
  }
}

export default App
