import { message } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import { FaShare } from "react-icons/fa6";
import { GoStar, GoStarFill } from "react-icons/go";
import { useSearchParams } from "react-router-dom";
import { useRecoilValue } from "recoil";
import userInfo from "../../atoms/userInfo";
import MainButton from "../../components/button/MainButton";
import LikeButton from "../../components/button/LikeButton";
import CustomModal from "../../components/modal/Modal";
import AcademyCalendar from "./AcademyCalendar";
import KakaoMap from "./KakaoMap";
import { AcademyClass, AcademyData } from "./types";
import ClassList from "./ClassList";
import ReviewSection from "./ReviewSection";

declare global {
  interface Window {
    kakao: any;
  }
}

// Tailwind 스타일 상수
const styles = {
  container: "flex w-full",
  content: {
    wrapper: "flex flex-col gap-[12px] mt-[32px]",
    imageContainer: "flex items-center justify-center px-[16px] py-[12px]",
    image: "w-[928px] h-[320px] bg-gray-500 rounded-[12px]",
    mainContent: "w-[940px] flex flex-col gap-[12px] mx-auto",
  },
  header: {
    wrapper: "flex h-[72px] px-[16px] py-[16px]",
    title: "font-bold text-3xl text-brand-default text-start",
  },
  tab: {
    container: "flex flex-row justify-between items-center h-[63px]",
    item: "cursor-pointer flex justify-center items-center w-[416px] min-w-[288px] h-[43px] border-b-2",
    activeTab: "border-brand-BTBlue",
    inactiveTab: "border-[#F0F0F0]",
    text: "text-[16px] leading-[40px] text-center",
    activeText: "font-bold text-brand-BTBlue",
    inactiveText: "text-[#666666]",
  },
  academy: {
    title: "h-[58px] flex justify-center items-center text-[24px] font-bold",
    description:
      "h-[36px] flex justify-center items-center text-[14px] text-[#507A95]",
    content: "flex flex-col justify-center items-center text-[14px]",
    textContent: "text-[14px]items-center px-[16px] py-[12px] mb-[50px]",
  },
  stats: {
    container:
      "flex justify-center items-center p-5 gap-[130px] w-[960px] h-[94px] mb-[50px] border border-[#EEEEEE] rounded-[10px]",
    rating: "flex items-center h-[50px] text-[32px] font-bold",
    ratingWrapper: "flex items-center gap-[10px]",
    statsWrapper: "flex flex-col items-center justify-between",
    statItem: "w-[200px] flex items-center justify-between",
    statLabel: "font-bold",
    statValue: "flex items-center text-[14px] text-[#507A95]",
  },
  section: {
    title: "text-[24px] font-bold flex items-center h-[70px]",
    map: "w-full h-[450px] mb-[100px]",
  },
};
const AcademyDetail = () => {
  const [searchParams] = useSearchParams();
  const acaId = searchParams.get("id");
  const [academyData, setAcademyData] = useState<AcademyData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isMapLoaded, setIsMapLoaded] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [address, setAddress] = useState("");
  const [likeCount, setLikeCount] = useState<number>(0);

  const [isLiked, setIsLiked] = useState<boolean>(false);

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

  const { userId } = useRecoilValue(userInfo); // Recoil에서 userId 가져오기

  useEffect(() => {
    const fetchAcademyData = async () => {
      try {
        setLoading(true);
        // userId가 있을 경우 signedUserId 파라미터 추가
        const url = userId
          ? `/api/academy/getAcademyDetailAllInfo?signedUserId=${userId}&acaId=${acaId}`
          : `/api/academy/getAcademyDetailAllInfo?acaId=${acaId}`;

        const response = await axios.get(url);

        if (response.data.resultData) {
          setAcademyData(response.data.resultData);
          setIsLiked(response.data.resultData.isLiked);
          setLikeCount(response.data.resultData.likeCount);
          if (response.data.resultData.addressDto.address) {
            setAddress(response.data.resultData.addressDto.address);
          }
        }
        console.log(response.data.resultData);
      } catch (error) {
        console.error("Failed to fetch academy data:", error);
        setError("학원 정보를 불러오는데 실패했습니다.");
      } finally {
        setLoading(false);
      }
    };

    if (acaId) {
      fetchAcademyData();
    }
  }, [acaId, userId]);

  const handleTabClick = (index: number) => {
    const updatedItems = items.map((item, idx) => ({
      ...item,
      isActive: idx === index,
    }));
    setItems(updatedItems);
  };

  const renderStars = (rating: number) => {
    const fullStars = Math.floor(rating);
    const emptyStars = 5 - fullStars;

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

  // 좋아요 토글 핸들러
  const handleLikeToggle = async () => {
    try {
      // API 호출 (실제 엔드포인트에 맞게 수정 필요)
      await axios.post(`/api/academy/like/${acaId}`);
      setIsLiked(prev => !prev);
    } catch (error) {
      console.error("Failed to toggle like:", error);
    }
  };

  const handleButton1Click = () => setIsModalVisible(false);
  const handleButton2Click = () => setIsModalVisible(false);
  const handleDateClick = (arg: any) => alert(arg.dateStr);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      message.success("링크가 복사되었습니다!");
    } catch (error) {
      message.error("링크 복사에 실패했습니다.");
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        로딩 중...
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen text-red-500">
        {error}
      </div>
    );
  }

  if (!academyData) {
    return (
      <div className="flex justify-center items-center h-screen">
        학원 정보를 찾을 수 없습니다.
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.content.wrapper}>
        <div className={styles.header.wrapper}>
          <h1 className={styles.header.title}>학원 상세보기</h1>
        </div>

        <div className={styles.tab.container}>
          {items.map((item, index) => (
            <div
              key={index}
              className={`${styles.tab.item} ${
                item.isActive ? styles.tab.activeTab : styles.tab.inactiveTab
              }`}
              onClick={() => handleTabClick(index)}
            >
              <span
                className={`${styles.tab.text} ${
                  item.isActive
                    ? styles.tab.activeText
                    : styles.tab.inactiveText
                }`}
              >
                {item.label}
              </span>
            </div>
          ))}
        </div>

        {items[0].isActive && (
          <div>
            <div className={styles.content.imageContainer}>
              <div className={styles.content.image}>
                {academyData.acaPic && (
                  <img
                    src={`/pic/academy/${academyData.acaId}/${academyData.acaPic}`}
                    alt={academyData.acaName}
                    className="w-full h-full object-cover rounded-[12px]"
                    onError={e => {
                      const target = e.target as HTMLImageElement;
                      target.src = "/default_academy.jpg";
                    }}
                  />
                )}
              </div>
            </div>
            <div className={styles.content.mainContent}>
              <h2 className={`${styles.academy.title} relative`}>
                {academyData.acaName}
                <div className="flex items-center gap-2 text-2xl absolute right-[16px] top-[25px] ">
                  <button onClick={handleCopy}>
                    <FaShare color="#507A95" />
                  </button>
                </div>
              </h2>
              <div className={styles.academy.description}>
                {academyData.addressDto.address}{" "}
                {academyData.addressDto.detailAddress}
              </div>
              <div className={styles.academy.description}>
                {academyData.acaPhone}
              </div>
              <div className="text-[14px] mb-[50px]">
                {academyData.comments}
              </div>

              <div className={styles.stats.container}>
                <div className={styles.stats.ratingWrapper}>
                  <div className={styles.stats.rating}>
                    {academyData.star.toFixed(1)}
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="flex items-center gap-[2px] text-[14px] mt-[12px]">
                      {renderStars(academyData.star)}
                    </div>
                    <div className="text-[14px]">
                      {academyData.reviewCount} reviews
                    </div>
                  </div>
                </div>

                <div className={styles.stats.statsWrapper}>
                  <div className={styles.stats.statItem}>
                    <div className={`${styles.stats.statLabel} w-20`}>
                      <LikeButton
                        academyId={academyData.acaId}
                        initialIsLiked={isLiked}
                        onLikeChange={setIsLiked}
                        setLikeCount={setLikeCount}
                      />
                    </div>
                    <span className={styles.stats.statValue}>
                      {likeCount}명
                    </span>
                  </div>
                  <div className={styles.stats.statItem}>
                    <span className={styles.stats.statLabel}>
                      강사 수 &nbsp;
                    </span>
                    <span className={styles.stats.statValue}>
                      {academyData.teacherNum}명
                    </span>
                  </div>
                </div>
                <div className="flex items-center justify-center gap-[12px]">
                  <MainButton
                    className="w-[119px] h-[40px] text-[14px]"
                    onClick={() => setIsModalVisible(true)}
                  >
                    학원 문의하기
                  </MainButton>
                  <MainButton
                    className="w-[119px] h-[40px] text-[14px]"
                    onClick={() => setIsModalVisible(true)}
                    type="primary"
                  >
                    학원 신청하기
                  </MainButton>
                </div>
              </div>

              <div className={styles.section.title}>학원 일정</div>
              <div className="mb-[50px]">
                <AcademyCalendar academyData={academyData} />
              </div>

              <div className={styles.section.title}>찾아 오시는 길</div>
              {academyData?.addressDto?.address && (
                <KakaoMap address={academyData.addressDto.address} />
              )}
            </div>
          </div>
        )}

        {/* {items[1].isActive && (
          <div className="flex flex-col justify-center items-center mt-[12px] w-[930px] mx-auto mb-[50px]">
            {academyData.classes.map(classItem => (
              <div
                key={classItem.classId}
                className="w-full mb-[24px] p-[16px] border rounded-[8px]"
              >
                <h2 className="text-[24px] font-bold mb-[12px]">
                  {classItem.className}
                </h2>
                <p className="text-[16px] mb-[12px]">
                  {classItem.classComment}
                </p>
                <div className="grid grid-cols-2 gap-[12px]">
                  <p>
                    <span className="font-bold">수업 기간:</span>{" "}
                    {classItem.classStartDate} ~ {classItem.classEndDate}
                  </p>
                  <p>
                    <span className="font-bold">수업 시간:</span>{" "}
                    {classItem.classStartTime.slice(0, 5)} ~{" "}
                    {classItem.classEndTime.slice(0, 5)}
                  </p>
                  <p>
                    <span className="font-bold">수업료:</span>{" "}
                    {classItem.classPrice.toLocaleString()}원
                  </p>
                  {classItem.classDay && (
                    <p>
                      <span className="font-bold">수업 요일:</span>{" "}
                      {classItem.classDay}
                    </p>
                  )}
                  {classItem.classCategoryName && (
                    <p>
                      <span className="font-bold">수강 대상:</span>{" "}
                      {classItem.classCategoryName}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        )} */}
        {items[1].isActive && (
          <ClassList classes={academyData.classes as AcademyClass[]} />
        )}

        {/* {items[2].isActive && academyData && (
          <div className="flex flex-col mx-auto">
            <div className={styles.stats.container}>
              <div className={styles.stats.ratingWrapper}>
                <div className={styles.stats.rating}>
                  {academyData.star.toFixed(1)}
                </div>
                <div className="flex flex-col items-center">
                  <div className="flex items-center gap-[2px] text-[14px] mt-[12px]">
                    {renderStars(academyData.star)}
                  </div>
                  <div className="text-[14px]">
                    {academyData.reviewCount} reviews
                  </div>
                </div>
              </div>
            </div>

            <div className="text-[18px] font-bold h-[47px]">Reviews</div>
            <div className={styles.reviews.container}>
              {academyData.reviews.map((review, index) => (
                <div
                  key={index}
                  className="flex flex-col mb-[24px] p-[16px] border rounded-[8px]"
                >
                  <div className={styles.reviews.header}>
                    <div className={styles.reviews.avatar} />
                    <div>
                      <div className={styles.reviews.text}>
                        User {review.userId}
                      </div>
                      <div className={styles.reviews.text}>
                        {new Date(review.createdAt).toLocaleDateString()}
                      </div>
                    </div>
                  </div>
                  <div className={styles.reviews.rating}>
                    {renderStars(review.star)}
                    <span className="ml-2 text-[14px]">
                      {review.star.toFixed(1)}
                    </span>
                  </div>
                  <div className={styles.reviews.content}>{review.comment}</div>
                </div>
              ))}
            </div>
          </div>
        )} */}
        {items[2].isActive && (
          <ReviewSection
            academyId={academyData.acaId}
            star={academyData.star}
            reviewCount={academyData.reviewCount}
            renderStars={renderStars}
            reviews={academyData.reviews}
          />
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
