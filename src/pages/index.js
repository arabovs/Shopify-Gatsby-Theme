import * as React from "react"
import { navigate } from "gatsby-link"
import styled from "styled-components"
import { graphql } from "gatsby"

import Layout from "../components/layout"
import PrimaryButton from "../components/PrimaryButton"
import Seo from "../components/seo"
import ProductCard from "../components/ProductCard"

const IndexPage = ({ data }) => {
  const { nodes } = data.allShopifyProduct

  return (
    <Layout>
      <Seo title="Home" />
      <ContentWrapper>
        <BannerImage src="https://cardsbg.s3.eu-north-1.amazonaws.com/art-in-lounge/IMG_4300.jpg" />
        <TextWrapper>
          <Title>Start your day with a delicious cup of coffee</Title>
          <Subtitle>Free shipping on your first order!</Subtitle>
          <PrimaryButton
            text="Explore all products"
            onClick={() => navigate("products")}
          />
        </TextWrapper>
      </ContentWrapper>
      <ContentWrapper>
        <ProductTitle>Express yourself</ProductTitle>
        {/* <BannerImage src="https://cardsbg.s3.eu-north-1.amazonaws.com/art-in-lounge/IMG_4300.jpg" /> */}
        <ProductWrapper>
          {nodes?.map((product, index) => (
            <ProductCard key={index} product={product} />
          ))}
        </ProductWrapper>
      </ContentWrapper>
    </Layout>
  )
}

export default IndexPage

const ContentWrapper = styled.div`
  position: relative;
`

const BannerImage = styled.img`
  height: 800px;
  width: 100%;
  object-fit: cover;
  object-position: center top;
  margin: 0;
`

const TextWrapper = styled.div`
  position: absolute;
  top: 40px;
  left: 40px;
  display: grid;
  gap: 10px;
`

const Title = styled.h1`
  color: white;
  margin: 0;
`

const ProductTitle = styled.h1`
  margin-left: 30%;
  margin-right: 30%;
  margin-top: 2%;
  margin-bottom: 2%;
  color: rgba(0, 0, 0, 1);
`

const Subtitle = styled.p`
  color: rgba(255, 255, 255, 0.7);
  margin: 0;
`

const ProductWrapper = styled.div`
  margin-left: 20%;
  margin-right: 20%;
  margin-top: 2%;
  margin-bottom: 2%;
  display: grid;
  grid-template-columns: repeat(3, auto);
  justify-content: left;
  gap: 40px;
  max-width: 1234px;
`

export const query = graphql`
  {
    allShopifyProduct {
      nodes {
        title
        handle
        variants {
          shopifyId
        }
        priceRangeV2 {
          maxVariantPrice {
            amount
          }
        }
        description
        images {
          src
        }
      }
    }
  }
`
