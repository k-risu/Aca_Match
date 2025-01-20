import Layout from "./components/Layout";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/member/LoginPage";
import SignupPage from "./pages/member/SignupPage";
import SignupEnd from "./pages/member/SignupEnd";
import MyPage from "./pages/mypage/MyPage";
import AcademySearch from "./pages/AcademySearch";
import AcademyDetail from "./pages/AcademyDetail";
import Support from "./pages/Support";
import NotFoundPage from "./pages/NotFoundPage";
import { ConfigProvider } from "antd";
import MyPageRecord from "./pages/mypage/MyPageRecord";
import MyPageLike from "./pages/mypage/MyPageLike";

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
