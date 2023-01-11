import Authorization from "components/user/authorization/Authorization";
import Login from "components/login/Login";
import Main from "components/main/Main";
import MyRentalList from "components/myRentalList/MyRentalList";
import RentalList from "components/rentalList/RentalList";
import RentalLog from "components/rentalList/rentalLog/RentalLog";
import AddTool from "components/tool/AddTool";
import AddToolExcel from "components/tool/AddToolExcel";
import ChangeInfo from "components/tool/changeInfo/ChangeInfo";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { Link, Route, Routes, useParams } from "react-router-dom";
import ChangeInfoUser from "components/user/changeInfo/ChangeInfoUser";

export default function App() {
  const [cookies, setCookie, removeCookie] = useCookies(['login']);
  // window.location.reload();
  useEffect(() => {
    console.log("APP render");
  }, []);
  return (
    <Routes>
      <Route path="*" element={<NotFoundPage />} />
      <Route path="/" element={<Login setCookie={setCookie} removeCookie={removeCookie} />} />
      <Route path="/home" element={
        <Main userData={cookies}>
          <RentalList />
        </Main>} />
      <Route path="/home/rentalList/:page" element={
        <Main userData={cookies}>
          <RentalList userData={cookies} />
        </Main>} />
      <Route path="/home/rentalList/rentalLog" element={
        <Main userData={cookies}>
          <RentalLog />
        </Main>
      } />
      <Route path="/home/myRentalList" element={
        <Main userData={cookies}>
          <MyRentalList />
        </Main>
      } />
      <Route path="/tool/changeInfo" element={
        <Main userData={cookies}>
          <ChangeInfo userData={cookies} />
        </Main>
      } />
      <Route path="/tool/addTool" element={
        <Main userData={cookies}>
          <AddTool />
        </Main>
      } />
      <Route path="/tool/addToolExcel" element={
        <Main userData={cookies}>
          <AddToolExcel />
        </Main>
      } />
      <Route path="/user/changeInfo" element={
        <Main userData={cookies}>
          <ChangeInfoUser userInfo={cookies} />
        </Main>
      } />
      <Route path="/user/authorization" element={
        <Main userData={cookies}>
          <Authorization />
        </Main>
      } />
    </Routes>
  );
}

const NotFoundPage = () => {
  const { params } = useParams();
  return (
    <>
      <h1>{params}는 존재하지 않는 페이지 입니다.</h1>
      <Link to="/">홈으로 가기</Link>
    </>
  )
}
