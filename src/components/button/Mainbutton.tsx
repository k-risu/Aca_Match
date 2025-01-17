// MainButton.tsx
import { Button } from "antd";

interface MainButtonProps {
  onClick: () => void;
  className: string;
  children: React.ReactNode; // children을 추가
}

export default function MainButton({
  onClick,
  className,
  children,
}: MainButtonProps) {
  return (
    <Button className={className} onClick={onClick}>
      {children}
    </Button>
  );
}
