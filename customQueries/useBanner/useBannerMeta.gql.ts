export default `
  query loadBanners($sliderId: Int!) {
    codilarBannerSlider(sliderId: $sliderId) {
      banners {
        alt_text
        is_enabled
        link
        resource_map {
          title
          min_width
          max_width
        }
        resource_path
        resource_type
        slider_id
        sort_order
        title
      }
      is_enabled
      is_show_title
      slider_id
      title
    }
  }
`;
