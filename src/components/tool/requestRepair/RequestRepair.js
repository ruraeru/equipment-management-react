import axios from "axios";
import DetailEquipment from "components/detail/DetailEquipment";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import styled from "styled-components";

export default function RequestRepair({ userData }) {
    const tool_id = useParams().tool_id;
    const [equipmentData, setEquipmentData] = useState();
    const [repairReason, setRepairReason] = useState("");

    useEffect(() => {
        getEquipmentData();
    }, []);

    const setRequestRepair = async () => {
        await axios.post(`${process.env.REACT_APP_DOMAIN}/repair/requestRepair`, {
            repair_reason: repairReason,
            tool_id: tool_id,
            user_id: userData.login.user_id
        }).then((res) => {
            console.log(res);
        })
    }

    const getEquipmentData = async () => {
        await axios.get(`${process.env.REACT_APP_DOMAIN}/tool/viewTool`, {
            params: {
                tool_id: tool_id
            },
            headers: {
                token: userData.token
            }
        }).then(res => {
            console.log(res.data.tool);
            if (res.data.suc) {
                setEquipmentData(res.data.tool);
            }
            else Promise.reject(new Error(res.data.error));
        }).catch(err => {
            console.log(err);
        });
    }
    return (
        <div style={{
            position: "relative"
        }}>
            <h1>기자재 수리 요청</h1>
            {equipmentData &&
                <div style={{
                    display: "flex",
                }}>
                    <DetailEquipment data={equipmentData} repairBtnActive={false} />
                </div>
            }
            <ReasonWrap>
                <ReasonInput
                    value={repairReason}
                    onChange={(e) => setRepairReason(e.target.value)}
                    placeholder="건의 내용을 작성해주세요."
                />
            </ReasonWrap>
            {/* {tool_id} / {userID} */}
            <RepairRequestBtn onClick={setRequestRepair}>기자재 수리 요청</RepairRequestBtn>
        </div>
    )
}

const ReasonWrap = styled.div`
   width: 100%;
   max-width: 1300px;
   max-height: 350px;
   height: 100vh;
   
   background-color: #f5f5f5;

   border-radius: 30px;
   padding: 24px;
   /* margin-bottom: 20px; */

`;

const ReasonInput = styled.input`
   width: 100%;
   border: none;
   outline: none;
   background: none;
   /* height: 100%; */
`;

const RepairRequestBtn = styled.button`
   width: 130px;
   height: 48px;

   font-size: 16px;
   font-weight: 700;
   color: #fafafa;

   border: none;
   border-radius: 8px;
   background-color: #9785cb;

   margin-top: 24px;
   position: absolute;
   bottom: 1;
   right: 0;
`;