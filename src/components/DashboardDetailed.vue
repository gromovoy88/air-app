<template>
  <div
    class="dashboard-details"
    v-if="weather"
  >
    <div class="dashboard-details__subheader">
      <div class="subheader">
        <p class="subheader-details">
          Date:
          <b>{{ this.date }}</b>
        </p>
        <p class="subheader-details">
          Location:
          <b>{{ weather.city }},
            {{ weather.country }}
          </b>
        </p>
      </div>
    </div>
    <div class="dashboard-details__data">
      <div
        class="element"
        v-for="(el, key) in forecast"
        :key="key"
      >
        <p class="element-time">
          <b>{{ timeFromDate(el.dt_txt) }}</b>
        </p>
        <h3 class="element-degree">
          {{ celsius(el.main.temp) }}°
        </h3>
        <p class="element-main">
          <b>{{ el.weather[0].main }}</b>
        </p>
        <p class="element-description">
          {{ el.weather[0].description }}
        </p>
      </div>
    </div>
    <div class="dashboard-details__navigation">
      <a
        @click="back"
      >
        Back
      </a>
    </div>
  </div>
</template>

<script>
import * as Api from '../api';

export default {
  name: 'DashboardDetailed',
  props: ['lat', 'lon'],
  mounted() {
    const date = new Date();
    Api.getForecast(this.lat, this.lon)
      .then((weather) => {
        this.weather = weather;
        this.date = `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}`;
      });
  },
  data() {
    return {
      /**
       * Current date string
       * @type {String}
       */
      date: null,
      /**
       * The weather object.
       * @type {Object}
       */
      weather: null,
    };
  },
  computed: {
    forecast() {
      return this.weather.forecast.slice(0, 6);
    },
  },
  methods: {
    /**
     * Method for convert temperature from K° to C°
     * @param temp - Temperature in K°
     * @returns {number} Temperature in C°
     */
    celsius(temp) {
      return (parseInt(temp, 10) - 273);
    },
    /**
     * Method which convert input string with date to normal view
     * @param date - Full date string
     * @returns {string}
     */
    timeFromDate(date) {
      return date.split(' ')[1].toString();
    },
    /**
     * Change route to main screen
     */
    back() {
      this.$router.push({ path: '/', query: { lat: this.lat, lon: this.lon } });
    },
  },
};
</script>

<style lang="scss">
  @import "../styles/mixins";
  .dashboard-details {
    width: 100%;
    p {
      font-size: 12px;
      font-weight: 700;
      b {
        font-weight: 500;
      }
    }
    &__subheader {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: space-around;
      .subheader {
        width: 50%;
        display: flex;
        justify-content: center;
        &-details {
          width: 60%;
        }
      }
    }
    &__data {
      display: flex;
      justify-content: space-around;
      margin-top: 39px;
      @include respond-below(sm) {
        flex-direction: column;
      }
      .element {
        @include respond-below(sm) {
          display: flex;
          align-items: center;
          justify-content: space-around;
        }
        &-degree {
        }
        &-time {
          margin: 0;
        }
        &-main {
          margin: 0;
        }
        &-description {
          margin: 0;
          font-size: 10px;
          @include respond-below(sm) {
            display: none;
          }
        }
      }
    }
    &__navigation {
      margin-top: 39px;
      a {
        color: white;
        font-weight: 500;
        font-size: 18px;
        text-decoration: underline;
      }
    }
  }
</style>
