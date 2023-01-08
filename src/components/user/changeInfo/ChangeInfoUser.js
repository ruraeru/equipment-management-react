import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import PropTypes from 'prop-types';

// const ToDoItem = () => {
//     const [edited, setEdited] = useState(false);
//     const [newText, setNewTest] = useState("text");

//     const editInputRef = useRef(null);

//     useEffect(() => {
//         // edit 모드일때 포커싱을 한다.
//         if (edited) {
//             editInputRef.current.focus();
//         }
//     }, [edited]);

//     const onChangeCheckbox = () => {
//         const nextTodoList = todoList.map((item) => ({
//             ...item,
//             // id 값이 같은 항목의 checked 값을 Toggle 함
//             checked: item.id === todoItem.id ? !item.checked : item.checked,
//         }));

//         setTodoList(nextTodoList);
//     };

//     const onClickEditButton = () => {
//         setEdited(true);
//     };

//     const onChangeEditInput = (e) => {
//         setNewTest(e.target.value);
//     };

//     const onClickSubmitButton = () => {
//         const nextTodoList = todoList.map((item) => ({
//             ...item,
//             text: item.id === todoItem.id ? newText : item.text, // 새로운 아이템 내용을 넣어줌
//         }));
//         setTodoList(nextTodoList);

//         setEdited(false);
//     };

//     return (
//         <li className="todoapp__item">
//             {/* 아이템 완료 체크 / 체크 해제를 위한 체크박스 */}
//             <input
//                 type="checkbox"
//                 className="todoapp__item-checkbox"
//                 checked={todoItem.checked}
//                 onChange={onChangeCheckbox}
//             />
//             {
//                 // 아이템 내용
//                 edited ? (
//                     <input
//                         type="text"
//                         className="todoapp__item-edit-input"
//                         value={newText}
//                         ref={editInputRef}
//                         onChange={onChangeEditInput}
//                     />
//                 ) : (
//                     <span
//                         className={`todoapp__item-ctx ${todoItem.checked ? 'todoapp__item-ctx-checked' : ''
//                             }`}
//                     >
//                         {todoItem.text}
//                     </span>
//                 )
//             }
//             {
//                 // 수정 버튼
//                 // 완료한 일인 경우에는 null을 반환하여 보이지 않도록 함
//                 !todoItem.checked ? (
//                     edited ? (
//                         <button
//                             type="button"
//                             className="todoapp__item-edit-btn"
//                             onClick={onClickSubmitButton}
//                         >
//                             👌
//                         </button>
//                     ) : (
//                         <button
//                             type="button"
//                             className="todoapp__item-edit-btn"
//                             onClick={onClickEditButton}
//                         >
//                             ✏
//                         </button>
//                     )
//                 ) : null
//             }

//             {/* 삭제 버튼 */}
//             <button type="button" className="todoapp__item-delete-btn">
//                 🗑
//             </button>
//         </li>
//     );
// };

export default function ChangeInfoUser() {
    const [todoItem, setTodoItem] = useState({
        "name": "홍길동(학부생)",
        "department": "소프트웨어콘텐츠과",
        "phone_number": "010-1234-5678",
        "student_number": "2022661108",
        "email": "testuser@test.com"
    })
    const [edited, setEdited] = useState(false);
    const [newText, setNewText] = useState("text");

    const editInputRef = useRef(null);

    // useEffect(() => {
    //     if (edited) editInputRef.current.focus();
    // }, [edited]);

    // const onChangeCheckbox = () => {
    //     const nextTodoList = todoList.map((item) => ({
    //         ...item,
    //         // id 값이 같은 항목의 checked 값을 Toggle 함
    //         checked: item.id === todoItem.id ? !item.checked : item.checked,
    //     }));

    //     setTodoList(nextTodoList);
    // };

    // const onClickEditButton = () => {
    //     setEdited(true);
    // };

    // const onChangeEditInput = (e) => {
    //     setNewText(e.target.value);
    // };

    // const onClickSubmitButton = () => {
    //     const nextTodoList = todoList.map((item) => ({
    //         ...item,
    //         text: item.id === todoItem.id ? newText : item.text, // 새로운 아이템 내용을 넣어줌
    //     }));
    //     setTodoList(nextTodoList);

    //     setEdited(false);
    // }

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
                <p>대여자 : {todoItem.name} <br />
                    학과 : {todoItem.department} <br />
                    전화번호 : {todoItem.phone_number}
                </p>
                <p>
                    학번 : {todoItem.student_number}<br />
                    이메일 : {todoItem.email}
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
                        textAlign: "center",
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