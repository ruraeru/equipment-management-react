import { SiMicrosoftexcel } from "react-icons/si";
import "./AddTool.scss";

export default function AddTool() {
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
    return (
        <div className="add-tool-wrap" style={{
            position: "relative"
        }}>
            <h3>대여 목록</h3>
            <div id="input-filed-wrap">
                <img
                    src="https://www.lenovo.com/medias/lenovo-tablet-lenovo-tab-p12-pro-subseries-hero.png?context=bWFzdGVyfHJvb3R8MjM1NTEwfGltYWdlL3BuZ3xoOTgvaGQ3LzEyNjgwMzcxOTI5MTE4LnBuZ3wzZjU1YzNmYmMzZDgxOTQ5NjBkZjU2ZThhNmUxZGMzY2E2ZjM3ZjM1OGMyZDA4YzhjNTBhNjUxZDRhMDlhZjgx"
                    alt="태블릿"
                    style={{
                        width: "240px",
                        height: "240px"
                    }}
                />
                <div id="input-filed">
                    <label>이미지 파일 불러오기</label>
                    <div className="filebox">
                        <input type="file" id="file" onChange={onFileChange} />
                    </div>
                    <label>기자재 명칭</label>
                    <input type="text" />
                </div>
            </div>
            <div id="equipment-input-info-wrap">
                <div>
                    <p>관리 부서 :</p>
                    <select>
                        <option>관리 부서를 선택해주세요.</option>
                        <option>소프트웨어콘텐츠과</option>
                        <option>컴퓨터공학과</option>
                        <option>산업디자인과</option>
                    </select>
                </div>
                <div>
                    <p>품목 구분 :</p>
                    <select>
                        <option>품목 구분을 선택해주세요.</option>
                        <option>교육용</option>
                        <option>실습용</option>
                    </select>
                </div>
                <div>
                    <p>품목 코드 :</p>
                    <input type="text" placeholder="예) 9115" />
                </div>
                <div>
                    <p>자산 번호 :</p>
                    <input type="text" placeholder="예)2017021402226" />
                </div>
                <div>
                    <p>구입 구분 :</p>
                    <input type="text" placeholder="예)교비(등록금)" />
                </div>
                <div>
                    <p>구입 일자 :</p>
                    <input type="date" />
                </div>
                <div>
                    <p>품목 규격 :</p>
                    <input type="text" placeholder="예)LG G패드 3 8.0" />
                </div>
            </div>
            <button>
                기자재 등록하기
            </button>
        </div>
    );
}