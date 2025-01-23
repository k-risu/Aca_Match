import { useEffect, useState } from "react";
import {
  Button,
  Form,
  Image,
  Input,
  TimePicker,
  Upload,
  UploadFile,
  UploadProps,
} from "antd";
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

function AcademyAdd() {
  const [form] = Form.useForm();

  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [fileList, setFileList] = useState<UploadFile[]>([]);

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

  const handleChange: UploadProps["onChange"] = ({ fileList: newFileList }) => {
    setFileList(newFileList);
    console.log(newFileList);
  };

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
            학원 등록
          </h2>
          <div className="w-3/4">
            <Form
              form={form}
              onFinish={values => onFinished(values)}
              initialValues={initialValues}
            >
              <Form.Item
                name="user_id"
                label="이메일"
                rules={[{ required: true, message: "이메일을 입력해 주세요." }]}
              >
                <Input type="text" className="input" value="test@test.com" />
              </Form.Item>

              <Form.Item
                name="aca_name"
                label="학원 이름"
                rules={[
                  { required: true, message: "학원 이름을 입력해 주세요." },
                ]}
              >
                <Input
                  className="input"
                  id="acaName"
                  maxLength={20}
                  placeholder="학원 이름을 입력해 주세요."
                />
              </Form.Item>

              <div className="flex gap-3 w-full">
                <Form.Item
                  name="aca_zipcode"
                  label="학원 주소"
                  className="w-full"
                  rules={[
                    { required: true, message: "학원 주소를 입력해 주세요." },
                  ]}
                >
                  <Input
                    className="input"
                    id="acaZipcode"
                    maxLength={6}
                    placeholder="우편번호"
                    readOnly
                  />
                </Form.Item>
                <Form.Item>
                  <button
                    type="button"
                    className="min-w-[84px] h-14 bg-[#E8EEF3] rounded-xl font-bold text-sm"
                    onClick={() => handleAddressSearch()}
                  >
                    주소 검색
                  </button>
                </Form.Item>
              </div>

              <Form.Item
                name="aca_addr"
                className="ml-[130px]"
                rules={[
                  { required: true, message: "학원 주소를 입력해 주세요." },
                ]}
              >
                <Input
                  className="input"
                  id="acaAddr"
                  placeholder="학원 기본주소"
                  readOnly
                />
              </Form.Item>

              <Form.Item
                name="aca_addr2"
                className="ml-[130px]"
                rules={[
                  { required: true, message: "학원 주소를 입력해 주세요." },
                ]}
              >
                <Input
                  className="input"
                  id="acaAddr2"
                  maxLength={20}
                  placeholder="학원 상세주소"
                />
              </Form.Item>

              <Form.Item
                name="aca_phone"
                label="학원 전화번호"
                rules={[
                  { required: true, message: "학원 전화번호를 입력해 주세요." },
                ]}
              >
                <Input
                  className="input"
                  id="acaPhone"
                  maxLength={13}
                  placeholder="학원 전화번호를 입력해 주세요."
                />
              </Form.Item>

              <div className="flex gap-3">
                <Form.Item
                  name="open_time"
                  label="영업 시간"
                  rules={[
                    { required: true, message: "시작 시간을 선택해 주세요." },
                  ]}
                >
                  <TimePicker
                    placeholder="학원 시작 시간"
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
                    placeholder="학원 종료 시간"
                    className="input w-full"
                    format="HH:mm"
                  />
                </Form.Item>
              </div>

              <Form.Item name="teacher_num" label="강사 인원수">
                <Input
                  className="input"
                  id="teacherNum"
                  maxLength={5}
                  placeholder="강사 인원수를 입력해 주세요."
                />
              </Form.Item>

              <Form.Item name="comment" label="학원 소개글" className="h-44">
                <ReactQuill
                  placeholder="소개글을 작성해 주세요."
                  className="h-32"
                />
              </Form.Item>

              <div className="flex gap-3 w-full">
                <Form.Item name="tag_id" label="태그 등록" className="w-full">
                  <Input
                    className="input"
                    id="academyTag"
                    placeholder="태그를 입력해 주세요."
                  />
                </Form.Item>

                <Form.Item name="tag_id">
                  <button
                    type="button"
                    className="min-w-[84px] h-14 bg-[#E8EEF3] rounded-xl font-bold text-sm"
                    onClick={() => handleTagSearch()}
                  >
                    태그 검색
                  </button>
                </Form.Item>
              </div>

              <Form.Item name="aca_pic" label="프로필 이미지">
                <div>
                  <Upload
                    action="/upload.do"
                    listType="picture-card"
                    maxCount={1}
                    onChange={handleChange}
                    showUploadList={{ showPreviewIcon: false }}
                  >
                    <button
                      style={{ border: 0, background: "none" }}
                      type="button"
                    >
                      <PlusOutlined />
                    </button>
                  </Upload>

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
                </div>
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

export default AcademyAdd;
