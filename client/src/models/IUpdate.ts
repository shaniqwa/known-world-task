import {Moment} from 'moment';
import House from './House';

export interface IUpdate {
	timestamp: Moment;
	house: House;
	steps: number;
	score: number;
}
