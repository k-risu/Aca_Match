import React, { useEffect, useState } from "react";
import { GoStar, GoStarFill } from "react-icons/go";
import { Form, message } from "antd";
import axios from "axios";
import { SecondaryButton } from "./Modal";
import MainButton from "../button/MainButton";
import jwtAxios from "../../apis/jwt";

interface ReviewModalProps {
  onClose: () => void;
  joinClassId: number;
}

interface ReviewFormValues {
  comment: string;
}

function ReviewModal({ onClose, joinClassId }: ReviewModalProps) {
  const [form] = Form.useForm();
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleStarClick = (selectedRating: number) => {
    setRating(selectedRating);
  };

  useEffect(() => {
    try {
      const res = jwtAxios.post("/api/review/user");
    } catch (error) {}
  }, []);

  const handleSubmit = async (values: ReviewFormValues) => {
    if (rating === 0) {
      message.error("별점을 선택해주세요.");
      return;
    }
    if (!values.comment || values.comment.trim().length === 0) {
      message.error("리뷰 내용을 입력해주세요.");
      return;
    }

    console.log(joinClassId, values.comment.trim(), rating);
    try {
      setIsSubmitting(true);

      const res = await jwtAxios.post("/api/review/user", {
        joinClassId: joinClassId,
        comment: values.comment.trim(),
        star: rating,
      });

      console.log(res);
      message.success("리뷰가 등록되었습니다.");
      onClose();
    } catch (error) {
      console.error("리뷰 등록 실패:", error);
      message.error("리뷰 등록에 실패했습니다. 다시 시도해주세요.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderStars = () => {
    return (
      <div
        className="flex gap-0.5 mt-2"
        onMouseLeave={() => setHoveredRating(0)}
      >
        {Array(5)
          .fill(null)
          .map((_, index) => (
            <span
              key={index}
              className="w-[18px] h-[18px] flex items-center justify-center cursor-pointer"
              onClick={() => handleStarClick(index + 1)}
              //   onMouseEnter={() => setHoveredRating(index + 1)}
            >
              {index < (hoveredRating || rating) ? (
                <GoStarFill className="text-[#0E161B]" />
              ) : (
                <GoStar className="text-[#0E161B]" />
              )}
            </span>
          ))}
      </div>
    );
  };

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
      <div className="flex flex-col items-center w-[500px] bg-white rounded-xl p-6 gap-6">
        <Form
          form={form}
          onFinish={handleSubmit}
          layout="vertical"
          className="w-full"
        >
          {/* Header */}
          <div className="flex items-center w-full mb-6">
            <div className="flex items-center justify-between w-full">
              <h2 className="text-[32px] font-bold text-[#0E161B] font-lexend leading-none">
                리뷰 작성하기
              </h2>
              <div className="flex items-center self-center">
                {renderStars()}
              </div>
            </div>
          </div>

          {/* Text Area */}
          <Form.Item name="comment">
            <textarea
              placeholder="리뷰를 작성해 주세요"
              className="w-[450px] h-[224px] p-4 bg-white border border-[#DBE0E6] rounded-xl resize-none text-base text-[#637887] focus:outline-none"
            />
          </Form.Item>

          {/* Buttons */}
          <div className="flex justify-center items-center gap-[12px] w-full">
            <SecondaryButton
              onClick={onClose}
              className="flex justify-center items-center w-full h-10 bg-[#E8EEF3] rounded-xl"
            >
              <span className="font-bold text-sm text-[#0E161B]">취소</span>
            </SecondaryButton>
            <MainButton
              type="primary"
              htmlType="submit"
              className="flex justify-center items-center w-full h-10 bg-[#3B77D8] rounded-xl"
            >
              <span className="font-bold text-sm text-[#F8FAFB]">등록</span>
            </MainButton>
          </div>
        </Form>
      </div>
    </div>
  );
}

export default ReviewModal;
