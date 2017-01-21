import React, {Component} from 'react'
import Panel from 'muicss/lib/react/panel'
import {Converter} from 'showdown'

const converter = new Converter()

export default class Comment extends Component {
  constructor(props) {
    super(props)

    this.state = {
      comment: props.comment
    }
  }

  render() {
    const comment = this.state.comment

    console.log('comment:', comment)

    return <Panel>
      <div style={{float: 'right'}}>
        <img style={{borderRadius: '5px'}}src={comment.user.avatar_url} height="50px" width="50px"/>
      </div>
      <div>
        {comment.user.login} commented {comment.from_now}
      </div>
      <div dangerouslySetInnerHTML={{__html: converter.makeHtml(comment.body)}}></div>
    </Panel>
  }
}
