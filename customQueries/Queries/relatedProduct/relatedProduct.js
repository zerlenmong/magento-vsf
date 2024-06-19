//  ~/customerQueries/Queries/relatedProduct.js
const gql = require('graphql-tag');

module.exports = ({ variables }) => ({
  query: gql`
  query relatedProduct(
    $search: String = ""
    $filter: ProductAttributeFilterInput
    $pageSize: Int = 10
    $currentPage: Int = 1
    $sort: ProductAttributeSortInput
  ) {
    products(
      search: $search
      filter: $filter
      sort: $sort
      pageSize: $pageSize
      currentPage: $currentPage
    ) {
      items {
        related_products {
          uid
          __typename
          sku
          name
          stock_status
        }
        uid
      }
    }
  }
`,
  variables,
});
