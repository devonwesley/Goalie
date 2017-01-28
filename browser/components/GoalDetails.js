import React, {Component} from 'react'
import Button from 'muicss/lib/react/button'
import {Converter} from 'showdown'
import Comment from './Comment'
import fetchMethod from './fetch_method'

const converter = new Converter()

export default class GoalDetails extends Component {
  constructor(props){
    super(props)
    this.state = {
      goal: props.goal,
      comments: null
    }
  }

  mapLabels() {
    const goalLabels = this.state.goal.labels

    return goalLabels.map((label, index) =>
      <Button key={index} style={{backgroundColor: `#${label.color}`}}>{label.name}</Button>
    )
  }

  fetchComments() {
    const url = `/api/v1/comments/${this.state.goal.number}`
    const callback = comments => this.setState({comments: JSON.parse(comments)})

    return fetchMethod('GET', url, null, callback)
  }

  renderComments() {
    const goalComments = this.state.comments
    return goalComments.map((comment, index) => <Comment key={index} comment={comment}/>)
  }

  render() {
    if (!this.state.comments) this.fetchComments()
    const comments = this.state.comments ? this.renderComments() : null

    const goal = this.state.goal
    return <div>
      <div className="mui--text-right close" onClick={this.props.closeModal}>X</div>
      <div style={{float: 'right', margin: '20px', marginRight: '-5px'}}>
        <img style={{borderRadius: "2px"}} src={goal.user.avatar_url} height="50px" width="50px"/>
      </div>
      <h1>{goal.title} #{goal.number}</h1>
      <div>{goal.user.login} created this goal {goal.from_now}</div>
      <div>{goal.milestone ? goal.milestone.title : null}</div>

      <div>{this.mapLabels()}</div>
      <div dangerouslySetInnerHTML={{__html: converter.makeHtml(this.state.goal.body)}}></div>
      <h2>Comments</h2>
      <hr />
      {comments}
    </div>
  }
}
