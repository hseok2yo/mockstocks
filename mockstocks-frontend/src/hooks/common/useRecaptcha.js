import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import axiosInstance from "@/api/common/axiosInstance";

export function useRecaptcha() {
  const navigate = useNavigate();
  const recaptchaRef = useRef(null);

  // 캡챠 모달/팝업 표시 여부
  const [showCaptcha, setShowCaptcha] = useState(false);
  // 사용자에게 보여줄 에러 메시지
  const [captchaError, setCaptchaError] = useState("");
  // 구글로부터 받은 인증 토큰
  const [captchaToken, setCaptchaToken] = useState("");
  // 인증 확인 중인지 여부
  const [verifying, setVerifying] = useState(false);

  // 회원가입 버튼 클릭 시 캡챠 모달 열기
  const handleOpenCaptcha = () => {
    setCaptchaToken("");
    setCaptchaError("");
    setShowCaptcha(true);
  };

  // 사용자가 확인 버튼을 눌렀을 때 실행되는 로직
  const handleCaptchaSubmit = async (e) => {
    e.preventDefault();

    // 토큰이 없으면 아직 인증하지 않은 상태이므로 에러 처리
    if (!captchaToken) {
      setCaptchaError("리캡챠 인증을 완료해 주세요.");
      return;
    }

    setVerifying(true);
    setCaptchaError("");

    try {
      // 백엔드에서 구글 siteverify API로 실제 검증
      const res = await axiosInstance.post("/api/captcha/verify", {
        token: captchaToken,
      });

      // 서버 검증 결과가 실패면 다시 시도하게 처리
      if (!res.data?.success) {
        setCaptchaError("인증에 실패했습니다. 다시 시도해 주세요.");
        recaptchaRef.current?.reset();
        setCaptchaToken("");
        return;
      }

      // 인증 성공 시 모달 닫고 회원가입 페이지로 이동
      setShowCaptcha(false);
      setCaptchaToken("");
      setCaptchaError("");
      navigate("/signup");
    } catch (err) {
      setCaptchaError(
        "인증 확인 중 오류가 발생했습니다. 잠시 후 다시 시도해 주세요.",
      );
      recaptchaRef.current?.reset();
      setCaptchaToken("");
    } finally {
      setVerifying(false);
    }
  };

  // 리캡챠가 성공적으로 완료되면 토큰 저장
  const onCaptchaChange = (token) => {
    setCaptchaToken(token || "");
    if (token) {
      setCaptchaError("");
    }
  };

  // 토큰 만료 시 상태 초기화
  const onCaptchaExpired = () => {
    setCaptchaToken("");
    setCaptchaError("인증이 만료되었습니다. 다시 시도해 주세요.");
  };

  // 캡챠 모달 닫기
  const handleCloseCaptcha = () => {
    setShowCaptcha(false);
    setCaptchaToken("");
    setCaptchaError("");
    recaptchaRef.current?.reset();
  };

  return {
    showCaptcha,
    captchaError,
    captchaToken,
    verifying,
    recaptchaRef,
    handleOpenCaptcha,
    handleCloseCaptcha,
    handleCaptchaSubmit,
    onCaptchaChange,
    onCaptchaExpired,
  };
}
