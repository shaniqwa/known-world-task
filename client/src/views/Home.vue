<template>
  <div class="container">

    <div class="side-panel">
      <h1>Score Board</h1>



      <div class="mt-20">
        <h2>Updates</h2>

      </div>
    </div>

    <world-map :houses="houses"></world-map>
  </div>
</template>

<script lang="ts">
	// @ is an alias to /src
	import WorldMap from '../components/WorldMap.vue';
	import {Component, Vue, Watch} from 'vue-property-decorator';
	import House from '../models/House';
	import {IPoint} from '../models/IPoint';
	import {IUpdate} from '../models/IUpdate';

	@Component({
		name: 'Home',
		components: {WorldMap: WorldMap},
	})
	export default class Home extends Vue {

		created() {
			this.$store.dispatch('initUpdates');
			this.$store.dispatch('getHouses');
		}

		/**
     	* watch for updates
     	* TODO: move houses according to updates.
		* @param latestUpdate
		*/
		@Watch('latestUpdate')
		onNewUpdate(latestUpdate: IUpdate) {
			return;
		}

	  	/**
     	* TODO: calculate the new position
		* @param x1 house x position
		* @param y1 house y position
		* @param x2 destination x position
		* @param y2 destination y position
		* @param length number of steps towards destination
		*/
		calcNewPosition(x1: number, y1: number, x2: number, y2: number, length: number): IPoint {
      		return {x: 0, y: 0}
		}

	  	/**
     	* TODO: calculate the winner
		* @param house the house fighting the Lannisters
		*/
	  	calcWinner(house: House): House {
      		return new House();
		}
		 
		 /* ------ STORE GETTERS ------ */


		getHouseByName(name: string): House {
			return this.$store.getters.houseByName(name);
		}

	  	get houses(): House[] {
		  return this.$store.getters.houses;
		}

		get updates() {
			return this.$store.getters.updates;
		}

		get latestUpdate() {
			return this.$store.getters.latestUpdate;
		}

		get kingsLandingPosition(): IPoint {
			return this.$store.getters.kingsLandingPosition;
		}
	}
</script>

<style lang="scss">
  $map-width: calc(1280px * 1.115);
  .container {
    display: flex;

    .side-panel {
      padding: 20px;
      min-width: 360px;
      width: calc(100% - #{$map-width} - 40px);
      text-align: left;

      ul {
        list-style: none;

        li {
          padding: 5px;
        }
      }

      ul.updates {

      }
    }
  }
</style>
