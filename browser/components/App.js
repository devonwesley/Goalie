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
      filterBy: 0
    }
  }

  filterGoal(goals) {
    const rows = []
    const { filterBy } = this.state

    const containsMilestone = title =>
      (title.replace('Level ', '').trim() === filterBy)

    const containsLabel = goal => {
      let found = false
      for(var i = 0; i < goal.labels.length; i++) {
        if (goal.labels[i].name === filterBy) {
          found = true
          break
        }
      }

      return found
    }

    const filteredGoals =  goals.filter(goal => {
      if (!filterBy) return true

      if (goal.milestone) {
        return containsMilestone(goal.milestone.title)
      } else if (goal.labels.length) {
        return containsLabel(goal)
      }
    })

    return filteredGoals
  }

  setRowGoals(goals) {
    const rows = []

    goals.forEach((goal, index) => {
      const row = Math.floor(index / 3)
      if (!rows[row]) rows[row] = []

      rows[row].push(<GoalPanel key={goal.id} goal={goal} />)
    })

    return rows.map((row, index) => <Row key={`row-${index}`}>{row}</Row>)
  }

  getLabels() {
    return fetchMethod(
      'GET',
      `/api/v1/goals/all_labels`,
      null,
      (labels) => this.setState({labels: JSON.parse(labels)})
    )
  }

  getMilestones() {
    return fetchMethod(
      'GET',
      `/api/v1/goals/all_milestones`,
      null,
      (milestones) => this.setState({milestones: JSON.parse(milestones)})
    )
  }

  componentDidMount() {
    this.getLabels()
    this.getMilestones()
  }

  renderMilestones() {
    const { milestones } = this.state

    return milestones.map((milestones, index) =>
      <Button
        key={`${milestones.title}-${index}`}
        color="primary"
        onClick={() =>
          this.setState({
            filterBy: milestones.title.replace('Level ', '').trim()
          })
        }>
        {milestones.title}
      </Button>
    )
  }

  renderLabels() {
    const { labels } = this.state

    return labels.map((label, index) =>
      <Button
        key={`${label.name}-${index}`}
        style={{backgroundColor: `#${label.color}`}}
        onClick={() => this.setState({filterBy: label.name})}>
        {label.name}
      </Button>
    )
  }

  render() {
    const { goals, filterBy } = this.state
    const currentGoalsState = !filterBy ? goals : this.filterGoal(goals)

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
          <div>{this.setRowGoals( currentGoalsState )}</div>
        </Container>
      </div>
  }
}
