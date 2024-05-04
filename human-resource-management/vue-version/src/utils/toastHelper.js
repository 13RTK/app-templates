import { useToast } from 'vue-toast-notification';

const $toast = useToast();

export function toast(message, type = 'success', position = 'top') {
  $toast.clear();
  $toast[type](message, {
    position,
  });
}
