import React from "react";
import { Modal } from "antd";

interface CustomModalProps {
  visible: boolean;
  title: string;
  content: string;
  onButton1Click: () => void;
  onButton2Click: () => void;
  button1Text: string;
  button2Text: string;
  width?: number;
  height?: number;
}

const CustomModal: React.FC<CustomModalProps> = ({
  visible,
  title,
  content,
  onButton1Click,
  onButton2Click,
  button1Text,
  button2Text,
  width = 400,
  height = 192,
}) => {
  return (
    <Modal
      open={visible}
      footer={null} // 커스텀 버튼 사용
      closable={false} // 기본 닫기 버튼 제거
      centered
    >
      <div
        className={`bg-white rounded-lg p-4 mx-auto`}
        style={{ width: `${width}px`, height: `${height}px` }}
      >
        <h2 className="text-2xl font-bold mb-4 text-center">{title}</h2>
        <p className="text-base mb-6 text-center">{content}</p>
        <div className="flex justify-end space-x-4">
          <button
            onClick={onButton1Click}
            className="text-sm px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
          >
            {button1Text}
          </button>
          <button
            onClick={onButton2Click}
            className="text-sm px-4 py-2 bg-[#2B99E3] text-white rounded hover:bg-[#2B99E3]"
          >
            {button2Text}
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default CustomModal;
