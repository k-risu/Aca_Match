import { Pagination, Skeleton } from "antd";
import SideBar from "../components/SideBar";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function HotAcademy() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [showSkeleton, setShowSkeleton] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const pageSize = 10;

  const menuItems = [
    { label: "학원 목록", isActive: true, link: "/hotAcademy" },
  ];

  const [academyData, setAcademyData] = useState<
    Array<{
      id: number;
      image: string;
      name: string;
      tags: string;
      rating: string;
      reviews: number;
    }>
  >([]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.get("/api/academy/best", {
          params: {
            page: currentPage,
            size: pageSize,
          },
        });

        const updatedCards = response.data.resultData.map((item: any) => ({
          id: item.acaId,
          image: item.pic || "/default_academy.jpg",
          name: item.name || "학원 이름",
          tags: item.tags || "태그 정보 없음",
          rating: item.starCount?.toFixed(1) || "0.0",
          reviews: item.reviewCount || 0,
        }));

        setAcademyData(updatedCards);
        setHasMore(updatedCards.length === pageSize);

        console.log("Current page data:", updatedCards);
      } catch (error) {
        console.error("Error fetching academy data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [currentPage]);

  // 스켈레톤 UI 표시 최적화
  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    if (loading) {
      // 로딩이 200ms 이상 지속될 때만 스켈레톤 표시
      timeoutId = setTimeout(() => {
        setShowSkeleton(true);
      }, 200);
    } else {
      setShowSkeleton(false);
    }

    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [loading]);

  // 페이지 변경 핸들러
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // 스켈레톤 카드 컴포넌트
  const SkeletonCard = () => (
    <div className="flex flex-col items-start pb-3 gap-3 w-[166px]">
      <Skeleton.Image
        active
        style={{
          width: "166px",
          height: "166px",
          borderRadius: "12px",
        }}
      />
      <div className="flex flex-col items-start w-full gap-2">
        <Skeleton.Input active style={{ width: "80%", height: "24px" }} />
        <div className="flex flex-col gap-1">
          <Skeleton.Input active size="small" style={{ width: "100%" }} />
          <Skeleton.Input active size="small" style={{ width: "60%" }} />
        </div>
      </div>
    </div>
  );

  // 빈 카드 컴포넌트
  const EmptyCard = () => (
    <div className="w-[166px] h-[259px] opacity-0">{/* 투명한 빈 카드 */}</div>
  );

  // 실제 카드 컴포넌트
  const AcademyCard = ({ academy }: { academy: (typeof academyData)[0] }) => (
    <div
      className="flex flex-col items-start pb-3 gap-3 w-[166px] cursor-pointer"
      onClick={() => navigate(`/academy/detail/${academy.id}`)}
    >
      <img
        src={academy.image}
        alt={academy.name}
        className="w-[166px] h-[166px] rounded-xl object-cover"
      />
      <div className="flex flex-col items-start w-full">
        <h3 className="text-base font-medium text-[#0E161B] leading-6 w-full">
          {academy.name}
        </h3>
        <p className="text-sm text-[#507A95] leading-[21px] w-full">
          {academy.tags}
          <br />
          {academy.rating} ({academy.reviews} reviews)
        </p>
      </div>
    </div>
  );

  return (
    <div className="flex gap-5 w-full justify-center align-top">
      <SideBar menuItems={menuItems} />
      <div className="w-full">
        <h1 className="title-font">화제의 학원</h1>
        <div className="w-full gap-[12px] py-[16px] px-[16px] border rounded-lg overflow-hidden">
          <div className="flex flex-col gap-6">
            {/* 상단 5개 */}
            <div className="flex gap-6">
              {showSkeleton ? (
                <>
                  <SkeletonCard />
                  <SkeletonCard />
                  <SkeletonCard />
                  <SkeletonCard />
                  <SkeletonCard />
                </>
              ) : (
                <>
                  {academyData
                    .slice(0, Math.min(5, academyData.length))
                    .map(academy => (
                      <AcademyCard key={academy.id} academy={academy} />
                    ))}
                  {[...Array(5 - Math.min(5, academyData.length))].map(
                    (_, index) => (
                      <EmptyCard key={`empty-top-${index}`} />
                    ),
                  )}
                </>
              )}
            </div>

            {/* 하단 5개 */}
            <div className="flex gap-6">
              {showSkeleton ? (
                <>
                  <SkeletonCard />
                  <SkeletonCard />
                  <SkeletonCard />
                  <SkeletonCard />
                  <SkeletonCard />
                </>
              ) : (
                <>
                  {academyData.slice(5, 10).map(academy => (
                    <AcademyCard key={academy.id} academy={academy} />
                  ))}
                  {[...Array(5)].map(
                    (_, index) =>
                      academyData.length <= index + 5 && (
                        <EmptyCard key={`empty-bottom-${index}`} />
                      ),
                  )}
                </>
              )}
            </div>
          </div>
        </div>

        <div className="flex justify-center items-center m-6 mb-10">
          <Pagination
            current={currentPage}
            total={(currentPage + (hasMore ? 1 : 0)) * pageSize}
            pageSize={pageSize}
            onChange={handlePageChange}
            showSizeChanger={false}
          />
        </div>
      </div>
    </div>
  );
}

export default HotAcademy;
