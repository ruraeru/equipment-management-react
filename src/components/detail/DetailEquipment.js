import "./DetailEquipment.scss";

export default function DetailEquipment() {
    return (
        <tr id="detail-equipment" style={{
            height: "218px"
        }}>
            <td className="check-wrap">
                <input type="checkbox" id="check-btn" />
                <label htmlFor="check-btn" />
            </td>
            <td>교육용</td>
            <td>
                <img src="https://www.lenovo.com/medias/lenovo-tablet-lenovo-tab-p12-pro-subseries-hero.png?context=bWFzdGVyfHJvb3R8MjM1NTEwfGltYWdlL3BuZ3xoOTgvaGQ3LzEyNjgwMzcxOTI5MTE4LnBuZ3wzZjU1YzNmYmMzZDgxOTQ5NjBkZjU2ZThhNmUxZGMzY2E2ZjM3ZjM1OGMyZDA4YzhjNTBhNjUxZDRhMDlhZjgx" alt="태블릿" />
            </td>
            <td id="information" colSpan={2}>
                <div>
                    <p className="equipment-name">
                        <span>스마트 패드</span> &nbsp; 대여가능 <br />
                    </p>
                    <p className="equipment-code">
                        품목 코드 : &nbsp; 9115 <br />
                        자산 번호 : &nbsp; 2017021402226
                    </p>
                    <p className="equipment-detail">
                        구입구분 : &nbsp; 교비(등록금) <br />
                        구입 일자 : &nbsp; 2017년 2월 14일 <br />
                        물품 규격 : &nbsp; LG G패드 3 8.0 Wi-Fi 32G
                    </p>
                </div>
            </td>
            <td>
                <button>기자재 수리 요청</button>
            </td>
        </tr>
    );
}