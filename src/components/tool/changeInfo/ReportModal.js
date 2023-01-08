export default function ReportModal({ data }) {
    return (
        <div id="equipment-report">
            <div id="code-detail" colSpan={4}>
                <div style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "left",
                    alignItems: "center"
                }}>
                    <div>
                        <img src="https://www.lenovo.com/medias/lenovo-tablet-lenovo-tab-p12-pro-subseries-hero.png?context=bWFzdGVyfHJvb3R8MjM1NTEwfGltYWdlL3BuZ3xoOTgvaGQ3LzEyNjgwMzcxOTI5MTE4LnBuZ3wzZjU1YzNmYmMzZDgxOTQ5NjBkZjU2ZThhNmUxZGMzY2E2ZjM3ZjM1OGMyZDA4YzhjNTBhNjUxZDRhMDlhZjgx" alt="태블릿" />
                    </div>
                    <div id="info">
                        <span>{data.tool.name}</span>
                        <p id="code">
                            품목 코드 : {data.tool.code} <br />
                            자산 번호 : {data.tool.number}
                        </p>
                        <p id="detail">
                            구입 구분 : 교비 (등록금) <br />
                            구입 일자 : 2017년 2월 14일 <br />
                            물품 규격 : LG G패드 3 8.0 Wi-Fi 32G
                        </p>
                    </div>
                    <div id="report">
                        <span>건의 신청</span>
                        <p id="code">
                            건의자: {data.comment.user.name} <br />
                            건의 일자 : {data.comment.user.date}
                        </p>
                        <p>
                            변동 일자 : {data.comment.user.change_date}
                        </p>
                    </div>
                </div>
                <div id="report-comment">
                    <h3>건의 내용 : </h3>
                    <p>{data.comment.comment}</p>
                </div>
            </div>
            <div style={{
                position: "absolute",
                right: 20
            }}>
                <select className="equipment-state-select" onChange={(e) => {
                    console.log(e.target.value);
                }}>
                    <option>대여 가능</option>
                    <option>대여 불가</option>
                </select>
            </div>
        </div>
    );
}