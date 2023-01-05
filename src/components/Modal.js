import DetailEquipment from "./detail/DetailEquipment";
import "./Modal.scss";

export default function Modal({ open, close, header, children, data }) {
    return (
        <div className={open ? "openModal modal" : "modal"}>
            {open && (
                <div>
                    <header>
                        {data.result.tool_name}
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