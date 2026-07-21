/**
 * 프로젝트 전역에서 사용하는 axios 인스턴스
 * - baseURL, timeout, 공통 헤더 설정
 * - 추후 인터셉터(토큰 자동첨부, 에러 공통처리) 추가 예정
 */
import axios from "axios";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:8080",
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosInstance;
