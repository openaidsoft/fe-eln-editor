<script>
import { reactive } from "vue";
let sidebar_menus = reactive([]);
sidebar_menus = [
  {
    path: "/newNote",
    icon: "fas fa-plus-square",
    title: "노트생성",
    use: "Y",
  },
  {
    path: "/",
    icon: "fa fa-th",
    title: "대시보드",
    use: "Y",
  },
  {
    path: "/project/list",
    icon: "fa fa-th",
    title: "프로젝트",
    use: "Y",
  },
  {
    path: "/note",
    icon: "fa fa-hdd",
    title: "나의노트",
    children: [
      {
        path: "/note/list",
        title: "나의노트",
        icon: "fas fa-caret-right",
      },
      {
        path: "/newNote",
        title: "연구노트 생성",
        icon: "fas fa-caret-right",
      },
      {
        path: "/note/search",
        title: "저장이력 조회",
        icon: "fas fa-caret-right",
      },
    ],
  },
  {
    path: "/privateLab",
    icon: "fas fa-flask",
    title: "개인연구실",
    use: "Y",
  },
  {
    path: "/todo",
    icon: "fa fa-th",
    title: "나의 할 일",
    use: "Y",
  },
  {
    path: "/system-mng",
    icon: "fa fa-hdd",
    title: "시스템관리",
    children: [
      {
        path: "/system-mng/code-mng",
        title: "코드 관리",
        icon: "fas fa-caret-right",
      },
      {
        path: "/system-mng/menu-mng",
        title: "메뉴 관리",
        icon: "fas fa-caret-right",
      },
      {
        path: "/system-mng/menu-auth-mng",
        title: "메뉴권한 관리",
        icon: "fas fa-caret-right",
      },
      {
        path: "/system-mng/member-mng",
        title: "사용자 관리",
        icon: "fas fa-caret-right",
      },
      {
        path: "/system-mng/member-auth-mng",
        title: "사용자권한 관리",
        icon: "fas fa-caret-right",
      },
    ],
  },
];

export default sidebar_menus;
</script>
