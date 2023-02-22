import { SleepData } from './sleep-data';

export class SleepinessLog extends SleepData {

	public static ScaleValues = [
		{
			score: 1, 
			description: 'Feeling active, vital, alert, or wide awake'},
		{
			score: 2, 
			description: 'Functioning at high levels, but not at peak; able to concentrate'},
		{
			score: 3, 
			description: 'Awake, but relaxed; responsive but not fully alert'},
		{
			score: 4, 
			description: 'Somewhat foggy, let down'},
		{
			score: 5, 
			description: 'Foggy; losing interest in remaining awake; slowed down'},
		{
			score: 6, 
			description: 'Sleepy, woozy, fighting sleep; prefer to lie down'},
		{
			score: 7, 
			description: 'No longer fighting sleep, sleep onset soon; having dream-like thoughts'}
	];

	loggedValue:number;
	loggedAt:string;
	note:string = "";

	constructor(loggedValue:number, loggedAt:Date = new Date()) {
		super();
		this.loggedValue = loggedValue;
		this.loggedAt = loggedAt.toJSON();
	}

	setNote(note:string) {
		this.note = note;
	}
}
