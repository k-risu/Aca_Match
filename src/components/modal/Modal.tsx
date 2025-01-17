// CustomModal.tsx
import React from "react";
import { Modal } from "antd";
import MainButton from "../button/Mainbutton";

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
  height = 244,
}) => {
  return (
    <Modal
      open={visible}
      footer={null}
      closable={false}
      centered
      width={width}
      style={{ height: `${height}px` }}
      styles={{
        body: {
          height: `${height - 40}px`, // 본문 높이 설정
        },
      }}
    >
      <div className="rounded-3xl gap-y-7">
        <h2 className="text-2xl font-bold text-left mb-[30px]">{title}</h2>
        <p className="text-base text-left mb-[52px]">{content}</p>
        <div className="flex justify-end">
          <MainButton
            onClick={onButton1Click}
            className="w-[165px] h-[40px] text-sm px-4 py-2 bg-brand-BTWhite rounded hover:bg-slate-950"
          >
            {button1Text || "Default Button Text"}
          </MainButton>
          <MainButton
            onClick={onButton2Click}
            className=" w-[165px] h-[40px] text-sm px-4 py-2 bg-brand-BTBlue text-white rounded hover:bg-brand-BTBlueHover "
          >
            {button2Text}
          </MainButton>
        </div>
      </div>
    </Modal>
  );
};

export default CustomModal;
