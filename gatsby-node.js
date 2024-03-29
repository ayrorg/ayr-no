const path = require("path")
const _ = require("lodash")
const { createFilePath } = require("gatsby-source-filesystem")

// graphql function doesn't throw an error so we have to check to check for the result.errors to throw manually
const wrapper = promise =>
  promise.then(result => {
    if (result.errors) {
      throw result.errors
    }
    return result
  })

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions
  const result = await wrapper(
    graphql(`
      {
        allPrismicPost(
          sort: { fields: [data___date], order: DESC }
          limit: 100
        ) {
          edges {
            node {
              id
              uid
              data {
                date
                title {
                  text
                }
                description
                content {
                  html
                }
              }
            }
          }
        }
        allPrismicService {
          edges {
            node {
              uid
              data {
                position
                title {
                  text
                }
                content {
                  html
                }
                image {
                  url
                  alt
                  dimensions {
                    width
                    height
                  }
                }
              }
            }
          }
        }
      }
    `)
  )
  const postsList = result.data.allPrismicPost.edges
  const postTemplate = require.resolve("./src/templates/post.jsx")
  // pagination
  const blogTemplate = require.resolve("./src/templates/blog.jsx")
  const postsPerPage = 5
  const numPages = Math.ceil(postsList.length / postsPerPage)

  Array.from({ length: numPages }).forEach((_, i) => {
    createPage({
      path: i === 0 ? `/blog` : `/blog/${i + 1}`,
      component: blogTemplate,
      context: {
        limit: postsPerPage,
        skip: i * postsPerPage,
        numPages,
        currentPage: i + 1,
      },
    })
  })

  postsList.forEach(edge => {
    createPage({
      path: `/${edge.node.uid}`,
      component: postTemplate,
      context: {
        // Pass the unique ID (uid) through context so the template can filter by it
        uid: edge.node.uid,
      },
    })
  })

  const serviceList = result.data.allPrismicService.edges
  const serviceTemplate = require.resolve("./src/templates/service.jsx")

  serviceList.forEach(edge => {
    createPage({
      path: `/${edge.node.uid}`,
      component: serviceTemplate,
      context: {
        // Pass the unique ID (uid) through context so the template can filter by it
        uid: edge.node.uid,
      },
    })
  })
}

// to calculate the share URL with social icons
exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions

  if (node.internal.type === `allPrismicPost`) {
    const value = createFilePath({ node, getNode })
    createNodeField({
      name: `slug`,
      node,
      value,
    })
  }
}
