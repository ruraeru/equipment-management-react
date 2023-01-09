import "./EquipmentModal.scss";

export default function EquipmentModal({ open, close, header, children, data }) {
    return (
        <div className={open ? "openModal modal" : "modal"}>
            {open && (
                <div>
                    <header>
                        {data.result.tool_name}의 정보
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