import Login from "components/login/Login";
import Main from "components/main/Main";
import RentalList from "components/rentalList/RentalList";
import RentalLog from "components/rentalList/rentalLog/RentalLog";
import AddTool from "components/tool/AddTool";
import AddToolExcel from "components/tool/AddToolExcel";
import ChangeInfo from "components/tool/changeInfo/ChangeInfo";
import { Link, Route, Routes, useParams } from "react-router-dom";

export default function App() {
  return (
    <Routes>
      <Route path="*" element={<NotFoundPage />} />
      <Route path="/" element={<Login />} />
      <Route path="/home" element={
        <Main>
          <RentalList />
        </Main>} />
      <Route path="/home/rentalList" element={
        <Main>
          <RentalList />
        </Main>} />
      <Route path="/home/rentalList/rentalLog" element={
        <Main>
          <RentalLog />
        </Main>
      } />
      <Route path="/home/myRentalList" element={
        <Main>

        </Main>
      } />
      <Route path="/tool/changeInfo" element={
        <Main>
          <ChangeInfo />
        </Main>
      } />
      <Route path="/tool/addTool" element={
        <Main>
          <AddTool />
        </Main>
      } />
      <Route path="/tool/addToolExcel" element={
        <Main>
          <AddToolExcel />
        </Main>
      } />
      <Route path="/home/:params" element={<NotFoundPage />} />
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
