<template>
  <div>
    <div v-if="isAddSchedule">
      <CalenderInputModal :width="'600px'">
        <template #header> 일정 입력 </template>
        <template #body>
          <div class="calendar-schedule">
            <form>
              <div class="form-group row mb-2">
                <label for="" class="col-sm-4 col-form-label">일정명</label>
                <div class="col-sm-8">
                  <!-- <EmojiPicker picker-type="input" @select="onSelectEmoji" /> -->
                  <div class="input-group">
                    <input v-model="newEventTitle" class="calendar-schedule-title form-control" />
                    <div class="input-group-append">
                      <button class="emoji-btn" type="button" @click="openEmoji">
                        <i class="far fa-smile"></i>
                      </button>
                    </div>
                    <Emoji :showEmoji="showEmoji" v-click-outside="emojiClose" @selectedEmoji="inputEmoji"></Emoji>
                    <!-- <div v-if="showEmoji">
                      <EmojiPicker @select="onSelectEmoji" class="emoji-picker" v-click-outside="emojiClose">Emoji</EmojiPicker>
                    </div> -->
                  </div>
                </div>
              </div>
              <div class="form-group row mb-2">
                <label for="" class="col-sm-4 col-form-label">시작일</label>
                <div class="col-sm-8">
                  <Datepicker v-model="newEventStartDate" class="calendar-schedule-stDay" />
                  <!-- <input v-model="newEventStartDate" class="calendar-schedule-stDay form-control form-control-sm" type="date" /> -->
                </div>
              </div>
              <div class="form-group row mb-2">
                <label for="" class="col-sm-4 col-form-label">종료일</label>
                <div class="col-sm-8">
                  <Datepicker v-model="newEventEndDate" class="calendar-schedule-endDay" />
                </div>
              </div>
              <div class="form-group row mb-2">
                <label for="" class="col-sm-4 col-form-label">색상</label>
                <div class="col-sm-8">
                  <select class="form-control calendar-schedule-color" v-model="newEventColor">
                    <option type="text" value="blue">기본</option>
                    <option type="text" value="purple">보라색</option>
                    <option type="text" value="red">빨간색</option>
                    <option type="text" value="orange">오렌지색</option>
                    <option type="text" value="yellow">노란색</option>
                    <option type="text" value="green">초록색</option>
                  </select>
                </div>
              </div>
            </form>
          </div>
        </template>
        <template #footer>
          <button class="event-btn event-btn-add button is-info" @click="clickTestAddEvent">일정 저장</button>
          <button class="event-btn event-btn-cancel button is-info" @click="closeAddSchedule">취소</button>
        </template>
      </CalenderInputModal>
    </div>

    <div class="calendar-parent">
      <div class="calendar-option-btn text-start">
        <div class="accordion" id="accordion">
          <div class="accordion-item border-0 bg-transparent">
            <div class="accordion-header" id="headingOne">
              <button class="accordion-button pointer-cursor p-0 pb-1 bg-transparent" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne">
                <i class="fa fa-circle fa-fw text-blue me-2 fs-8px"></i> calender option...
              </button>
            </div>
            <div id="collapseOne" class="accordion-collapse collapse" data-bs-parent="#accordion">
              <div class="accordion-body p-1">
                <div class="field d-flex mb-1 mt-1">
                  <label class="label me-1">Period UOM</label>
                  <div class="control">
                    <div class="select">
                      <select v-model="displayPeriodUom">
                        <option>month</option>
                        <option>week</option>
                        <option>year</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div class="field d-flex mb-1">
                  <label class="label me-1">Period Count</label>
                  <div class="control">
                    <div class="select">
                      <select v-model="displayPeriodCount">
                        <option :value="1">1</option>
                        <option :value="2">2</option>
                        <option :value="3">3</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div class="field d-flex mb-1">
                  <label class="label me-1">Starting day of the week</label>
                  <div class="control">
                    <select v-model="startingDayOfWeek">
                      <option v-for="(d, index) in dayNames" :value="index" :key="index">{{ d }}</option>
                    </select>
                  </div>
                </div>

                <div class="field mb-1">
                  <label class="label me-1">Themes</label>
                  <label class="checkbox"> <input v-model="useDefaultTheme" type="checkbox" /> Default </label>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- <div class="field">
          <label class="label">Today Button</label>
          <label class="checkbox"> <input v-model="useTodayIcons" type="checkbox" /> Icons </label>
        </div> -->

        <!-- <div class="field">
          <label class="checkbox"> <input v-model="useHolidayTheme" type="checkbox" /> Holidays </label>
        </div> -->
      </div>
      <div class="calendar-view" style="width: 100%; height: 800px" :style="{ height: `${height}px` }">
        <calendar-view
          :items="items"
          :show-date="showDate"
          :showTimes="true"
          :time-format-options="{ hour: 'numeric', minute: '2-digit' }"
          :enable-drag-drop="true"
          :disable-past="disablePast"
          :disable-future="disableFuture"
          :show-event-times="showEventTimes"
          :display-period-uom="displayPeriodUom"
          :display-period-count="displayPeriodCount"
          :starting-day-of-week="startingDayOfWeek"
          :class="themeClasses"
          :period-changed-callback="periodChanged"
          :current-period-label="useTodayIcons ? 'icons' : ''"
          @drop-on-date="onDrop"
          @click-date="onClickDay"
          @click-item="onClickItem"
        >
          <template #header="{ headerProps }">
            <calendar-view-header :header-props="headerProps" @input="setShowDate" />
          </template>
        </calendar-view>
      </div>
    </div>
  </div>
</template>
<script>
import "/node_modules/vue-simple-calendar/dist/style.css";
// The next two lines are optional themes
import "/node_modules/vue-simple-calendar/dist/css/default.css";
import "/node_modules/vue-simple-calendar/dist/css/holidays-us.css";
import CalenderInputModal from "@/components/cmm/Modal.vue";
import Emoji from "@/components/cmm/Emoji.vue";
import { ref } from "vue";

import { CalendarView, CalendarViewHeader, CalendarMath } from "vue-simple-calendar";
export default {
  components: {
    CalendarView,
    CalendarViewHeader,
    CalendarMath,
    CalenderInputModal,
    Emoji,
  },
  props: {
    width: String,
    height: String,
  },
  data() {
    return {
      /* Show the current month, and give it some fake events to show */
      showDate: this.thisMonth(1),
      startingDayOfWeek: 0,
      disablePast: false,
      disableFuture: false,
      displayPeriodUom: "month",
      displayPeriodCount: 1,
      showEventTimes: true,
      newEventTitle: "",
      newEventStartDate: "",
      newEventEndDate: "",
      newEventColor: "",
      useDefaultTheme: true,
      useHolidayTheme: true,
      useTodayIcons: false,
      scheduleColor: ["purple", "yellow", "red", "green", "orange"],
      isAddSchedule: false,
      showEmoji: false,
      Emoji: null,
      items: [
        {
          id: "e0",
          startDate: "2018-01-05",
        },
        {
          id: "e1",
          startDate: this.thisMonth(15, 9, 2),
          title: "The day",
          classes: ["orange"],
        },
        {
          id: "e3",
          startDate: this.thisMonth(7, 10, 20),
          endDate: this.thisMonth(10),
          title: "Multi-day item with a long title and times",
          classes: ["red"],
        },
        {
          id: "e4",
          startDate: this.thisMonth(20),
          title: "My Birthday!",
          classes: "birthday",
          url: "https://en.wikipedia.org/wiki/Birthday",
        },
        {
          id: "e5",
          startDate: this.thisMonth(5),
          endDate: this.thisMonth(12),
          title: "Multi-day item",
          classes: ["purple"],
        },
        {
          id: "foo",
          startDate: this.thisMonth(29),
          title: "Same day 1",
        },
        {
          id: "e6",
          startDate: this.thisMonth(29),
          title: "Same day 2",
          classes: ["orange"],
        },
        {
          id: "e7",
          startDate: this.thisMonth(30),
          title: "background test",
          classes: ["red"],
        },
      ],
    };
  },
  computed: {
    userLocale() {
      return this.getDefaultBrowserLocale;
    },
    dayNames() {
      return CalendarMath.getFormattedWeekdayNames(this.userLocale, "long", 0);
    },
    themeClasses() {
      return {
        "theme-default": this.useDefaultTheme,
        "holiday-us-traditional": this.useHolidayTheme,
        "holiday-us-official": this.useHolidayTheme,
      };
    },
  },
  mounted() {
    this.newEventStartDate = CalendarMath.isoYearMonthDay(CalendarMath.today());
    this.newEventEndDate = CalendarMath.isoYearMonthDay(CalendarMath.today());
  },
  methods: {
    inputEmoji(emoji) {
      console.log("emoji ::: ");
      console.log(emoji);
      this.newEventTitle += emoji;
    },
    openEmoji() {
      this.showEmoji = true;
    },
    emojiClose() {
      this.showEmoji = false;
    },
    closeAddSchedule() {
      this.isAddSchedule = false;
    },
    periodChanged(range, eventSource) {
      // Demo does nothing with this information, just including the method to demonstrate how
      // you can listen for changes to the displayed range and react to them (by loading events, etc.)
      // console.log(eventSource);
      // console.log(range);
    },
    thisMonth(d, h, m) {
      const t = new Date();
      //  console.log(new Date("2022", "04", d, h || 0, m || 0)); todo: db로 불러오기
      return new Date(t.getFullYear(), t.getMonth(), d, h || 0, m || 0);
    },
    onClickItem(d) {
      this.newEventTitle = d.title;
      this.newEventStartDate = d.startDate;
      this.newEventEndDate = d.endDate;
      this.newEventColor = this.scheduleColor.includes(d.classes[0]) ? d.classes[0] : "blue";
      this.isAddSchedule = true;
    },
    onClickDay(d) {
      this.newEventTitle = "";
      this.newEventStartDate = d;
      this.newEventEndDate = d;
      this.newEventColor = "";
      this.isAddSchedule = true;
    },
    setShowDate(d) {
      this.showDate = d;
    },
    onDrop(event, date) {
      // Determine the delta between the old start date and the date chosen,
      // and apply that delta to both the start and end date to move the event.
      const eLength = CalendarMath.dayDiff(event.startDate, date);
      event.originalItem.startDate = CalendarMath.addDays(event.startDate, eLength);
      event.originalItem.endDate = CalendarMath.addDays(event.endDate, eLength);
    },
    clickTestAddEvent() {
      console.log("onSelectEmoji:");

      this.items.push({
        startDate: this.newEventStartDate,
        endDate: this.newEventEndDate,
        title: this.newEventTitle,
        id: "e" + Math.random().toString(36).substr(2, 10),
        classes: [this.newEventColor],
      });
      this.isAddSchedule = false;
    },
  },
};
</script>

<style lang="scss">
html,
body {
  height: 100%;
  margin: 0;
  background-color: #f7fcff;
}

.calendar-schedule-title {
  padding-left: 5px;
  border-bottom: 2px solid gray;
}

.emoji-btn {
  padding: 5px;
  border: 1px solid rgb(193, 193, 193);
  border-radius: 0px 5px 5px 0px;
  height: 100%;
  width: 40px;
}

.emoji-picker {
  position: absolute;
}
/* #app1 {
  display: flex;
  flex-direction: row;
  font-family: Calibri, sans-serif;
  width: 80vw;
  min-width: 30rem;
  max-width: 100rem;
  min-height: 40rem;
  margin-left: auto;
  margin-right: auto;
} */
.event-btn {
  border: none;
  border-radius: 8px;
  padding: 5px 10px;

  &-add {
    background: #35ad77;
    color: white;
  }

  &-cancel {
    background: #757575;
    color: white;
  }
}

.calendar-controls {
  margin-right: 1rem;
  min-width: 14rem;
  max-width: 14rem;
}
.calendar-option-btn {
  color: gray;
  background: #e0f0e0;
  padding: 8px;
  font-size: 12px;
  font-weight: bold;
}
.calendar-parent {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  overflow-x: hidden;
  overflow-y: hidden;
  max-height: 80vh;
  background-color: white;
}
/* For long calendars, ensure each week gets sufficient height. The body of the calendar will scroll if needed */
.cv-wrapper.period-month.periodCount-2 .cv-week,
.cv-wrapper.period-month.periodCount-3 .cv-week,
.cv-wrapper.period-year .cv-week {
  min-height: 6rem;
}
/* These styles are optional, to illustrate the flexbility of styling the calendar purely with CSS. */
/* Add some styling for events tagged with the "birthday" class */
.theme-default .cv-event.birthday {
  background-color: #e0f0e0;
  border-color: #d7e7d7;
}
.theme-default .cv-event.birthday::before {
  content: "\1F382"; /* Birthday cake */
  margin-right: 0.5em;
}

.tt {
  width: 30%;
  background-color: aqua;
  padding: 40px;
  cursor: pointer;
}
</style>
