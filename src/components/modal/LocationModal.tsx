import axios from "axios";
import { useEffect, useState } from "react";
import MainButton from "../button/MainButton";

interface LocationModalProps {
  visible: boolean;
  handleCloseModal: () => void;
}

interface City {
  cityId: number;
  cityName: string;
}

const LocationModal: React.FC<LocationModalProps> = ({
  visible,
  handleCloseModal,
}) => {
  const [resultData, setResultData] = useState<City[]>([]);

  // API 호출 함수
  const fetchCityData = async () => {
    try {
      const response = await axios.get("/api/academy/getCity");
      // API 응답 데이터가 배열인지 확인하고, 배열이 아니면 빈 배열로 설정

      setResultData(response.data.resultData); // API 응답 데이터를 상태에 저장
      console.log(response.data.resultData);
    } catch (error) {
      console.error("Failed to fetch city data:", error);
      //   setResultData([]); // 오류 발생 시 빈 배열로 설정
    }
  };

  //   const test = styled.div`
  //     &::-webkit-scrollbar {
  //       width: 7px; /* 세로 스크롤바의 너비 */
  //     }

  //     &::-webkit-scrollbar-track {
  //       /* background: #f1f1f1;  */
  //       background: none;
  //       border-radius: 10px; /* 스크롤바 트랙의 둥근 모서리 */
  //     }

  //     &::-webkit-scrollbar-thumb {
  //       background: #888; /* 스크롤바 핸들의 색 */
  //       border-radius: 10px; /* 핸들의 둥근 모서리 */
  //       /* border: 3px solid #888; */
  //     }
  //   `;

  useEffect(() => {
    if (visible) {
      fetchCityData();
    }
  }, [visible]);
  if (!visible) return null;

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50 cursor-default text-brand-default">
      <div className="w-[576px] h-[700px] flex justify-center items-center">
        <div className="bg-white rounded-3xl p-6 w-[576px] h-[700px]">
          <h2 className="text-2xl font-bold text-left mb-[30px]">지역선택</h2>
          <div className="flex flex-col w-full h-[528px] overflow-y-auto">
            {resultData.map(data => (
              <p
                key={data.cityId}
                className="text-base text-left mb-[10px] h-[48px] leading-[48px]"
              >
                {data.cityName}
              </p>
            ))}
          </div>
          <MainButton onClick={handleCloseModal} className="px-4 py-2 w-full">
            닫기
          </MainButton>
        </div>
      </div>
    </div>
  );
};

export default LocationModal;
