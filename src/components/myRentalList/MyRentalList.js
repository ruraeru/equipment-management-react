import Search from "components/search/Search";
import { useHeaderActive } from "hooks/useActive";
import { Link } from "react-router-dom";

export default function MyRentalList() {
    return (
        <>
            <div id="contents-header">
                <Link to="/home/myRentalList"
                    className={useHeaderActive("/home/myRentalList") ? "active" : null}>
                    내 대여 내역
                </Link>
                <Link to="/home/myRentalList/reportLog" className={useHeaderActive("/home/myRentalList/rentalLog") ? "active" : null}>
                    내 건의 내역
                </Link>
                <Link to="/home/myRentalList/rentalListManagement" className={useHeaderActive("/home/myRentalList/rentalLog") ? "active" : null}>
                    대여 관리
                </Link>
                <Search />
            </div>
            <table>
                <thead>
                    <tr>
                        <th>날짜</th>
                        <th>구분</th>
                        <th>관리 부서</th>
                        <th>기자재명</th>
                        <th>자산 번호</th>
                        <th>기자재 상태</th>
                    </tr>
                </thead>
                <tbody>
                    <tr onClick={(e) => {
                        console.log(e.target.parentElement.remove());
                        e.target.parentNode.append(12)
                    }}>
                        <td>11 / 16</td>
                        <td>교육용</td>
                        <td>소프트웨어콘텐츠 과</td>
                        <td>스마트 패드</td>
                        <td>2017021402226</td>
                        <td>대여중</td>
                    </tr>
                </tbody>
            </table>
        </>
    );
}