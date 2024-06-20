import type { Ref } from '@nuxtjs/composition-api';
import type { Maybe } from '~/modules/GraphQL/types';
import type { ComposableFunctionArgs } from '~/composables';

export interface BannerSliderInput {
  sliderId: number
}

export interface CodilarBannerSlider {
  slider_id: number
  title: String
  is_show_title: number
  is_enabled: number
  banners: Maybe<Array<CodilarBannerSliderBanner>>
}

export interface CodilarBannerSliderBanner {
  slider_id: number
  resource_type: String
  resource_path: String
  is_enabled: number
  title: String
  alt_text: String
  link: String
  sort_order: number
  resource_map: CodilarBannerSliderResourceMap
}

/**
 * Errors that occured in the {@link useContent|useContent()} composable
 */
export interface UseBannerErrors {
  /**
   * Contains error if `uploadFiles` method failed, otherwise is `null`
   */
  banner: Error | null;
}

export interface CodilarBannerSliderResourceMap {
  title: String
  min_width: number
  max_width: number
}

export interface UseBannerInterface {
  /**
   * Indicates whether any of the methods is in progress
   */
  loading: Readonly<Ref<boolean>>;

  /**
   * Contains errors from the composable methods
   */
  error: Readonly<Ref<UseBannerErrors>>;

  loadBanners(params: ComposableFunctionArgs<BannerSliderInput>): Promise<CodilarBannerSlider>;
}
