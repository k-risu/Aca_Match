import { PlusOutlined } from "@ant-design/icons";
import styled from "@emotion/styled";
import {
  Button,
  Checkbox,
  CheckboxChangeEvent,
  DatePicker,
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
import axios from "axios";
import dayjs from "dayjs";

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
  const indeterminate: boolean =
    checkedList.length > 0 && checkedList.length < plainOptions.length;
  // const onChange = (list: string[]) => {
  //   setCheckedList(list);
  // };
  const onCheckAllChange = (e: CheckboxChangeEvent) => {
    const newCheckedList = e.target.checked
      ? plainOptions.map(option => option.value)
      : [];
    setCheckedList(newCheckedList);
  };

  const handleButton1Click = () => {
    console.log("중복확인");
  };

  const onCheckboxChange = (list: string[]) => {
    setCheckedList(list);
  };

  const onFinish = async (values: Record<string, unknown>) => {
    const { birthday } = values as { birthday: string }; // Type assertion to ensure birthday is a string
    const formattedBirthday = dayjs(birthday).format("YYYY-MM-DD");
    const { confirmPassword, ...restValues } = values as {
      confirmPassword?: string;
      [key: string]: unknown;
    };
    console.log("Form values:", { ...restValues, birthday: formattedBirthday }); // Include formatted birthday in the logged values
    try {
      const res = await axios.post("/api/user/sign-up", {
        ...restValues,
        birthday: formattedBirthday,
        signUpType: 0,
      }); // Send formatted birthday in the request
      console.log("Form values:", res);
      // navigate("/signup/end");
    } catch (error) {
      console.error(error);
    }
  };

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
              birthday: "",
              nickname: "",
              phoneNumber: "",
            }}
          >
            {/* 회원 타입 선택 */}
            <Form.Item name="roleId" className="mb-[12px] h-[50px]">
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
            <div className="flex gap-[12px] h-[80px]">
              <label className="flex text-[16px] w-[120px] h-[56px] items-center font-[500]">
                이메일 &nbsp;
                <label className="text-[#D9534F]">*</label>
              </label>
              <Form.Item
                name="email"
                className="mb-0"
                rules={[
                  { required: true, message: "이메일을 입력해주세요." },
                  { type: "email", message: "유효한 이메일을 입력해주세요." },
                ]}
              >
                <div className="flex items-center w-full gap-[12px]">
                  <CustomInput
                    placeholder="이메일을 입력해주세요"
                    width="351px"
                  />
                </div>
              </Form.Item>
              <SecondaryButton
                onClick={handleButton1Click}
                className="w-[84px] h-[56px]"
              >
                중복확인
              </SecondaryButton>
            </div>
            <div className="flex gap-[12px] h-[80px]">
              <label className="flex text-[16px] w-[120px] h-[56px] items-center font-[500]">
                비밀번호 &nbsp;
                <label className="text-[#D9534F]">*</label>
              </label>
              <Form.Item
                name="upw"
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
                      "8~16자 이내이며, 영문자와 숫자, 특수문자를 조합해야 합니다.",
                  },
                ]}
              >
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
              </Form.Item>
            </div>
            <div className="flex gap-[12px] h-[80px]">
              <label className="flex text-[16px] w-[120px] h-[56px] items-center font-[500]">
                비밀번호 확인 &nbsp;
                <label className="text-[#D9534F]">*</label>
              </label>
              <Form.Item
                className="mb-0"
                dependencies={["password"]}
                name="confirmPassword"
                rules={[
                  {
                    required: true,
                    message: "비밀번호 확인은 필수 입력 항목입니다.",
                  },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || getFieldValue("upw") === value) {
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
            </div>
            <div className="flex gap-[12px] h-[80px]">
              <label className="flex text-[16px] w-[120px] h-[56px] items-center font-[500]">
                이름 &nbsp;
                <label className="text-[#D9534F]">*</label>
              </label>
              <Form.Item
                name="name"
                className="mb-0"
                rules={[{ required: true, message: "이름을 입력해주세요." }]}
              >
                <div className="flex items-center w-full gap-[12px]">
                  <CustomInput placeholder="이름을 입력해 주세요" />
                </div>
              </Form.Item>
            </div>
            {/* 생일 */}
            <div className="flex gap-[12px] h-[80px]">
              <label className="flex text-[16px] w-[120px] h-[56px] items-center font-[500]">
                생일 &nbsp;
                <label className="text-[#D9534F]">*</label>
              </label>
              <Form.Item
                name="birthday"
                rules={[{ required: true, message: "생일을 선택해 주세요!" }]}
                style={{ width: "448px", height: "56px" }}
              >
                <DatePicker
                  format="YYYY-MM-DD" // 원하는 날짜 형식
                  placeholder="생일을 선택하세요"
                  style={{ width: "100%", height: "56px" }} // 스타일 조정
                />
              </Form.Item>
            </div>
            {/* <div className="flex gap-[12px] h-[80px]">
              <label className="flex text-[16px] w-[120px] h-[56px] items-center font-[500]">
                생일 &nbsp;
                <label className="text-[#D9534F]">*</label>
              </label>
              <Form.Item
                name="birth"
                className="mb-0"
                rules={[{ required: true, message: "생일을 입력해주세요." }]}
              >
                <div className="flex items-center w-full gap-[12px]">
                  <CustomInput placeholder="생일을 입력해 주세요" />
                </div>
              </Form.Item>
            </div> */}
            <div className="flex gap-[12px] h-[80px]">
              <label className="flex text-[16px] w-[120px] h-[56px] items-center font-[500]">
                닉네임 &nbsp;
                <label className="text-[#D9534F]">*</label>
              </label>
              <Form.Item
                name="nickName"
                className="mb-0"
                rules={[{ required: true, message: "닉네임을 입력해주세요." }]}
              >
                <div className="flex items-center w-full gap-[12px]">
                  <CustomInput
                    placeholder="한글자 이상의 닉네임을 입력해주세요"
                    width="351px"
                  />
                </div>
              </Form.Item>
              <SecondaryButton
                onClick={handleButton1Click}
                className="w-[84px] h-[56px]"
              >
                중복확인
              </SecondaryButton>
            </div>
            <div className="flex gap-[12px] h-[80px]">
              <label className="flex text-[16px] w-[120px] h-[56px] items-center font-[500]">
                휴대폰번호 &nbsp;
                <label className="text-[#D9534F]">*</label>
              </label>
              <Form.Item
                name="phone"
                className="mb-0"
                rules={[
                  { required: true, message: "전화번호를 입력해주세요." },
                ]}
              >
                <div className="flex items-center w-full gap-[12px]">
                  <CustomInput placeholder="' - ' 을 포함한 번호를 입력해 주세요" />
                </div>
              </Form.Item>
            </div>

            {/* 약관 동의 */}
            <div className="flex flex-col items-end mt-[4px]">
              <div className="flex flex-col border border-[#DBE0E5] rounded-xl w-[448px] ">
                <div className="border-b border-[#DBE0E5] p-4">
                  <Checkbox
                    indeterminate={indeterminate}
                    onChange={onCheckAllChange}
                    checked={checkAll}
                  >
                    약관 전체 동의
                  </Checkbox>
                </div>
                <div className="p-4">
                  <Checkbox.Group
                    options={plainOptions}
                    value={checkedList}
                    onChange={onCheckboxChange}
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: 8,
                    }}
                  />
                </div>
              </div>
              {/* 회원가입 버튼 */}
              <Button
                htmlType="submit"
                className="w-[448px] h-10 bg-[#F0F2F5] rounded-xl font-bold text-sm text-brand-default mt-[8px]"
              >
                회원가입
              </Button>
            </div>
          </Form>
        </div>
      </div>
    </>
  );
}

export default SignupPage;
