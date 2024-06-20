<template>
  <div id="contact-us">
    <h1>{{ $t('Contact us') }}</h1>
    <ContactUsForm
      data-testid="contact-us-form"
      :show-recaptcha="isRecaptchaEnabled"
      :loading="loading"
      :form="contactForm"
      @submit="form => onFormSubmit(form)"
      @change-form="currentlyDisplayedForm = $event"
    />
  </div>
</template>
<script lang="ts">
import {
  ref,
  defineComponent,
  useContext,
} from '@nuxtjs/composition-api';
import ContactUsForm from '~/components/ContactUsForm.vue';
import { useContactUs } from '~/customQueries/useContactUs';
import type {
  ContactusInput,
} from '~/customQueries/useContactUs';

export default defineComponent({
  name: 'ContactUs',
  components: {
    ContactUsForm,
  },
  setup() {
    const contactForm = ref<ContactusInput>({
      fullname: '',
      email: '',
      telephone: '',
      message: '',
    });
    const {
      postContactUs,
      loading,
      error: useContacError,
    } = useContactUs();

    // @ts-expect-error Recaptcha is not registered as a Nuxt module. Its absence is handled in the code
    const { $recaptcha, $config } = useContext();
    const isRecaptchaEnabled = ref<boolean>(typeof $recaptcha !== 'undefined' && Boolean($config.isRecaptcha));

    const getRecaptchaInfo = async (isRecaptchaOn: boolean) : Promise<{ token: string | null, cleanup: () => void }> => {
      if (isRecaptchaOn) {
        $recaptcha.init();
        return { token: await $recaptcha.getResponse(), cleanup: () => { $recaptcha.reset(); } };
      }
      return { token: null, cleanup: () => {} };
    };
    const onFormSubmit = async (form: ContactusInput) => {
      contactForm.value = form;
      const { token, cleanup } = await getRecaptchaInfo(isRecaptchaEnabled.value);
      await postContactUs({ ...form, ...(token ? { recaptchaToken: token } : {})  });
      cleanup();
      if (!useContacError.value.message) {
        console.log('success');
      }
    };
    return {
      isRecaptchaEnabled,
      contactForm,
      onFormSubmit,
      useContacError,
      loading,
    };
  },
});
</script>
<style lang="scss" scoped>
</style>
