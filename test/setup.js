import {jsdom} from 'jsdom'
import React from 'react'
import {expect} from 'chai'
import {mount,shallow} from 'enzyme'
import App from '../browser/components/App'
import ListItem from '../browser/components/ListItem'
import {todoList, newTodoList} from '../data/list'

const doc = jsdom('<!doctype html></html><body></body></html>')
global.document = doc
global.window = doc.defaultView
global.navigator = {
  userAgent: 'node.js'
}

export {
  React,
  expect,
  mount,
  shallow,
  App,
  ListItem,
  todoList,
  newTodoList
}
