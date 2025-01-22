import { useEffect, useState } from "react";
import { Button, Checkbox, Form, Image, Input, TimePicker, Upload } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import styled from "@emotion/styled";
import SideBar from "../../../components/SideBar";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const AcademyInfo = styled.div`
  .ant-form-item-label {
    display: flex;
    justify-content: flex-start;
    padding-top: 14px;
  }
  .ant-form-item-label label {
    min-width: 130px !important;
  }
  .ant-form-item-required::before {
    content: "" !important;
  }
  .ant-form-item-required::after {
    content: "*" !important;
    font-size: 1.25rem;
    color: #ff3300;
  }
  .ant-form-item-label label::after {
    content: "";
  }

  .ant-form-item-control-input-content {
    .input-wrap {
      display: flex;
      justify-content: flex-start;
      gap: 15px;
      align-items: center;
    }
    .flex-start {
      align-items: flex-start;
    }
    label {
      display: flex;
      align-items: center;
      justify-content: center;
      min-width: 130px !important;
    }
    label span {
      height: 24px;
      margin-left: 5px;
      color: #ff3300;
      font-size: 1.25rem;
    }
    input {
      height: 56px;
    }
    textarea {
      padding: 15px 12px;
    }

    .input,
    .ant-input-password {
      border-radius: 12px;
    }

    span.readonly {
      display: flex;
      align-items: center;
      height: 56px;
      padding: 0px 11px;
      border-radius: 12px;
      background-color: #f5f5f5;
      color: #666;
      font-size: 0.9rem;
    }
  }
  .ant-input-affix-wrapper,
  .ant-picker {
    padding: 0px 11px;
  }
  .ant-input-status-error {
    border: 1px solid #3b77d8 !important;
  }
  .ant-form-item-explain-error {
    padding-left: 12px;
    color: #3b77d8;
    font-size: 0.85rem;
  }
  .ant-upload-list-item {
    border: 1px solid #3b77d8 !important;
  }
`;

const menuItems = [
  { label: "회원정보 관리", isActive: false, link: "/mypage/user" },
  { label: "학원정보 관리", isActive: true, link: "/mypage/academy" },
  { label: "리뷰 목록", isActive: false, link: "/mypage/academy/review" },
  { label: "학생관리", isActive: false, link: "/mypage/academy/student" },
];

function AcademyClassAdd() {
  const [form] = Form.useForm();

  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");

  const handleAddressSearch = () => {
    new window.daum.Postcode({
      oncomplete: (data: any) => {
        // 우편번호와 기본주소 입력
        form.setFieldsValue({ aca_zipcode: data.zonecode }); // Form의 값도 업데이트
        form.setFieldsValue({ aca_addr: data.address }); // Form의 값도 업데이트
      },
    }).open();
  };

  const handleTagSearch = () => {
    console.log("태그 검색");
  };

  const initialValues = {
    aca_name: "",
    aca_phone: "",
    open_time: "",
    close_time: "",
    teacher_num: "",
    aca_zipcode: "",
    aca_addr: "",
    aca_addr2: "",
    tag_id: "",
    aca_pic: "",
    user_id: "test@test.com",
    comment: "",
  };

  console.log(initialValues.aca_zipcode, initialValues.aca_addr);

  const onFinished = (values: any) => {
    alert("학원 등록 완료");
    console.log(values);
  };

  useEffect(() => {
    // Daum 우편번호 스크립트 로드
    const script = document.createElement("script");
    script.src =
      "//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js";
    script.async = true;
    document.body.appendChild(script);

    // 컴포넌트 언마운트 시 스크립트 제거
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <AcademyInfo className="w-full">
      <div className="flex gap-5 w-full justify-center align-top">
        <SideBar menuItems={menuItems} />

        <div className="w-full">
          <h2 className="flex items-center justify-between pb-3 text-3xl font-bold">
            강좌 등록
          </h2>
          <div className="w-3/4">
            <Form
              form={form}
              onFinish={values => onFinished(values)}
              initialValues={initialValues}
            >
              <Form.Item
                name="upw"
                rules={[
                  { required: true, message: "비밀번호를 입력해 주세요." },
                  {
                    pattern:
                      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
                    message:
                      "비밀번호는 영어/숫자/특수문자 포함 8자리 이상으로 입력해 주세요.",
                  },
                ]}
              >
                <div className="input-wrap">
                  <label htmlFor="upw">
                    현재 비밀번호<span>*</span>
                  </label>
                  <Input.Password
                    className="input"
                    id="upw"
                    maxLength={20}
                    placeholder="비밀번호를 입력해 주세요."
                  />
                </div>
              </Form.Item>

              <Form.Item
                name="user_id"
                label="강좌 이름"
                rules={[
                  { required: true, message: "강좌 이름을 입력해 주세요." },
                ]}
              >
                <Input type="text" className="input" value="test@test.com" />
              </Form.Item>
              <Form.Item
                name="aca_name"
                label="강좌 기간"
                rules={[
                  { required: true, message: "강좌 기간을 입력해 주세요." },
                ]}
              >
                <Input
                  className="input"
                  id="acaName"
                  maxLength={20}
                  placeholder="학원 이름을 입력해 주세요."
                />
              </Form.Item>
              <Form.Item
                name="comment"
                label="강좌 소개글"
                className="h-44"
                rules={[
                  { required: true, message: "강좌 소개글을 입력해 주세요." },
                ]}
              >
                <ReactQuill
                  placeholder="소개글을 작성해 주세요."
                  className="h-32"
                />
              </Form.Item>
              <div className="flex gap-3">
                <Form.Item
                  name="open_time"
                  label="강좌 시간"
                  rules={[
                    { required: true, message: "시작 시간을 선택해 주세요." },
                  ]}
                >
                  <TimePicker
                    placeholder="강좌 시작 시간"
                    className="input"
                    format="HH:mm"
                  />
                </Form.Item>
                <Form.Item
                  name="close_time"
                  label=""
                  rules={[
                    { required: true, message: "종료 시간을 선택해 주세요." },
                  ]}
                >
                  <TimePicker
                    placeholder="강좌 종료 시간"
                    className="input w-full"
                    format="HH:mm"
                  />
                </Form.Item>
              </div>
              <Form.Item
                name="user_id"
                label="수강 연령대"
                rules={[
                  { required: true, message: "수강 연령대를 선택해 주세요." },
                ]}
              >
                <Input type="text" className="input" value="test@test.com" />
              </Form.Item>
              <Form.Item
                label="수준"
                name="disabled"
                valuePropName="checked"
                className="flex gap-3 justify-center align-middle"
              >
                <Checkbox>초급</Checkbox>
                <Checkbox>중급</Checkbox>
                <Checkbox>고급</Checkbox>
              </Form.Item>
              <Form.Item
                name="user_id"
                label="가격"
                rules={[{ required: true, message: "가격을 입력해 주세요." }]}
              >
                <Input type="text" className="input" value="test@test.com" />
              </Form.Item>
              <Form.Item>
                <Button
                  htmlType="submit"
                  className="w-full h-14 bg-[#E8EEF3] font-bold text-sm"
                >
                  학원 등록
                </Button>
              </Form.Item>
            </Form>
          </div>
        </div>
      </div>
    </AcademyInfo>
  );
}

export default AcademyClassAdd;
