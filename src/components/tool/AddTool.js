import axios from "axios";
import { useEffect, useState } from "react";
import { SiMicrosoftexcel } from "react-icons/si";
import { Form, Navigate, useNavigate } from "react-router-dom";
import "./AddTool.scss";

export default function AddTool({ token }) {
    const navigate = useNavigate();
    const formData = new FormData();
    const [values, setValues] = useState({
        id: "", //기자재 자산번호
        use_division: "", //구분
        code: "", //품목코드
        name: "", //품명
        purchase_division: "", //구입 구분
        purchase_date: "", //구입일자
        standard: "", //규격
        condition: "정상", //자산상태
        update_at: "", //변동일자
        image: "", //기자재 사진
        department_id: "" //관리 부서
    });

    const onAddEquipment = async (data) => {
        console.log("add", values);
        const { id, use_division, code, name,
            purchase_division, purchase_date, standard,
            condition, update_at, image, department_id } = values;
        await axios.post(`${process.env.REACT_APP_DOMAIN}/tool/addTool`, data, {
            headers: {
                "Content-type": "multipart/form-data",
                token: token
            }
        })
            .then((res) => {
                console.log(res.data.result);
            });
    }

    const onSubmit = (e) => {
        e.preventDefault();
        // setValues({
        //     ...values,
        //     update_at: new Date().toLocaleString()
        // });
        const { id, use_division, code, name,
            purchase_division, purchase_date, standard,
            condition, update_at, image, department_id } = values;
        const formData = new FormData();
        formData.append("tool_id", id);
        formData.append("tool_use_division", use_division);
        formData.append("tool_code", code);
        formData.append("tool_name", name);
        formData.append("tool_purchase_division", purchase_division);
        formData.append("tool_purchase_date", purchase_date);
        formData.append("tool_standard", standard);
        formData.append("tool_condition", "대여가능");
        formData.append("tool_update_at", new Date());
        formData.append("tool_image", image);
        formData.append("department_id", "1");

        onAddEquipment(formData);
    }

    const onChange = (e) => {
        const { name, value } = e.target;
        setValues({
            ...values,
            [name]: value
        });
    }

    const onFileChange = (e) => {
        console.log(e.target.files[0]);
        document.querySelector("img");
        setValues({
            ...values,
            image: e.target.files[0]
        });
        if (e.target.files[0]) {
            const reader = new FileReader();

            reader.onload = e => {
                const previewImage = document.querySelector("img");
                previewImage.src = e.target.result;
                // setValues({
                //     ...values,
                //     image: e.target.result
                // });
            }

            reader.readAsDataURL(e.target.files[0]);
        }
    }
    return (
        <div className="add-tool-wrap">
            <h3 style={{ color: "#161616" }} onClick={() => console.log(values)}>기자재 추가</h3>
            <form onSubmit={onSubmit} encType="multipart/form-data">
                <div id="input-filed-wrap">
                    <img
                        src="https://www.lenovo.com/medias/lenovo-tablet-lenovo-tab-p12-pro-subseries-hero.png?context=bWFzdGVyfHJvb3R8MjM1NTEwfGltYWdlL3BuZ3xoOTgvaGQ3LzEyNjgwMzcxOTI5MTE4LnBuZ3wzZjU1YzNmYmMzZDgxOTQ5NjBkZjU2ZThhNmUxZGMzY2E2ZjM3ZjM1OGMyZDA4YzhjNTBhNjUxZDRhMDlhZjgx"
                        alt="태블릿"
                        style={{
                            width: "240px",
                            height: "240px",
                        }}
                    />
                    <div id="input-filed">
                        <label>이미지 파일 불러오기</label>
                        <div className="filebox">
                            <input
                                type="file"
                                id="file"
                                onChange={onFileChange}
                                accept=".png, .jpg, .jpeg, .gif"
                            />
                        </div>
                        <label>기자재 명칭</label>
                        <input
                            type="text"
                            name="name"
                            value={values.name}
                            onChange={onChange}
                        />
                        <div style={{
                            display: "flex",
                            alignItems: "center",
                        }} onClick={() => {
                            navigate("/tool/addToolExcel")
                        }}>
                            <SiMicrosoftexcel size={27} color="#20744A" />
                            <p style={{
                                marginLeft: "16px"
                            }}>
                                엑셀 파일 불러오기
                            </p>
                        </div>
                        {/* <input type="text" /> */}
                    </div>
                </div>
                <div id="equipment-input-info-wrap">
                    <div>
                        <p>관리 부서 :</p>
                        <select name="department_id" onChange={onChange}>
                            <option>관리 부서를 선택해주세요.</option>
                            <option>소프트웨어콘텐츠과</option>
                            <option>컴퓨터공학과</option>
                            <option>산업디자인과</option>
                        </select>
                    </div>
                    <div>
                        <p>품목 구분 :</p>
                        <select name="use_division" onChange={onChange}>
                            <option>품목 구분을 선택해주세요.</option>
                            <option>교육용</option>
                            <option>실습용</option>
                        </select>
                    </div>
                    <div>
                        <p>품목 코드 :</p>
                        <input
                            type="text"
                            name="code"
                            value={values.code}
                            onChange={onChange}
                            placeholder="예) 9115"
                        />
                    </div>
                    <div>
                        <p>자산 번호 :</p>
                        <input
                            type="text"
                            name="id"
                            value={values.id}
                            onChange={onChange}
                            placeholder="예)2017021402226"
                        />
                    </div>
                    <div>
                        <p>구입 구분 :</p>
                        <input
                            type="text"
                            name="purchase_division"
                            value={values.purchase_division}
                            onChange={onChange}
                            placeholder="예)교비(등록금)"
                        />
                    </div>
                    <div>
                        <p>구입 일자 :</p>
                        <input
                            type="date"
                            name="purchase_date"
                            value={values.purchase_date}
                            onChange={onChange}
                        />
                    </div>
                    <div>
                        <p>품목 규격 :</p>
                        <input
                            type="text"
                            name="standard"
                            value={values.standard}
                            onChange={onChange}
                            placeholder="예)LG G패드 3 8.0"
                        />
                    </div>
                </div>
                <button type="submit">
                    기자재 등록하기
                </button>
            </form>
        </div >
    );
}