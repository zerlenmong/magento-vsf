<template>
  <div class="contact-us-form">
    <ValidationObserver v-slot="{ handleSubmit }">
      <form
        class="form"
        @submit.prevent="handleSubmit(() => { $emit('submit', formCopy) })"
      >
        <ValidationProvider
          v-slot="{ errors }"
          rules="required"
        >
          <SfInput
            v-model="formCopy.fullname"
            v-e2e="'contact-form-fullname'"
            :valid="!errors[0]"
            :error-message="$t(errors[0])"
            name="fullname"
            :label="$t('Your full name')"
            class="form__element"
          />
        </ValidationProvider>
        <ValidationProvider
          v-slot="{ errors }"
          rules="required|email"
        >
          <SfInput
            v-model="formCopy.email"
            v-e2e="'contact-form-email'"
            :valid="!errors[0]"
            :error-message="$t(errors[0])"
            name="email"
            :label="$t('Your email')"
            class="form__element"
          />
        </ValidationProvider>
        <ValidationProvider
          v-slot="{ errors }"
          rules="required"
        >
          <SfInput
            v-model="formCopy.telephone"
            v-e2e="'contact-form-password'"
            :valid="!errors[0]"
            :error-message="$t(errors[0])"
            name="telephone"
            type="number"
            :label="$t('Your telephone')"
            class="form__element"
          />
        </ValidationProvider>
        <ValidationProvider
          v-slot="{ errors }"
          rules="required"
        >
          <SfTextarea
            v-model="formCopy.message"
            v-e2e="'contact-form-message'"
            :valid="!errors[0]"
            :error-message="$t(errors[0])"
            name="message"
            :label="$t('Your message')"
            class="form__element"
          />
        </ValidationProvider>
        <recaptcha v-if="showRecaptcha" />
        <slot name="error" />
        <SfButton
          v-e2e="'contact-form-submit'"
          type="submit"
          class="sf-button--full-width form__button"
          :disabled="loading"
          data-testid="contact-form-submit"
        >
          <SfLoader
            :class="{ loader: loading }"
            :loading="loading"
          >
            <div>{{ $t('submit') }}</div>
          </SfLoader>
        </SfButton>
      </form>
    </ValidationObserver>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref, watch } from '@nuxtjs/composition-api';
import type { PropType } from '@nuxtjs/composition-api';
import type {
  ContactusInput,
} from '~/customQueries/useContactUs';
import { required, email, digits } from 'vee-validate/dist/rules';
import { ValidationProvider, ValidationObserver, extend } from 'vee-validate';
import {
  SfInput,
  SfTextarea,
  SfButton,
  SfLoader,
} from '@storefront-ui/vue';

extend('email', {
  ...email,
  message: 'Invalid email',
});

extend('required', {
  ...required,
  message: 'This field is required',
});

extend('digits', {
  ...digits,
  message: 'Invalid Phone Number',
});

export default defineComponent({
  name: 'ContactUs',
  components: {
    SfInput,
    SfTextarea,
    SfButton,
    SfLoader,
    ValidationObserver,
    ValidationProvider,
  },
  props: {
    form: {
      type: Object as PropType<ContactusInput>,
      required: true,
    },
    loading: {
      type: Boolean,
      default: false,
    },
    hasError: {
      type: Boolean,
      default: false,
    },
    showRecaptcha: {
      type: Boolean,
      default: false,
    },
  },
  setup(props) {
    const formCopy = ref<ContactusInput>();
    watch(() => props.form, (newForm) => { formCopy.value = { ...newForm }; }, { immediate: true, deep: true });
    return {
      formCopy,
    };
  },
});
</script>
<style lang="scss" scoped>
.contact-us-form {
  max-width: 500px;
  padding: 15px;
  margin: 40px auto 0;
  font-size: 12px;
  box-shadow: 0 0 10px rgba(0, 0, 0, .4);
  .form__element {
    margin: 20px 0px;
  }
}
</style>
