import { Form, Radio } from "antd";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import CustomInput from "../../components/CustomInput ";

function SignupPage() {
  const [value, setValue] = useState<number>(1); // 초기값을 1로 설정
  const navigate = useNavigate();
  return (
    <>
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
      <div className="flex-col-start p-20 gap-10 w-[1280px] mx-auto">
        <div className="flex flex-col items-center w-[960px] max-w-[960px]">
          {/* 헤더 */}
          <div className="flex flex-col items-center p-5 w-full">
            <h1 className="w-full text-center font-lexend font-bold text-[22px] leading-7 text-brand-default">
              회원가입
            </h1>
          </div>

          {/* 메인 폼 */}
          <Form className="flex-col-start w-[745px] gap-4 mx-auto">
            {/* 회원 타입 선택 */}
            <div className="flex items-center w-full h-12">
              <span className="text-base font-medium text-brand-default w-[120px] gap-[80px]">
                회원타입 *
              </span>
              <Radio.Group
                value={value}
                onChange={e => setValue(e.target.value)}
                options={[
                  { value: 1, label: "학생" },
                  { value: 2, label: "학부모" },
                  { value: 3, label: "학생관계자" },
                ]}
              />
            </div>

            {/* 입력 필드들 */}
            <InputField
              label="이메일 *"
              placeholder="이메일을 입력해주세요"
              hasButton
            />
            <InputField
              label="비밀번호 *"
              placeholder="7~16자 이상 특수문자와 대소문자 1자 이상 입력해주세요"
            />
            <InputField
              label="비밀번호 확인 *"
              placeholder="비밀번호를 입력해 주세요"
            />
            <InputField label="이름 *" placeholder="이름을 입력해 주세요" />
            <InputField
              label="닉네임 *"
              placeholder="닉네임을 입력해 주세요"
              hasButton
            />
            <InputField
              label="휴대폰 번호 *"
              placeholder="전화번호를 입력해 주세요"
            />

            {/* 프로필 이미지 */}
            <div className="flex flex-col gap-2.5">
              <span className="text-base font-medium text-brand-default">
                프로필 이미지
              </span>
              <div className="flex justify-center items-center w-[120px] h-[120px] border border-[#DBE0E6] rounded-xl">
                <span className="text-4xl text-[#637887]">+</span>
              </div>
            </div>

            {/* 약관 동의 */}
            <div className="border border-[#DBE0E5] rounded-xl w-[448px]">
              <CheckboxField
                label="약관 전체 동의"
                className="border-b border-[#DBE0E5] p-5"
              />
              <CheckboxField label="이용 약관에 동의합니다." className="p-4" />
              <CheckboxField
                label="개인정보 수집 및 이용에 동의합니다."
                className="p-4"
              />
            </div>

            {/* 회원가입 버튼 */}
            <button className="w-[480px] h-10 bg-[#F0F2F5] rounded-xl font-bold text-sm text-brand-default">
              회원가입
            </button>
          </Form>
        </div>
      </div>
    </>
  );
}

// 재사용 가능한 컴포넌트들
interface InputFieldProps {
  label: string;
  placeholder: string;
  hasButton?: boolean;
}

const InputField = ({ label, placeholder, hasButton }: InputFieldProps) => (
  <div className="flex flex-col gap-2.5 w-full">
    <span className="text-base font-medium text-brand-default">{label}</span>
    <div className="flex gap-3">
      <CustomInput placeholder={placeholder} width="351px" />
      {hasButton && (
        <button className="w-[84px] h-14 bg-[#E8EEF3] rounded-xl font-bold text-sm">
          중복확인
        </button>
      )}
    </div>
  </div>
);

interface CheckboxFieldProps {
  label: string;
  className?: string;
}

const CheckboxField = ({ label, className }: CheckboxFieldProps) => (
  <div className={`flex items-center gap-3 ${className}`}>
    <div className="w-5 h-5 border-2 border-[#DBE0E6] rounded" />
    <span className="text-base text-brand-default">{label}</span>
  </div>
);

export default SignupPage;
