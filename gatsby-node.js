const path = require(`path`)

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions

  // Query for all products in Shopify
  const result = await graphql(`
    query {
      allShopifyProduct {
        edges {
          node {
            title
            handle
            tags
            variants {
              shopifyId
              displayName
              price
              inventoryQuantity
              availableForSale
              title
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
    }
  `)

  const filterObjectsByTag = (objects, tag) => {
    return objects.filter(object => hasTag(object, tag))
  }

  const hasTag = (object, tag) => {
    const tags = object.node.tags
    return tags && Array.isArray(tags) && tags.includes(tag)
  }

  const LEFT_TAG_1 = "UpsellL1"
  const LEFT_TAG_2 = "UpsellL2"
  const LEFT_TAG_3 = "UpsellL3"
  const RIGHT_TAG_1 = "UpsellR1"
  const RIGHT_TAG_2 = "UpsellR2"
  const RIGHT_TAG_3 = "UpsellR3"

  const upsellItemLeft1 = filterObjectsByTag(
    result.data.allShopifyProduct.edges,
    LEFT_TAG_1
  )
  const upsellItemLeft2 = filterObjectsByTag(
    result.data.allShopifyProduct.edges,
    LEFT_TAG_2
  )
  const upsellItemLeft3 = filterObjectsByTag(
    result.data.allShopifyProduct.edges,
    LEFT_TAG_3
  )

  const upsellItemRight1 = filterObjectsByTag(
    result.data.allShopifyProduct.edges,
    RIGHT_TAG_1
  )
  const upsellItemRight2 = filterObjectsByTag(
    result.data.allShopifyProduct.edges,
    RIGHT_TAG_2
  )
  const upsellItemRight3 = filterObjectsByTag(
    result.data.allShopifyProduct.edges,
    RIGHT_TAG_3
  )

  function getRandomUpsell() {
    const elements = []

    if ( upsellItemLeft1 && upsellItemLeft1.length > 0 && upsellItemLeft1[0]) elements.push(upsellItemLeft1[0].node)
    if ( upsellItemLeft2 && upsellItemLeft2.length > 0 && upsellItemLeft2[0]) elements.push(upsellItemLeft2[0].node)
    if ( upsellItemLeft3 && upsellItemLeft3.length > 0 && upsellItemLeft3[0]) elements.push(upsellItemLeft3[0].node)
    if ( upsellItemRight1 && upsellItemRight1.length > 0 && upsellItemRight1[0]) elements.push(upsellItemRight1[0].node)
    if ( upsellItemRight2 && upsellItemRight2.length > 0 && upsellItemRight2[0]) elements.push(upsellItemRight2[0].node)
    if ( upsellItemRight3 && upsellItemRight3.length > 0 && upsellItemRight3[0]) elements.push(upsellItemRight3[0].node)


    const randomIndex = Math.floor(Math.random() * elements.length)
    
    return elements[randomIndex]
  }

  // Iterate over all products and create a new page using a template
  // The product "handle" is generated automatically by Shopify
  result.data.allShopifyProduct.edges.forEach(({ node }) => {
    createPage({
      path: `/products/${node.handle}`,
      component: path.resolve(`./src/templates/product.js`),
      context: {
        product: node,
        upsells: [getRandomUpsell()],
      },
    })
  })
}
