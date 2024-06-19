//  ~/customerQueries/Queries/relatedProduct.js
const gql = require('graphql-tag');

module.exports = ({ variables }) => ({
  query: gql`
  //gql
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
          only_x_left_in_stock
          rating_summary
          standards
          grade
          diameter
          diameter_tolerance
          tensile_strength_tolerance
          surface_condition
          wire_weight
          package
          package_coil_model
          package_with_and_without_coil_model
          package_spool_model
          package_spoolless_coil_model
          packaging_dimensions

        }
        uid
      }
    }
  }
`,
  variables,
});
