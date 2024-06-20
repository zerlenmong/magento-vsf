import { readonly, Ref, ref } from '@nuxtjs/composition-api';
import { Logger } from '~/helpers/logger';
import { useApi } from '~/composables/useApi';
import type { ComposableFunctionArgs } from '~/composables';
import LOAD_BANNERS_QUERY from './useBannerMeta.gql';
import type {
  UseBannerErrors,
  UseBannerInterface,
  CodilarBannerSlider,
  BannerSliderInput,
} from './useBanner';

export function useBanner(): UseBannerInterface {
  const loading: Ref<boolean> = ref(false);
  const error: Ref<UseBannerErrors> = ref({
    banner: null,
  });
  const { query } = useApi();
  const loadBanners = async (params: ComposableFunctionArgs<BannerSliderInput>): Promise<CodilarBannerSlider | null> => {
    Logger.debug('useBanner/loadBanners', params);
    loading.value = true;
    let result = null;
    try {
      error.value.banner = null;
      result = await query(
        LOAD_BANNERS_QUERY,
        params,
      );
      Logger.debug('useBanner/loadBanners', result);
    } catch (err) {
      error.value.banner = err;
    } finally {
      loading.value = false;
    }
    return result;
  };
  return {
    error: readonly(error),
    loading: readonly(loading),
    loadBanners,
  };
}

export * from './useBanner';

export default useBanner;
