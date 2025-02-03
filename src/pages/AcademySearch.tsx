import { DownOutlined } from "@ant-design/icons";
import styled from "@emotion/styled";
import { Checkbox, Dropdown, Form, Input, Menu, Pagination } from "antd";
import { useEffect, useState } from "react";
import { SlArrowDown } from "react-icons/sl";
import { useLocation, useNavigate } from "react-router-dom";
import MainButton from "../components/button/MainButton";
import LocationModal from "../components/modal/LocationModal";
import axios from "axios";

interface FilterOption {
  label: string;
  value: string;
}

interface FilterSection {
  title: string;
  options: FilterOption[];
}

interface AcademyData {
  image: string;
  name: string;
  tag: string;
  location: string;
  rating: string;
}
const usedRandomNumbers = new Set<number>();

const DropdownButton = styled(MainButton)`
  border: 1px solid #dbe3e6 !important;
  &:hover {
    background-color: #c4d9e9 !important;
    border-color: #507a95 !important;
    border: 1px solid #dbe3e6 !important;
    color: #242424 !important;
  }
`;

const FilterCheckbox = ({
  label,
  value,
  checked,
  onChange,
}: {
  label: string;
  value: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}) => (
  <div className="flex items-center p-3 px-[10px] gap-[11px]">
    <Checkbox checked={checked} onChange={e => onChange(e.target.checked)}>
      <span className="text-base text-brand-default">{label}</span>
    </Checkbox>
  </div>
);

const FilterBox = ({
  title,
  options,
  style,
  selectedValues,
  onValueChange,
}: {
  title: string;
  options: FilterOption[];
  style?: React.CSSProperties;
  selectedValues: string[];
  onValueChange: (value: string, checked: boolean) => void;
}) => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div
      className="w-[288px] border border-brand-BTWhite rounded-xl p-[12px]"
      style={style}
    >
      {/* Header 부분 */}
      <div
        className="flex justify-between items-center w-full cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="text-base text-brand-default">{title}</span>
        <SlArrowDown
          className={`transition-transform duration-200 ${
            isOpen ? "" : "rotate-180"
          }`}
        />
      </div>

      {/* Filter Options: 열림/닫힘에 따른 높이 조정 */}
      <div
        className={`transition-all duration-300 ease-in-out overflow-hidden`}
        style={{
          maxHeight: isOpen ? `${options.length * 40}px` : "0", // 옵션 개수에 따라 동적 높이
        }}
      >
        {options.map(option => (
          <FilterCheckbox
            key={option.value}
            label={option.label}
            value={option.value}
            checked={selectedValues.includes(option.value)}
            onChange={checked => onValueChange(option.value, checked)}
          />
        ))}
      </div>
    </div>
  );
};

const AcademySearch = () => {
  const [totalItems, setTotalItems] = useState(0);
  const [selectedSearchType, setSelectedSearchType] = useState<string>("태그");
  const [currentPage, setCurrentPage] = useState(1);
  // const [visible, setVisible] = useState(false);
  const [form] = Form.useForm();

  const { search } = useLocation();

  const [isModalVisible, setIsModalVisible] = useState(false);

  const [selectedLocation, setSelectedLocation] = useState<number | null>(-1);
  const [selectedLocationText, setSelectedLocationText] = useState<
    string | null
  >(null);

  const [searchInput, setSearchInput] = useState<string>("");

  // const handleLocationSelect = (location: number, locationText: string) => {
  //   setSelectedLocation(location); // 지역 선택
  //   setIsModalVisible(false); // 모달 닫기
  //   setSelectedLocationText(locationText);
  //   console.log(location);
  // };

  const handleLocationSelect = (location: number, locationText: string) => {
    setSelectedLocation(location); // 지역 선택
    setIsModalVisible(false); // 모달 닫기
    setSelectedLocationText(locationText);

    // URL에 location 파라미터 추가
    const params = new URLSearchParams(search);
    params.set("location", String(location)); // location 값 설정
    navigate({
      pathname: window.location.pathname,
      search: params.toString(),
    });
  };
  const academyData: AcademyData[] = [
    {
      image: "/images/academy1.png",
      name: "코딩키즈",
      tag: "코딩학원",
      location: "서울 강남구",
      rating: "4.8",
    },
    {
      image: "/images/academy2.png",
      name: "체육키즈",
      tag: "체육학원",
      location: "서울 서초구",
      rating: "4.5",
    },
    {
      image: "/images/academy3.png",
      name: "영어나라",
      tag: "어학원",
      location: "서울 송파구",
      rating: "4.9",
    },
    {
      image: "/images/academy4.png",
      name: "아트스쿨",
      tag: "미술학원",
      location: "서울 강동구",
      rating: "4.7",
    },
    {
      image: "/images/academy5.png",
      name: "축구교실",
      tag: "체육학원",
      location: "서울 마포구",
      rating: "4.6",
    },
    {
      image: "/images/academy6.png",
      name: "체스아카데미",
      tag: "교육학원",
      location: "서울 영등포구",
      rating: "4.3",
    },
    {
      image: "/images/academy7.png",
      name: "수영스쿨",
      tag: "체육학원",
      location: "서울 강서구",
      rating: "4.4",
    },
    {
      image: "/images/academy8.png",
      name: "로봇과학교실",
      tag: "과학학원",
      location: "서울 노원구",
      rating: "4.9",
    },
    {
      image: "/images/academy9.png",
      name: "발레아카데미",
      tag: "무용학원",
      location: "서울 종로구",
      rating: "4.6",
    },
    {
      image: "/images/academy10.png",
      name: "음악스쿨",
      tag: "음악학원",
      location: "서울 용산구",
      rating: "4.7",
    },
  ];

  const navigate = useNavigate();

  // const handleOpenModal = () => {
  //   setVisible(true);
  // };
  // const handleCloseModal = () => {
  //   setVisible(false);
  // };
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

  const handleButton1Click = () => {
    setIsModalVisible(false);
  };

  const menu = (
    <Menu
      onClick={({ key }) =>
        setSelectedSearchType(key === "1" ? "태그" : "검색어")
      }
    >
      <Menu.Item key="1">
        <span>태그</span>
      </Menu.Item>
      <Menu.Item key="2">
        <span>검색어</span>
      </Menu.Item>
    </Menu>
  );

  const filterSections: FilterSection[] = [
    {
      id: "age",
      title: "수강 연령",
      options: [
        { label: "성인", value: "1" }, // id 추가
        { label: "청소년", value: "2" },
        { label: "초등학생", value: "3" },
        { label: "유아", value: "4" },
        { label: "기타", value: "5" },
      ],
    },
    {
      id: "level",
      title: "수준",
      options: [
        { label: "전문가", value: "6" },
        { label: "상급", value: "7" },
        { label: "중급", value: "8" },
        { label: "초급", value: "9" },
        { label: "입문자", value: "10" },
      ],
    },
  ];
  // const fetchData = (page: number) => {
  //   //axios 데이터 호출할 때 페이지당 갯수랑 페이지 번호 전달
  //   setTotalItems(10);
  // };

  // 페이지 변경 핸들러
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    fetchData(page);
  };

  // 필터 상태 관리
  const [selectedFilters, setSelectedFilters] = useState<{
    [key: string]: string[];
  }>({
    age: [],
    level: [],
  });

  // 개별 필터 값 변경 핸들러
  // const handleFilterChange = (
  //   sectionId: string,
  //   id: string,
  //   checked: boolean,
  // ) => {
  //   setSelectedFilters(prev => {
  //     const currentValues = prev[sectionId] || [];
  //     // 체크된 값일 경우 기존 배열에 추가
  //     if (checked && !currentValues.includes(id)) {
  //       return {
  //         ...prev,
  //         [sectionId]: [...currentValues, id],
  //       };
  //     }
  //     // 체크 해제된 값일 경우 해당 값 제거
  //     else if (!checked) {
  //       return {
  //         ...prev,
  //         [sectionId]: currentValues.filter(item => item !== id),
  //       };
  //     }
  //     return prev; // 이미 추가된 값은 그대로 두기
  //   });
  // };
  const handleFilterChange = (
    sectionId: string,
    id: string,
    checked: boolean,
  ) => {
    setSelectedFilters(prev => {
      const currentValues = prev[sectionId] || [];
      if (checked && !currentValues.includes(id)) {
        currentValues.push(id);
      } else {
        const index = currentValues.indexOf(id);
        if (index > -1) {
          currentValues.splice(index, 1);
        }
      }

      // URL 쿼리 스트링 업데이트
      const params = new URLSearchParams(search);
      params.set(sectionId, currentValues.join(","));
      navigate({
        pathname: window.location.pathname,
        search: params.toString(),
      });

      return {
        ...prev,
        [sectionId]: currentValues,
      };
    });
  };

  const SearchInput = styled(Input.Search)`
    .ant-input {
      height: 56px !important;
    }

    .ant-input-search-button {
      height: 56px !important;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  `;

  const onFinish = async (values: any) => {
    console.log("Selected Filters:", selectedFilters);
    console.log(values);
  };
  // 검색어 변경 핸들러
  const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value);
  };

  // const fetchData = async (page: number) => {
  //   const params = new URLSearchParams();

  //   // 페이지 번호와 크기
  //   params.append("page", String(page));
  //   params.append("size", "10");

  //   // 선택된 필터 값들 (id 값으로 업데이트된 selectedFilters 사용)
  //   const categoryIds = [...selectedFilters.age, ...selectedFilters.level];

  //   // categoryIds 배열에 값이 있을 경우, 'categoryIds' 파라미터를 반복해서 추가
  //   categoryIds.forEach(id => {
  //     params.append("categoryIds", id); // 동일한 'categoryIds' 파라미터를 여러 번 추가
  //   });

  //   // URLSearchParams는 문자열 형태로 반환되므로, 그 값을 쿼리 파라미터로 전달
  //   try {
  //     const response = await axios.get("/api/academy/getAcademyListByAll", {
  //       params: params, // URLSearchParams를 params로 전달
  //     });
  //     console.log(response.data); // 응답 데이터 확인
  //     setTotalItems(response.data.totalItems); // 총 아이템 수 설정
  //   } catch (error) {
  //     console.error("API 요청 실패:", error);
  //   }
  // };

  const fetchData = async (page: number) => {
    const params = new URLSearchParams(search);

    // 페이지 번호와 크기
    params.set("page", String(page));
    params.set("size", "10");

    // 필터 값 추가
    for (const [key, values] of Object.entries(selectedFilters)) {
      if (values.length) {
        values.forEach(value => {
          params.append("categoryIds", value); // 같은 key에 여러 값을 추가
        });
      }
    }

    // location 값 추가 (필터가 있을 경우 추가)
    if (selectedLocation !== -1) {
      params.set("location", String(selectedLocation));
    }
    console.log(params.toString());
    try {
      const response = await axios.get("/api/academy/getAcademyListByAll", {
        params: params,
      });
      setTotalItems(response.data.totalItems);
      console.log(response);
    } catch (error) {
      console.error("API 요청 실패:", error);
    }
  };
  const id = 123;
  const path = `/academy/detail?id=${id}`;

  // 필터 변경 시 데이터 갱신
  useEffect(() => {
    fetchData(currentPage); // 필터가 변경될 때마다 데이터 갱신

    // URL에서 'location' 파라미터를 가져와서 상태에 반영
    const params = new URLSearchParams(search);
    const location = params.get("location");
    if (location) {
      setSelectedLocation(Number(location));
    }
  }, [selectedFilters, selectedLocation, searchInput, search, currentPage]);

  return (
    <Form form={form} onFinish={onFinish}>
      <div className="flex flex-row justify-between w-full gap-[12px]">
        <div className="flex mt-[77px] ">
          <div className="flex-col-start gap-4 w-[288px] h-[916px]">
            <div className="flex items-start pb-5 pl-[15px] ">
              <h2 className="text-[24px] font-[500] leading-[21px] text-brand-default mb-[15px]">
                카테고리
              </h2>
            </div>

            <div className="flex flex-col gap-[8px]">
              {filterSections.map((section, index) => (
                <Form.Item
                  name="selectedFilters"
                  className="mx-0 my-0"
                  initialValue={selectedFilters}
                  // key={section.id}
                  // label={section.title}
                >
                  <FilterBox
                    key={section.id}
                    title={section.title}
                    options={section.options}
                    selectedValues={selectedFilters[section.id] || []}
                    onValueChange={(value, checked) =>
                      handleFilterChange(section.id, value, checked)
                    }
                  />
                </Form.Item>
              ))}
            </div>
          </div>
        </div>
        <div className="flex flex-col items-start gap-3 w-full mt-[65px]">
          {/* 상단 검색 영역 */}
          <div className="flex flex-row flex-wrap justify-between items-start gap-3 w-full h-[72px]">
            <div className="flex flex-col w-[288px] min-w-[288px] h-10">
              <h1 className="font-bold text-3xl text-brand-default">
                학원 검색
              </h1>
            </div>
          </div>

          {/* 검색 필터 */}
          <div className="flex flex-row gap-3 w-full h-14">
            {/* 태그 검색 */}
            <div>
              <div className="flex justify-center items-center">
                {/* Dropdown 컴포넌트 */}
                <Dropdown overlay={menu} trigger={["click"]}>
                  <DropdownButton
                    onClick={() => {}}
                    className="w-[100px] h-[56px] border-none flex items-center px-4 text-brand-default"
                  >
                    {selectedSearchType} <DownOutlined />
                  </DropdownButton>
                </Dropdown>
              </div>
            </div>
            <div className="relative">
              <Form.Item
                name="searchInput"
                // label="검색어"
                // rules={[{ required: true, message: "검색어를 입력하세요!" }]}
              >
                <SearchInput
                  placeholder={`${selectedSearchType}를 입력해주세요`}
                  className="border-none w-[395px] h-[56px]"
                  size="large"
                  onSearch={value => form.submit()}
                />
              </Form.Item>
              {/* <CiSearch className="text-[24px] font-bold  text-brand-placeholder absolute right-[10px] bottom-[15px] " /> */}
            </div>
            <div
              className="flex items-center text-brand-placeholder pl-[11px] w-[460px] h-[56px] bg-[#ffffff] border border-[#DBE3E6] rounded-[12px] justify-between pr-[10px] cursor-pointer"
              onClick={() => setIsModalVisible(true)}
            >
              <span>
                {selectedLocation === -1 ? "지역 검색" : selectedLocationText}
              </span>
              <SlArrowDown />
            </div>
            {/* <div className="w-5 h-5 bg-brand-default" /> */}
          </div>

          {/* 학원 목록 테이블 */}
          <div className="flex flex-col w-full border border-[#DBE3E6] rounded-xl">
            {/* 테이블 헤더 */}
            <div className="flex flex-row h-[46px] items-center justify-center">
              <span className="flex-row-center text-[14px] text-brand-default text-center w-full">
                학원
              </span>
              <span className="flex-row-center text-[14px] text-brand-default text-center min-w-[15%]">
                태그
              </span>
              <span className="flex-row-center text-[14px] text-brand-default text-center  min-w-[15%]">
                지역
              </span>
              <span className="flex-row-center text-[14px] text-brand-default text-center  min-w-[15%]">
                별점
              </span>
            </div>

            {/* 학원 목록 아이템 */}

            {academyData.map((academy, index) => (
              <div
                key={index}
                className="flex flex-row h-[72px] border-t border-[#DBE3E6] cursor-pointer"
                onClick={() => navigate(path)}
              >
                <div className="flex justify-center items-center min-w-[10%]">
                  <img
                    className="w-[60px] h-[60px] rounded-[20px]"
                    src={academy.image} // 기본 이미지 설정
                    onError={e => {
                      const target = e.target as HTMLImageElement;
                      const randomNum = getRandomUniqueNumber();
                      target.src = `/default_academy${randomNum}.jpg`;
                    }}
                  />
                </div>
                <div className="flex items-center p-4 w-full text-start">
                  <span className="text-[14px] text-brand-default">
                    {academy.name}
                  </span>
                </div>
                <div className="flex min-w-[15%] justify-center items-center p-4">
                  <span className="text-[14px] text-brand-placeholder">
                    {academy.tag}
                  </span>
                </div>
                <div className="flex min-w-[15%] justify-center items-center p-4">
                  <span className="text-[14px] text-brand-placeholder">
                    {academy.location}
                  </span>
                </div>
                <div className="flex min-w-[15%] justify-center items-center p-4">
                  <div className="flex justify-center items-center px-4 h-8 bg-[#F0F2F5] rounded-xl">
                    <span className="text-[14px] font-medium text-brand-default">
                      {academy.rating}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="flex w-full justify-center items-center my-4">
            <Pagination
              current={currentPage}
              total={500} // 전체 아이템 수
              pageSize={10} // 페이지당 아이템 수
              onChange={handlePageChange}
              showSizeChanger={false} // 페이지 사이즈 변경 옵션 숨김
            />
          </div>
          {/* <div className="flex w-full justify-center items-center">
          <Pages
            perPage={5}
            totalPage={10}
            onPageChange={() => handlePageChange(1)}
          />
        </div> */}
        </div>
        {isModalVisible && (
          <Form.Item name="location">
            <LocationModal
              visible={isModalVisible}
              handleCloseModal={() => handleButton1Click()}
              handleLocationSelect={handleLocationSelect}
            />
          </Form.Item>
        )}
      </div>
    </Form>
  );
};

export default AcademySearch;
