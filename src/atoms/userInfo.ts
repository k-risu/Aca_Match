import { atom } from "recoil";

interface UserInfo {
  name: string;
  roleId: string;
  userId: string;
}

export const userInfo = atom<UserInfo>({
  key: "userInfo",
  default: {
    name: "",
    roleId: "",
    userId: "",
  },
});

export default userInfo;
