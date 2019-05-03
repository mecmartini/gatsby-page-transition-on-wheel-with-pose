import React from 'react'
import posed, { PoseGroup } from 'react-pose'
import Layout from './src/components/layout'

const Transition = posed.div({
  enter: {
    y: 0,
    opacity: 1,
    delay: 500,
    transition: {
      y: { type: 'spring', stiffness: 1000, damping: 15 },
      default: { duration: 300 }
    },
    beforeChildren: true
  },
  exit: {
    y: 50,
    opacity: 0,
    transition: { duration: 200 }
  }
})

export const replaceComponentRenderer = ({ props, ...other }) => {
  const { component } = props.pageResources
  return (
    <Layout>
      <PoseGroup>
        <Transition key={props.location.key}>
          {React.createElement(component, props)}
        </Transition>
      </PoseGroup>
    </Layout>
  )
}
