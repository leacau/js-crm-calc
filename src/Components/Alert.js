import Swal from 'sweetalert2';

export function Alert({ message, type }) {
    return (
        Swal.fire({
            text: message,
            icon: type,
            confirmButtonText: 'ok'
        })
    )
}