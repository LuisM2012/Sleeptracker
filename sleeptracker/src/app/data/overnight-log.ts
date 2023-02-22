import { SleepData } from './sleep-data';

export class OvernightLog extends SleepData {
	sleepStart:string = "";
	sleepEnd:string = "";
	totalHours:number = 0;
	totalMinutes:number = 0;

	constructor(sleepStart:Date, sleepEnd:Date) {
		super();
		this.setNewTime(sleepStart, sleepEnd);
	}

	public setNewTime(sleepStart:Date, sleepEnd:Date) {
		this.setTotal(sleepStart, sleepEnd);
		this.sleepStart = sleepStart.toTimeString();
		this.sleepEnd = sleepEnd.toTimeString();	
	}

	setTotal (start:Date, end:Date) {
		let hours = end.getHours() - start.getHours();
		let minutes = end.getMinutes() - start.getMinutes();

		hours = (hours < 0) ? 24+hours : hours;

		this.totalHours = hours;
		this.totalMinutes = minutes;
	}
}
