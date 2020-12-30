<template>
  <div class="container">

    <div class="side-panel">
      <h1>Score Board</h1>
      <div class="app-score flex-space-between"
           v-for="house of houseByScore"
           :key="house.id">
        <span :class="{'winner': winner && house.name === winner.name}">{{ house.name }}</span>
        <span>{{ house.score }}</span>
      </div>


      <div class="mt-20">
        <h2>Updates</h2>
        <div class="app-updates-container">
          <div class="app-update" v-for="(update, index) in updates"
               :key="index">
            <div class="update-timestamp">{{ update.timestamp | formatDate }}</div>
            <p>House <b>{{ update.house.name }}</b> has moved {{ update.steps }} steps and gained {{ update.score }}
              strength</p>
          </div>
        </div>
      </div>
    </div>

    <world-map :houses="houses"></world-map>
  </div>
</template>

<style lang="scss">
.flex-space-between {
  display: flex;
  justify-content: space-between;
}

.app-score {
  .winner {
    font-weight: bold;
  }
}
.app-updates-container {
  height: 600px;
  overflow-y: scroll;
}
.app-update {
  margin: 0 0 5px 0;

  .update-timestamp {
    font-size: 12px;
    width: 100%;
    border-bottom: 1px solid #55442b;
  }
}
</style>

<script lang="ts">
// @ is an alias to /src
import WorldMap from '@/components/WorldMap.vue';
import {Component, Vue, Watch} from 'vue-property-decorator';
import House from '@/models/House';
import {IPoint} from '@/models/IPoint';
import {IUpdate} from '@/models/IUpdate';

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
    const house: House = latestUpdate.house;
    house.position = this.calcNewPosition(
        house.position.x,
        house.position.y,
        this.kingsLandingPosition.x,
        this.kingsLandingPosition.y,
        latestUpdate.steps
    );

    house.score = latestUpdate.score;

    if (house.name !== 'Lannister' && this.hasReachedKingsLanding(house)) {
      const winner = this.calcWinner(house);
      this.$store.dispatch('setWinner', winner);
      alert(winner.name + ' has won!');
    }

    this.$store.dispatch('updateHouse', house);
    return;
  }

  hasReachedKingsLanding(house: House): boolean {
    return this.kingsLandingPosition.x === house.position.x && this.kingsLandingPosition.y === house.position.y;
  }

  /**
   * @param x1 house x position
   * @param y1 house y position
   * @param x2 destination x position
   * @param y2 destination y position
   * @param length number of steps towards destination
   */
  calcNewPosition(x1: number, y1: number, x2: number, y2: number, length: number): IPoint {
    const xDist = x2 - x1;
    const yDist = y2 - y1;
    const dist = Math.sqrt(xDist * xDist + yDist * yDist);
    const fractionOfTotal = length / dist;

    if (length < dist) {
      return {
        x: x1 + xDist * fractionOfTotal,
        y: y1 + yDist * fractionOfTotal
      }
    } else {
      return this.kingsLandingPosition;
    }
  }

  /**
   * @param house the house fighting the Lannisters
   */
  calcWinner(house: House): House {
    const lannister = this.getHouseByName('Lannister');

    return lannister.score >= house.score ? lannister : house;
  }

  /* ------ STORE GETTERS ------ */


  getHouseByName(name: string): House {
    return this.$store.getters.houseByName(name);
  }

  get houses(): House[] {
    return this.$store.getters.houses;
  }

  get houseByScore(): House[] {
    return this.$store.getters.houseByScore;
  }

  get updates(): IUpdate[] {
    return this.$store.getters.updates;
  }

  get latestUpdate() {
    return this.$store.getters.latestUpdate;
  }

  get kingsLandingPosition(): IPoint {
    return this.$store.getters.kingsLandingPosition;
  }

  get winner(): House {
    return this.$store.getters.winner;
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
