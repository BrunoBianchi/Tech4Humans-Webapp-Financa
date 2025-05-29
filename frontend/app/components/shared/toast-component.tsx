import { useToast } from "@/app/contexts/toast-context/toast-context";


export default function ToastContainer() {
  const { toasts, removeToast } = useToast();
  return (
    <div className="fixed top-4 right-4 z-50 flex flex-col gap-2">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`px-4 py-2 rounded shadow text-white ${
            toast.type === "error"
              ? "bg-red-500"
              : toast.type === "success"
              ? "bg-green-500"
              : "bg-blue-500"
          }`}
          onClick={() => removeToast(toast.id)}
        >
          {toast.message}
        </div>
      ))}
    </div>
  );
}