import { toast } from 'react-toastify';

const option = { position: 'bottom-left' };

const info = (msg: string) => {
  toast.info(msg, option);
}

const error = (msg: string) => {
  toast.error(msg, option);
}

const success = (msg: string) => {
  toast.success(msg, option);
}

export default {
  info,
  error,
  success
}
