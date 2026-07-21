/**
 * 회원(User) 관련 API 호출 함수 모음
 */
import axiosInstance from "./axiosInstance";

/**
 * 아이디 중복확인 요청
 * @param {string} userId - 확인할 아이디
 * @returns {Promise} { data: { available: boolean } }
 */
export const checkIdAvailability = (userId) =>
  axiosInstance.get("/api/users/check-id", { params: { userId } });
