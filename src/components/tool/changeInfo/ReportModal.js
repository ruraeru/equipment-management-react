import axios from "axios";

export default function ReportModal({ data, userData }) {
    const { repair_create_at, repair_reason, user_id } = data;
    const { tool_name, tool_code, tool_id, tool_purchase_date, tool_purchase_division,
        tool_update_at, tool_state, tool_standard } = data.tool;
    console.log(userData.login);
    const setRentalState = async (tool_id) => {
        await axios.get(`${process.env.REACT_APP_DOMAIN}/tool/cannotRental/${tool_id}`, {
            headers: {
                token: userData.token
            }
        })
            .then((res) => {
                console.log(res);
                if (res.data.suc) {
                    alert(`기자재 ${tool_id}를 "대여 불가" 처리하였습니다.`);
                }
            })
    }
    return (
        <div id="equipment-report">
            <div id="code-detail">
                <div style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "left",
                    alignItems: "center",
                }}>
                    <div>
                        <img src="https://www.lenovo.com/medias/lenovo-tablet-lenovo-tab-p12-pro-subseries-hero.png?context=bWFzdGVyfHJvb3R8MjM1NTEwfGltYWdlL3BuZ3xoOTgvaGQ3LzEyNjgwMzcxOTI5MTE4LnBuZ3wzZjU1YzNmYmMzZDgxOTQ5NjBkZjU2ZThhNmUxZGMzY2E2ZjM3ZjM1OGMyZDA4YzhjNTBhNjUxZDRhMDlhZjgx" alt="태블릿" />
                    </div>
                    <div id="info" style={{
                        width: "200px"
                    }}>
                        <span>{tool_name}</span> {tool_state}
                        <p id="code">
                            품목 코드 : {tool_code} <br />
                            자산 번호 : {tool_id}
                        </p>
                        <p id="detail">
                            구입 구분 : {tool_purchase_division} <br />
                            구입 일자 : {tool_purchase_date.split("-")[0]}년 {tool_purchase_date.split("-")[1]}월 {tool_purchase_date.split("-")[2].slice(0, 2)}일 <br />
                            물품 규격 : {tool_standard}
                        </p>
                    </div>
                    <div id="report">
                        <span>건의 신청</span>
                        <p id="code">
                            건의자: {user_id} <br />
                            건의 일자 : {repair_create_at.split("-")[0]}년 {repair_create_at.split("-")[1]}월 {repair_create_at.split("-")[2].slice(0, 2)}일
                        </p>
                        <p>
                            변동 일자 : {tool_update_at.split("-")[0]}년 {tool_update_at.split("-")[1]}월 {tool_update_at.split("-")[2].slice(0, 2)}일
                        </p>
                    </div>
                </div>
                <div id="report-comment">
                    <h3>건의 내용 : </h3>
                    <p>{repair_reason}</p>
                </div>
            </div>
            {userData.login.user_license < 3 &&
                <div style={{
                    position: "absolute",
                    right: 20
                }}>
                    <select className="equipment-state-select" onChange={(e) => {
                        console.log(e.target.value);
                        setRentalState(tool_id);
                    }}>
                        <option>대여 가능</option>
                        <option>대여 불가</option>
                    </select>
                </div>
            }
        </div >
    );
}