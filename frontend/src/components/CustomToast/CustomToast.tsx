import "./CustomToast.css";
import { FiCheckCircle, FiAlertCircle } from "react-icons/fi";

export default function CustomToast({ type, message }: any) {
  return (
    <div className={`toast toast--${type}`}>
      <div className="toastIcon">
        {type === "success" && <FiCheckCircle />}
        {type === "error" && <FiAlertCircle />}
      </div>

      <span>{message}</span>
    </div>
  );
}