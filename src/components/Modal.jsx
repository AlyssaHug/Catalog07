import { useRef, useEffect } from "react";
import React from "react";

function Modal({ btnLabel, btnClassName, children }) {
    const modalRef = useRef();

    function handleClick() {
        modalRef.current.showModal();
    }

    function closeModal() {
        modalRef.current.close();
    }

    return (
        <>
            <button
                className={btnClassName}
                onClick={handleClick}>
                {btnLabel}
            </button>
            <dialog ref={modalRef}>
                <div>{React.cloneElement(children, { closeModal })}</div>
            </dialog>
        </>
    );
}

export default Modal;
