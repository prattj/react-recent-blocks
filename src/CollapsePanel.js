import React from 'react'
import { Panel } from 'react-bootstrap'
import JSONPretty from 'react-json-pretty'
import _ from 'lodash'

export default function CollapsePanel({data}) {
  return _.map(data, (block) => {
    const { block_num, id, timestamp, action_cnt, raw } = block
    return (
      <Panel id={`collapsible-panel-${block_num}`} key={block_num}>
        <Panel.Heading>
          <Panel.Title toggle>
            {`timestamp: ${timestamp}`}<br />{`id: ${id}`}<br/>{`action_cnt: ${action_cnt}`}
          </Panel.Title>
        </Panel.Heading>
        <Panel.Collapse>
          <Panel.Body>
            <JSONPretty id={id} json={raw}></JSONPretty>
          </Panel.Body>
        </Panel.Collapse>
      </Panel>
    )
  })
}
