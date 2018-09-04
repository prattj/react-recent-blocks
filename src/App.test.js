jest.mock('./services/blockInfo')
jest.mock('./services/headBlockNum')

import React from 'react'
import { shallow, mount } from 'enzyme'
import { Button } from 'react-bootstrap'
import CollapsePanel from './CollapsePanel'
import App from './App'

describe('App component', () => {

  it('should render', () => {
    const IS_LOADING = false
    const BLOCKS = [{ contains: 'data' }]
    const wrapper = shallow(<App />)
    wrapper.setState({ isLoading: IS_LOADING, blocks: BLOCKS })
    expect(wrapper.find(Button).props().disabled).toBe(IS_LOADING)
    expect(wrapper.find(CollapsePanel).props().blocks).toEqual(BLOCKS)
  })

  it('should render when loading', () => {
    const IS_LOADING = true
    const wrapper = shallow(<App />)
    wrapper.setState({ isLoading: IS_LOADING })
    expect(wrapper.find(Button).props().disabled).toBe(IS_LOADING)
    expect(wrapper.find('p').props().children).toEqual('Loading...')
    expect(wrapper.find(CollapsePanel).exists()).toBe(false)
  })

  it('test button click', () => {
    const wrapper = shallow(<App />)
    const spy = jest.spyOn(wrapper.instance(), 'fetchRecentBlocks')
    wrapper.find(Button).simulate('click')
    expect(spy).toHaveBeenCalledTimes(1)
  })

  it('componentWillUnmount should be called on unmount', async () => {
    const wrapper = mount(<App />)
    const spy = jest.spyOn(wrapper.instance(), 'componentWillUnmount')
    wrapper.unmount()
    expect(spy).toHaveBeenCalled()
  })
})
