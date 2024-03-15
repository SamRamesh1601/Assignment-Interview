import React, { useState, useEffect } from "react";
import { IoMdCloseCircleOutline } from "react-icons/io";
const ToastAlert = ({ toastMsg = "" }) => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (toastMsg) {
      setShow(true);
      const timeout = setTimeout(() => {
        setShow(false);
      }, 10000);

      return () => clearTimeout(timeout);
    } else {
      setShow(false);
    }
  }, [toastMsg]);

  return (
    <div hidden={!show} className="toast-alert">
      <>{toastMsg}</>
      <span className="toast-close" onClick={() => setShow(false)}>
        <IoMdCloseCircleOutline />
      </span>
    </div>
  );
};

export default ToastAlert;
