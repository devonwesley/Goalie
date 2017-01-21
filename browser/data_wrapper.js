import React, {Component} from 'react'

class DataWrapper extends Component {
  getChildContext() {
    return {goals: this.props.goals}
  }

  render() {
    return this.props.children
  }
}

DataWrapper.childContextTypes = {
  goals: React.PropTypes.array.isRequired
}

export default DataWrapper
