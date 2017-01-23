import React, {Component} from 'react'
import GoalPanel from './GoalPanel'
import {Appbar} from 'muicss/react'
import Container from 'muicss/lib/react/container'
import Row from 'muicss/lib/react/row'
import fetchMethod from './fetch_method'
import Panel from 'muicss/lib/react/panel'
import Button from 'muicss/lib/react/button'
import Col from 'muicss/lib/react/col'

export default class App extends Component {
  constructor(props){
    super(props)

    this.state = {
      goals: props.routes[0].goals ? props.routes[0].goals : [],
      labels: [],
      milestones: [],
      filterBy: null
    }
  }

  getLabels() {
    const url = `/api/v1/goals/all_labels`
    const callback = labels => this.setState({labels: JSON.parse(labels)})

    return fetchMethod('GET', url, null, callback)
  }

  getMilestones() {
    const url = `/api/v1/goals/all_milestones`
    const callback = milestones => this.setState({milestones: JSON.parse(milestones)})

    return fetchMethod('GET', url, null, callback)
  }

  componentDidMount() {
    this.getLabels()
    this.getMilestones()
  }

  renderMilestones() {
    const milestones = this.state.milestones

    return milestones.map((milestones, index) =>
      <Button
        key={`${milestones.title}-${index}`}
        color="primary"
        onClick={() => this.setState({filterBy: milestones.title})}>
        {milestones.title}
      </Button>
    )
  }

  renderLabels() {
    const labels = this.state.labels

    return labels.map((label, index) =>
      <Button
        key={`${label.name}-${index}`}
        style={{backgroundColor: `#${label.color}`}}
        onClick={() => this.setState({filterBy: label.name})}>
        {label.name}
      </Button>
    )
  }

  renderGoals() {
    const rows = []
    const goals = this.state.goals
    const filterBy = this.state.filterBy

    const levelFileterdGoals = goals.filter(goal => {
      if (!filterBy) return true

      if (goal.milestone) {
        return goal.milestone.title === filterBy ? true : false
      } else if (goal.labels.length) {
        for (let i = 0; i < goal.labels.length; i++) {
          if (goal.labels[i].name === filterBy) {
            return true
          }
        }
      }
    })

    levelFileterdGoals.forEach((goal, index) => {
      const row = Math.floor(index / 3)
      if (!rows[row]) rows[row] = []

      rows[row].push(<GoalPanel key={index} goal={goal} />)
    })

    return rows.map((row, index) => <Row key={`row-${index}`}>{row}</Row>)
  }

  render() {
    return <div>
        <Appbar></Appbar>
        <br/>
        <Container>
          <Row>
            <Panel>
              Filter By:
              <Container>
                <Button
                  color="primary"
                  onClick={() => this.setState({filterBy: null})}>
                  All
                </Button>
                {this.renderLabels()}
                {this.renderMilestones()}
              </Container>
            </Panel>
          </Row>
          <Row>{this.renderGoals()}</Row>
        </Container>
      </div>
  }
}
