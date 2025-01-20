import { Checkbox } from "antd";
import { useState } from "react";
import { SlArrowDown } from "react-icons/sl";

interface FilterOption {
  label: string;
  value: string;
}

interface FilterSection {
  id: string;
  title: string;
  options: FilterOption[];
}

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
}) => (
  <div
    className="absolute w-[288px] h-[300px] border border-brand-BTWhite rounded-xl p-3"
    style={style}
  >
    <div className="flex justify-between items-center w-[262px] h-6 mb-4">
      <div className="flex items-center justify-center w-[full]">
        <span className="text-base text-brand-default">{title}</span>
        <SlArrowDown />
      </div>
    </div>
    <div className="flex flex-col">
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

const AcademySearch = () => {
  const filterSections: FilterSection[] = [
    {
      id: "age",
      title: "수강 연령",
      options: [
        { label: "성인", value: "adult" },
        { label: "청소년", value: "teenager" },
        { label: "초등학생", value: "elementary" },
        { label: "유아", value: "child" },
        { label: "기타", value: "etc" },
      ],
    },
    {
      id: "subject",
      title: "과목 선택",
      options: [
        { label: "국어", value: "korean" },
        { label: "영어", value: "english" },
        { label: "수학", value: "math" },
        { label: "예체능", value: "art" },
        { label: "기타", value: "etc" },
      ],
    },
    {
      id: "level",
      title: "수준",
      options: [
        { label: "전문가", value: "expert" },
        { label: "상급", value: "advanced" },
        { label: "중급", value: "intermediate" },
        { label: "초급", value: "beginner" },
        { label: "입문자", value: "novice" },
      ],
    },
  ];

  // 필터 상태 관리
  const [selectedFilters, setSelectedFilters] = useState<{
    [key: string]: string[];
  }>({
    age: [],
    subject: [],
    level: [],
  });

  // 개별 필터 값 변경 핸들러
  const handleFilterChange = (
    sectionId: string,
    value: string,
    checked: boolean,
  ) => {
    setSelectedFilters(prev => {
      const currentValues = prev[sectionId] || [];
      if (checked) {
        return {
          ...prev,
          [sectionId]: [...currentValues, value],
        };
      } else {
        return {
          ...prev,
          [sectionId]: currentValues.filter(v => v !== value),
        };
      }
    });
  };

  return (
    <div className="flex items-center pt-[52px] w-[320px]">
      <div className="flex-col-start gap-4 w-[288px]">
        <div className="flex items-start pb-5 pl-[15px] ">
          <h2 className="text-[24px] font-bold leading-[21px] text-brand-default">
            카테고리
          </h2>
        </div>

        <div className="flex flex-row items-center w-[288px] h-[916px] relative">
          {filterSections.map((section, index) => (
            <FilterBox
              key={section.id}
              title={section.title}
              options={section.options}
              style={{ top: `${index * 308}px` }}
              selectedValues={selectedFilters[section.id] || []}
              onValueChange={(value, checked) =>
                handleFilterChange(section.id, value, checked)
              }
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default AcademySearch;
