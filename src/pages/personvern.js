import React from 'react'
import { graphql } from 'gatsby'
import PageLayout from '../components/PageLayout'
import IntercomConfigured from '../components/Intercom/index'
import moment from 'moment'

const Personvern = ({ data: {prismicPrivacyStatement} }) => {
    return (
    <PageLayout>
    <h1 style={{ marginTop: '5rem'}}>{prismicPrivacyStatement.data.title.text}</h1>
    <span>Oppdatert {moment(`${prismicPrivacyStatement.data.date}`).format('DD MMMM YYYY')}</span>
    <div
      dangerouslySetInnerHTML={{ __html: prismicPrivacyStatement.data.content.html }}
    />
    <IntercomConfigured />
    </PageLayout>
    )
}

export default Personvern


export const PageQuery = graphql`
query PrivacyPolicy {
    prismicPrivacyStatement{
    data{
      title{
        text
      }
      date
      content{
        html
      }
    }
  }
}
`