const ID_REGEX = /^[a-zA-Z0-9]{4,16}$/; // 영문+숫자 4~16자

export function validateId(value) {
  if (!value) return "아이디를 입력해주세요.";
  if (!ID_REGEX.test(value)) return "아이디는 영문/숫자 4~16자로 입력해주세요.";
  return "";
}
