/**
 * 회원(User) 관련 API 호출 함수 모음
 */
import axiosInstance from "@/api/common/axiosInstance";

/**
 * 아이디 중복확인 요청
 * @param {string} userId - 확인할 아이디
 * @returns {Promise} { data: { available: boolean } }
 */
export const checkIdAvailability = (userId) =>
  axiosInstance.get("/api/users/check-id", { params: { userId } });

/**
 * 이메일 인증코드 전송 요청
 * @param {string} email - 인증코드를 받을 이메일 주소
 * @returns {Promise} { data: { success: boolean } }
 */
export const sendEmailCode = (email) => {
  return axiosInstance.post("/api/email/send-code", { email });
};

/**
 * 이메일 인증코드 검증 요청
 * @param {string} email - 인증코드를 받을 이메일 주소
 *  @param {string} code - 사용자가 입력한 인증코드
 * @returns {Promise} { data: { verified: boolean } }
 */
export const verifyEmailCode = (email, code) => {
  return axiosInstance.post("/api/email/verify-code", { email, code });
};

/**
 * 회원가입 요청
 * @param {Object} signupData - 회원가입에 필요한 데이터
 * @returns {Promise} { data: { success: boolean } }
 */
export const signup = async (signupData) => {
  const response = await axiosInstance.post("/api/users/signup", signupData);
  return response.data;
};
