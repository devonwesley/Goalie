import React, {Component} from 'react'
import Col from 'muicss/lib/react/col'
import Panel from 'muicss/lib/react/panel'
import Button from 'muicss/lib/react/button'
import Container from 'muicss/lib/react/container'
import mui from 'muicss'
import GoalDetails from './GoalDetails'
import Modal from 'react-modal'

export default class GoalsGrid extends Component {
  constructor(props){
    super(props)
    this.state = {
      goal: props.goal,
      modalIsOpen: false
    }
  }

  mapLabels() {
    const goalLabels = this.state.goal.labels

    return goalLabels.map((label, index) =>
      <Button key={index} style={{backgroundColor: `#${label.color}`}}>{label.name}</Button>
    )
  }

  openModal() {
    this.setState({modalIsOpen: true})
  }

  closeModal() {
    this.setState({modalIsOpen: false})
  }

  render() {
    const goal = this.state.goal
    const modalStyles = {
      width: '1000px',
      height: '800px',
      margin: '100px auto',
      backgroundColor: '#fff'
    }

    return <div>
        <Modal
          style={modalStyles}
          isOpen={this.state.modalIsOpen}
          onRequestClose={() => this.closeModal()}
          contentLabel="Example Modal"
        >
        <GoalDetails closeModal={() => this.closeModal()} goal={this.state.goal}/>
      </Modal>
      <Col md="4">
        <Panel>
          <div className="mui--text-center">
            <div className="mui--text-display5">
              <strong>{goal.title} #{goal.number}</strong>
            </div>
          </div>
          <Container fluid={true}>
            {this.mapLabels()}
          </Container>
          <div className="mui--text-center">
            <div>Written by: {goal.user.login}</div>
          </div>
          <Col md="4">
            {goal.milestone ? goal.milestone.title : null}
          </Col>
          <Col md="2" md-offset="6">
            <a onClick={() => this.openModal()}>Details</a>
          </Col>
        </Panel>
      </Col>
    </div>
  }
}
