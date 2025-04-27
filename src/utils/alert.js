import Swal from 'sweetalert2';

export const Alert = (icon, title, text, options = {}) =>
  Swal.fire({
    ...options,
    icon,
    title,
    text,
    customClass: {
      container: 'my-swal',
    },
  });
