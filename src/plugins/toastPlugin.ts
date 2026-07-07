import Toast, { useToast } from "vue-toastification";
import "vue-toastification/dist/index.css";



const options = {
    position: "top-right",
    timeout: 5000,
    closeOnClick: true,
    pauseOnFocusLoss: true,
    pauseOnHover: true,
    draggable: true,
    draggablePercent: 0.6,
    showCloseButtonOnHover: false,
    hideProgressBar: false,
    closeButton: "button",
    icon: true,
    rtl: false,
    maxToasts: 20,
    transition: "Vue-Toastification__fade",
    newestOnTop: true,
};

const message = useToast()
export {
    Toast,
    options,
    message
}