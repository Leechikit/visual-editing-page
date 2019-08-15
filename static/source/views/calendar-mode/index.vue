<template>
    <div>
		<div class="ButtonGroup">
			<Button @click="changeMode('month')">月模式</Button>
			<Button @click="changeMode('week')">周模式</Button>
		</div>
		<div id="appPanel">
			<div class="calendar-parent">
				
				<calendar-view
					:events="events"
					:show-date="showDate"
					:time-format-options="{hour: 'numeric', minute:'2-digit'}"
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
					@click-event="onClickEvent"
				>
					
					<calendar-view-header
						slot="header"
						slot-scope="{ headerProps }"
						:header-props="headerProps"
						@input="setShowDate"
					/>
					
				</calendar-view>

			</div>
			<Spin size="large" fix v-if="spinShow"></Spin>
		</div>
		 <!-- <Modal id="createNewApp" v-model="showModal" class="add-data-modal" :mask-closable="false">
			<openModal v-if="showModal" :code="currentId"></openModal>
			<div slot="footer"></div>
		</Modal> -->

	
    </div>
</template>
<script>
// Load CSS from the local repo
//require("../../vue-simple-calendar/static/css/default.css")
//require("../../vue-simple-calendar/static/css/holidays-us.css")
// import {
// 	CalendarView,
// 	CalendarViewHeader,
// 	CalendarMathMixin,
// } from "vue-simple-calendar" // published version

import CalendarView from "./components/CalendarView.vue"
import CalendarViewHeader from "./components/CalendarViewHeader.vue"
import CalendarMathMixin from "./components/CalendarMathMixin.js"
import HTTP from '@/api/listview.js'
import openModal from "@/views/home/openModal.vue";
//} from "../../vue-simple-calendar/src/components/bundle.js" // local repo
export default {
	name: "App",
	components: {
		CalendarView,
		CalendarViewHeader,
		openModal,
	},
	props:["appId"],
	mixins: [CalendarMathMixin],
	data() {
		return {
			/* Show the current month, and give it some fake events to show */
			showDate: this.thisMonth(1),
			spinShow:false,
			message: "",
			currentId:"",
			startingDayOfWeek: 0,
			disablePast: false,
			disableFuture: false,
			displayPeriodUom: "month",
			displayPeriodCount: 1,
			showEventTimes: true,
			newEventTitle: "",
			newEventStartDate: "",
			newEventEndDate: "",
			useDefaultTheme: true,
			useHolidayTheme: false,
			useTodayIcons: false,
			events: [
			
			],
		}
	},
	computed: {
		userLocale() {
			return this.getDefaultBrowserLocale
		},
		dayNames() {
			return this.getFormattedWeekdayNames(this.userLocale, "long", 0)
		},
		themeClasses() {
			return {
				"theme-default": this.useDefaultTheme,
				"holiday-us-traditional": this.useHolidayTheme,
				"holiday-us-official": this.useHolidayTheme,
			}
		},
	},
	mounted() {
		this.newEventStartDate = this.isoYearMonthDay(this.today())
		this.newEventEndDate = this.isoYearMonthDay(this.today())
		//this.getSettingList( Date.parse(this.thisMonth(1)),Date.parse(this.lastTimeInMonth()));
	},
	methods: {
		getSettingList(startTime,endTime){
			var param ={}
			param.appId = this.appId;
			param.startTime = startTime;
			param.endTime = endTime;
			this.spinShow = true
			HTTP.loadData(param).then((data)=>{
				if(data.code==0){
					this.changeEvent(data.data);
				}
				else{
					 this.$Message.error({
					content: data.msg,
					duration: 5
                  });
				}
				
				this.spinShow=false
			}).finally(()=>{
				this.spinShow=false
			})
		},
		changeMode(mode){
           this.displayPeriodUom=mode
		},
		changeEvent(list){
			this.events=[]
			for(var index in list){
				var tmp={}
				tmp.startDate = new Date(list[index].start);
				if(list[index].start!=list[index].end){
					tmp.endDate = new Date(list[index].end);
				}
				tmp.title =list[index].name_schema
				tmp.AppRunId = list[index].id
				tmp.id =  list[index].id
				if(list[index].status==0){

				}
				else if(list[index].status==1){
					tmp.classes ="purple"
				}
				else if(list[index].status==2){
					tmp.classes ="orange"
				}
				else if(list[index].status==3){
					tmp.classes ="fail"
				}
				tmp.rowData = {}
				tmp.rowData.AppRunId = list[index].id
				tmp.rowData.Status = list[index].status

				this.events.push(tmp);
			}
		},
		periodChanged(range, eventSource) {
			this.getSettingList(Date.parse(range.periodStart),Date.parse(range.periodEnd))
			// Demo does nothing with this information, just including the method to demonstrate how
			// you can listen for changes to the displayed range and react to them (by loading events, etc.)
			console.log(eventSource)
			console.log(range)
		},
		thisMonth(d, h, m) {
			const t = new Date()
			return new Date(t.getFullYear(), t.getMonth(), d, h || 0, m || 0)
		},
		lastTimeInMonth() {
			const t = new Date()
			return new Date(t.getFullYear(), t.getMonth()+1, 0, 23,59,59);
		},
		
		onClickDay(d) {
			this.message = `You clicked: ${d.toLocaleDateString()}`
		},
		onClickEvent(e) {
			console.log(e)
			//  this.$emit('showInfoLog', params);
			this.$emit('on-custom-comp', {
					rowData: e.originalEvent.rowData,
					field: 'Name',
					index: Date.parse(e.startDate),
				});

			this.message = `You clicked: ${e.title}`
		},
		setShowDate(d) {
			
			this.message = `Changing calendar view to ${d.toLocaleDateString()}`
			this.showDate = d
		},
		onDrop(event, date) {
			this.message = `You dropped ${event.id} on ${date.toLocaleDateString()}`
			// Determine the delta between the old start date and the date chosen,
			// and apply that delta to both the start and end date to move the event.
			const eLength = this.dayDiff(event.startDate, date)
			event.originalEvent.startDate = this.addDays(event.startDate, eLength)
			event.originalEvent.endDate = this.addDays(event.endDate, eLength)
		},
		clickTestAddEvent() {
			this.events.push({
				startDate: this.newEventStartDate,
				endDate: this.newEventEndDate,
				title: this.newEventTitle,
				id:
					"e" +
					Math.random()
						.toString(36)
						.substr(2, 10),
			})
			this.message = "You added an event!"
		},
	},
}
</script>

<style>
html,
body {
	height: 100%;
	margin: 0;
	/* background-color: #f7fcff; */
}
#appPanel {
	display: flex;
	background-color: #fff;
	flex-direction: row;
	font-family: Calibri, sans-serif;
	width:98%;
	height:800px;
	min-width: 30rem;
	/* max-width: 100rem; */
	min-height: 40rem;
	margin-left: auto;
	margin-right: auto;
}
.ButtonGroup{
	margin-bottom:10px;
	margin-left:15px

}
.label{
	color:#000
}
.calendar-controls {
	margin-right: 1rem;
	min-width: 14rem;
	max-width: 14rem;
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
/*
********************************************************************************************************
This theme adds emoji next to the day number for major holidays traditionally celebrated in the USA.

There are two types of holidays: officially-recognized holidays, and traditionally-celebrated ones
(most of the traditionally-celebrated ones are connected with the Christian faith.)

To activate this theme, include the CSS and decorate the calendar instance with the `holidays-us-official`
and/or `holidays-us-traditional` classes.
********************************************************************************************************
*/

/*
****************************************************
Traditional US Holidays
****************************************************
*/

/* Easter: example of a holiday that changes each year. Easy to pre-populate for a reasonable number of years. */
.cv-wrapper.holiday-us-traditional .d2015-04-05 .cv-day-number::before {
	content: "\271D";
}

.cv-wrapper.holiday-us-traditional .d2016-03-27 .cv-day-number::before {
	content: "\271D";
}

.cv-wrapper.holiday-us-traditional .d2017-04-16 .cv-day-number::before {
	content: "\271D";
}

.cv-wrapper.holiday-us-traditional .d2018-04-01 .cv-day-number::before {
	content: "\271D";
}

.cv-wrapper.holiday-us-traditional .d2019-04-21 .cv-day-number::before {
	content: "\271D";
}

.cv-wrapper.holiday-us-traditional .d2020-04-12 .cv-day-number::before {
	content: "\271D";
}

.cv-wrapper.holiday-us-traditional .d2021-04-04 .cv-day-number::before {
	content: "\271D";
}

.cv-wrapper.holiday-us-traditional .d2022-04-17 .cv-day-number::before {
	content: "\271D";
}

.cv-wrapper.holiday-us-traditional .d2023-04-09 .cv-day-number::before {
	content: "\271D";
}

/* Cinco de Mayo */
.cv-wrapper.holiday-us-traditional .d05-05 .cv-day-number::before {
	content: "\1F1F2\1F1FD";
}

/* Halloween - October 31 */
.cv-wrapper.holiday-us-traditional .d10-31 .cv-day-number::before {
	content: "\1F383";
}

/*
****************************************************
Official US Holidays
****************************************************
*/

/**** Same date every year ****/

/* New Year's Day - January 1 */
.cv-wrapper.holiday-us-official .d01-01 .cv-day-number::before {
	content: "\1F37E";
}

/* Independence Day - July 4 */
.cv-wrapper.holiday-us-official .d07-04 .cv-day-number::before {
	content: "\1F1FA\1F1F8";
}

/* Veteran's Day - November 11 */
.cv-wrapper.holiday-us-official .d11-11 .cv-day-number::before {
	content: "\1F396";
}

/* Christmas Day - December 25 */
.cv-wrapper.holiday-us-official .d12-25 .cv-day-number::before {
	content: "\1F384";
}

/**** Same month position every year ****/

/* Martin Luther King, Jr. Day - 3rd Monday of January */
.cv-wrapper.holiday-us-official.m01 .day.dow1.instance3 .cv-day-number::before {
	content: "\270C\1F3FE";
}

/* Washington's Birthday - 3rd Monday in February */
.cv-wrapper.holiday-us-official.m02 .day.dow1.instance3 .cv-day-number::before {
	content: "\1F34E";
}

/* Memorial Day - last Monday in May */
.cv-wrapper.holiday-us-official.m05 .day.dow1.lastInstance .cv-day-number::before {
	content: "\1F1FA\1F1F8";
}

/* Labor Day - 1st Monday in September */
.cv-wrapper.holiday-us-official.m09 .day.dow1.instance1 .cv-day-number::before {
	content: "\1F4AA";
}

/* Columbus Day - 2nd Monday in October */
.cv-wrapper.holiday-us-official.m10 .day.dow1.instance2 .cv-day-number::before {
	content: "\2388";
}

/* Thanksgiving Day - 4th Thursday of November */
.cv-wrapper.holiday-us-official.m11 .day.dow4.instance4 .cv-day-number::before {
	content: "\1F64F";
}
/*
**************************************************************
This theme is the default shipping theme, it includes some
decent defaults, but is separate from the calendar component
to make it easier for users to implement their own themes w/o
having to override as much.
**************************************************************
*/

/* Header */

.theme-default .cv-header,
.theme-default .cv-header-day {
	background-color: rgb(244,250,255);
}

.theme-default .cv-header .periodLabel {
	font-size: 1.5em;
}

.theme-default .cv-header button {
	background-color: rgb(244,250,255);
}

.theme-default .cv-header button:disabled {
	color: #ccc;
	background-color: #f7f7f7;
}

/* Grid */

.theme-default .cv-day.today {
	background-color: rgb(254, 255, 209);
}

.theme-default .cv-day.past {
	background-color: #fff;
}

.theme-default .cv-day.outsideOfMonth {
	background-color: rgb(244,250,255);
}

/* Events */

.theme-default .cv-event {
	border-color: #e0e0f0;
	border-radius: 0.5em;
	background-color: #e7e7ff;
	text-overflow: ellipsis;
}

.theme-default .cv-event.purple {
	background-color: rgb(87,197,247);
	border-color: #e7d7f7;
}

.theme-default .cv-event.orange {
	background-color: rgb(110, 175, 245);
	border-color: #f7e0c7;
}

.theme-default .cv-event.fail {
	background-color: rgb(149, 125, 236);
	border-color: rgb(255, 240, 240);
}

.theme-default .cv-event.continued::before,
.theme-default .cv-event.toBeContinued::after {
	content: " \21e2 ";
	color: #999;
}

.theme-default .cv-event.toBeContinued {
	border-right-style: none;
	border-top-right-radius: 0;
	border-bottom-right-radius: 0;
}

.theme-default .cv-event.isHovered.hasUrl {
	text-decoration: underline;
}

.theme-default .cv-event.continued {
	border-left-style: none;
	border-top-left-radius: 0;
	border-bottom-left-radius: 0;
}

/* Event Times */

.theme-default .cv-event .startTime,
.theme-default .cv-event .endTime {
	font-weight: bold;
	color: #666;
}

/* Drag and drop */

.theme-default .cv-day.draghover {
	box-shadow: inset 0 0 0.2em 0.2em yellow;
}

</style>