<template>
  <div
    class="dashboard-homepage"
    v-if="weather"
  >
    <div class="dashboard-homepage__input">
      <form class="search-form">
        <label class="search-form__label">
          Enter the city name, or leave empty for geolocation.
        </label>
        <div class="search-form__input-box">
          <vue-google-autocomplete
            id="map"
            ref="address"
            types="geocode"
            classname="search-form__input"
            placeholder="Start typing"
            v-on:placechanged="change"
          />
          <input
            class="search-form__button"
            type="button"
            value="Check"
            @click="updateWeather"
          />
        </div>
      </form>
    </div>
    <div class="dashboard-homepage__data">
      <h3 class="weather-degree">{{ celsius }}°</h3>
      <div class="weather-headers">
        <p class="weather-details">Date:</p>
        <p class="weather-details">Location:</p>
        <p class="weather-details">Description:</p>
      </div>
      <div class="weather-content">
        <p class="weather-details">
          <b>{{ date }}</b>
        </p>
        <p class="weather-details">
          <b>{{ location }}</b>
        </p>
        <p class="weather-details">
          <b>{{ description }}</b>
        </p>
      </div>
    </div>
    <div class="dashboard-homepage__navigation">
      <a
        @click="more"
      >
        More</a>
    </div>
  </div>
</template>

<script>
import VueGoogleAutocomplete from 'vue-google-autocomplete';
import * as Api from '../api';

export default {
  name: 'DashboardMain',
  props: ['lat', 'lon'],
  components: {
    'vue-google-autocomplete': VueGoogleAutocomplete,
  },
  mounted() {
    const date = new Date();
    Api.getWeather(this.lat, this.lon)
      .then((weather) => {
        this.weather = weather;
        this.date = `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}`;
      });
  },
  data() {
    return {
      /**
       * Weather object
       * @type {Object}
       */
      weather: null,
      /**
       * Current date string
       * @type {String}
       */
      date: null,
      /** Object which filled weather data from autocomplete form
       * @type {Object}
       */
      searchObject: null,
    };
  },
  computed: {
    location() {
      return `${this.weather.city}, ${this.weather.country}`;
    },
    celsius() {
      return (parseInt(this.weather.temp, 10) - 273);
    },
    description() {
      return this.weather.description;
    },
  },
  methods: {
    /**
     * Change route to details screen
     */
    more() {
      this.$router.push({ path: '/more', query: { lat: this.lat, lon: this.lon } });
    },
    /**
     * Set new received data to components object
     * @param result
     */
    change(result) {
      this.searchObject = result;
    },
    /**
     * Method which on button click update weather from autocomplete form
     */
    updateWeather() {
      if (this.searchObject) {
        this.$router.replace({
          query: {
            lat: this.searchObject.latitude,
            lon: this.searchObject.longitude,
          },
        }).then(() => {
          Api.getWeather(this.lat, this.lon)
            .then((weather) => {
              this.weather = weather;
            });
        });
      }
    },
  },
};
</script>

<style lang="scss">
  @import "../styles/mixins";
  .dashboard-homepage {
    display: flex;
    align-items: center;
    flex-direction: column;
    height: 100%;
    width: 100%;
    &__input {
      width: 45%;
      @include respond-below(xs) {
        width: 80%;
      }
      .search-form {
        &__label {
          width: 100%;
          display: block;
          text-align: left;
          font-weight: 500;
          font-size: 10px;
          margin-bottom: 10px;
        }
        &__input-box {
          display: flex;
          justify-content: space-between;
        }
        &__input {
          width: 270px;
          height: 40px;
          color: #1C1C1C;
          font-weight: 500;
          font-size: 14px;
          padding-left: 10px;
          background-color: white;
          border-radius: 5px;
          border: none;
        }
        &__button {
          border: none;
          background-color: transparent;
          color: white;
          text-decoration: underline;
          font-weight: 500;
          font-size: 18px;
          &:hover {
            cursor: pointer;
          }
        }
      }
    }
    &__data {
      width: 100%;
      margin-top: 39px;
      .weather {
        justify-content: center;
        &-headers {
          display: inline-block;
          text-align: right;
          width: 30%;
        }
        &-content {
          display: inline-block;
          text-align: left;
          width: 30%;
          margin-left: 14px;
        }
        &-degree {
          font-weight: 700;
          margin: 0;
          width: 100%;
        }
        &-details {
          font-size: 12px;
          font-weight: 700;
          b {
            font-weight: 500;
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
