import { useState } from "react";
import * as XLSX from "xlsx";
import { SiMicrosoftexcel } from "react-icons/si";
import "./AddTool.scss";
import ScreenData from "./ScreenData";
import axios from "axios";

export default function AddToolExcel() {
    const [__html, setHTML] = useState("");
    const [json, setJSON] = useState(null);

    const handleFile = async (e) => {
        const file = e.target.files[0];
        const data = await file.arrayBuffer();

        const wb = XLSX.read(data);
        const ws = wb.Sheets[wb.SheetNames[0]];
        setHTML(XLSX.utils.sheet_to_html(ws, { id: "tabeller" }));

        setJSON(XLSX.utils.sheet_to_json(ws, {
            blankrows: "",
            header: "1"
        }));
    }

    const onFileChange = (e) => {
        console.log(e.target.files[0]);
        document.querySelector("img");

        if (e.target.files[0]) {
            const reader = new FileReader();

            reader.onload = e => {
                const previewImage = document.querySelector("img");
                previewImage.src = e.target.result;
            }

            reader.readAsDataURL(e.target.files[0]);
        }
    }

    const onAddEquipment = () => {
        json.map(async (item) => {
            const { 자산번호: id, 관리부서: purchaseDivision, 구분: division, 품목코드: code, 규격: standard, 구입일자: date, 구입구분: purchase } = item;
            await axios.post("http://120.142.105.189:5080/tool/addTool", {
                tool_id: id,
                tool_use_division: division,
                tool_code: code,
                tool_name: "123",
            });
        });
    }

    return (
        <div className="add-tool-wrap">
            <h3>대여 목록</h3>
            <div id="input-filed-wrap">
                <img src="https://www.lenovo.com/medias/lenovo-tablet-lenovo-tab-p12-pro-subseries-hero.png?context=bWFzdGVyfHJvb3R8MjM1NTEwfGltYWdlL3BuZ3xoOTgvaGQ3LzEyNjgwMzcxOTI5MTE4LnBuZ3wzZjU1YzNmYmMzZDgxOTQ5NjBkZjU2ZThhNmUxZGMzY2E2ZjM3ZjM1OGMyZDA4YzhjNTBhNjUxZDRhMDlhZjgx" alt="태블릿" />
                <div id="input-filed">
                    <label>이미지 파일 불러오기</label>
                    <div className="filebox">
                        <input type="file" id="file" onChange={onFileChange} />
                    </div>
                    <label>기자재 명칭</label>
                    <input type="text" />
                    <SiMicrosoftexcel size="27px" color="#20744A" style={{
                        marginBottom: "8px"
                    }} />
                    <input type="file" onChange={handleFile} />
                </div>
            </div>
            <table>
                <thead>
                    <tr>
                        <th>자산번호</th>
                        <th>관리부서</th>
                        <th>구분</th>
                        <th>품목코드</th>
                        <th>규격</th>
                        <th>구입일자</th>
                        <th>구입구분</th>
                    </tr>
                </thead>
                <tbody id="tableValues">
                    {/* {json && ScreenData()} */}
                    {json && <ScreenData json={json} />}
                </tbody>
            </table>
            <button onClick={onAddEquipment}>
                기자재 등록하기
            </button>
        </div>
    );
}