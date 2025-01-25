import styled from "@emotion/styled";
import { DatePicker, Button, Checkbox, Form, Input, TimePicker } from "antd";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useRecoilValue } from "recoil";
import userInfo from "../../../atoms/userInfo";
import SideBar from "../../../components/SideBar";
import dayjs from "dayjs";
const { RangePicker } = DatePicker;

const AcademyInfo = styled.div`
  .ant-form-item-label {
    display: flex;
    justify-content: flex-start;
    align-items: center;
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
    .ant-form-item-label label {
      display: flex;
      align-items: center;
      justify-content: center;
      min-width: 130px !important;
    }
    .ant-form-item-label label span {
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
  .ant-checkbox-wrapper {
    margin-right: 25px;
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

function AcademyClassAdd() {
  const [form] = Form.useForm();
  const currentUserInfo = useRecoilValue(userInfo);

  let menuItems = [];
  switch (currentUserInfo.roleId) {
    case 3: //학원 관계자
      menuItems = [
        { label: "회원정보 관리", isActive: false, link: "/mypage/user" },
        { label: "학원정보 관리", isActive: true, link: "/mypage" },
        {
          label: "학원학생 관리",
          isActive: false,
          link: "/mypage/academy/student",
        },
        {
          label: "학원리뷰 목록",
          isActive: false,
          link: "/mypage/academy/review",
        },
        { label: "좋아요 목록", isActive: false, link: "/mypage/academy/like" },
      ];
      break;
    case 2: //학부모
      menuItems = [
        { label: "회원정보 관리", isActive: false, link: "/mypage/user" },
        { label: "학원정보 관리", isActive: false, link: "/mypage" },
        { label: "나의 리뷰 목록", isActive: true, link: "/mypage/review" },
        { label: "학생 관리", isActive: false, link: "/mypage/child" },
      ];
      break;
    default: //일반학생
      menuItems = [
        { label: "회원정보 관리", isActive: false, link: "/mypage/user" },
        { label: "나의 학원정보", isActive: false, link: "/mypage" },
        { label: "나의 성적확인", isActive: false, link: "/mypage/record" },
        { label: "나의 좋아요 목록", isActive: false, link: "/mypage/like" },
        { label: "나의 리뷰 목록", isActive: true, link: "/mypage/review" },
      ];
  }

  const initialValues = {
    acaId: "",
    className: "",
    classComment: "",
    startDate: "",
    endDate: "",
    startTime: dayjs("10:00", "HH:mm"),
    endTime: dayjs("20:00", "HH:mm"),
    price: "",
  };

  const onFinished = (values: any) => {
    //alert("학원 등록 완료");
    console.log(values);
  };

  return (
    <AcademyInfo className="w-full">
      <div className="flex gap-5 w-full justify-center align-top">
        <SideBar menuItems={menuItems} />

        <div className="w-full">
          <h1 className="title-font">강좌 등록</h1>
          <div className="w-3/4">
            <Form
              form={form}
              onFinish={values => onFinished(values)}
              initialValues={initialValues}
            >
              <Form.Item
                name="className"
                label="강좌 이름"
                rules={[
                  { required: true, message: "강좌 이름을 입력해 주세요." },
                ]}
              >
                <Input
                  type="text"
                  className="input"
                  placeholder="강좌 이름을 입력해 주세요."
                />
              </Form.Item>

              <Form.Item
                name="aca_name"
                label="강좌 기간"
                rules={[
                  { required: true, message: "강좌 기간을 입력해 주세요." },
                ]}
              >
                <RangePicker placeholder={["강좌 시작일", "강좌 종료일"]} />
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
                  name="openTime"
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
                  name="closeTime"
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
                name="age"
                label="수강 연령대"
                rules={[
                  { required: true, message: "수강 연령대를 선택해 주세요." },
                ]}
              >
                <Checkbox>성인</Checkbox>
                <Checkbox>청소년</Checkbox>
                <Checkbox>초등학생</Checkbox>
                <Checkbox>유아</Checkbox>
                <Checkbox>기타</Checkbox>
              </Form.Item>

              <Form.Item label="수준" name="disabled" valuePropName="checked">
                <Checkbox>전문가</Checkbox>
                <Checkbox>상급</Checkbox>
                <Checkbox>중급</Checkbox>
                <Checkbox>초급</Checkbox>
                <Checkbox>입문자</Checkbox>
              </Form.Item>

              <Form.Item
                name="price"
                label="가격"
                rules={[{ required: true, message: "가격을 입력해 주세요." }]}
              >
                <Input
                  type="text"
                  className="input"
                  placeholder="가격을 입력해 주세요."
                />
              </Form.Item>
              <Form.Item>
                <Button
                  htmlType="submit"
                  className="w-full h-14 bg-[#E8EEF3] font-bold text-sm"
                >
                  강좌 등록
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
