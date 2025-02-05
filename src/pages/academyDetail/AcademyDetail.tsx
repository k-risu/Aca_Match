import { message, Radio } from "antd";
import axios from "axios";
import DOMPurify from "dompurify";
import { useEffect, useRef, useState } from "react";
import { Cookies } from "react-cookie";
import { FaFacebookF, FaLink, FaShare, FaXTwitter } from "react-icons/fa6";
import { GoStar, GoStarFill } from "react-icons/go";
import { SiNaver } from "react-icons/si";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useRecoilValue } from "recoil";
import jwtAxios from "../../apis/jwt";
import userInfo from "../../atoms/userInfo";
import LikeButton from "../../components/button/LikeButton";
import MainButton from "../../components/button/MainButton";
import CustomModal from "../../components/modal/Modal";
import AcademyCalendar from "./AcademyCalendar";
import ClassList from "./ClassList";
import KakaoMap from "./KakaoMap";
import ReviewSection from "./ReviewSection";
import { AcademyClass, AcademyData } from "./types";

declare global {
  interface Window {
    kakao: any;
  }
}
const usedRandomNumbers = new Set<number>();

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
  const page = searchParams.get("page") || "2";
  const size = 10;

  const [academyData, setAcademyData] = useState<AcademyData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  // const [isMapLoaded, setIsMapLoaded] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [address, setAddress] = useState("");
  const [likeCount, setLikeCount] = useState<number>(0);

  const [isLiked, setIsLiked] = useState<boolean>(false);

  const [selectClass, setSelectClass] = useState<number>(0);

  const [isLink, setIslink] = useState(false);

  const cookies = new Cookies();
  const navigate = useNavigate();

  const [items, setItems] = useState([
    { label: "상세 학원정보", isActive: true },
    { label: "수업정보", isActive: false },
    { label: "후기", isActive: false },
  ]);

  const checkIsAuthenticated = () => {
    const accessToken = cookies.get("accessToken");
    return !!accessToken; // accessToken이 존재하면 true, 없으면 false
  };

  const getRandomUniqueNumber = () => {
    if (usedRandomNumbers.size === 10) {
      usedRandomNumbers.clear(); // 모든 숫자가 사용되면 초기화
    }

    let randomNum;
    do {
      randomNum = Math.floor(Math.random() * 10) + 1; // 1~10 사이의 랜덤 숫자
    } while (usedRandomNumbers.has(randomNum));

    usedRandomNumbers.add(randomNum);
    return randomNum;
  };

  const { userId } = useRecoilValue(userInfo); // Recoil에서 userId 가져오기

  useEffect(() => {
    const fetchAcademyData = async () => {
      try {
        setLoading(true);
        // userId가 있을 경우 signedUserId 파라미터 추가
        const url = userId
          ? `/api/academy/getAcademyDetailAllInfo?signedUserId=${userId}&acaId=${acaId}&page=${page}&size=${size}`
          : `/api/academy/getAcademyDetailAllInfo?acaId=${acaId}&page=${page}&size=${size}`;

        const response = await axios.get(url);

        if (response.data.resultData) {
          setAcademyData(response.data.resultData);
          setIsLiked(response.data.resultData.isLiked);
          setLikeCount(response.data.resultData.likeCount);
          if (response.data.resultData.addressDto.address) {
            setAddress(response.data.resultData.addressDto.address);
          }
        }
        // console.log(`/pic/academy/${academyData.acaId}/${academyData.acaPic}`);

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

  const handleButton1Click = () => setIsModalVisible(false);
  const handleButton2Click = async () => {
    try {
      const res = await jwtAxios.post("/api/joinClass", {
        classId: selectClass,
        userId: userId,
        discount: 0,
        certification: 1,
      });
      console.log(selectClass, userId);
      if (res.data.resultMessage === "이미 수강 신청하였습니다.")
        message.success("이미 수강중 입니다");
      else message.success("수강 신청이 완료되었습니다.");

      console.log(res);
    } catch (error) {
      console.log(error);
    }
    setIsModalVisible(false);
  };

  const handleClassSelect = (classId: number) => {
    setSelectClass(classId);
  };

  const handleCopy = async () => {
    setIslink(true);
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
                    src={`http://112.222.157.156:5223/pic/academy/${academyData.acaId}/${academyData.acaPic}`}
                    alt={academyData.acaName}
                    className="w-full h-full object-cover rounded-[12px]"
                    // onError={e => {
                    // const target = e.target as HTMLImageElement;
                    // const randomNum = getRandomUniqueNumber();
                    // target.src = `/default_academy${randomNum}.jpg`;
                    // console.log(`/default_academy${randomNum}.jpg`);
                    // }}
                  />
                )}
              </div>
            </div>
            <div className={styles.content.mainContent}>
              <h2 className={`${styles.academy.title} relative`}>
                {academyData.acaName}
                <div className="flex items-center gap-2 text-2xl absolute right-[16px] top-[25px] ">
                  {/* <button onClick={handleCopy}>
                    <FaShare color="#507A95" />
                  </button> */}
                  <LinkModal />
                </div>
              </h2>
              <div className={styles.academy.description}>
                {academyData.addressDto.address}{" "}
                {academyData.addressDto.detailAddress}
              </div>
              <div className={styles.academy.description}>
                {academyData.acaPhone}
              </div>
              <div
                dangerouslySetInnerHTML={{
                  __html: DOMPurify.sanitize(academyData.comments),
                }}
                className="text-[14px] mb-[50px]"
              >
                {/* {academyData.comments} */}
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
                    onClick={() => {
                      if (!checkIsAuthenticated()) {
                        navigate("/login");
                        message.error("로그인이 필요한 서비스입니다.");
                        return;
                      }
                      setIsModalVisible(true);
                    }}
                  >
                    학원 문의하기
                  </MainButton>
                  <MainButton
                    className="w-[119px] h-[40px] text-[14px]"
                    onClick={() => {
                      if (!checkIsAuthenticated()) {
                        navigate("/login");
                        message.error("로그인이 필요한 서비스입니다.");
                        return;
                      }
                      setIsModalVisible(true);
                    }}
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

        {items[1].isActive && (
          <ClassList classes={academyData.classes as AcademyClass[]} />
        )}

        {items[2].isActive && (
          <ReviewSection
            academyId={academyData.acaId}
            star={academyData.star}
            reviewCount={academyData.reviewCount}
            renderStars={renderStars}
            reviews={academyData.reviews}
            classes={academyData.classes as AcademyClass[]}
          />
        )}
      </div>

      <CustomModal
        visible={isModalVisible}
        title={"수강등록"}
        content={
          <>
            <div className="flex flex-col gap-2">
              {academyData.classes.map(classItem => (
                <Radio
                  key={classItem.classId}
                  checked={selectClass === classItem.classId}
                  onChange={() => handleClassSelect(classItem.classId)}
                >
                  <div className="flex items-center line-clamp-1">
                    <p className="text-[16px] font-[400] line-clamp-1">
                      {classItem.className}{" "}
                    </p>
                    <p className="text-[14px] line-clamp-1">
                      ({classItem.classStartDate}~{classItem.classEndDate})
                    </p>
                  </div>
                </Radio>
              ))}
              <p className="mt-[15px]">수강등록 하시겠습니까?</p>
            </div>
          </>
        }
        onButton1Click={handleButton1Click}
        onButton2Click={handleButton2Click}
        button1Text={"취소"}
        button2Text={"확인"}
        modalWidth={400}
      />
      {/* {isLink && <LinkModal></LinkModal>} */}
    </div>
  );
};

export default AcademyDetail;

const LinkModal = ({ projectId }: { projectId?: string }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLink, setIsLink] = useState(false);
  const modalRef = useRef<HTMLDivElement | null>(null);

  // ✅ 모달 외부 클릭 시 닫기
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      setTimeout(() => {
        window.addEventListener("click", handleClickOutside);
      }, 0);
    }

    return () => {
      window.removeEventListener("click", handleClickOutside);
    };
  }, [isOpen]);

  // ✅ 모달 내부 클릭 이벤트 전파 방지
  const handleModalClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  // ✅ 링크 복사 기능
  const handleCopy = async () => {
    setIsLink(true);
    try {
      await navigator.clipboard.writeText(window.location.href);
      message.success("링크가 복사되었습니다!");
    } catch (error) {
      message.error("링크 복사에 실패했습니다.");
    }
  };

  // ✅ SNS 공유 함수
  const snsSendProc = (type: string) => {
    const shareTitle = "공유하기";
    const shareURL = `http://localhost:5173/share/view?projectId=${projectId}`;
    let href = "";

    switch (type) {
      case "FB":
        href = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareURL)}&t=${encodeURIComponent(shareTitle)}`;
        break;
      case "TW":
        href = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareTitle)}&url=${encodeURIComponent(shareURL)}`;
        break;
      case "NB":
        href = `https://share.naver.com/web/shareView?url=${encodeURIComponent(shareURL)}&title=${encodeURIComponent(shareTitle)}`;
        break;
    }

    if (href) {
      window.open(href, "_blank", "noopener,noreferrer");
    }
  };

  return (
    <div className="relative inline-block">
      {/* 모달을 여는 버튼 */}
      <button
        onClick={e => {
          e.stopPropagation(); // ✅ 버튼 클릭 시 handleClickOutside 방지
          setIsOpen(true);
        }}
      >
        <FaShare color="#507A95" />
      </button>

      {/* 모달 */}
      {isOpen && (
        <div className="absolute right-0 flex justify-center items-center z-50">
          <div
            ref={modalRef}
            onClick={handleModalClick}
            className="bg-white p-5 rounded-lg shadow-lg w-64"
          >
            <h2 className="text-lg font-semibold mb-3">공유하기</h2>
            <div className="flex justify-around gap-3">
              <button onClick={() => snsSendProc("FB")}>
                <FaFacebookF className="text-blue-600 text-3xl" />
              </button>
              <button onClick={() => snsSendProc("TW")}>
                <FaXTwitter className="text-blue-400 text-3xl" />
              </button>
              <button onClick={() => snsSendProc("NB")}>
                <SiNaver className="text-green-500 text-3xl" />
              </button>
              <button onClick={handleCopy}>
                <FaLink
                  className={`text-gray-600 text-3xl ${isLink ? "text-green-400" : ""}`}
                />
              </button>
            </div>

            {/* 닫기 버튼 */}
            <button
              onClick={() => setIsOpen(false)}
              className="mt-4 w-full bg-gray-200 py-2 rounded-md"
            >
              닫기
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
