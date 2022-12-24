import Main from "components/main/Main";
import { Link, Route, Routes, useParams } from "react-router-dom";

export default function App() {
  return (
    <Routes>
      <Route path="*" element={<NotFoundPage />} />
      <Route path="/" element={<Main />} />
    </Routes>
  );
}

const NotFoundPage = () => {
  const { params } = useParams();
  return (
    <>
      <h1>{`${params}는 존재하지 않는 페이지 입니다.`}</h1>
      <Link to="/">홈으로 가기</Link>
    </>
  )
}
