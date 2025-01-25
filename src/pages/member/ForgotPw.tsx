import { Button, Form, Input } from "antd";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function ForgotPw() {
  const navigate = useNavigate();
  const [form] = Form.useForm();

  const onFinish = async (values: any) => {
    const res = await axios.post("/api/user/temp-pw", values);
    console.log(res);
    navigate("/signup/end");
  };

  return (
    <div>
      <Form form={form} onFinish={onFinish}>
        <h1>비밀번호 재설정</h1>
        <p>비밀번호 재설정을 위해 이메일을 입력해주세요.</p>
        <Form.Item
          name="email"
          rules={[{ required: true, message: "이메일을 입력해주세요." }]}
        >
          <Input placeholder="이메일" />
        </Form.Item>

        <Button htmlType="submit">비밀번호 변경</Button>
      </Form>
    </div>
  );
}

export default ForgotPw;
