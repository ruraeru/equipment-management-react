import { useState } from "react";
import * as XLSX from "xlsx";
import { SiMicrosoftexcel } from "react-icons/si";
import "./AddTool.scss";
import ScreenData from "./ScreenData";
import axios from "axios";

export default function AddToolExcel() {
    // const [__html, setHTML] = useState("");
    const [json, setJSON] = useState();

    const handleFile = async (e) => {
        const file = e.target.files[0];
        const data = await file.arrayBuffer();

        const wb = XLSX.read(data);
        const ws = wb.Sheets[wb.SheetNames[0]];
        // setHTML(XLSX.utils.sheet_to_html(ws, { id: "tabeller" }));

        setJSON(XLSX.utils.sheet_to_json(ws, {
            blankrows: "",
            header: "1"
        }));
    }

    const ExcelExport = () => {
        if (!json) {
            return;
        }
        const table = document.getElementById("equipment-list");
        const wb = XLSX.utils.table_to_book(table, {
            raw: true
        });

        XLSX.writeFile(wb, "불러온 값.xlsx");
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
        // ExcelExport();
        console.log(json);
        json.map(async (item) => {
            const { 자산번호: id, 구분: use_division,
                품목코드: code, 품명: name,
                규격: standard, 구입일자: purchase_date,
                구입구분: purchase_division } = item;

            //엑셀로 불러온 날짜를 Date 타입으로 바꿔서 서버로 보내기 위해 파싱해줌
            const date = new Date(purchase_date.toString().slice(0, 4), purchase_date.toString().slice(4, 6), purchase_date.toString().slice(6, 8));
            await axios.post(`${process.env.REACT_APP_DOMAIN}/tool/addTool`, {
                tool_id: id,
                tool_use_division: use_division,
                tool_code: code,
                tool_name: name,
                tool_purchase_division: purchase_division,
                tool_purchase_date: date,
                tool_standard: standard,
                tool_condition: "대여가능",
                tool_update_at: new Date(),
                // tool_image: new File(),
                department_id: "1"
            }).then((res) => {
                console.log(res);
            })
        });
        /*
          <td>{item.자산번호}</td>
                    <td>{item.관리부서}</td>
                    <td>{item.구분}</td>
                    <td>{item.품목코드}</td>
                    <td>{item.품명}</td>
                    <td>{item.규격}</td>
                    <td>{item.구입일자}</td>
                    <td>{item.구입구분}</td>
        */
    }

    return (
        <div className="add-tool-wrap">
            <h3>기자재 추가</h3>
            <div id="input-filed-wrap">
                <SiMicrosoftexcel size="27px" color="#20744A" style={{
                    // marginBottom: "8px"
                    marginRight: "8px"
                }} onClick={ExcelExport} />
                <input type="file" onChange={handleFile} accept=".xls, .xlsx" />
                <div id="input-filed">
                </div>
            </div>
            <div style={{
                overflow: "scroll"
            }}>
                <table id="equipment-list">
                    <thead>
                        <tr>
                            <th>자산번호</th>
                            <th>관리부서</th>
                            <th>구분</th>
                            <th>품목코드</th>
                            <th>품명</th>
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
            </div>
            <button onClick={onAddEquipment}>
                기자재 등록하기
            </button>
        </div>
    );
}