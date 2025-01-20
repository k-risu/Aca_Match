import React, { useState } from "react";
import CustomModal from "../../components/modal/Modal";
import CustomInput from "../../components/CustomInput ";
import { Button, Form, Input } from "antd";

function LoginPage() {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleButton1Click = () => {
    setIsModalVisible(false);
  };

  const handleButton2Click = () => {
    setIsModalVisible(false);
  };

  const [form] = Form.useForm();

  const onFinish = (values: any) => {
    console.log("Submitted values:", values);
  };

  const handleButtonClick = () => {
    const values = form.getFieldsValue();
    console.log("Current values:", values);
  };

  return (
    <div>
      <button onClick={() => setIsModalVisible(true)}>모달 테스트</button>
      <CustomModal
        visible={isModalVisible}
        title={"테스트"}
        content={"작동 중"}
        onButton1Click={handleButton1Click}
        onButton2Click={handleButton2Click}
        button1Text={"취소"}
        button2Text={"확인"}
        modalWidth={400}
        modalHeight={244}
      />
      <CustomInput placeholder="입력해주세요" />
      <div>
        <Form form={form} onFinish={onFinish} layout="vertical">
          <Form.Item
            label="Name"
            name="name"
            rules={[{ required: true, message: "Name is required" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Email"
            name="email"
            rules={[
              { required: true, type: "email", message: "Invalid email" },
            ]}
          >
            <Input />
          </Form.Item>

          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form>

        <Button onClick={handleButtonClick} className="mt-4">
          Log Current Form Values
        </Button>
      </div>
    </div>
  );
}

export default LoginPage;
