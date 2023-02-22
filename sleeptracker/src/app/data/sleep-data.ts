import { nanoid } from 'nanoid';

export class SleepData {
	
	id:string;
	date:string;

	constructor() {
		this.id = nanoid();
		this.date = new Date().toDateString();
	}

	setId(id:string) {
		this.id = id;
	}

	setDate(date:Date) {
		this.date = date.toDateString();
	}
}
