import { Input } from "antd";

interface CustomInputProps {
  placeholder?: string;
  height?: string; // height prop 추가
  width?: string; // width prop 추가
}

function CustomInput({
  placeholder,
  height = "56px",
  width = "448px",
}: CustomInputProps) {
  return (
    <div>
      <Input
        className="text-[16px]"
        placeholder={placeholder} // placeholder 추가
        style={{
          width: `${width}`, // 동적 width 적용
          height: `${height}`, // 동적 height 적용
        }}
      />
    </div>
  );
}

export default CustomInput;
