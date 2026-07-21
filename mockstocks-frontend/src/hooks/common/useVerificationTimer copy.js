import { useState, useEffect, useRef } from "react";
import { sendEmailCode, verifyEmailCode } from "@/api/common/userApi";

// 이메일 인증번호 전송/검증 로직을 관리하는 커스텀 훅입니다.
// 회원가입 또는 비밀번호 찾기 화면에서 인증번호 입력 타이머를 표시할 때 사용됩니다.
export function useVerificationTimer(duration = 180) {
  // 인증번호가 발송되었는지 여부
  const [isSent, setIsSent] = useState(false);

  // 남은 인증 시간(초 단위)
  const [timeLeft, setTimeLeft] = useState(duration);

  // 사용자가 입력한 인증번호
  const [code, setCode] = useState("");

  // 인증이 완료되었는지 여부
  const [isVerified, setIsVerified] = useState(false);

  // 사용자에게 보여줄 에러 메시지
  const [error, setError] = useState("");

  // setInterval ID를 저장해 타이머를 정리할 때 사용합니다.
  const timerRef = useRef(null);

  // 인증번호 발송 요청을 처리하는 함수입니다.
  // 이메일이 비어 있으면 바로 에러를 설정하고 종료합니다.
  const handleSendCode = async (email) => {
    if (!email) {
      setError("이메일을 먼저 입력해주세요.");
      return;
    }

    try {
      // 서버에 인증번호 발송 요청
      await sendEmailCode(email);

      // 상태 초기화 후 타이머 재시작
      setIsSent(true);
      setIsVerified(false);
      setCode("");
      setError("");
      setTimeLeft(duration);
    } catch (err) {
      console.error("인증번호 발송 실패:", err);
      setError("인증번호 발송에 실패했습니다.");
    }
  };

  // 사용자가 입력한 인증번호를 서버에서 검증하는 함수입니다.
  const handleVerifyCode = async (email) => {
    // 시간이 다 지나면 더 이상 검증하지 않도록 방지합니다.
    if (timeLeft <= 0) {
      setError("인증 시간이 만료되었습니다. 다시 요청해주세요.");
      return;
    }

    try {
      const response = await verifyEmailCode(email, code);

      // 서버가 true를 반환하면 인증 성공으로 간주합니다.
      if (response.data) {
        setIsVerified(true);
        setError("");
        clearInterval(timerRef.current);
      } else {
        setError("인증번호가 일치하지 않습니다.");
      }
    } catch (err) {
      console.error("인증번호 확인 실패:", err);
      setError("인증번호 확인 요청에 실패했습니다.");
    }
  };

  // 인증번호가 발송된 상태이고 아직 인증이 완료되지 않았다면
  // 1초마다 남은 시간을 감소시키는 타이머를 실행합니다.
  useEffect(() => {
    if (!isSent || isVerified) return;

    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timerRef.current);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    // 컴포넌트가 언마운트되거나 상태가 바뀌면 타이머를 정리합니다.
    return () => clearInterval(timerRef.current);
  }, [isSent, isVerified]);

  // 초 단위 시간을 MM:SS 형식으로 변환해 UI에 바로 사용할 수 있게 만듭니다.
  const formattedTime = `${String(Math.floor(timeLeft / 60)).padStart(2, "0")}:${String(
    timeLeft % 60,
  ).padStart(2, "0")}`;

  return {
    isSent,
    timeLeft,
    formattedTime,
    code,
    setCode,
    isVerified,
    error,
    handleSendCode,
    handleVerifyCode,
    // 인증 시간이 만료되었는지 여부를 간단하게 확인할 수 있게 합니다.
    isExpired: isSent && timeLeft <= 0 && !isVerified,
  };
}
