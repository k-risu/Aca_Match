import React from "react";

interface FooterProps {
  className?: string;
}

const Footer: React.FC<FooterProps> = ({ className }) => {
  return (
    <div className={className}>
      Copyright © 2025 [AcaMatch]. 완벽한 아카데미를 찾는 신뢰할 수 있는
      파트너.
    </div>
  );
};

export default Footer;
