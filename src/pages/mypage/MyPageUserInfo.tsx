import axios from "axios";
import { PlusOutlined } from "@ant-design/icons";

import {
  Button,
  Checkbox,
  Form,
  Image,
  Input,
  Upload,
  UploadFile,
  UploadProps,
} from "antd";
import styled from "@emotion/styled";
import SideBar from "../../components/SideBar";
import { useState } from "react";

const menuItems = [
  { label: "회원정보 관리", isActive: true, link: "/mypage/user" },
  { label: "나의 학원정보", isActive: false, link: "/mypage" },
  { label: "나의 성적확인", isActive: false, link: "/mypage/record" },
  { label: "나의 좋아요 목록", isActive: false, link: "/mypage/like" },
  { label: "나의 리뷰 목록", isActive: false, link: "/mypage/review" },
];

const MemberInfo = styled.div`
  .ant-form-item-control-input-content {
    .input-wrap {
      display: flex;
      justify-content: flex-start;
      gap: 15px;
      align-items: center;
    }

    label {
      display: flex;
      align-items: center;
      min-width: 130px;
    }
    label span {
      height: 24px;
      margin-left: 5px;
      color: #ff3300;
      font-size: 1.25rem;
    }
    input[type="text"],
    input[type="password"] {
      height: 56px;
    }

    input,
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
  .ant-input-affix-wrapper {
    padding: 0px 11px;
  }
  .ant-input-status-error {
    border: 1px solid #3b77d8 !important;
  }
  .ant-form-item-explain-error {
    padding-left: 155px;
    color: #3b77d8;
    font-size: 0.85rem;
  }
  .ant-upload-list-item {
    border: 1px solid #3b77d8 !important;
  }
`;

function MyPageUserInfo() {
  const [form] = Form.useForm();

  // 비밀번호와 비밀번호 확인이 일치하는지 검사하는 커스텀 유효성 검사 함수
  const validateConfirmPassword = (_, value) => {
    const password = form.getFieldValue("new_upw"); // 'password' 필드의 값 가져오기
    if (value && value !== password) {
      return Promise.reject(new Error("비밀번호가 일치하지 않습니다."));
    }
    return Promise.resolve();
  };

  const initialValues: {
    user_id: string;
    name: string;
    nick_name: string;
    phone: string;
    birth: string;
    user_pic: string;
  } = {
    user_id: "test@test.com",
    name: "고길동",
    nick_name: "김수한무",
    phone: "010-1234-5678",
    birth: "2025-01-01",
    user_pic: "",
  };

  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [fileList, setFileList] = useState<UploadFile[]>([
    {
      uid: "1",
      name: "image.png",
      status: "done",
      url: "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
    },
  ]);

  const handleChange: UploadProps["onChange"] = ({ fileList: newFileList }) =>
    setFileList(newFileList);

  const onFinished = (values: any) => {
    console.log(values);
  };

  const sameCheck = async () => {
    //console.log("닉네임 중복확인");
    const res = await axios.get(
      "/api/user/check-duplicate/nick-name?text=%EC%95%BC%EC%98%B9%EC%84%A0%EC%83%9D",
    );
    console.log(res);
  };

  return (
    <MemberInfo className="flex gap-5 w-full justify-center align-top">
      <SideBar menuItems={menuItems} />

      <div className="w-full mb-20">
        <h1 className="title-font">회원정보 관리</h1>
        <div className="w-3/5">
          <Form
            form={form}
            onFinish={values => onFinished(values)}
            initialValues={initialValues}
          >
            <Form.Item name="user_id">
              <div className="input-wrap">
                <label>
                  이메일<span>*</span>
                </label>
                <span className="readonly w-full">test@test.com</span>
                <Input type="hidden" />
              </div>
            </Form.Item>

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
              name="new_upw"
              rules={[
                {
                  pattern:
                    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
                  message:
                    "비밀번호는 영어/숫자/특수문자 포함 8자리 이상으로 입력해 주세요.",
                },
              ]}
            >
              <div className="input-wrap">
                <label htmlFor="new_upw">신규 비밀번호</label>
                <Input.Password
                  className="input"
                  id="new_upw"
                  placeholder="신규 비밀번호를 입력해 주세요."
                />
              </div>
            </Form.Item>

            <Form.Item
              name="new_upw_check"
              rules={[
                { validator: validateConfirmPassword }, // 커스텀 검증 함수
              ]}
            >
              <div className="input-wrap">
                <label htmlFor="new_upw_check">비밀번호 확인</label>
                <Input.Password
                  className="input"
                  id="new_upw_check"
                  placeholder="신규 비밀번호를 다시 입력해 주세요."
                />
              </div>
            </Form.Item>

            <Form.Item name="name">
              <div className="input-wrap">
                <label htmlFor="name">
                  이름<span>*</span>
                </label>
                <span className="readonly w-full">고길동</span>
                <Input type="hidden" />
              </div>
            </Form.Item>

            <Form.Item
              name="nick_name"
              rules={[{ required: true, message: "닉네임을 입력해 주세요." }]}
            >
              <div className="input-wrap">
                <label htmlFor="nick_name">
                  닉네임<span>*</span>
                </label>
                <Input
                  className="input"
                  id="nick_name"
                  maxLength={20}
                  defaultValue={initialValues.nick_name}
                  placeholder="닉네임을 입력해 주세요."
                />
                <button
                  type="button"
                  className="min-w-[84px] h-14 bg-[#E8EEF3] rounded-xl font-bold text-sm"
                  onClick={() => sameCheck()}
                >
                  중복확인
                </button>
              </div>
            </Form.Item>

            <Form.Item
              name="phone"
              rules={[
                { required: true, message: "휴대폰 번호를 입력해 주세요." },
              ]}
            >
              <div className="input-wrap">
                <label htmlFor="phone">
                  휴대폰 번호<span>*</span>
                </label>
                <Input
                  className="input"
                  id="phone"
                  maxLength={13}
                  defaultValue={initialValues.phone}
                  placeholder="휴대폰 번호를 입력해 주세요."
                />
              </div>
            </Form.Item>

            <Form.Item name="birth">
              <div className="input-wrap">
                <label htmlFor="birth">
                  생년월일<span>*</span>
                </label>
                <span className="readonly w-full">{initialValues.birth}</span>
              </div>
            </Form.Item>

            <Form.Item name="user_pic">
              <div className="input-wrap">
                <label>프로필 이미지</label>
                <Upload
                  action="/upload.do"
                  listType="picture-card"
                  maxCount={1}
                  showUploadList={{ showPreviewIcon: false }}
                  fileList={fileList}
                  onChange={handleChange}
                >
                  <button
                    style={{ border: 0, background: "none" }}
                    type="button"
                  >
                    <PlusOutlined />
                  </button>
                </Upload>

                {previewImage && (
                  <Image
                    wrapperStyle={{ display: "none" }}
                    preview={{
                      visible: previewOpen,
                      onVisibleChange: visible => setPreviewOpen(visible),
                      afterOpenChange: visible =>
                        !visible && setPreviewImage(""),
                    }}
                    src={previewImage}
                  />
                )}
              </div>
            </Form.Item>

            <Form.Item>
              <div>
                <Button htmlType="submit" className="w-full h-14 ml-36">
                  회원정보 수정
                </Button>
              </div>
            </Form.Item>
          </Form>
        </div>
      </div>
    </MemberInfo>
  );
}

export default MyPageUserInfo;
