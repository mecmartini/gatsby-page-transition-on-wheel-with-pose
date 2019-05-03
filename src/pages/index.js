import _ from 'lodash';
import React from 'react'
import { navigate } from '@reach/router';
import { Link } from 'gatsby'
import posed from 'react-pose'
import styled from 'styled-components'

const Section = posed.section({
  enter: { staggerChildren: 50 },
  exit: { staggerChildren: 20, staggerDirection: -1 },
})

const SectionStyled = styled(Section)`
  background-color: red;
  width: 100vw;
  height: 100vh;
`

const P = posed.p({
  enter: { y: 0, opacity: 1 },
  exit: { y: 20, opacity: 0 },
})

class IndexPage extends React.Component {
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
        navigate('/page-3/')
      } else if (delta > 0) {
        navigate('/page-2/')
      }
    }
    else {
      this.setState({ loaded: true })
    }
  }

  render() {
    return (
      <SectionStyled onWheel={this.onWheel.bind(this)}>
        <h1>Hi people</h1>
        <P>Welcome to your new Gatsby site.</P>
        <P>Now go build something great.</P>
        <P>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae
          voluptatibus beatae at aspernatur! Adipisci, enim dolor. Quo, maiores
          labore aliquid ducimus officia dolorem voluptates tenetur! Aliquid quaerat
          neque alias! In?
        </P>
        <P>
          Reprehenderit, similique at iure necessitatibus non ipsum praesentium
          nihil omnis dicta eius fugiat magnam ut! Ducimus, doloremque adipisci ea,
          enim sequi porro voluptatibus autem vitae beatae aspernatur quo tempore
          excepturi?
        </P>
        <Link to="/page-2/">Go to page 2</Link><br />
        <Link to="/page-3/">Go to page 3</Link>
      </SectionStyled>
    )
  }
}

export default IndexPage
