import { createWebHistory, createRouter } from "vue-router";
import Main from "@/views/Main.vue";

// Sample
import Sample from "@/views/sample/Sample.vue";
import SampleListView from "@/views/sample/SampleListView.vue";
import SampleDetailView from "@/views/sample/SampleDetailView.vue";

// content-header
import contentHeader from "@/components/layout/content-header.vue";

// Dashboard
import Dashboard1 from "@/views/dashboard/dash_v1.vue";
// Dashboard-components
import myteam from "@/components/dashboard/myteam.vue";

// Project
import project from "@/views/project/list_view.vue";
import projectProcess from "@/views/project/process_view.vue";

// Todo
import TodoTap from "@/components/todo/todo-tap.vue";

// myNote
import NoteList from "@/views/note/note-list.vue";
import newNote from "@/views/note/new-note.vue";
import AllNote from "@/components/my-note/all-note.vue";
import Note from "@/views/note/note.vue";
import Todolist from "@/components/todo/todolist.vue";

// info_components
import Jsme from "@/views/info_components/JsmeView.vue";
import Jexcel from "@/views/info_components/JexcelView.vue";

// system-mng
import CodeMng from "@/views/system-mng/code-mng-view.vue";
import MenuMng from "@/views/system-mng/menu-mng-view.vue";
import MenuAuthMng from "@/views/system-mng/menu-auth-mng-view.vue";
import MemberMng from "@/views/system-mng/member-mng-view.vue";
import MemberAuthMng from "@/views/system-mng/member-grp-mng-view.vue";

//test
import ExpressTest from "@/components/express-test-page.vue";

//test
import Login from "@/components/login/login.vue";

const routerHistory = createWebHistory();
const router = createRouter({
  base: "/dashboard",
  history: routerHistory,
  base: import.meta.env.BASE_URL,
  routes: [
    // { path: "/", name: "Main", component: Main },
    // {
    //   path: "/sample",
    //   name: "Sample",
    //   component: Sample,
    //   children: [
    //     { path: "", name: "SampleListView", component: SampleListView },
    //     { path: "detail", name: "SampleDetailView", component: SampleDetailView },
    //   ],
    // },

    // {
    //   path: "/",
    //   name: "로그인",
    //   component: Login,
    // },

    {
      path: "/",
      name: "대시보드",
      component: Dashboard1,
    },

    {
      path: "/project",
      name: "프로젝트",
      component: contentHeader,
      children: [
        { path: "/project/list", name: "프로젝트 리스트", component: project, children: [{ path: "/project/process", name: "프로젝트 프로세스", component: projectProcess, props: true }] },
        { path: "/project/newNote", name: "프로젝트 노트생성", component: Note, props: true },
      ],
    },
    {
      path: "/privateLab",
      name: "개인연구실",
      component: NoteList,
    },
    {
      path: "/note",
      name: "나의노트",
      component: contentHeader,
      children: [
        { path: "/note/list", name: "NoteList", component: NoteList },
        { path: "/newNote", name: "newNote", component: newNote },
        { path: "/note/:id", name: "Note", component: Note },
        { path: "/note/record-search", name: "저장이력 조회", component: Note },
      ],
    },
    {
      path: "/todo",
      name: "나의 할 일",
      component: contentHeader,
      children: [{ path: "/todo", name: "나의 할 일", component: TodoTap }],
    },
    {
      path: "/system-mng",
      name: "시스템관리",
      component: contentHeader,
      children: [
        { path: "code-mng", name: "코드 관리", component: CodeMng },
        { path: "menu-mng", name: "메뉴 관리", component: MenuMng },
        { path: "menu-auth-mng", name: "메뉴권한 관리", component: MenuAuthMng },
        { path: "member-mng", name: "사용자 관리", component: MemberMng },
        { path: "member-auth-mng", name: "사용자권한 관리", component: MemberAuthMng },
      ],
    },
    {
      path: "/editorComponents",
      name: "에디터",
      component: contentHeader,
      children: [
        { path: "/editorComponents/jexcel", name: "엑셀", component: Jexcel },
        { path: "/editorComponents/jsme", name: "분자데이터", component: Jsme },
        { path: "/todolist", name: "Todolist", component: Todolist },
      ],
    },
    {
      path: "/template",
      name: "템플릿",
      component: contentHeader,
      children: [{ path: "/test", name: "testExpress", component: ExpressTest }],
    },
  ],
});

/*
router.beforeEach((to, from, next) => {
  console.log(router);
  router.app.store.commit('startSpinner');
  setTimeout(() => {
    next();
  }, 1);
})

// eslint-disable-next-line no-unused-vars
router.afterEach((to, from) => {
  router.app.store.commit('endSpinner');
})
*/

export default router;
