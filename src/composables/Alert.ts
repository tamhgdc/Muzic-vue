import Swal from "sweetalert2";

const showAlert = (msg: string | any): void => {
    Swal.fire({
        position: 'top-end',
        padding: '1rem',
        toast: true,
        width: '30rem',
        icon: 'error',
        title: msg,
        showConfirmButton: false,
        timer: 2500
    })
}

export { showAlert }