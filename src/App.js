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
import ReportLog from "components/myRentalList/ReportLog";
import SignUp from "components/user/signUp/SignUp";
import UserType from "components/user/signUp/userType/UserType";
import Register from "components/user/signUp/userType/register/Register";
import FindID from "components/user/findID/FindID";

export default function App() {
  const [cookies, setCookie, removeCookie] = useCookies(['login']);
  // window.location.reload();
  useEffect(() => {
    console.log("APP render");
  }, []);
  return (
    <Routes>
      <Route path="*" element={<NotFoundPage />} />
      <Route path="/" element={<Login cookies={cookies} setCookie={setCookie} removeCookie={removeCookie} />} />
      <Route path="/user/signUp/userType" element={
        <SignUp>
          <UserType />
        </SignUp>}
      />
      <Route path="/user/signUp/userType/:userType/:page" element={
        <SignUp>
          <Register />
        </SignUp>} />
      <Route path="/user/findId" element={
        <>
          <FindID />
        </>}
      />
      {/* <Route path="/user/signUp/userType/admin" element={<SignUp />} />
      <Route path="/user/signUp/userType/enterprice" element={<SignUp />} /> */}
      {/* <Route path="/home" element={
        <Main userData={cookies}>
          <RentalList userData={cookies} />
        </Main>} /> */}
      <Route path="/home/rentalList" element={
        <Main userData={cookies} logOut={removeCookie}>
          <RentalList userData={cookies} />
        </Main>} />
      <Route path="/home/rentalLog" element={
        <Main userData={cookies} logOut={removeCookie}>
          <RentalLog token={cookies.token} />
        </Main>
      } />
      <Route path="/home/myRentalList" element={
        <Main userData={cookies} logOut={removeCookie}>
          <MyRentalList userData={cookies} />
        </Main>
      } />
      <Route path="/home/myRentalList/reportLog" element={
        <Main userData={cookies} logOut={removeCookie}>
          <ReportLog userData={cookies} />
        </Main>
      } />
      <Route path="/tool/changeInfo" element={
        <Main userData={cookies} logOut={removeCookie}>
          <ChangeInfo userData={cookies} />
        </Main>
      } />
      <Route path="/tool/addTool" element={
        <Main userData={cookies} logOut={removeCookie}>
          <AddTool token={cookies.token} />
        </Main>
      } />
      <Route path="/tool/addToolExcel" element={
        <Main userData={cookies} logOut={removeCookie}>
          <AddToolExcel token={cookies.token} />
        </Main>
      } />
      <Route path="/user/changeInfo" element={
        <Main userData={cookies} logOut={removeCookie}>
          <ChangeInfoUser userInfo={cookies} />
        </Main>
      } />
      <Route path="/user/authorization" element={
        <Main userData={cookies} logOut={removeCookie}>
          <Authorization userData={cookies} />
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
