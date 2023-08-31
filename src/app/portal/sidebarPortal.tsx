import React from 'react';
import ReactDOM from 'react-dom';

function SidebarPortal(children:any) {
    const modalRoot = document.getElementById('modal-root')

    if (modalRoot) {
        return ReactDOM.createPortal(<>{children}</>, modalRoot)
    }

    return <></>
}

export default SidebarPortal