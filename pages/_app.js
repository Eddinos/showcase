import App, {Container} from 'next/app'
import React from 'react'
import Layout from '../components/Layout/Layout'
import withReduxStore from '../lib/with-redux'
import { Provider } from 'react-redux'

class MyApp extends App {
  render () {
    const {Component, pageProps, reduxStore} = this.props
    return (
      <Container>
        <Provider store={reduxStore}>
            <Layout>
                <Component {...pageProps} />
            </Layout>
        </Provider>
      </Container>
    )
  }
}

export default withReduxStore(MyApp)