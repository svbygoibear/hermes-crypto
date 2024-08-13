import React from "react";
import ReactDOM from "react-dom";
import "./Modal.css";

interface ModalProps {
    children: React.ReactNode;
    isOpen: boolean;
    onClose: () => void;
}

const Modal: React.FunctionComponent<ModalProps> = (props: ModalProps) => {
    if (!props.isOpen) {
        return null;
    }

    return ReactDOM.createPortal(
        <div
            className="modal-overlay"
            role="button"
            tabIndex={0}
            onClick={props.onClose}
            onKeyDown={e => {
                if (e.key === "Enter" || e.key === " ") {
                    props.onClose();
                }
            }}>
            <div
                className="modal-content"
                role="button"
                tabIndex={0}
                onClick={e => e.stopPropagation()}
                onKeyDown={() => {}}>
                {props.children}
            </div>
        </div>,
        document.body
    );
};

export default Modal;
