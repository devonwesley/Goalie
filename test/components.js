import {
  React,
  expect,
  mount,
  shallow,
  App,
  ListItem,
  todoList,
  newTodoList
} from './setup'

describe('Testing React components', () => {
  describe('<App /> render', function() {
    it('checks if elements in App component render', () => {
      const wrapper = mount(<App todoList={todoList} />)
      expect(wrapper.find('ul')).to.have.length(1)
      expect(wrapper.find('li')).to.have.length(3)
      expect(wrapper.find('div')).to.have.length(4)
      expect(wrapper.find(ListItem)).to.have.length(3)
    })
  })
  describe('<App /> event', () => {
    it('tests setting props', () => {
      const wrapper = mount(<App todoList={todoList} />)
      expect(wrapper.props().todoList).to.be.defined
      expect(wrapper.props().todoList).to.eql(todoList)
      wrapper.setProps({todoList: newTodoList})
      expect(wrapper.props().todoList).to.eql(newTodoList)
    })
  })
  describe('<ListItem /> render', function() {
    it('should render elements', () => {
      const wrapper = mount(<ListItem item={newTodoList[0]} />)
      expect(wrapper.find('li')).to.have.length(1)
      expect(wrapper.find('button')).to.have.length(1)
      expect(wrapper.find('div')).to.have.length(1)
    })
  })
  describe('<ListItem /> event', () => {
    it('simulate a click event', () => {
      const wrapper = mount(<ListItem item={newTodoList[0]} />)
      wrapper.find('button').simulate('click')
      expect(wrapper.state().item).to.eql('New Text')
    })
  })
})
