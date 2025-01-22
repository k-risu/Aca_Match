import { GoStarFill } from "react-icons/go";
import { GoStar } from "react-icons/go";
import MainButton from "../components/button/MainButton";
import { useEffect, useState } from "react";
import CustomModal from "../components/modal/Modal";

import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid"; // a plugin!
import interactionPlugin from "@fullcalendar/interaction"; // needed for dayClick
import { Map, MapMarker } from "react-kakao-maps-sdk";
const AcademyDetail = () => {
  const [isMapLoaded, setIsMapLoaded] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const address = "전라남도 나주시 성북동 210 중앙로 공인중개사 사무소";

  const [mapPosition, setMapPosition] = useState({
    lat: 33.5563,
    lng: 126.79581,
  });
  const [markerPosition, setMarkerPosition] = useState({
    lat: 33.55635,
    lng: 126.795841,
  });

  const [items, setItems] = useState([
    { label: "상세 학원정보", isActive: true },
    { label: "수업정보", isActive: false },
    { label: "후기", isActive: false },
  ]);
  const data = {
    academy: {
      name: "아이 아카데미",
      description: "Math, Algebra, Calculus",
      phone: "(415) 555-1234",
      reviews: {
        rating: "4.5",
        count: 123,
      },
      questionsAnswered: "12,000 questions answered",
    },
    content: {
      description: (
        <>
          <p>
            Little Explorers는 아이들의 꿈과 성장을 지원하는 따뜻하고 안전한
            학원입니다. 부모님들의 소중한 의견과 경험에서 알 수 있듯이, 저희는
            교육과 보살핌에서 항상 최고를 지향합니다.
          </p>
          <p>저희 아이 아카데미는 다음과 같은 특징을 자랑합니다:</p>
          <ul>
            <li>
              - 전문적이고 따뜻한 교사진: 지식이 풍부하며 친절한 선생님들이
              아이들의 발달 단계에 맞는 교육과 지도를 제공합니다.
            </li>
            <li>
              - 깨끗하고 안전한 시설: 아이들이 안심하고 뛰어놀며 배울 수 있는
              환경을 유지하고 있습니다.
            </li>
            <li>
              - 창의적이고 매력적인 커리큘럼: 아이들의 창의성과 비판적 사고를
              키우는 프로그램을 통해 다방면으로 성장할 수 있도록 돕습니다.
            </li>
            <li>
              - 자극적이고 지원적인 학습 환경: 모든 아이들이 즐겁게 배우고, 매일
              새로운 지식과 기술을 탐구하며 성취감을 느낄 수 있는 공간을
              제공합니다.
            </li>
          </ul>
          <p>
            - Little Explorers는 아이들이 배움에 대한 즐거움을 느끼고, 자신감을
            키워가는 과정을 소중히 여깁니다. 많은 부모님들께서 저희 유치원을
            추천하시며, 아이들이 여기에서 얻은 긍정적인 경험은 그들의 평생 학습
            여정에 큰 밑거름이 됩니다.
          </p>
          <p>Little Explorers에서 아이의 밝은 미래를 시작하세요!</p>
        </>
      ),
    },
    content2: {
      courseDescription: (
        <>
          <h2 className="text-[24px] font-bold mb-[12px]">창의 과학 탐구반</h2>
          <p className="text-[16px] font-bold mb-[12px]">강좌 기간</p>
          <p className="text-[14px]">
            2025년 2월 5일 ~ 2025년 6월 20일 (총 20주 과정)
          </p>
          <p className="text-[16px] font-bold">강좌 소개</p>
          <p className="text-[14px] mb-[12px]">
            창의 과학 탐구반은 아이들의 호기심을 자극하고 창의력을 키우기 위해
            설계된 특별한 프로그램입니다. 실험, 관찰, 탐구 중심의 수업을 통해
            자연 현상과 과학 원리를 배우며 문제 해결 능력을 키웁니다. 아이들이
            과학적 사고를 통해 세상을 이해하는 즐거움을 느낄 수 있도록
            도와줍니다.
          </p>
          <p className="text-[16px] font-bold">수강 연령대</p>
          <p className="text-[14px] mb-[12px]">5세 ~ 7세</p>
          <p className="text-[16px] font-bold">과목 선택 및 수준</p>
          <p className="text-[14px] ">
            입문반: 과학을 처음 접하는 아이들을 위한 쉽고 재미있는 기초 실험과
            활동
          </p>
          <p className="text-[14px]">
            심화반: 과학에 관심이 많고 더 깊이 배우고 싶은 아이들을 위한 심화
            탐구 수업
          </p>
          <p className="text-[16px] font-bold">요일 및 시간</p>
          <p className="text-[14px]">
            입문반: 매주 화요일, 목요일 오후 2:00 ~ 3:30
          </p>
          <p className="text-[14px] mb-[12px]">
            심화반: 매주 수요일, 금요일 오후 2:00 ~ 3:30
          </p>
          <p className="text-[16px] font-bold">가격</p>
          <p className="text-[14px]">입문반: 월 15만 원</p>
          <p className="text-[14px]">심화반: 월 18만 원</p>
          <p className="text-[14px] mb-[12px]">
            창의 과학 탐구반은 아이들이 즐겁게 배우고 새로운 세계를 탐구할 수
            있도록 돕는 특별한 기회입니다. 아이의 호기심과 잠재력을 마음껏 펼칠
            수 있는 공간, 과학의 매력을 느껴보세요!
          </p>
          <p className="text-[14px] mb-[12px]">
            궁금한 점이나 등록 문의는 언제든지 학원으로 연락 주세요. 😊
          </p>
        </>
      ),
    },
    content3: {
      reviews: [
        {
          name: "홍길동",
          date: "2023-10-01",
          rating: 5,
          content:
            "저는 제 아이가 Little Explorers에서 받는 보살핌과 교육에 매우 만족합니다. 선생님들은 친절하고 지식이 풍부합니다. 시설은 깨끗하고 안전합니다. 우리 아이는 항상 학교에 가는 것을 좋아하며 매일 새로운 지식과 기술을 가지고 집에 옵니다.",
        },
        {
          name: "김영희",
          date: "2023-09-15",
          rating: 4,
          content: "시설이 깨끗하고 안전해서 아이들이 안심하고 다닐 수 있어요.",
        },
        {
          name: "이철수",
          date: "2023-08-20",
          rating: 5,
          content: "아이의 성장이 눈에 보입니다. 추천합니다!",
        },
      ],
    },
  };

  // 카카오맵 스크립트 로드
  useEffect(() => {
    // 기존에 카카오맵 스크립트가 있는지 확인
    if (!document.querySelector("script[src*='dapi.kakao.com']")) {
      const kakaoMapScript = document.createElement("script");
      kakaoMapScript.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${import.meta.env.VITE_KKO_MAP_KEY}&autoload=false&libraries=services`;
      kakaoMapScript.async = true;

      kakaoMapScript.onload = () => {
        if (window.kakao) {
          window.kakao.maps.load(() => {
            setIsMapLoaded(true);

            // Geocoding: 주소를 위도와 경도로 변환
            const geocoder = new window.kakao.maps.services.Geocoder();
            geocoder.addressSearch(address, (result, status) => {
              if (
                status === window.kakao.maps.services.Status.OK &&
                result[0]
              ) {
                const coords = new window.kakao.maps.LatLng(
                  parseFloat(result[0].y),
                  parseFloat(result[0].x),
                );

                // 변환된 좌표를 지도와 마커에 적용
                setMapPosition({ lat: coords.getLat(), lng: coords.getLng() });
                setMarkerPosition({
                  lat: coords.getLat(),
                  lng: coords.getLng(),
                });
              } else {
                console.error("주소 변환 실패:", status);
              }
            });
          });
        }
      };

      document.head.appendChild(kakaoMapScript);
    } else {
      // 이미 스크립트가 로드된 경우
      if (window.kakao && window.kakao.maps) {
        window.kakao.maps.load(() => {
          setIsMapLoaded(true);

          const geocoder = new window.kakao.maps.services.Geocoder();
          geocoder.addressSearch(address, (result, status) => {
            if (status === window.kakao.maps.services.Status.OK && result[0]) {
              const coords = new window.kakao.maps.LatLng(
                parseFloat(result[0].y),
                parseFloat(result[0].x),
              );

              setMapPosition({ lat: coords.getLat(), lng: coords.getLng() });
              setMarkerPosition({ lat: coords.getLat(), lng: coords.getLng() });
            } else {
              console.error("주소 변환 실패:", status);
            }
          });
        });
      }
    }

    return () => {
      const script = document.querySelector("script[src*='dapi.kakao.com']");
      if (script) document.head.removeChild(script);
    };
  }, [address]);

  // 지도가 로드되지 않았다면 로딩 메시지를 표시합니다
  if (!isMapLoaded) {
    return <div>지도를 불러오는 중입니다...</div>;
  }

  // 탭 클릭 핸들러
  const handleTabClick = (index: number) => {
    // 모든 탭의 isActive 값을 false로 설정하고, 클릭한 탭만 true로 설정
    const updatedItems = items.map((item, idx) => ({
      ...item,
      isActive: idx === index,
    }));
    setItems(updatedItems);
  };

  // 별점 렌더링
  const renderStars = (rating: number) => {
    const fullStars = Math.floor(rating); // 소수점 이하 버림
    const emptyStars = 5 - fullStars; // 최대 5개 별

    return (
      <>
        {Array(fullStars)
          .fill(<GoStarFill className="text-[#242424]" />)
          .map((star, index) => (
            <span key={`filled-${index}`}>{star}</span>
          ))}
        {Array(emptyStars)
          .fill(<GoStar className="text-[#242424]" />)
          .map((star, index) => (
            <span key={`empty-${index}`}>{star}</span>
          ))}
      </>
    );
  };
  // <GoStarFill />
  // <GoStar />

  const handleButton1Click = () => {
    setIsModalVisible(false);
  };

  const handleButton2Click = () => {
    setIsModalVisible(false);
  };

  const handleDateClick = (arg: any) => {
    alert(arg.dateStr);
  };

  return (
    <div className="flex w-full">
      {/* 학원 상세보기 */}
      <div className="flex flex-col gap-[12px] mt-[32px]">
        <div className="flex h-[72px] px-[16px] py-[16px]">
          <h1 className="font-bold text-3xl text-brand-default text-start">
            학원 상세보기
          </h1>
        </div>
        {/* 학원 정보 탭 */}
        <div className="flex flex-row justify-between items-center h-[63px]">
          {items.map((item, index) => (
            <div
              key={index}
              className={`cursor-pointer flex justify-center items-center w-[416px] min-w-[288px] h-[43px] border-b-2 ${
                item.isActive ? "border-brand-BTBlue" : "border-[#F0F0F0]"
              }`}
              onClick={() => handleTabClick(index)} // 클릭 핸들러 추가
            >
              <span
                className={`text-[16px] leading-[40px] text-center ${
                  item.isActive
                    ? "font-bold text-brand-BTBlue"
                    : "text-[#666666]"
                }`}
              >
                {item.label}
              </span>
            </div>
          ))}
        </div>
        {/* 상세 학원 정보 */}
        {items[0].isActive && (
          <div>
            <div className="flex items-center justify-center px-[16px] py-[12px]">
              <div className="w-[928px] h-[320px] bg-gray-500 rounded-[12px] " />
            </div>
            <div className="w-[940px] flex flex-col gap-[12px] mx-auto">
              {/* 학원소개 */}
              <h2 className="h-[58px] flex justify-center items-center text-[24px] font-bold">
                {data.academy.name}
              </h2>
              <div className="h-[36px] flex justify-center items-center text-[14px] text-[#507A95] ">
                {data.academy.description}
              </div>
              <div className="h-[36px] flex justify-center items-center text-[14px] text-[#507A95] ">
                {data.academy.phone}
              </div>

              <div className="flex flex-col justify-center items-center text-[14px]">
                <div className="text-[14px]items-center px-[16px] py-[12px] mb-[50px]">
                  {data.content.description}
                </div>
              </div>
              {/* 별점 */}
              <div className="flex justify-center items-center p-5 gap-[130px] w-[960px] h-[94px] mb-[50px] border border-[#EEEEEE] rounded-[10px]">
                <div className="flex items-center gap-[10px]">
                  <div className="flex items-center h-[50px] text-[32px] font-bold">
                    {data.academy.reviews.rating}
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="flex items-center gap-[2px] text-[14px] mt-[12px]">
                      {renderStars(Number(data.academy.reviews.rating))}
                    </div>
                    <div className="text-[14px]">
                      {data.academy.reviews.count} reviews
                    </div>
                  </div>
                </div>
                <div className=" flex flex-col items-center justify-between">
                  <div className="w-[125px] flex items-center justify-between">
                    <span className="font-bold">등록 인원 &nbsp;</span>
                    <span className="flex items-center text-[14px] text-[#507A95]">
                      78명
                    </span>
                  </div>
                  <div className="w-[125px] flex items-center justify-between">
                    <span className="font-bold">강사 수 &nbsp;</span>
                    <span className="items-center text-[14px] text-[#507A95]">
                      8명
                    </span>
                  </div>
                </div>
                <MainButton
                  className="w-[260px] h-[40px] text-[14px]"
                  onClick={() => setIsModalVisible(true)}
                  type="primary"
                >
                  학원 등록하기
                </MainButton>
              </div>
              <div className="text-[24px] font-bold flex items-center h-[70px]">
                학원 일정
              </div>
              <div className="mb-[50px]">
                <FullCalendar
                  plugins={[dayGridPlugin, interactionPlugin]}
                  dateClick={handleDateClick}
                />
              </div>
              <div className="text-[24px] font-bold flex items-center h-[70px]">
                찾아 오시는 길
              </div>
              <Map
                center={mapPosition}
                style={{
                  width: "100%",
                  height: "450px",
                  marginBottom: "100px",
                }}
                level={3}
              >
                <MapMarker position={markerPosition} />
              </Map>
            </div>
          </div>
        )}
        {/* 수업정보 */}
        {items[1].isActive && (
          <div className="flex justify-center items-center mt-[12px] w-[930px] mx-auto mb-[50px]">
            <span>{data.content2.courseDescription}</span>
          </div>
        )}
        {/* 후기 */}
        {items[2].isActive && (
          <div className="flex flex-col mx-auto">
            <div className="flex justify-center items-center p-5 gap-[130px] w-[960px] h-[94px] mb-[50px] border border-[#EEEEEE] rounded-[10px] mx-auto">
              <div className="flex items-center gap-[10px]">
                <div className="flex items-center h-[50px] text-[32px] font-bold">
                  {data.academy.reviews.rating}
                </div>
                <div className="flex flex-col items-center">
                  <div className="flex items-center gap-[2px] text-[14px] mt-[12px]">
                    {renderStars(Number(data.academy.reviews.rating))}
                  </div>
                  <div className="text-[14px]">
                    {data.academy.reviews.count} reviews
                  </div>
                </div>
              </div>
            </div>
            <div className="text-[18px] font-bold h-[47px]">Reviews</div>
            {/* <div className="flex flex-col py-[12px] w-[930px]">
              <div className="flex flex-row gap-[12px] items-center w-[930px]">
                <div className="bg-gray-500 w-[40px] h-[40px] rounded-[20px]" />
                <div>
                  <div className="text-[14px]">
                    {data.content3.reviews[0].name}
                  </div>
                  <div className="text-[14px]">
                    {data.content3.reviews[0].date}
                  </div>
                </div>
              </div>
              <div className="flex text-[16px] mt-[12px] gap-[2px] w-[930px]">
                {renderStars(Number(data.content3.reviews[0].rating))}
              </div>
              <div className="flex text-[14px] mt-[12px] ">
                {data.content3.reviews[0].content}
              </div>
            </div> */}
            <div className="flex flex-col py-[12px] w-[930px]">
              {data.content3.reviews.map((review, index) => (
                <div key={index} className="flex flex-col mb-[12px]">
                  <div className="flex flex-row gap-[12px] items-center w-[930px]">
                    <div className="bg-gray-500 w-[40px] h-[40px] rounded-[20px]" />
                    <div>
                      <div className="text-[14px]">{review.name}</div>
                      <div className="text-[14px]">{review.date}</div>
                    </div>
                  </div>
                  <div className="flex text-[16px] mt-[12px] gap-[2px] w-[930px]">
                    {renderStars(Number(review.rating))}
                  </div>
                  <div className="flex text-[14px] mt-[12px] ">
                    {review.content}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      <CustomModal
        visible={isModalVisible}
        title={"테스트"}
        content={"작동 중"}
        onButton1Click={handleButton1Click}
        onButton2Click={handleButton2Click}
        button1Text={"취소"}
        button2Text={"확인"}
        modalWidth={400}
        modalHeight={244}
      />
    </div>
  );
};

export default AcademyDetail;
