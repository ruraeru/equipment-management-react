import Search from "components/search/Search";

export default function Authorization() {
    return (
        <div style={{
            width: "100%",
            height: "804px",
            position: "relative"
        }}>
            <div id="contents-header" style={{
                justifyContent: "flex-end"
            }}>
                <Search />
                <button style={{
                    width: "98px",
                    height: "36px",
                    color: "#f5f5f5",
                    fontSize: "16px",
                    fontWeight: "700",

                    borderRadius: "8px",
                    border: "solid 1px #9785CB",
                    backgroundColor: "#9785CB",
                }}>
                    승인하기
                </button>
            </div>
            <table>
                <thead>
                    <tr>
                        <th className="check-wrap">
                            <input type="checkbox" id="check-btn" />
                            <label htmlFor="check-btn" />
                        </th>
                        <th>이름</th>
                        <th>분류</th>
                        <th>아이디</th>
                        <th>이메일</th>
                        <th>가입 일자</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td className="check-wrap">
                            <input type="checkbox" id="check-btn" />
                            <label htmlFor="check-btn" />
                        </td>
                        <td>홍길동</td>
                        <td>학부생</td>
                        <td>2021661096</td>
                        <td>test1234@test.com</td>
                        <td>11 / 21</td>
                    </tr>
                </tbody>
            </table>
            <footer className="list-nav">
                <p>
                    &lt;
                </p>
                <button onClick={() => (1)}>1</button>
                <button onClick={() => (2)}>2</button>
                <button onClick={() => (2)}>3</button>
                <button onClick={() => (2)}>4</button>
                <button onClick={() => (2)}>5</button>
                <p>
                    &gt;
                </p>
            </footer>
        </div>
    );
}