import axios from "axios";
import { userLicense } from "hooks/userSorting";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./DetailEquipment.scss";

export default function DetailEquipment({ data, repairBtnActive, children, due_date }) {
    console.log(data);
    const navigate = useNavigate();
    const { tool_name, tool_code, tool_id, tool_purchase_division, tool_purchase_date, tool_standard, tool_state, tool_update_at }
        = data.result;
    useEffect(() => {

        loadEquipmentImg();
    }, []);

    const loadEquipmentImg = async () => {
        const img = document.getElementById("equipment-img");
        if (data.image) {
            img.src = `${process.env.REACT_APP_DOMAIN}/tool/${data.image.img_url}`;
        }
    }
    return (
        <div id="detail-equipment" style={{
            height: "218px"
        }}>
            <div>
                <img id="equipment-img" src="https://www.lenovo.com/medias/lenovo-tablet-lenovo-tab-p12-pro-subseries-hero.png?context=bWFzdGVyfHJvb3R8MjM1NTEwfGltYWdlL3BuZ3xoOTgvaGQ3LzEyNjgwMzcxOTI5MTE4LnBuZ3wzZjU1YzNmYmMzZDgxOTQ5NjBkZjU2ZThhNmUxZGMzY2E2ZjM3ZjM1OGMyZDA4YzhjNTBhNjUxZDRhMDlhZjgx" alt="태블릿" />
            </div>
            <div id="information">
                <div>
                    <p className="equipment-name">
                        <span>{tool_name}</span> &nbsp; {tool_state}
                    </p>
                    <p className="equipment-code">
                        품목 코드 : &nbsp; {tool_code} <br />
                        자산 번호 : &nbsp; {tool_id} <br />
                        변동 일자 : &nbsp; {tool_update_at.split("-")[0]} / {tool_update_at.split("-")[1]} / {tool_update_at.split("-")[2].slice(0, 2)}
                    </p>
                    <p className="equipment-detail">
                        구입구분 : &nbsp; {tool_purchase_division} <br />
                        구입 일자 : &nbsp; {tool_purchase_date?.split("-")[0]}년&nbsp;
                        {tool_purchase_date.split("-")[1]}월&nbsp;
                        {tool_purchase_date.split("-")[2]?.slice(0, 2)}일 <br />
                        물품 규격 : &nbsp; {tool_standard}
                    </p>
                </div>
            </div>
            <div id="information" style={{
                paddingLeft: "100px",
            }}>
                {data.rental &&
                    <div>
                        <p className="equipment-name">
                            <span>대여 정보</span>
                        </p>
                        <div className="equipment-code" style={{
                            width: "100%",
                        }}>
                            <p style={{
                                marginBottom: 0
                            }}>
                                대여자: &nbsp; {data.rental.user.user_name} ({userLicense(data.rental.user.user_license).userType}) <br />
                            </p>
                            <p style={{
                                textAlign: "right",
                                marginTop: 0
                            }}>
                                대여 기간: &nbsp;
                                {data.rental?.rental_date?.split("-")[0]} / {data.rental?.rental_date?.split("-")[1]} / {data.rental?.rental_date?.split("-")[2].slice(0, 2)} <br />
                                ~ {data.rental?.rental_due_date?.split("-")[0]} / {data.rental?.rental_due_date?.split("-")[1]} / {data.rental?.rental_due_date?.split("-")[2].slice(0, 2)}
                                <br />
                                (남은 기간 : {Math.floor((new Date(data.rental.rental_due_date.split("T")[0]) - new Date()) / (1000 * 60 * 60 * 24))}일)
                            </p>
                        </div>
                    </div>
                }
            </div>
            {due_date &&
                <div id="due_date">
                    <p>
                        <b>{due_date.D_day}</b> <br />
                        ~ {due_date.due_date.split("-")[1]} / {due_date.due_date.split("-")[2].slice(0, 2)}
                    </p>
                </div>
            }
            <div style={{
                display: "flex",
                flexDirection: "column",
            }}>
                {repairBtnActive && <button onClick={() => navigate(`/tool/requestRepair/${tool_id}`)}>기자재 수리 요청</button>}
                {children}
            </div>
        </div>
    );
}