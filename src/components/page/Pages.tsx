import { useEffect, useState } from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

function Pages({
  perPage,
  totalPage,
  onPageChange,
}: {
  perPage: number;
  totalPage: number;
  onPageChange: (page: number) => void; // 페이지 변경 시 호출되는 함수
}) {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(totalPage / perPage);

  const handlePageChange = (page: number) => {
    if (page < 1 || page > totalPages) return; // 페이지 번호가 유효하지 않으면 무시
    setCurrentPage(page);
    onPageChange(page); // 부모 컴포넌트에 페이지 변경을 알림
  };

  useEffect(() => {
    onPageChange(currentPage); // 페이지가 변경될 때마다 부모에게 알리기
  }, [currentPage, onPageChange]);

  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  return (
    <ul className="flex items-center justify-center gap-2">
      <li>
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          <IoIosArrowBack />
        </button>
      </li>

      {pageNumbers.map(item => (
        <li>
          <button
            key={item}
            onClick={() => handlePageChange(item)}
            className={currentPage === item ? "font-bold" : ""}
          >
            {item}
          </button>
        </li>
      ))}

      <li>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          <IoIosArrowForward />
        </button>
      </li>
    </ul>
  );
}

export default Pages;
