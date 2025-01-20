import { Input } from "antd";

interface CustomInputProps {
  placeholder?: string;
  height?: string;
  width?: string;
  borderRadius?: string;
  children?: React.ReactNode; // children prop 추가
  padding?: string;
  borderColor?: string;
  focusOutline?: string; // 추가
  focusBorder?: string; // 추가
  border?: string; // 추가
}
/**
 * 커스텀 입력 필드 컴포넌트
 * @param placeholder - (선택) 입력 필드의 플레이스홀더 텍스트
 * @param height - (선택) 입력 필드의 높이 (기본값: "56px")
 * @param width - (선택) 입력 필드의 너비 (기본값: "448px")
 * @param borderRadius - (선택) 입력 필드의 모서리 둥글기 (기본값: "12px")
 * @param padding - (선택) 입력 필드의 내부 여백
 * @param children - (선택) 입력 필드와 함께 렌더링될 자식 요소
 * @param focusOutline - (선택) 포커스 시 외곽선 스타일
 * @param focusBorder - (선택) 포커스 시 테두리 스타일
 * @param border - (선택) 기본 테두리 스타일
 * @returns 커스터마이즈된 입력 필드 컴포넌트
 */
function CustomInput({
  placeholder,
  height = "56px",
  width = "448px",
  borderRadius = "12px",
  padding,
  children,
  focusOutline,
  focusBorder,
  border,
}: CustomInputProps) {
  return (
    <>
      <Input
        className={`text-[16px] placeholder-brand-placeholder focus:outline-${focusOutline} focus:border-${focusBorder} border-${border}`}
        placeholder={placeholder}
        style={{
          width: `${width}`,
          height: `${height}`,
          borderRadius: `${borderRadius}`,
          padding: `${padding}`,
        }}
      />
      {children} {/* children 렌더링 */}
    </>
  );
}

export default CustomInput;
