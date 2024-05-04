import { ref } from 'vue';
import { useMutation } from '@tanstack/vue-query';

import { toast } from '@/utils/toastHelper';
import { uploadAvatar as uploadAvatarApi } from '@/services/apiAvatar';

export function useUploadAvatar() {
  const avatarObj = ref(null);

  const { mutate: uploadAvatar, isPending: isUploading } = useMutation({
    mutationKey: ['uploadAvatar'],
    mutationFn: (filename) => uploadAvatarApi(filename, avatarObj.value),

    onError: (error) => {
      toast(error.message, 'error');
    },
  });

  return { avatarObj, uploadAvatar, isUploading };
}
