const ID_REGEX = /^[a-zA-Z0-9]{4,16}$/; // 영문+숫자 4~16자
const PASSWORD_REGEX = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/;
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_REGEX = /^01[0-9]-?\d{3,4}-?\d{4}$/;

export function validateId(value) {
  if (!value) return "아이디를 입력해주세요.";
  if (!ID_REGEX.test(value)) return "아이디는 영문/숫자 4~16자로 입력해주세요.";
  return "";
}

export function validateNickname(value) {
  if (!value) return "닉네임을 입력해주세요.";
  if (value.length < 2 || value.length > 10)
    return "닉네임은 2~10자로 입력해주세요.";
  return "";
}

export function validatePassword(value) {
  if (!value) return "비밀번호를 입력해주세요.";
  if (!PASSWORD_REGEX.test(value))
    return "영문, 숫자, 특수문자 포함 8자 이상이어야 합니다.";
  return "";
}

export function validatePasswordCheck(password, passwordCheck) {
  if (!passwordCheck) return "비밀번호 확인을 입력해주세요.";
  if (password !== passwordCheck) return "비밀번호가 일치하지 않습니다.";
  return "";
}

export function validateName(value) {
  return value ? "" : "이름을 입력해주세요.";
}

export function validateBirth(value) {
  return value ? "" : "생년월일을 입력해주세요.";
}

export function validateEmail(value) {
  if (!value) return "이메일을 입력해주세요.";
  if (!EMAIL_REGEX.test(value)) return "올바른 이메일 형식이 아닙니다.";
  return "";
}

export function validatePhone(value) {
  if (!value) return "휴대폰 번호를 입력해주세요.";
  if (!PHONE_REGEX.test(value)) return "올바른 휴대폰 번호 형식이 아닙니다.";
  return "";
}
