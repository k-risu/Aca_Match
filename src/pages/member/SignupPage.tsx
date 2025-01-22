import { PlusOutlined } from "@ant-design/icons";
import styled from "@emotion/styled";
import {
  Button,
  Checkbox,
  CheckboxChangeEvent,
  Divider,
  Form,
  Input,
  Radio,
  Upload,
} from "antd";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import CustomInput from "../../components/CustomInput ";
import { SecondaryButton } from "../../components/modal/Modal";

import "./signupPage.css";

function SignupPage() {
  const [value, setValue] = useState<number | null>(null); // 초기값을 1로 설정
  const [imageUrl, setImageUrl] = useState<string>();
  const navigate = useNavigate();

  const [checkedList, setCheckedList] = useState<string[]>([]);
  const [form] = Form.useForm();

  const plainOptions: { label: string; value: string }[] = [
    // 타입을 명시
    { label: "[필수] 이용 약관에 동의합니다.", value: "required-1" },
    {
      label: "[필수] 개인정보 수집 및 이용에 동의합니다.",
      value: "required-2",
    },
  ];

  const handleChangePassword = () => {
    // 기본 비밀번호 입력값 알아내고
    const pw = form.getFieldValue("password");
    // 비교 비밀번호 입력값 알아내고, 비교한다.
    const pwConfirm = form.getFieldValue("passwordConfirm");
    if (pwConfirm) {
      // 비교 비밀 번호 있으면 비교하겠다.
      setMatch(pw === pwConfirm);
    }
  };

  const checkAll = plainOptions.length === checkedList.length;
  const indeterminate =
    checkedList.length > 0 && checkedList.length < plainOptions.length;
  const onChange = list => {
    setCheckedList(list);
  };
  const onCheckAllChange = e => {
    const newCheckedList = e.target.checked
      ? plainOptions.map(option => option.value)
      : [];
    setCheckedList(newCheckedList);
  };

  // 전체 동의 처리

  const InputStyle = styled.div`
    .ant-input-password input::placeholder {
      color: #507a95 !important; /* 플레이스홀더 색상 */
      opacity: 1;
    }
  `;
  const StyledFormItem = styled(Form)`
    .ant-form-item-explain {
      height: 20px; /* 에러 메시지 공간을 고정 */
      min-height: 20px; /* 최소 높이 설정 */
    }
  `;

  // 개별 체크박스 변경 시 전체 동의 상태 업데이트

  const normFile = (e: any) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };
  const handleButton1Click = () => {
    console.log("중복확인");
  };

  const onCheckboxChange = (list: string[]) => {
    setCheckedList(list);
  };

  const onFinish = (values: any) => {
    console.log("Form values:", values);
    console.log("Checked List:", checkedList);
  };

  // // 전체 동의 체크 상태를 계산
  // const checkAll = checkedList.length === 2; // 두 개의 약관을 모두 체크한 경우
  // const indeterminate = checkedList.length > 0 && checkedList.length < 2; // 일부만 체크된 경우

  // 체크박스 변경 핸들러
  // const onChange = (checkedValues: string[]) => {
  //   setCheckedList(checkedValues);
  // };

  // 전체 동의 체크박스 변경 핸들러
  // const onCheckAllChange = (e: CheckboxChangeEvent) => {
  //   setCheckedList(e.target.checked ? ["personal", "terms"] : []);
  // };

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
      <div className="flex-col-start p-20 pt-[0] gap-10 w-[1280px] mx-auto">
        <div className="flex flex-col w-[960px] max-w-[960px] mx-auto">
          {/* 헤더 */}
          <div className="flex flex-col items-center p-5 w-full">
            <h1 className="w-full text-center font-lexend font-bold text-[22px] leading-7 text-brand-default">
              회원가입
            </h1>
          </div>

          {/* 메인 폼 */}
          <Form
            form={form}
            onFinish={values => onFinish(values)}
            className="flex flex-col justify-center mx-auto"
            initialValues={{
              email: "",
              password: "",
              confirmPassword: "",
              name: "",
              nickname: "",
              phoneNumber: "",
            }}
          >
            {/* 회원 타입 선택 */}
            <Form.Item name="memberType" className="mb-0">
              <div className="flex items-center w-full gap-[12px]">
                <label className="flex text-[16px] text-brand-default w-[120px] font-[500]">
                  회원타입 &nbsp;
                  <label className="text-[#D9534F]">*</label>
                </label>
                <Radio.Group
                  options={[
                    { value: 1, label: "학생" },
                    { value: 2, label: "학부모" },
                    { value: 3, label: "학생관계자" },
                  ]}
                />
              </div>
            </Form.Item>

            {/* 입력 필드들 */}
            <Form.Item
              name="email"
              className="mb-0"
              rules={[
                { required: true, message: "이메일을 입력해주세요." },
                { type: "email", message: "유효한 이메일을 입력해주세요." },
              ]}
            >
              <div className="flex items-center w-full gap-[12px]">
                <label className="flex text-[16px] w-[120px] font-[500]">
                  이메일 &nbsp;
                  <label className="text-[#D9534F]">*</label>
                </label>
                <CustomInput
                  placeholder="이메일을 입력해주세요"
                  width="351px"
                />
                <SecondaryButton
                  onClick={handleButton1Click}
                  className="w-[84px] h-[56px]"
                >
                  중복확인
                </SecondaryButton>
              </div>
            </Form.Item>
            <Form.Item
              style={{ minHeight: "100px" }}
              name="password"
              validateTrigger="onChange"
              className="mb-0"
              rules={[
                {
                  required: true,
                  message: "비밀번호는 필수 입력 항목입니다.",
                },
                {
                  pattern:
                    /^(?=.*[A-Za-z])(?=.*\d|.*\W)|(?=.*\d)(?=.*\W)[A-Za-z\d\W]{8,16}$/,
                  message:
                    "비밀번호는 8~16자 이내이며, 영문자와 숫자 또는 특수문자를 조합해야 합니다.",
                },
              ]}
            >
              <div className="flex items-center w-full gap-[12px]">
                <label className="flex text-[16px] w-[120px] font-[500]">
                  비밀번호 &nbsp;
                  <label className="text-[#D9534F]">*</label>
                </label>
                {/* <CustomInput
                  type="password"
                  placeholder="비밀번호를 입력해주세요"
                /> */}
                {/* <InputStyle> */}
                <Input.Password
                  maxLength={16}
                  placeholder=" 8 ~ 16 자 이내의 특수문자와 대소문자 1자 이상 입력해주세요"
                  onChange={() => {
                    handleChangePassword();
                    form.validateFields(["password"]);
                  }}
                  style={{
                    width: "448px",
                    height: "56px",
                    borderRadius: "12px",
                    fontSize: "14px",
                  }}
                />
                {/* </InputStyle> */}
                {/* <Input.Password placeholder="비밀번호를 입력해주세요" /> */}
                {/* 이유 찾음 이거때문 */}
              </div>
            </Form.Item>
            <Form.Item
              name="passwordConfirm"
              className="mb-0"
              dependencies={["password"]}
              label={<div>테스트</div>}
              rules={[
                {
                  required: true,
                  message: "비밀번호 확인은 필수 입력 항목입니다.",
                },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue("password") === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(
                      new Error(
                        "비밀번호가 일치하지 않습니다. 다시 입력해주세요.",
                      ),
                    );
                  },
                }),
              ]}
            >
              <div className="flex items-center w-full gap-[12px]">
                {/* <label className="flex text-[16px] w-[120px] font-[500]">
                  비밀번호 확인 &nbsp;
                  <label className="text-[#D9534F]">*</label>
                </label> */}
                <Input.Password
                  maxLength={16}
                  className="ant-form-item-control-input-content"
                  placeholder="비밀 번호를 입력해 주세요"
                  style={{
                    width: "448px",
                    height: "56px",
                    borderRadius: "12px",
                    fontSize: "14px",
                  }}
                />
              </div>
            </Form.Item>
            <Form.Item
              name="name"
              className="mb-0"
              rules={[{ required: true, message: "이름을 입력해주세요." }]}
            >
              <div className="flex items-center w-full gap-[12px]">
                <label className="flex text-[16px] w-[120px] font-[500]">
                  이름 &nbsp;
                  <label className="text-[#D9534F]">*</label>
                </label>
                <CustomInput placeholder="이름을 입력해 주세요" />
              </div>
            </Form.Item>
            <Form.Item
              name="nickname"
              className="mb-0"
              rules={[{ required: true, message: "닉네임을 입력해주세요." }]}
            >
              <div className="flex items-center w-full gap-[12px]">
                <label className="flex text-[16px] w-[120px] font-[500]">
                  닉네임 &nbsp;
                  <label className="text-[#D9534F]">*</label>
                </label>
                <CustomInput
                  placeholder="한글자 이상의 닉네임을 입력해주세요"
                  width="351px"
                />
                <SecondaryButton
                  onClick={handleButton1Click}
                  className="w-[84px] h-[56px]"
                >
                  중복확인
                </SecondaryButton>
              </div>
            </Form.Item>
            <Form.Item name="phoneNumber" className="mb-0">
              <div className="flex items-center w-full gap-[12px]">
                <label className="flex text-[16px] w-[120px] font-[500]">
                  휴대폰번호 &nbsp;
                  <label className="text-[#D9534F]">*</label>
                </label>
                <CustomInput placeholder="' - ' 을 포함한 번호를 입력해 주세요" />
              </div>
            </Form.Item>

            <Form.Item
              name="pic"
              valuePropName="user_pic"
              getValueFromEvent={e => (Array.isArray(e) ? e : e?.fileList)}
            >
              <div className="flex items-center w-full gap-[12px] mt-[24px]">
                <label className="flex text-[16px] w-[120px] font-[500] ">
                  프로필 이미지
                </label>
                <Upload
                  action="/upload.do"
                  listType="picture-card"
                  maxCount={1}
                  showUploadList={{
                    showPreviewIcon: false, // 미리보기 아이콘 비활성화
                  }}
                >
                  <button
                    style={{ border: 0, background: "none" }}
                    type="button"
                  >
                    <PlusOutlined />
                    <div style={{ marginTop: 8 }}>Upload</div>
                  </button>
                </Upload>
              </div>
            </Form.Item>

            {/* 약관 동의 */}

            {/* <div className="flex flex-col items-end">
              <div className="flex flex-col border border-[#DBE0E5] rounded-xl w-[448px] ">
                <Form.Item name="allAgree">
                  <div className="border-b border-[#DBE0E5] p-4">
                    <Checkbox
                      indeterminate={indeterminate}
                      onChange={onCheckAllChange}
                      checked={checkAll}
                    >
                      <label className="text-base text-brand-default">
                        약관 동의
                      </label>
                    </Checkbox>
                  </div>
                  <Checkbox.Group value={checkedList} onChange={onChange}>
                    <div className="p-4">
                      <Checkbox value="terms">
                        <label className="text-base text-brand-default">
                          이용 약관에 동의합니다.
                        </label>
                      </Checkbox>
                    </div>
                    <div className="p-4">
                      <Checkbox value="personal">
                        <label className="text-base text-brand-default">
                          개인정보 수집 및 이용에 동의합니다.
                        </label>
                      </Checkbox>
                    </div>
                  </Checkbox.Group>
                </Form.Item>
              </div>
              <Button
                htmlType="submit"
                className="w-[448px] h-10 bg-[#F0F2F5] rounded-xl font-bold text-sm text-brand-default mt-[8px]"
              >
                회원가입
              </Button>
            </div> */}
            <Checkbox
              indeterminate={indeterminate}
              onChange={onCheckAllChange}
              checked={checkAll}
            >
              약관 동의
            </Checkbox>

            <Checkbox.Group
              options={plainOptions}
              value={checkedList}
              onChange={onCheckboxChange}
              style={{ display: "flex", flexDirection: "column", marginTop: 8 }}
            />

            {/* 회원가입 버튼 */}
          </Form>
        </div>
      </div>
    </>
  );
}

export default SignupPage;
