import { useState } from "react";
import { checkIdAvailability } from "../api/userApi";
import { validateId } from "../utils/validation";

export function useSignupForm() {
  const [userId, setUserId] = useState("");
  const [idError, setIdError] = useState("");
  const [isIdVerified, setIsIdVerified] = useState(false); // 중복확인 통과 여부

  // 아이디 입력값 변경 시 호출되는 함수
  const handleUserIdChange = (value) => {
    setUserId(value);
    setIsIdVerified(false); // 입력값이 바뀌면 중복확인 상태 초기화
    const error = validateId(value);
    setIdError(error);
  };

  // 아이디 중복확인
  const handleCheckId = async () => {
    const error = validateId(userId);
    if (error) {
      setIdError(error);
      setIsIdVerified(false);
      return;
    }

    try {
      const response = await checkIdAvailability(userId);

      if (response.data) {
        setIdError("사용 가능한 아이디입니다.");
        setIsIdVerified(true);
      } else {
        setIdError("이미 사용 중인 아이디입니다.");
        setIsIdVerified(false);
      }
    } catch (error) {
      console.error("아이디 중복확인 요청 실패:", error);
      setIdError("아이디 중복확인 요청에 실패했습니다. 다시 시도해주세요.");
      setIsIdVerified(false);
    }
  };

  return {
    userId,
    handleUserIdChange,
    idError,
    isIdVerified,
    handleCheckId,
  };
}
