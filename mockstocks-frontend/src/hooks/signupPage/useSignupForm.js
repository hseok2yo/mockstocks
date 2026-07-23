import { useState } from "react";
import { checkIdAvailability, signup } from "@/api/common/userApi";
import {
  validateId,
  validateNickname,
  validatePassword,
  validatePasswordCheck,
  validateName,
  validateBirth,
  validateEmail,
  validatePhone,
} from "@/utils/validation";
import { useNavigate } from "react-router-dom";

{
  /* 아이디 중복체크 */
}
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
    const validationError = validateId(userId);
    if (validationError) {
      setIdError(validationError);
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

{
  /* 약관동의 항목*/
}
export function useTermsAgreement() {
  const [agreements, setAgreements] = useState({
    service: false,
    privacy: false,
    finance: false,
    marketing: false,
  });

  const allChecked = Object.values(agreements).every(Boolean);
  const isRequiredAgreed =
    agreements.service && agreements.privacy && agreements.finance;

  const handleAllCheck = (checked) => {
    setAgreements({
      service: checked,
      privacy: checked,
      finance: checked,
      marketing: checked,
    });
  };

  const handleSingleCheck = (key) => (e) => {
    setAgreements((prev) => ({ ...prev, [key]: e.target.checked }));
  };

  return {
    agreements,
    allChecked,
    isRequiredAgreed,
    handleAllCheck,
    handleSingleCheck,
  };
}

/* 유효성 검사 */
function useValidationChecking() {
  const [errors, setErrors] = useState({});

  // 회원가입 버튼 누르면 이 함수를 실행합니다
  const validateForm = (formData) => {
    // formData 안에 있는 값들을 하나씩 꺼냅니다
    const isIdVerified = formData.isIdVerified;
    const nickname = formData.nickname;
    const password = formData.password;
    const passwordCheck = formData.passwordCheck;
    const name = formData.name;
    const birth = formData.birth;
    const email = formData.email;
    const isEmailVerified = formData.isEmailVerified;
    const phone = formData.phone;
    const isAllRequiredChecked = formData.isAllRequiredChecked;

    // 에러 메시지를 담을 빈 상자를 만듭니다
    const newErrors = {};

    // 아이디 체크
    if (isIdVerified === false) {
      newErrors.id = "아이디 중복확인을 완료해주세요.";
    } else {
      newErrors.id = "";
    }

    // 닉네임 체크
    newErrors.nickname = validateNickname(nickname);

    // 비밀번호 체크
    newErrors.password = validatePassword(password);

    // 비밀번호 확인 체크
    newErrors.passwordCheck = validatePasswordCheck(password, passwordCheck);

    // 이름 체크
    newErrors.name = validateName(name);

    // 생년월일 체크
    newErrors.birth = validateBirth(birth);

    // 이메일 체크 (형식도 맞고 인증도 됐는지)
    const emailError = validateEmail(email);
    if (emailError !== "") {
      newErrors.email = emailError;
    } else if (isEmailVerified === false) {
      newErrors.email = "이메일 인증을 완료해주세요.";
    } else {
      newErrors.email = "";
    }

    // 휴대폰 체크
    newErrors.phone = validatePhone(phone);

    // 약관 동의 체크
    if (isAllRequiredChecked === false) {
      newErrors.terms = "필수 약관에 동의해주세요.";
    } else {
      newErrors.terms = "";
    }

    // 화면에 에러 메시지 보여주기 위해 저장
    setErrors(newErrors);

    // 에러가 하나라도 있는지 확인
    let hasError = false;

    if (newErrors.id !== "") hasError = true;
    if (newErrors.nickname !== "") hasError = true;
    if (newErrors.password !== "") hasError = true;
    if (newErrors.passwordCheck !== "") hasError = true;
    if (newErrors.name !== "") hasError = true;
    if (newErrors.birth !== "") hasError = true;
    if (newErrors.email !== "") hasError = true;
    if (newErrors.phone !== "") hasError = true;
    if (newErrors.terms !== "") hasError = true;

    // 에러가 없으면 true, 있으면 false 리턴
    if (hasError === true) {
      return false;
    } else {
      return true;
    }
  };

  return { errors, validateForm };
}

/* 회원가입 제출 - 검증 + API 호출을 총괄 */
export function useSignup() {
  const navigate = useNavigate();
  const { errors, validateForm } = useValidationChecking();

  const handleSubmit = async (formData) => {
    const isValid = validateForm(formData);
    if (!isValid) return false;

    try {
      await signup(formData);
      console.log("보낼 데이터들", formData);
      alert("회원가입이 완료되었습니다.");
      navigate("/login");
      return true;
    } catch (error) {
      console.error("회원가입 실패:", error);
      const errorCode = error.response?.data?.errorCode;
      const serverMessage = error.response?.data?.message;

      let message = "회원가입에 실패했습니다. 다시 시도해주세요.";

      if (errorCode === "DUPLICATE_USER_ID") {
        message =
          "이미 사용 중인 아이디입니다. 아이디 중복확인을 다시 해주세요.";
      } else if (errorCode === "DUPLICATE_EMAIL") {
        message = "이미 사용 중인 이메일입니다.";
      } else if (serverMessage) {
        // 백엔드가 위 두 케이스 외의 메시지를 내려준 경우 그대로 사용
        message = serverMessage;
      }

      alert(message);
      return false;
    }
  };

  return { errors, handleSubmit };
}
