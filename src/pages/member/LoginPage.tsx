import { Checkbox, Form } from "antd";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import CustomInput from "../../components/CustomInput ";
import MainButton from "../../components/button/MainButton";
import { SecondaryButton } from "../../components/modal/Modal";

function LoginPage() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const navigate = useNavigate();
  const [form] = Form.useForm();

  const onFinish = (values: any) => {
    console.log(values);
  };

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
              <CustomInput placeholder="이메일을 입력해주세요" width="480px" />

              {/* 비밀번호 */}
              <label className="flex text-[16px] w-[120px] font-[500] my-[8px]">
                비밀번호 &nbsp;
                <label className="text-[#D9534F]">*</label>
              </label>
              <CustomInput
                type="password"
                placeholder="비밀번호를 입력해주세요"
                width="480px"
              />

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
                  이메일 / 비밀번호를 잊으셨나요?
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
                onClick={() => {
                  navigate("/");
                }}
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
