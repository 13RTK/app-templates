import {
  type ToastPosition,
  type ToastType,
  useToast,
} from 'vue-toast-notification';

const $toast = useToast();

export function toast(
  message: string,
  type: ToastType = 'success',
  position: ToastPosition = 'top',
) {
  $toast.clear();
  $toast[type](message, {
    position,
  });
}
