import "./Profile.scss";

export default function Profile() {
    return (
        <div style={{
            display: "flex",
            flexDirection: "column",
            height: "100vh",
            marginLeft: "50px"
        }}>
            <div id="profile-wrap">
                <div style={{
                    borderBottom: "2px solid rgba(103, 103, 130, 0.3)"
                }}>
                    <p>
                        <b>2022661108</b> 교번
                    </p>
                    <p>
                        <b>홍길동</b> 님
                    </p>
                    <p>(관리자)</p>
                </div>
                <hr />
                <div id="navigation">
                    <a>대여 목록</a>
                    <a>내 대여 내역</a>
                    <a>회원 정보 수정</a>
                    <a>기자재 정보 수정</a>
                    <a>기자재 추가</a>
                </div>
            </div>
            <div style={{
                backgroundColor: "#F5F5F5",
                width: "220px",
                borderRadius: "15px",
                marginTop: "24px"
            }}>
                <p>내 대여 목록</p>
                <div>
                    <h3>D - 1</h3>
                    <p>
                        스마트 패드 <br />
                        품목 코드 : 9115
                    </p>
                </div>
            </div>
        </div>
    );
}