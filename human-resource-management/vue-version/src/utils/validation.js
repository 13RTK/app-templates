import {
  Form as VeeForm,
  Field as VeeField,
  defineRule,
  ErrorMessage,
} from 'vee-validate';
import { required, email, min, max, digits } from '@vee-validate/rules';

export default {
  install(app) {
    app.component('VeeForm', VeeForm);
    app.component('VeeField', VeeField);
    app.component('ErrorMessage', ErrorMessage);

    defineRule('required', required);
    defineRule('email', email);
    defineRule('min', min);
    defineRule('max', max);
    defineRule('digits', digits);

    defineRule('confirmed', (value, [target]) => {
      if (value === target) {
        return true;
      }

      return 'Passwords must match';
    });
  },
};
