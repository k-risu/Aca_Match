import Layout from "./components/Layout";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { ConfigProvider } from "antd";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/member/LoginPage";
import SignupPage from "./pages/member/SignupPage";
import SignupEnd from "./pages/member/SignupEnd";
import MyPage from "./pages/mypage/MyPage";
import AcademySearch from "./pages/AcademySearch";
import AcademyDetail from "./pages/AcademyDetail";
import Support from "./pages/Support";
import NotFoundPage from "./pages/NotFoundPage";
import MyPageRecord from "./pages/mypage/MyPageRecord";
import MyPageLike from "./pages/mypage/MyPageLike";
import MyPageUserInfo from "./pages/mypage/MyPageUserInfo";
import MypageReview from "./pages/mypage/MypageReview";
import AcademyList from "./pages/mypage/academy/AcademyList";
import AcademyAdd from "./pages/mypage/academy/AcademyAdd";
import AcademyClassAdd from "./pages/mypage/academy/AcademyClassAdd";

function App() {
  return (
    <ConfigProvider
      theme={{
        components: {
          // Seed Token
          Button: {
            borderRadius: 12,
            colorPrimary: "#3B77D8",
            colorPrimaryHover: "#2F5FB5",
            algorithm: true, // Enable algorithm
          },
        },
        token: {
          colorError: "#3b77d8", // 오류 색상
          fontSizeSM: 14, // 작은 텍스트 크기
        },
      }}
    >
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/signup/end" element={<SignupEnd />} />
            <Route path="/mypage">
              <Route index element={<MyPage />} />
              <Route path="/mypage/record" element={<MyPageRecord />} />
              <Route path="/mypage/like" element={<MyPageLike />} />
              <Route path="/mypage/user" element={<MyPageUserInfo />} />
              <Route path="/mypage/review" element={<MypageReview />} />
            </Route>
            <Route path="/mypage/academy">
              <Route index element={<AcademyList />} />
              <Route path="/mypage/academy/add" element={<AcademyAdd />} />
              <Route
                path="/mypage/academy/classAdd"
                element={<AcademyClassAdd />}
              />
            </Route>
            <Route path="/academy">
              <Route index element={<AcademySearch />} />
              <Route path="detail?id={id}" element={<AcademyDetail />} />
            </Route>
            <Route path="/support" element={<Support />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Layout>
      </Router>
    </ConfigProvider>
  );
}

export default App;
