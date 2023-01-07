import { Link } from "react-router-dom";
import styled from "styled-components";

export default function ChangeInfoUser() {
    return (
        <>
            <div id="contents-header" style={{
                justifyContent: "space-between",
                width: "100%",
                // alignItems: "flex-start",
                // flexDirection: "column",
            }}>
                <h3>기자재 건의사항</h3>
                <button style={{
                    width: "98px",
                    height: "36px",
                    backgroundColor: "#9785CB",
                    border: "solid 1px #9785CB",
                    borderRadius: "8px",
                    fontWeight: "700",
                    color: "#f5f5f5"
                }}>
                    정보 수정
                </button>
            </div>
            <div style={{
                fontWeight: "700",
                color: "#676767",
            }}>
                <p>대여자 : 홍길동(학부생) <br />
                    학과 : 소프트웨어콘텐츠 <br />
                    전화번호 : 010 - 1234 - 5678
                </p>
                <p>
                    학번 : 2021661096<br />
                    이메일 : testuser@test.com
                </p>
            </div>
            <hr style={{
                border: "solid 1px #9785CB"
            }} />
            <div id="contents-header" style={{
                justifyContent: "space-between",
            }}>
                <h3>최근 대여 품목</h3>
                <Link to={"/home"}>더보기</Link>
            </div>
            <div style={{
                display: "flex",
                justifyContent: "space-between",
                paddingBottom: "32px",
                borderBottom: "solid 1px black"
            }}>
                <RentalPackage>
                    <div style={{
                        display: "flex",
                    }}>
                        <img src="https://www.lenovo.com/medias/lenovo-tablet-lenovo-tab-p12-pro-subseries-hero.png?context=bWFzdGVyfHJvb3R8MjM1NTEwfGltYWdlL3BuZ3xoOTgvaGQ3LzEyNjgwMzcxOTI5MTE4LnBuZ3wzZjU1YzNmYmMzZDgxOTQ5NjBkZjU2ZThhNmUxZGMzY2E2ZjM3ZjM1OGMyZDA4YzhjNTBhNjUxZDRhMDlhZjgx" alt="태블릿" />
                        <div style={{
                            marginRight: "8px"
                        }}>
                            <span>스마트 패드</span> &nbsp; 대여 중
                            <p id="code">
                                품목 코드 : 9115 <br />
                                자산번호 : 2017021402226
                            </p>
                            <p id="info">
                                구입 구분 : 교비 (등록금) <br />
                                구입 일자 : 2017년 2월 14일 <br />
                                물품 규격 : LG G패드 3 8.0 Wi-Fi 32G
                            </p>
                        </div>
                    </div>
                    <div style={{
                        textAlign: "center"
                    }}>
                        <h3>D - 7</h3>
                        <p>~ 11 / 30</p>
                    </div>
                </RentalPackage>
                <RentalPackage>
                    <div style={{
                        display: "flex",
                    }}>
                        <img src="https://www.lenovo.com/medias/lenovo-tablet-lenovo-tab-p12-pro-subseries-hero.png?context=bWFzdGVyfHJvb3R8MjM1NTEwfGltYWdlL3BuZ3xoOTgvaGQ3LzEyNjgwMzcxOTI5MTE4LnBuZ3wzZjU1YzNmYmMzZDgxOTQ5NjBkZjU2ZThhNmUxZGMzY2E2ZjM3ZjM1OGMyZDA4YzhjNTBhNjUxZDRhMDlhZjgx" alt="태블릿" />
                        <div style={{
                            marginRight: "8px"
                        }}>
                            <span>스마트 패드</span> &nbsp; 대여 중
                            <p id="code">
                                품목 코드 : 9115 <br />
                                자산번호 : 2017021402226
                            </p>
                            <p id="info">
                                구입 구분 : 교비 (등록금) <br />
                                구입 일자 : 2017년 2월 14일 <br />
                                물품 규격 : LG G패드 3 8.0 Wi-Fi 32G
                            </p>
                        </div>
                    </div>
                    <div style={{
                        textAlign: "center"
                    }}>
                        <h3>D - 7</h3>
                        <p>~ 11 / 30</p>
                    </div>
                </RentalPackage>
            </div>
            <div id="contents-header" style={{
                justifyContent: "space-between",
            }}>
                <h3>최근 건의 내역</h3>
                <Link to={"/home"}>더보기</Link>
            </div>
            <div style={{
                display: "flex",
                justifyContent: "space-between",
                paddingBottom: "32px",
                borderBottom: "solid 1px black"
            }}>
                <RentalPackage>
                    <div style={{
                        display: "flex",
                    }}>
                        <img src="https://www.lenovo.com/medias/lenovo-tablet-lenovo-tab-p12-pro-subseries-hero.png?context=bWFzdGVyfHJvb3R8MjM1NTEwfGltYWdlL3BuZ3xoOTgvaGQ3LzEyNjgwMzcxOTI5MTE4LnBuZ3wzZjU1YzNmYmMzZDgxOTQ5NjBkZjU2ZThhNmUxZGMzY2E2ZjM3ZjM1OGMyZDA4YzhjNTBhNjUxZDRhMDlhZjgx" alt="태블릿" />
                        <div style={{
                            marginRight: "8px"
                        }}>
                            <span>스마트 패드</span> &nbsp; 대여 중
                            <p id="code">
                                품목 코드 : 9115 <br />
                                자산번호 : 2017021402226
                            </p>
                            <p id="info">
                                구입 구분 : 교비 (등록금) <br />
                                구입 일자 : 2017년 2월 14일 <br />
                                물품 규격 : LG G패드 3 8.0 Wi-Fi 32G
                            </p>
                        </div>
                    </div>
                    <div style={{
                        textAlign: "center"
                    }}>
                        <h3>D - 7</h3>
                        <p>~ 11 / 30</p>
                    </div>
                </RentalPackage>
                <RentalPackage>
                    <div style={{
                        display: "flex",
                    }}>
                        <img src="https://www.lenovo.com/medias/lenovo-tablet-lenovo-tab-p12-pro-subseries-hero.png?context=bWFzdGVyfHJvb3R8MjM1NTEwfGltYWdlL3BuZ3xoOTgvaGQ3LzEyNjgwMzcxOTI5MTE4LnBuZ3wzZjU1YzNmYmMzZDgxOTQ5NjBkZjU2ZThhNmUxZGMzY2E2ZjM3ZjM1OGMyZDA4YzhjNTBhNjUxZDRhMDlhZjgx" alt="태블릿" />
                        <div style={{
                            marginRight: "8px"
                        }}>
                            <span>스마트 패드</span> &nbsp; 대여 중
                            <p id="code">
                                품목 코드 : 9115 <br />
                                자산번호 : 2017021402226
                            </p>
                            <p id="info">
                                구입 구분 : 교비 (등록금) <br />
                                구입 일자 : 2017년 2월 14일 <br />
                                물품 규격 : LG G패드 3 8.0 Wi-Fi 32G
                            </p>
                        </div>
                    </div>
                    <div style={{
                        textAlign: "center"
                    }}>
                        <h3>D - 7</h3>
                        <p>~ 11 / 30</p>
                    </div>
                </RentalPackage>
            </div>
        </>
    );
}

const RentalPackage = styled.div`
   display: flex;
   align-items: center;
   color: #676767;
   font-weight: 700;
   margin-right: 64px;

   
   img {
    width: 160px;
    height: 160px;
    border-radius: 8px;
    border: solid 1px black;
    margin-right: 36px;
   }

   span {
    color: #181818;
   }

   #info {
    font-weight: 400;
   }
`