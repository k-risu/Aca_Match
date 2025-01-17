import React, { useState } from "react";
import CustomModal from "../../components/modal/Modal";

function LoginPage() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const handleButton1Click = () => {
    setIsModalVisible(false);
  };

  const handleButton2Click = () => {
    setIsModalVisible(false);
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
        button1Text={"확인"}
        button2Text={"취소"}
      />
    </div>
  );
}

export default LoginPage;
