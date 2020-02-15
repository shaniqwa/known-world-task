import House from '@/models/House';
import {Moment} from 'moment';

export interface IUpdate {
	timestamp: Moment;
	house: House;
	steps: number;
	score: number;
}
