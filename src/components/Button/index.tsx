import React from 'react'
import { ButtonWrapper } from './styled'

class Button extends React.PureComponent<React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>> {
  private onSelect = () => {
    return false
  }
  render() {
    const {
      ref,
      children,
      ...props
    } = this.props
    return <ButtonWrapper {...props} onSelect={this.onSelect}>{children}</ButtonWrapper>
  }
}

export default Button