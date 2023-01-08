import "./ChangeInfoModal.scss";

export default function ChangeInfoModal({ open, close, header, children }) {
    return (
        <div className={open ? "openModal modal" : "modal"}>
            {open && (
                <div>
                    <header>
                        {header}님의 건의사항
                        <button className="close" onClick={close}>
                            &times;
                        </button>
                    </header>
                    <main>
                        {children}
                    </main>
                    <footer>
                        <button className="close" onClick={close}>
                            닫기
                        </button>
                    </footer>
                </div>
            )}
        </div>
    )
}