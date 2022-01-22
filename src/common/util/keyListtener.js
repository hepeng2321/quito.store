import * as React from 'react'

export default class KeyBind extends React.Component {

  render() {
    return null
  }

  componentDidMount(){
    document.addEventListener("keydown", this.onKeyDown)
    document.addEventListener("keyup", this.onKeyUp)
  }

  componentWillUnmount(){
    document.removeEventListener("keydown", this.onKeyDown)
    document.removeEventListener("keyup", this.onKeyUp)
  }

  onKeyDown = (e) => {
    this.props.handleKeycode(e)
  }

  onKeyUp = (e) => {
    this.props.handleKeycode(e)
  }

}