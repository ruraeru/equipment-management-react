import axios from "axios";
import { useEffect } from "react";
import "./DetailEquipment.scss";

export default function DetailEquipment({ data }) {
    useEffect(() => {
        loadEquipmentImg();
    }, []);

    const loadEquipmentImg = async () => {
        const img = document.querySelector("img");
        img.src = `${process.env.REACT_APP_DOMAIN}/tool/${data.image.img_url}`;
    }
    return (
        <div id="detail-equipment" style={{
            height: "218px"
        }}>
            <div>
                <img src="https://www.lenovo.com/medias/lenovo-tablet-lenovo-tab-p12-pro-subseries-hero.png?context=bWFzdGVyfHJvb3R8MjM1NTEwfGltYWdlL3BuZ3xoOTgvaGQ3LzEyNjgwMzcxOTI5MTE4LnBuZ3wzZjU1YzNmYmMzZDgxOTQ5NjBkZjU2ZThhNmUxZGMzY2E2ZjM3ZjM1OGMyZDA4YzhjNTBhNjUxZDRhMDlhZjgx" alt="태블릿" />
            </div>
            <div id="information" colSpan={1}>
                <div>
                    <p className="equipment-name">
                        <span>{data.result.tool_name}</span> &nbsp; 대여 가능
                    </p>
                    <p className="equipment-code">
                        품목 코드 : &nbsp; {data.result.tool_code} <br />
                        자산 번호 : &nbsp; {data.result.tool_id}
                    </p>
                    <p className="equipment-detail">
                        구입구분 : &nbsp; {data.result.tool_purchase_division} <br />
                        구입 일자 : &nbsp; {data.result.tool_purchase_date.split("-")[0]}년&nbsp;
                        {data.result.tool_purchase_date.split("-")[1]}월&nbsp;
                        {data.result.tool_purchase_date.split("-")[2].slice(0, 2)}일 <br />
                        물품 규격 : &nbsp; {data.result.tool_standard}
                    </p>
                </div>
            </div>
            <div id="information" style={{
                paddingLeft: "100px"
            }} colSpan={2}>
                <div>
                    <p className="equipment-name">
                        <span>대여 정보</span>
                    </p>
                    <p className="equipment-code">
                        대여자: &nbsp; 홍길동(학부생) <br />
                        대여 기간: &nbsp; 2022 / 11 / 16 ~ 2022 / 11 / 30 (남은 기간 : 14일)
                    </p>
                </div>
            </div>
            {/* <td>
                <button>기자재 수리 요청</button>
            </td> */}
        </div>
    );
}