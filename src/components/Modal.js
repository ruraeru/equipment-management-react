import "./Modal.scss";

export default function Modal({ open, close, header, children }) {
    return (
        <div className={open ? "openModal modal" : "modal"}>
            {open && (
                <div>
                    <header>
                        {header}
                        <button className="close" onClick={close}>
                            &times;
                        </button>
                    </header>
                    <main>{children}</main>
                    <footer>
                        <button className="close" onClick={close}>
                            close
                        </button>
                    </footer>
                </div>
            )}
        </div>
    )
}