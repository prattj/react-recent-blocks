import React from 'react'
import { shallow } from 'enzyme'
import { Panel } from 'react-bootstrap'
import JSONPretty from 'react-json-pretty'
import CollapsePanel from './CollapsePanel'

describe('CollapsePanel component', () => {
  const ACTION_CNT = '3'
  const BLOCK_NUM = 'some-number'
  const ID = 'UUID'
  const RAW = {
    id: ID,
    lots: 'of',
    other: 'fields',
  }
  const TIMESTAMP = 'some-timestamp'

  let props

  beforeEach(() => {
    props = {
      blocks: [
        {
          action_cnt: ACTION_CNT,
          block_num: BLOCK_NUM,
          id: ID,
          raw: RAW,
          timestamp: TIMESTAMP,
        }
      ]
    }
  })

  it('should render', () => {
    const wrapper = shallow(<CollapsePanel {...props} />)
    const panel = wrapper.find(Panel)
    expect(panel.props().id).toEqual(`collapsible-panel-${BLOCK_NUM}`)
    expect(panel.find(Panel.Title).props().children).toEqual(
      [`id: ${ID}`, <br/>, `timestamp: ${TIMESTAMP}`, <br />, `action_cnt: ${ACTION_CNT}`]
    )
    expect(panel.find(Panel.Body).find(JSONPretty).props()).toEqual({ id: ID, json: RAW })
  })

  it('should not render', () => {
    props.blocks = []
    const wrapper = shallow(<CollapsePanel {...props} />)
    expect(wrapper.exists()).toBe(false)
  })

})
