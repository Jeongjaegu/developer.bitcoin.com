// @flow

import * as React from 'react'
import { graphql } from 'gatsby'
import styled from 'styled-components'

import DefaultLayout from 'components/layouts/DefaultLayout'
import Hero from 'components/Hero'
import Container from 'components/Container'
import HelmetPlus from 'components/HelmetPlus'
import InfoCard from 'components/InfoCard'

import { FaAngleLeft } from 'react-icons/fa'

import H3 from 'atoms/H3'
import H1 from 'atoms/H1'
import StyledLink from 'atoms/StyledLink'

import spacing from 'styles/spacing'
import media from 'styles/media'

import HeroImg from 'images/learn-bitcoin-cash-header.jpg'

const HeroLayout = styled.div`
  display: grid;
  grid-gap: ${spacing.tiny};
`

const PreviewLayout = styled.div`
  display: grid;
  padding-top: ${spacing.large};
  grid-gap: ${spacing.medium};
  grid-template-columns: 1fr;
  ${media.medium`
    grid-template-columns: repeat(auto-fit, minmax(400px, .5fr));
  `};
`

type Props = {
  location: Object,
  data: {
    allMarkdownRemark: {
      edges: {
        node: {
          frontmatter: {
            title: string,
            updatedAt: string,
            createdAt: string,
          },
        },
      },
    },
  },
}

const Insights = ({ location, data }: Props) => {
  const posts = data.allMarkdownRemark.edges

  return (
    <DefaultLayout location={location}>
      <HelmetPlus
        title={`Inisghts - developer.bitcoin.com`}
        description={
          'Insights into the learnings and process people have faced while building new products with Bitcoin Cash and Bitbox'
        }
        keywords={
          'inisghts, blog, bitbox, tutorials, developer tools, bitcoin, bitcoin cash, BCH, wormhole, sdk, api'
        }
        location={location}
      />
      <Hero image={HeroImg}>
        <HeroLayout>
          <StyledLink to="/learn">
            <H3 centerVertical>
              {' '}
              <FaAngleLeft />
              Learn
            </H3>
          </StyledLink>
          <H1 background>Insights</H1>
          <H3 background>
            Learn from developers who have shipped successful apps.
          </H3>
        </HeroLayout>
      </Hero>
      <Container>
        <PreviewLayout>
          {posts.map(post => (
            <InfoCard
              to={post.node.fields.slug}
              title={post.node.frontmatter.title}
              text={post.node.frontmatter.description}
              cta="Read More"
            />
          ))}
        </PreviewLayout>
      </Container>
    </DefaultLayout>
  )
}

export default Insights

export const query = graphql`
  query InsightsQuery {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(
      sort: { fields: [frontmatter___ordinal], order: DESC }
      filter: { fields: { type: { eq: "insight" } } }
    ) {
      totalCount
      edges {
        node {
          id
          excerpt
          frontmatter {
            title
            description
            updatedAt(formatString: "MMMM Do, YYYY")
            publishedAt(formatString: "MMMM Do, YYYY")
          }
          fields {
            slug
          }
        }
      }
    }
  }
`
