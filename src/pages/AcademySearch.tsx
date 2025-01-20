import SideBar from "../components/SideBar";

function AcademySearch() {
  const menuItems = [
    { label: "마이페이지", isActive: false, link: "/" },
    { label: "회원정보 관리", isActive: true, link: "/" },
    { label: "알림 설정", isActive: false, link: "/" },
    { label: "로그아웃", isActive: false, link: "/" },
  ];
  return (
    <div>
      <SideBar menuItems={menuItems} className="w-[320px] mt-[93px]">
        <div>AcademySearch</div>
      </SideBar>
    </div>
  );
}

export default AcademySearch;
