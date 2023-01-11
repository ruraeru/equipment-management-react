import { useActive } from "hooks/useActive";
import { useNavigate } from "react-router-dom";

export default function Navigation({ list }) {
    const navigate = useNavigate();
    return (
        <footer className="list-nav">
            <p>
                &lt;
            </p>
            {list.map((item, index) => (
                // eslint-disable-next-line react-hooks/rules-of-hooks
                <button className={useActive(item) ? "active nav" : ""}
                    onClick={() => navigate(item)}>{index + 1}</button>
            ))}
            <p>
                &gt;
            </p>
        </footer>
    );
}