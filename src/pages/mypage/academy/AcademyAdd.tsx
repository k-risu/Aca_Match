import { useEffect, useState } from "react";
import {
  Button,
  Form,
  Image,
  Input,
  TimePicker,
  Upload,
  UploadFile,
  UploadProps,
} from "antd";
import { PlusOutlined } from "@ant-design/icons";
import styled from "@emotion/styled";
import SideBar from "../../../components/SideBar";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import axios from "axios";
import userInfo from "../../../atoms/userInfo";
import { useRecoilValue } from "recoil";
import dayjs from "dayjs";
import CustomModal from "../../../components/modal/Modal";

const AcademyInfo = styled.div`
  .ant-form-item-label {
    display: flex;
    justify-content: flex-start;
    padding-top: 14px;
  }
  .ant-form-item-label label {
    min-width: 130px !important;
  }
  .ant-form-item-required::before {
    content: "" !important;
  }
  .ant-form-item-required::after {
    content: "*" !important;
    font-size: 1.25rem;
    color: #ff3300;
  }
  .ant-form-item-label label::after {
    content: "";
  }

  .ant-form-item-control-input-content {
    .input-wrap {
      display: flex;
      justify-content: flex-start;
      gap: 15px;
      align-items: center;
    }
    .flex-start {
      align-items: flex-start;
    }
    label {
      display: flex;
      align-items: center;
      justify-content: center;
      min-width: 130px !important;
    }
    label span {
      height: 24px;
      margin-left: 5px;
      color: #ff3300;
      font-size: 1.25rem;
    }
    input {
      height: 56px;
    }
    textarea {
      padding: 15px 12px;
    }

    .input,
    .ant-input-password {
      border-radius: 12px;
    }

    span.readonly {
      display: flex;
      align-items: center;
      height: 56px;
      padding: 0px 11px;
      border-radius: 12px;
      background-color: #f5f5f5;
      color: #666;
      font-size: 0.9rem;
    }
  }
  .ant-input-affix-wrapper,
  .ant-picker {
    padding: 0px 11px;
  }
  .ant-input-status-error {
    border: 1px solid #3b77d8 !important;
  }
  .ant-form-item-explain-error {
    padding-left: 12px;
    color: #3b77d8;
    font-size: 0.85rem;
  }
  .ant-upload-list-item {
    border: 1px solid #3b77d8 !important;
  }
`;

const TagListSelect = styled.div`
  input[type="checkbox"] {
    display: none;
  }
  input[type="checkbox"] + label {
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #eee;
    padding: 4px 15px 6px 15px;
    border-radius: 50px;
    cursor: pointer;
  }
  input[type="checkbox"]:checked + label {
    background-color: #666;
    color: #fff;
  }
`;

const menuItems = [
  { label: "회원정보 관리", isActive: false, link: "/mypage/user" },
  { label: "학원정보 관리", isActive: true, link: "/mypage/academy" },
  /*
  {
    label: "학원학생 관리",
    isActive: false,
    link: "/mypage/academy/student",
  },
  */
  {
    label: "학원리뷰 목록",
    isActive: false,
    link: "/mypage/academy/review",
  },
  { label: "좋아요 목록", isActive: false, link: "/mypage/academy/like" },
];

function AcademyAdd() {
  const [form] = Form.useForm();
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [tagList, setTagList] = useState([]); //태그목록
  const [tagKeyword, setTagKeyword] = useState(""); //태그검색 키워드
  const [selectedTag, setSelectedTag] = useState([]); //선택한 태그값

  const [fileList, setFileList] = useState<UploadFile[]>([]);

  const currentUserInfo = useRecoilValue(userInfo);
  //console.log(currentUserInfo);

  const handleAddressSearch = () => {
    new window.daum.Postcode({
      oncomplete: (data: any) => {
        form.setFieldsValue({ postNum: data.zonecode });
        form.setFieldsValue({ address: data.address });
      },
    }).open();
  };

  const handleButton1Click = () => {
    setIsModalVisible(false);
  };

  const handleButton2Click = () => {
    setIsModalVisible(false);
  };

  //모달창에서 태그 검색하기
  const handleTagSearch = () => {
    setIsModalVisible(true);
  };

  //태그 전체목록 가져오기
  const getTagList = async () => {
    try {
      const res = await axios.get("/api/tag");
      setTagList(res.data.resultData.selTagList);
    } catch (error) {
      console.log(error);
    }
  };

  //태그검색
  const handleTagSearchForm = e => {
    e.preventDefault();

    const tagSearch = async () => {
      try {
        const res = await axios.get(`/api/tag?searchTag=${tagKeyword}`);
        setTagList(res.data.resultData.selTagList);
      } catch (error) {
        console.log(error);
      }
    };
    tagSearch();
  };

  //선택한 태그값 전달
  const handleCheckboxChange = (e, item) => {
    if (e.target.checked) {
      setSelectedTag(prev => [...prev, item]);
    } else {
      setSelectedTag(prev => prev.filter(i => i !== item));
    }
  };

  //선택한 태그값 삭제
  const handleDeleteItem = item => {
    setSelectedTag(prev => prev.filter(i => i !== item));
  };

  //input 값 변경 처리
  const handleChangeTag = e => {
    setTagKeyword(e.target.value);
  };

  const tagAllList = tagList.map((item, index) => {
    const isSelected = selectedTag.includes(item);
    //const isRemoved = removedItems.includes(item);

    return (
      <li key={index}>
        <input
          type="checkbox"
          name="tag"
          value={item.tagId}
          id={`tag_${item.tagId}`}
          onChange={e => handleCheckboxChange(e, item.tagId)}
          disabled={selectedTag.some(selected => selected.id === item.tagId)}
        />
        <label htmlFor={`tag_${item.tagId}`}>{item.tagName}</label>
      </li>
    );
  });

  const initialValues = {
    acaName: "",
    acaPhone: "",
    openTime: dayjs("10:00", "HH:mm"),
    closeTime: dayjs("20:00", "HH:mm"),
    teacherNum: "",
    postNum: "",
    address: "",
    detailAddress: "",
    tagIdList: "",
    pic: "",
    userId: 2,
    dongId: 0,
    comment: "",
  };

  const handleChange: UploadProps["onChange"] = ({ fileList: newFileList }) => {
    setFileList(newFileList);
    //console.log(newFileList);
  };

  const onFinished = async values => {
    try {
      console.log(values);
      console.log(fileList[0]);
      const startTimes = dayjs(values.openTime.$d).format("HH:mm");
      const endTimes = dayjs(values.closeTime.$d).format("HH:mm");

      const formData = new FormData();

      if (fileList[0]) {
        formData.append("pic", fileList[0]); // 파일일 경우
      } else {
        formData.append("pic", null); // 파일이 없을 경우
      }

      const reqData = {
        userId: values.userId,
        dongId: 3,
        acaName: values.acaName,
        acaPhone: values.acaPhone,
        comment: values.comment,
        teacherNum: values.teacherNum,
        openTime: startTimes,
        closeTime: endTimes,
        addressDto: {
          address: values.address,
          detailAddress: values.detailAddress,
          postNum: values.postNum,
        },
        tagIdList: [1, 3],
      };

      //JSON 형태로 데이터를 만들어 formData에 추가
      formData.append(
        "req",
        new Blob([JSON.stringify(reqData)], { type: "application/json" }),
      );

      const header = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };

      const res = await axios.post("/api/academy", formData, header);
      console.log(res.data.resultData);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    // Daum 우편번호 스크립트 로드
    const script = document.createElement("script");
    script.src =
      "//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js";
    script.async = true;
    document.body.appendChild(script);

    // 컴포넌트 언마운트 시 스크립트 제거
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  useEffect(() => {
    getTagList(); //태그목록 가져오기
  }, []);

  return (
    <AcademyInfo className="w-full">
      <div className="flex gap-5 w-full justify-center pb-10">
        <SideBar menuItems={menuItems} />

        <div className="w-full">
          <h1 className="title-font flex justify-between align-middle">
            학원 등록
          </h1>
          <div className="w-3/4">
            <Form
              form={form}
              onFinish={values => onFinished(values)}
              initialValues={initialValues}
            >
              <Form.Item
                name="userId"
                label="아이디"
                rules={[{ required: true, message: "아이디를 입력해 주세요." }]}
              >
                <Input type="text" className="input" value="2" />
              </Form.Item>

              <Form.Item
                name="acaName"
                label="학원 이름"
                rules={[
                  { required: true, message: "학원 이름을 입력해 주세요." },
                ]}
              >
                <Input
                  className="input"
                  id="acaName"
                  maxLength={20}
                  placeholder="학원 이름을 입력해 주세요."
                />
              </Form.Item>

              <div className="flex gap-3 w-full">
                <Form.Item
                  name="postNum"
                  label="학원 주소"
                  className="w-full"
                  rules={[
                    { required: true, message: "학원 주소를 입력해 주세요." },
                  ]}
                >
                  <Input
                    className="input"
                    id="acaZipcode"
                    maxLength={6}
                    placeholder="우편번호"
                    readOnly
                  />
                </Form.Item>
                <Form.Item>
                  <button
                    type="button"
                    className="min-w-[84px] h-14 bg-[#E8EEF3] rounded-xl font-bold text-sm"
                    onClick={() => handleAddressSearch()}
                  >
                    주소 검색
                  </button>
                </Form.Item>
              </div>

              <Form.Item
                name="address"
                className="ml-[130px]"
                rules={[
                  { required: true, message: "학원 주소를 입력해 주세요." },
                ]}
              >
                <Input
                  className="input"
                  id="acaAddr"
                  placeholder="학원 기본주소"
                  readOnly
                />
              </Form.Item>

              <Form.Item
                name="detailAddress"
                className="ml-[130px]"
                rules={[
                  { required: true, message: "학원 주소를 입력해 주세요." },
                ]}
              >
                <Input
                  className="input"
                  id="acaAddr2"
                  maxLength={20}
                  placeholder="학원 상세주소"
                />
              </Form.Item>

              <Form.Item
                name="acaPhone"
                label="학원 전화번호"
                rules={[
                  { required: true, message: "학원 전화번호를 입력해 주세요." },
                ]}
              >
                <Input
                  className="input"
                  id="acaPhone"
                  maxLength={13}
                  placeholder="학원 전화번호를 입력해 주세요."
                />
              </Form.Item>

              <div className="flex gap-3">
                <Form.Item
                  name="openTime"
                  label="영업 시간"
                  rules={[
                    { required: true, message: "시작 시간을 선택해 주세요." },
                  ]}
                >
                  <TimePicker
                    placeholder="학원 시작 시간"
                    className="input"
                    format="HH:mm"
                  />
                </Form.Item>
                <Form.Item
                  name="closeTime"
                  label=""
                  rules={[
                    { required: true, message: "종료 시간을 선택해 주세요." },
                  ]}
                >
                  <TimePicker
                    placeholder="학원 종료 시간"
                    className="input w-full"
                    format="HH:mm"
                  />
                </Form.Item>
              </div>

              <Form.Item name="teacherNum" label="강사 인원수">
                <Input
                  className="input"
                  id="teacherNum"
                  maxLength={5}
                  placeholder="강사 인원수를 입력해 주세요."
                />
              </Form.Item>

              <Form.Item name="comment" label="학원 소개글" className="h-44">
                <ReactQuill
                  placeholder="소개글을 작성해 주세요."
                  className="h-32"
                />
              </Form.Item>

              <div className="flex gap-3 w-full">
                <Form.Item label="태그 등록" className="w-full">
                  <Input
                    className="input"
                    id="academyTag"
                    placeholder="태그를 입력해 주세요."
                    onClick={() => handleTagSearch()}
                    readOnly
                  />
                </Form.Item>

                <Form.Item>
                  <button
                    type="button"
                    className="min-w-[84px] h-14 bg-[#E8EEF3] rounded-xl font-bold text-sm"
                    onClick={() => handleTagSearch()}
                  >
                    태그 검색
                  </button>
                </Form.Item>
              </div>

              {selectedTag && (
                <div className="w-full">
                  <ul className="flex flex-wrap gap-2">
                    {selectedTag.map(item => (
                      <li key={item}>
                        {item}{" "}
                        <button onClick={() => handleDeleteItem(item)}>
                          &times;
                        </button>
                      </li>
                    ))}
                  </ul>

                  <input
                    type="hidden"
                    name="tagIdList"
                    value={selectedTag.join(", ")}
                    id="hiddenItems"
                  />
                </div>
              )}

              <Form.Item name="pic" label="프로필 이미지">
                <div>
                  <Upload
                    listType="picture-card"
                    maxCount={1}
                    onChange={handleChange}
                    showUploadList={{ showPreviewIcon: false }}
                  >
                    <button
                      style={{ border: 0, background: "none" }}
                      type="button"
                    >
                      <PlusOutlined />
                    </button>
                  </Upload>

                  <Image
                    wrapperStyle={{ display: "none" }}
                    preview={{
                      visible: previewOpen,
                      onVisibleChange: visible => setPreviewOpen(visible),
                      afterOpenChange: visible =>
                        !visible && setPreviewImage(""),
                    }}
                    src={previewImage}
                  />
                </div>
              </Form.Item>

              <Form.Item>
                <Button
                  htmlType="submit"
                  className="w-full h-14 bg-[#E8EEF3] font-bold text-sm"
                >
                  학원 등록
                </Button>
              </Form.Item>
            </Form>
          </div>
        </div>
      </div>

      <CustomModal
        visible={isModalVisible}
        title={"태그 검색"}
        content={
          <TagListSelect>
            <form onSubmit={handleTagSearchForm}>
              <div className="flex justify-center items-center mb-5 gap-3">
                <input
                  type="text"
                  name="tagSearch"
                  value={tagKeyword}
                  placeholder="태그를 입력해 주세요."
                  className="w-full h-14 pl-3 border rounded-xl text-sm"
                  onChange={handleChangeTag}
                />
                <button
                  type="submit"
                  className="h-14 w-24 bg-[#E8EEF3] rounded-xl"
                >
                  검색
                </button>
              </div>

              <ul className="flex w-full flex-wrap gap-2 overflow-y-auto max-h-32">
                {tagAllList.length > 0 ? (
                  tagAllList
                ) : (
                  <li className="w-full text-center">검색 결과가 없습니다.</li>
                )}
              </ul>
            </form>
          </TagListSelect>
        }
        onButton1Click={handleButton1Click}
        onButton2Click={handleButton2Click}
        button1Text={"취소하기"}
        button2Text={"선택완료"}
        modalWidth={400}
      />
    </AcademyInfo>
  );
}

export default AcademyAdd;
