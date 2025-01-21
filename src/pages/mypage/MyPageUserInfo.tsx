import { PlusOutlined } from "@ant-design/icons";
import { Button, Form, Input, Upload } from "antd";
import SideBar from "../../components/SideBar";

const menuItems = [
  { label: "회원정보 관리", isActive: true, link: "/mypage/user" },
  { label: "나의 학원정보", isActive: false, link: "/mypage" },
  { label: "나의 성적확인", isActive: false, link: "/mypage/record" },
  { label: "나의 좋아요 목록", isActive: false, link: "/mypage/like" },
];

function MyPageUserInfo() {
  const [form] = Form.useForm();

  const onFinish = (values: any) => {
    console.log("Submitted values:", values);
  };

  const normFile = (e: any) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };

  return (
    <div className="flex gap-5 w-full justify-center align-top">
      <SideBar menuItems={menuItems} />

      <div className="w-full">
        <h2 className="flex items-center justify-between pb-3 text-3xl font-bold">
          회원정보 관리
        </h2>
        <div className="w-full">
          <Form form={form} onFinish={onFinish} layout="vertical">
            <Form.Item
              label="이메일"
              name="user_id"
              rules={[
                {
                  required: true,
                  type: "email",
                  message: "이메일을 입력해 주세요.",
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="현재 비밀번호"
              name="upw"
              rules={[{ required: true, message: "비밀번호를 입력해 주세요." }]}
            >
              <Input.Password />
            </Form.Item>

            <Form.Item
              label="신규 비밀번호"
              name="new_upw"
              rules={[{ required: false, message: "Invalid email" }]}
            >
              <Input.Password />
            </Form.Item>

            <Form.Item
              label="비밀번호 확인"
              name="new_upw_check"
              rules={[{ required: false, message: "Invalid email" }]}
            >
              <Input.Password />
            </Form.Item>

            <Form.Item
              label="이름"
              name="name"
              rules={[
                { required: true, type: "text", message: "Invalid email" },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="닉네임"
              name="nick_name"
              rules={[
                { required: true, type: "text", message: "Invalid email" },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="휴대폰 번호"
              name="phone"
              rules={[
                { required: true, type: "tel", message: "Invalid email" },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="프로필 이미지"
              valuePropName="user_pic"
              getValueFromEvent={normFile}
            >
              <Upload action="/upload.do" listType="picture-card" maxCount={1}>
                <button style={{ border: 0, background: "none" }} type="button">
                  <PlusOutlined />
                  <div style={{ marginTop: 8 }}>Upload</div>
                </button>
              </Upload>
            </Form.Item>

            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form>
        </div>
      </div>
    </div>
  );
}

export default MyPageUserInfo;
