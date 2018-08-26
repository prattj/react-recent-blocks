import React from 'react'
import { Panel } from 'react-bootstrap'
import JSONPretty from 'react-json-pretty'
import _ from 'lodash'

function makePanels(data) {
  const { block_num, id, timestamp, action_cnt } = data
  return (
    <Panel id={`collapsible-panel-${block_num}`}>
      <Panel.Heading>
        <Panel.Title toggle>
          {`timestamp: ${timestamp}`}<br />{`id: ${id}`}<br/>{`action_cnt: ${action_cnt}`}
        </Panel.Title>
      </Panel.Heading>
      <Panel.Collapse>
        <Panel.Body>
          <JSONPretty id={id} json={data}></JSONPretty>
        </Panel.Body>
      </Panel.Collapse>
    </Panel>
  )
}

export default function CollapsePanel({data}) {
  return _.map(data, makePanels)
}
