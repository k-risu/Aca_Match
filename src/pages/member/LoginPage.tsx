import { Checkbox, Form, Input } from "antd";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import userInfo from "../../atoms/userInfo";
import MainButton from "../../components/button/MainButton";
import { SecondaryButton } from "../../components/modal/Modal";
import { removeCookie, setCookie } from "../../utils/cookie";

function LoginPage() {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const setUserInfo = useSetRecoilState(userInfo);
  // const currentUserInfo = useRecoilValue(userInfo); // 현재 userInfo 값을 가져옴

  const onFinish = async (values: any) => {
    try {
      const response = await axios.post("/api/user/sign-in", values);
      const { name, roleId, userId } = response.data.resultData;

      setCookie("accessToken", response.data.resultData.accessToken);

      navigate("/");
      setUserInfo({
        name,
        roleId: String(roleId),
        userId: String(userId),
      });
      console.log(response.data.resultData.accessToken);
      console.log(response);
    } catch (error) {
      console.error(error);
      removeCookie("accessToken");
    }
  };
  // const on = async (values: any) => {
  //   try {
  //     const response = await axios.post("/api/user/access-token", values);
  //     const { name, roleId, userId } = response.data.resultData;

  //     setCookie("accessToken", response.data.resultData.accessToken);

  //     navigate("/");
  //     setUserInfo({
  //       name,
  //       roleId: String(roleId),
  //       userId: String(userId),
  //     });
  //     console.log(response.data.resultData.accessToken);
  //     console.log(response);
  //   } catch (error) {
  //     console.error(error);
  //     removeCookie("accessToken");
  //   }
  // };
  // useEffect(() => {
  //   console.log("Current userInfo:", currentUserInfo);
  // }, [currentUserInfo]); // userInfo가 변경될 때마다 로그 출력

  return (
    <div>
      <header className="sticky top-0 left-0 right-0 z-50 flex items-center h-[64px] bg-white border-b border-brand-BTWhite">
        <div className="w-[1280px] flex items-center justify-between mx-auto  ">
          <div
            className="w-[210px] h-[40px] cursor-pointer mr-[full]"
            onClick={() => {
              navigate("/");
            }}
          >
            로고
          </div>
        </div>
      </header>
      <Form
        form={form}
        onFinish={onFinish}
        className="flex flex-col justify-center mx-auto "
      >
        <main className="flex justify-center items-center">
          <div className="flex flex-col items-center px-5 py-6 w-full max-w-[960px]">
            {/* 로그인 Title */}
            <div className="flex flex-col items-center px-4 py-3 w-full h-[60px]">
              <p className="text-center text-text-dark text-2xl font-[600]">
                로그인
              </p>
            </div>

            <div className="flex flex-col mb-[16px]">
              {/* 이메일 필드 */}
              <label className="flex text-[16px] w-[120px] font-[500] mb-[8px]">
                이메일 &nbsp;
                <label className="text-[#D9534F]">*</label>
              </label>
              <Form.Item
                name="email"
                rules={[
                  { required: true, message: "이메일을 입력해주세요" },
                  {
                    pattern: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/,
                    message: "올바른 이메일 형식이 아닙니다",
                  },
                ]}
              >
                <Input
                  placeholder="이메일을 입력해주세요"
                  style={{ width: "480px", height: "56px" }}
                />
              </Form.Item>

              {/* 비밀번호 */}
              <label className="flex text-[16px] w-[120px] font-[500] my-[8px]">
                비밀번호 &nbsp;
                <label className="text-[#D9534F]">*</label>
              </label>
              <Form.Item
                name="upw"
                rules={[
                  {
                    required: true,
                    message: "비밀번호는 필수 입력 항목입니다.",
                  },
                  {
                    pattern:
                      /^(?=.*[A-Za-z])(?=.*\d|.*\W)|(?=.*\d)(?=.*\W)[A-Za-z\d\W]{8,16}$/,
                    message:
                      "8~16자 이내이며, 영문자와 숫자 또는 특수문자를 조합해야 합니다.",
                  },
                ]}
              >
                <Input.Password
                  type="password"
                  placeholder="비밀번호를 입력해주세요"
                  style={{ width: "480px", height: "56px" }}
                />
              </Form.Item>

              {/* 아이디 기억하기 */}
              <div className="flex items-center justify-between mt-[8px]">
                <Checkbox value="remember" id="remember-checkbox">
                  <label
                    htmlFor="remember-checkbox"
                    className="text-[14px] text-brand-default whitespace-nowrap"
                  >
                    아이디 기억하기
                  </label>
                </Checkbox>
                <span
                  className="text-right text-text-gray text-sm mt-2 whitespace-nowrap cursor-pointer"
                  onClick={() => {
                    navigate("/");
                  }}
                >
                  비밀번호를 잊으셨나요?
                </span>
              </div>
            </div>

            <div className="flex flex-col items-center gap-[8px]">
              {/* 회원가입 버튼 */}
              <SecondaryButton
                onClick={() => {
                  navigate("/signup");
                }}
                className={`px-4 py-2 w-[480px] h-[40px]`}
              >
                회원가입
              </SecondaryButton>

              {/* SNS 로그인 */}
              <SecondaryButton
                onClick={() => {
                  navigate("/");
                }}
                className={`px-4 py-2 w-[480px] h-[40px]`}
              >
                Log in with kakao
              </SecondaryButton>

              {/* Google 로그인 */}
              <SecondaryButton
                onClick={() => {
                  navigate("/");
                }}
                className={`px-4 py-2 w-[480px] h-[40px]`}
              >
                Log in with Google
              </SecondaryButton>

              {/* 로그인 버튼 */}
              <MainButton
                type="primary"
                htmlType="submit"
                onClick={() => {}}
                className={`px-4 py-2 w-[480px] h-[40px]`}
              >
                로그인
              </MainButton>
            </div>
          </div>
        </main>
      </Form>
    </div>
  );
}

export default LoginPage;
