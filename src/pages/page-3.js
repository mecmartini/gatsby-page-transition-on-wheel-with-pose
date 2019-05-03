import _ from 'lodash';
import React from 'react'
import { navigate } from '@reach/router';
import { Link } from 'gatsby'
import posed from 'react-pose'
import styled from 'styled-components'

const List = posed.ul({
  enter: { staggerChildren: 50 },
  exit: { staggerChildren: 20, staggerDirection: -1 },
})

const Item = posed.li({
  enter: { y: 0, opacity: 1 },
  exit: { y: 20, opacity: 0 },
})

const SectionStyled = styled.section`
  background-color: orange;
  width: 100vw;
  height: 100vh;
`

class ThirdPage extends React.Component {
  state = {
    loaded: false,
  }

  constructor(props) {
    super(props)

    this.delayedCallback = _.throttle(this.slideToPage, 2000, { 'trailing': false })
  }

  onWheel(e) {
    e.stopPropagation();
    e.nativeEvent.stopImmediatePropagation();
    e.preventDefault();
    e.returnValue = false;

    this.delayedCallback(e.deltaY)
  }

  slideToPage(delta) {
    const { loaded } = this.state;

    if (loaded) {
      if (delta < 0) {
        navigate('/page-2/')
      } else if (delta > 0) {
        navigate('/')
      }
    }
    else {
      this.setState({ loaded: true })
    }
  }

  render() {
    return (
      <SectionStyled onWheel={this.onWheel.bind(this)}>
        <h1>Hi from the third page</h1>
        <p>Welcome to page 3</p>
        <List>
          <Item>Item 1</Item>
          <Item>Item 2</Item>
          <Item>Item 3</Item>
        </List>
        <Link to="/">Go to the homepage</Link><br />
        <Link to="/page-3/">Go to page 3</Link>
      </SectionStyled>
    )
  }
}

export default ThirdPage
