import { useState, useEffect, useRef } from "react";
import { sendEmailCode, verifyEmailCode } from "@/api/common/userApi";

// 이메일 인증번호 전송/검증 로직을 관리하는 커스텀 훅입니다.
// 회원가입 또는 비밀번호 찾기 화면에서 인증번호 입력 타이머를 표시할 때 사용됩니다.
export function useVerification(duration = 180) {
  const timer = useTimer(duration); // ← useTimer를 여기서 호출해서 가져옴

  const [isSent, setIsSent] = useState(false);
  const [code, setCode] = useState("");
  const [isVerified, setIsVerified] = useState(false);
  const [error, setError] = useState("");

  const handleSendCode = async (email) => {
    if (!email) {
      setError("이메일을 먼저 입력해주세요.");
      return;
    }

    try {
      await sendEmailCode(email);

      setIsSent(true);
      setIsVerified(false);
      setCode("");
      setError("");
      timer.start(); // ← setTimeLeft(duration) 대신 이걸로 대체
    } catch (err) {
      console.error("인증번호 발송 실패:", err);
      setError("인증번호 발송에 실패했습니다.");
    }
  };

  const handleVerifyCode = async (email) => {
    if (timer.isExpired) {
      // ← timeLeft <= 0 대신 이걸로 대체
      setError("인증 시간이 만료되었습니다. 다시 요청해주세요.");
      return;
    }

    try {
      const response = await verifyEmailCode(email, code);

      if (response.data) {
        setIsVerified(true);
        setError("");
        timer.reset(); // ← clearInterval(timerRef.current) 대신 이걸로 대체
      } else {
        setError("인증번호가 일치하지 않습니다.");
      }
    } catch (err) {
      console.error("인증번호 확인 실패:", err);
      setError("인증번호 확인 요청에 실패했습니다.");
    }
  };

  return {
    ...timer, // timeLeft, formattedTime, isRunning, isExpired, start, reset
    isSent,
    code,
    setCode,
    isVerified,
    error,
    handleSendCode,
    handleVerifyCode,
  };
}

// 범용 카운트다운 타이머 훅입니다.
// 이메일 인증뿐 아니라 자동 로그아웃, 이벤트 카운트다운 등
// "몇 초 뒤 뭔가 일어난다"가 필요한 곳이면 어디서든 재사용할 수 있습니다.
// 이 파일 밖에서 쓸 일이 생기면 그때 따로 파일로 빼면 됩니다.
function useTimer(duration = 180) {
  const [timeLeft, setTimeLeft] = useState(duration);
  const [isRunning, setIsRunning] = useState(false);
  const timerRef = useRef(null);

  useEffect(() => {
    if (!isRunning) return;

    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timerRef.current);
          setIsRunning(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timerRef.current); // 언마운트/재실행 시 정리
  }, [isRunning]);

  // 타이머 시작(재시작). 발송 성공 시 호출.
  const start = () => {
    setTimeLeft(duration);
    setIsRunning(true);
  };

  // 타이머 완전히 멈추고 초기화. 인증 성공 시 호출.
  const reset = () => {
    clearInterval(timerRef.current);
    setTimeLeft(duration);
    setIsRunning(false);
  };

  const formattedTime = `${String(Math.floor(timeLeft / 60)).padStart(2, "0")}:${String(
    timeLeft % 60,
  ).padStart(2, "0")}`;

  return {
    timeLeft,
    formattedTime,
    isRunning,
    start,
    reset,
    isExpired: timeLeft <= 0 && !isRunning,
  };
}
