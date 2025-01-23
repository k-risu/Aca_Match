import axios from "axios";
import { useEffect, useState } from "react";
import MainButton from "../button/MainButton";

import styled from "@emotion/styled";
import { Radio } from "antd";

interface LocationModalProps {
  visible: boolean;
  handleCloseModal: () => void;
}

interface City {
  cityId: number;
  cityName: string;
}
interface Street {
  streetId: number;
  streetName: string;
}
interface Dong {
  dongId: number;
  dongName: string;
}

const LocationModal: React.FC<LocationModalProps> = ({
  visible,
  handleCloseModal,
}) => {
  const [resultData, setResultData] = useState<City[]>([]);
  const [streetData, setStreetData] = useState<Street[]>([]);
  const [dongData, setDongData] = useState<Dong[]>([]); // 추가
  const [selectedCityId, setSelectedCityId] = useState<number | null>(null);
  const [selectedStreetId, setSelectedStreetId] = useState<number | null>(null);
  const [selectedDongId, setSelectedDongId] = useState<number | null>(null);
  // API 호출 함수
  // 지역 데이터 호출
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
  // 거리 데이터 호출
  const fetchStreetData = async (cityId: number) => {
    try {
      const response = await axios.get(`/api/academy/getStreet`, {
        params: {
          cityId: cityId,
        },
      });
      setStreetData(response.data.resultData);
      console.log(response.data.resultData);
    } catch (error) {
      console.error("Failed to fetch dong data:", error);
      setStreetData([]);
    }
  };
  const fetchDongData = async (cityId: number, streetId: number) => {
    try {
      const response = await axios.get(`/api/academy/getDong`, {
        params: {
          cityId: cityId,
          streetId: streetId,
        },
      });
      setDongData(response.data.resultData); // setStreetData에서 setDongData로 수정
      console.log(response.data.resultData);
    } catch (error) {
      console.error("Failed to fetch dong data:", error);
      setDongData([]); // setStreetData에서 setDongData로 수정
    }
  };

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
          <h2 className="text-2xl font-bold text-left mb-[15px] ml-[55px]">
            지역선택
          </h2>
          <div className="border-b mb-[15px]"></div>
          <div className="flex gap-[24px] justify-center ">
            <CustomScrollbar className="flex flex-col w-[135px] h-[528px] overflow-y-auto">
              {resultData.map(data => (
                <p
                  key={data.cityId}
                  className={`flex items-center justify-center text-base text-left mb-[10px] h-[48px] leading-[48px] cursor-pointer ${
                    selectedCityId === data.cityId
                      ? "text-blue-500 font-bold"
                      : ""
                  }`}
                  onClick={() => {
                    setSelectedCityId(data.cityId);
                    setSelectedStreetId(null); // street 선택 초기화
                    setSelectedDongId(null); // dong 선택 초기화
                    setDongData([]); // dong 데이터 초기화
                    fetchStreetData(data.cityId);
                  }}
                >
                  {data.cityName}
                </p>
              ))}
            </CustomScrollbar>
            <CustomScrollbar className="flex flex-col w-[135px] h-[528px] overflow-y-auto">
              {streetData.map(street => (
                <p
                  key={street.streetId}
                  className={` text-base text-center mb-[10px] h-[48px] leading-[48px] cursor-pointer ${
                    selectedStreetId === street.streetId
                      ? "text-blue-500 font-bold"
                      : ""
                  }`}
                  onClick={() => {
                    setSelectedStreetId(street.streetId);
                    if (selectedCityId) {
                      fetchDongData(selectedCityId, street.streetId);
                    }
                  }}
                >
                  {street.streetName}
                </p>
              ))}
            </CustomScrollbar>
            <CustomScrollbar className="flex flex-col w-[135px] h-[528px] overflow-y-auto">
              <Radio.Group
                value={selectedDongId}
                onChange={e => setSelectedDongId(e.target.value)}
              >
                {dongData.map(dong => (
                  <Radio
                    key={`dong-${dong.dongId}`}
                    value={dong.dongId}
                    className={`flex items-center justify-center w-[135px] text-base mb-[10px] h-[48px] leading-[48px] ${
                      selectedDongId === dong.dongId
                        ? "text-blue-500 font-bold"
                        : ""
                    }`}
                  >
                    {dong.dongName}
                  </Radio>
                ))}
              </Radio.Group>
            </CustomScrollbar>
          </div>
          <div className="flex justify-center gap-[12px] w-[490px] items-center mx-auto">
            <MainButton
              onClick={handleCloseModal}
              className="px-4 py-2 w-[144px] h-[32px]"
            >
              닫기
            </MainButton>
            <MainButton
              type="primary"
              onClick={handleCloseModal}
              className="px-4 py-2 w-full h-[32px]"
            >
              검색
            </MainButton>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LocationModal;

// const CustomScrollbar = styled.div`
//   &::-webkit-scrollbar {
//     width: 7px;
//     display: none;
//   }

//   &::-webkit-scrollbar-track {
//     background: none;
//     border-radius: 10px;
//   }

//   &::-webkit-scrollbar-thumb {
//     background: #888;
//     border-radius: 10px;
//   }

//   /* Firefox를 위한 스타일 */
//   scrollbar-width: none;
//   scrollbar-color: #888 transparent;

//   &:active::-webkit-scrollbar,
//   &:focus::-webkit-scrollbar,
//   &:hover::-webkit-scrollbar {
//     display: block;
//   }
// `;
const CustomScrollbar = styled.div`
  overflow-y: auto;

  /* 항상 스크롤바 숨기기 */
  &::-webkit-scrollbar {
    width: 0;
    background: transparent;
  }

  /* Firefox를 위한 스타일 */
  scrollbar-width: none;
  -ms-overflow-style: none;
`;
