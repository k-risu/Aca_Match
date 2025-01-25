import axios from "axios";
import { PlusOutlined } from "@ant-design/icons";

import {
  Button,
  Form,
  Image,
  Input,
  Upload,
  UploadFile,
  UploadProps,
} from "antd";
import styled from "@emotion/styled";
import SideBar from "../../components/SideBar";
import { useEffect, useState } from "react";
import { getCookie } from "../../utils/cookie";
import userInfo from "../../atoms/userInfo";
import { useRecoilValue } from "recoil";
import CustomModal from "../../components/modal/Modal";
import jwtAxios from "../../apis/jwt";

const MemberInfo = styled.div`
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

function MyPageUserInfo() {
  const [form] = Form.useForm();
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [nickNameCheck, setNickNameCheck] = useState<number>(0);
  const [editMember, setEditMember] = useState({});
  const currentUserInfo = useRecoilValue(userInfo);
  const accessToken = getCookie("accessToken");

  let menuItems = [];
  switch (currentUserInfo.roleId) {
    case 3: //학원 관계자
      menuItems = [
        { label: "회원정보 관리", isActive: true, link: "/mypage/user" },
        { label: "학원정보 관리", isActive: false, link: "/mypage" },
        /*
        {
          label: "학원학생 관리",
          isActive: false,
          link: "/mypage/academy/student",
        },
        */
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
        { label: "회원정보 관리", isActive: true, link: "/mypage/user" },
        { label: "자녀 관리", isActive: false, link: "/mypage/child" },
        { label: "자녀 학원정보", isActive: false, link: "/mypage" },
        { label: "자녀 성적확인", isActive: false, link: "/mypage/record" },
        { label: "나의 좋아요 목록", isActive: false, link: "/mypage/like" },
        { label: "나의 리뷰 목록", isActive: false, link: "/mypage/review" },
      ];
      break;
    default: //일반학생
      menuItems = [
        { label: "회원정보 관리", isActive: true, link: "/mypage/user" },
        { label: "나의 학원정보", isActive: false, link: "/mypage" },
        { label: "나의 성적확인", isActive: false, link: "/mypage/record" },
        { label: "나의 좋아요 목록", isActive: false, link: "/mypage/like" },
        { label: "나의 리뷰 목록", isActive: false, link: "/mypage/review" },
      ];
  }

  //회원정보 조회
  const memberInfo = async () => {
    try {
      const res = await jwtAxios.get(`/api/user`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      setEditMember(res.data.resultData);

      // 데이터를 받아온 즉시 form 값 설정
      form.setFieldsValue({
        user_id: res.data.resultData.email,
        name: res.data.resultData.name,
        nick_name: res.data.resultData.nickName,
        phone: res.data.resultData.phone,
        birth: res.data.resultData.birth,
        user_pic: res.data.resultData.userPic,
      });
    } catch (error) {
      console.log(error);
    }
  };

  // 비밀번호와 비밀번호 확인이 일치하는지 검사하는 커스텀 유효성 검사 함수
  const validateConfirmPassword = (_, value: string) => {
    const password = form.getFieldValue("newPw"); // 'password' 필드의 값 가져오기
    if (value && value !== password) {
      return Promise.reject(new Error("비밀번호가 일치하지 않습니다."));
    }
    return Promise.resolve();
  };

  const { email, name, nickName, phone, birth, userPic } = editMember;

  useEffect(() => {
    memberInfo();
  }, []);

  useEffect(() => {
    if (editMember && Object.keys(editMember).length > 0) {
      form.setFieldsValue({
        userId: editMember.email,
        name: editMember.name,
        nickName: editMember.nickName,
        phone: editMember.phone,
        birth: editMember.birth,
        user_pic: editMember.userPic,
      });
    }
  }, [editMember, form]);

  // const initialValues = {
  //   user_id: email,
  //   name: name,
  //   nick_name: nickName,
  //   phone: phone,
  //   birth: birth,
  //   user_pic: userPic,
  // };
  const [initialValues, setInitialValues] = useState({
    userId: "",
    name: "",
    nickName: "",
    phone: "",
    birth: "",
    user_pic: "",
  });

  //console.log(initialValues);

  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [fileList, setFileList] = useState<UploadFile[]>([
    {
      uid: "1",
      name: userPic,
      status: "done",
      url: `http://112.222.157.156:5223/pic/user/${editMember.userId}/${editMember.userPic}`,
    },
  ]);

  const handleChange: UploadProps["onChange"] = ({ fileList: newFileList }) =>
    setFileList(newFileList);

  const handleButton1Click = () => {
    setIsModalVisible(false);
  };

  const handleButton2Click = () => {
    setIsModalVisible(false);
  };

  const onFinished = async (values: any) => {
    if (nickNameCheck === 2) {
      setIsModalVisible(true);
      console.log("닉네임 확인이 필요합니다.");
      return;
    }

    try {
      const formData = new FormData();

      if (fileList[0]) {
        formData.append("pic", fileList[0]); // 파일일 경우
      } else {
        formData.append("pic", null); // 파일이 없을 경우
      }

      const payload = {
        name: values.name,
        phone: values.phone,
        currentPw: values.currentPw,
        newPw: values.newPw,
        birth: values.birth,
        nickName: values.nickName,
      };

      //JSON 형태로 데이터를 만들어 formData에 추가
      formData.append(
        "req",
        new Blob([JSON.stringify(payload)], { type: "application/json" }),
      );

      const header = {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${accessToken}`,
        },
      };

      //api url을 엄한걸로 넣고 테스트해봐도 403 에러가 발생되는걸로 봐서는 put 처리에 대한 권한 문제가 있어 보임
      const res = await axios.put("/api/user", formData, header);

      console.log("응답 결과:", res.data);
      if (res.data.resultCode === 200) {
        console.log("회원정보 수정 완료");
      }
    } catch (error) {
      console.log("응답 결과:", values);
      console.error("에러 발생:", error);
    }
  };

  //닉네임 중복확인
  const sameCheck = async (nickName: string) => {
    if (!nickName) {
      setIsModalVisible(true);
      setNickNameCheck(3);
      return;
    }

    try {
      const res = await axios.get(
        `/api/user/check-duplicate/nick-name?text=${nickName}`,
      );

      if (res.data.resultData === 1) {
        setIsModalVisible(true);
        setNickNameCheck(res.data.resultData);
      } else {
        setIsModalVisible(true);
        setNickNameCheck(0);
      }
    } catch (error) {
      setIsModalVisible(true);
      setNickNameCheck(0);
      console.log(error);
    }
  };

  if (!editMember) {
    return <div>Loading...</div>; // 데이터가 없으면 로딩 화면 표시
  }

  return (
    <MemberInfo className="flex gap-5 w-full justify-center align-top">
      <SideBar menuItems={menuItems} />

      <div className="w-full mb-20">
        <h1 className="title-font">회원정보 관리</h1>
        <div className="w-3/5">
          <Form
            form={form}
            onFinish={values => onFinished(values)}
            // initialValues={initialValues}
          >
            <Form.Item
              name="userId"
              label="이메일"
              rules={[{ required: true, message: "이메일을 입력해 주세요." }]}
            >
              <Input type="text" className="input readonly" readOnly />
            </Form.Item>

            <Form.Item
              name="currentPw"
              label="현재 비밀번호"
              rules={[
                // { required: true, message: "비밀번호를 입력해 주세요." },
                {
                  pattern:
                    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
                  message:
                    "비밀번호는 영어/숫자/특수문자 포함 8자리 이상으로 입력해 주세요.",
                },
              ]}
            >
              <Input.Password
                className="input"
                id="newPw"
                maxLength={20}
                placeholder="비밀번호를 입력해 주세요."
              />
            </Form.Item>

            <Form.Item
              // name="new_upw"
              label="신규 비밀번호"
              rules={[
                {
                  pattern:
                    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
                  message:
                    "비밀번호는 영어/숫자/특수문자 포함 8자리 이상으로 입력해 주세요.",
                },
              ]}
            >
              <Input.Password
                className="input"
                id="new_upw"
                placeholder="신규 비밀번호를 입력해 주세요."
              />
            </Form.Item>

            <Form.Item
              // name="new_upw_check"
              label="신규 비밀번호 확인"
              rules={[
                { validator: validateConfirmPassword }, // 커스텀 검증 함수
              ]}
            >
              <Input.Password
                className="input"
                id="new_upw_check"
                placeholder="신규 비밀번호를 다시 입력해 주세요."
              />
            </Form.Item>

            <Form.Item
              name="name"
              label="이름"
              rules={[{ required: true, message: "이름을 입력해 주세요." }]}
            >
              <Input type="text" className="input readonly" readOnly />
            </Form.Item>

            <div className="flex gap-3 w-full">
              <Form.Item
                name="nickName"
                label="닉네임"
                className="w-full"
                rules={[{ required: true, message: "닉네임을 입력해 주세요." }]}
              >
                <Input
                  className="input"
                  id="nick_name"
                  maxLength={20}
                  placeholder="닉네임을 입력해 주세요."
                  onChange={() => setNickNameCheck(2)}
                />
              </Form.Item>

              <Form.Item>
                <button
                  type="button"
                  className="min-w-[84px] h-14 bg-[#E8EEF3] rounded-xl font-bold text-sm"
                  onClick={() => sameCheck(form.getFieldValue("nickName"))}
                >
                  중복확인
                </button>
              </Form.Item>
            </div>

            <Form.Item
              name="phone"
              label="휴대폰 번호"
              rules={[
                { required: true, message: "휴대폰 번호를 입력해 주세요." },
              ]}
            >
              <Input
                className="input"
                id="phone"
                maxLength={13}
                placeholder="휴대폰 번호를 입력해 주세요."
              />
            </Form.Item>

            <Form.Item name="birth" label="생년월일">
              <span className="readonly w-full">{editMember.birth}</span>
            </Form.Item>

            <Form.Item name="user_pic" label="프로필 이미지">
              <Upload
                action="/upload.do"
                listType="picture-card"
                maxCount={1}
                showUploadList={{ showPreviewIcon: false }}
                fileList={fileList}
                onChange={handleChange}
              >
                <button style={{ border: 0, background: "none" }} type="button">
                  <PlusOutlined />
                </button>
              </Upload>

              {previewImage && (
                <Image
                  wrapperStyle={{ display: "none" }}
                  preview={{
                    visible: previewOpen,
                    onVisibleChange: visible => setPreviewOpen(visible),
                    afterOpenChange: visible => !visible && setPreviewImage(""),
                  }}
                  src={previewImage}
                />
              )}
            </Form.Item>

            <Form.Item>
              <Button
                htmlType="submit"
                className="w-full h-14 bg-[#E8EEF3] font-bold text-sm"
              >
                회원정보 수정
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>

      <CustomModal
        visible={isModalVisible}
        title={"닉네임 중복체크"}
        content={
          nickNameCheck === 1
            ? "사용가능한 닉네임입니다."
            : nickNameCheck === 2
              ? "닉네임 중복확인해 주세요."
              : nickNameCheck === 3
                ? "닉네임을 입력해 주세요."
                : "닉네임이 중복되었습니다."
        }
        onButton1Click={handleButton1Click}
        onButton2Click={handleButton2Click}
        button1Text={"취소"}
        button2Text={"확인"}
        modalWidth={400}
        modalHeight={244}
      />
    </MemberInfo>
  );
}

export default MyPageUserInfo;
