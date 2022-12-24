import Search from "components/search/Search";
import "./RentalList.scss";
import { useEffect, useState } from "react";
import axios from "axios";

export default function RentalList() {
    const [rentalList, setRentalList] = useState();
    const [rentalListPage, setRentalListPage] = useState(1);
    const getRentalList = async () => {
        await axios.get(`http://120.142.105.189:5080/tool/viewToolList/1/${rentalListPage}`)
            .then(res => {
                if (res.data.suc) {
                    setRentalList(res.data.result);
                }
                else Promise.reject(new Error("rentalList API 호출 실패"));
            }).catch(err => {
                console.log("rentalList API 오류", err);
            });
    }

    useEffect(() => {
        getRentalList(1, rentalListPage);
    }, [rentalListPage]);

    return (
        <div style={{
            width: "100%"
        }}>
            <div id="contents-header">
                <h3>대여 목록</h3>
                <p>대여 로그</p>
                <Search />
            </div>
            <table id="equipment-list">
                <thead>
                    <tr>
                        <th>
                            <input type="checkbox" />
                        </th>
                        <th>구분</th>
                        <th>관리 부서</th>
                        <th>기자재명</th>
                        <th>자산 번호</th>
                        <th>기자재 상태</th>
                    </tr>
                </thead>
                <tbody>
                    {rentalList && rentalList.map((item, index) => (
                        <tr key={index}>
                            <td>
                                <input type="checkbox" />
                            </td>
                            <td>{item.tool_use_division}</td>
                            <td>{item.department.department_name}</td>
                            <td>{item.tool_name}</td>
                            <td>{item.tool_id}</td>
                            <td className={
                                item.tool_state === "대여가능"
                                    ? "rentalT"
                                    : item.tool_state === "대여 중"
                                        ? "rentalI"
                                        : "rentalF"
                            }>{item.tool_state}</td>
                        </tr>
                    ))}
                    {rentalList && rentalList.map((item, index) => (
                        <tr key={index}>
                            <td>
                                <input type="checkbox" />
                            </td>
                            <td>{item.tool_use_division}</td>
                            <td>{item.department.department_name}</td>
                            <td>{item.tool_name}</td>
                            <td>{item.tool_id}</td>
                            <td className={
                                item.tool_state === "대여가능"
                                    ? "rentalT"
                                    : item.tool_state === "대여 중"
                                        ? "rentalI"
                                        : "rentalF"
                            }>{item.tool_state}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <footer>
                <p>
                    &lt;
                </p>
                {/* <ul style={{
                    display: "inline-flex",
                    listStyle: "none",
                }}>
                    <li>1</li>
                    <li>2</li>
                    <li>3</li>
                    <li>4</li>
                    <li>5</li>
                </ul> */}
                <button onClick={() => setRentalListPage(1)}>1</button>
                <button onClick={() => setRentalListPage(2)}>2</button>
                <button onClick={() => setRentalListPage(2)}>3</button>
                <button onClick={() => setRentalListPage(2)}>4</button>
                <button onClick={() => setRentalListPage(2)}>5</button>
                <p>
                    &gt;
                </p>
            </footer>
        </div>
    );
}