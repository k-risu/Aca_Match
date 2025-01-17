import Layout from "./components/Layout";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/member/LoginPage";
import SignupPage from "./pages/member/SignupPage";
import SignupEnd from "./pages/member/SignupEnd";
import MyPage from "./pages/MyPage";
import AcademySearch from "./pages/AcademySearch";
import AcademyDetail from "./pages/AcademyDetail";
import Support from "./pages/Support";
function App() {
  return (
    <>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/signup/end" element={<SignupEnd />} />
            <Route path="/mypage" element={<MyPage />} />
            <Route path="/academy">
              <Route index element={<AcademySearch />} />
              <Route path="detail?id={id}" element={<AcademyDetail />} />
            </Route>
            <Route path="/support" element={<Support />} />
          </Routes>
        </Layout>
      </Router>
    </>
  );
}

export default App;
