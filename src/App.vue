<template>
  <div id="app">
    <div class="container">
      <header>
        <span class="logo-wrapper">
          <span class="logo"></span>
        </span>
      </header>
      <section class="content">
        <div
          class="dashboard"
        >
          <div class="dashboard-header">
            <h2 class="dashboard-header__text">
              Check the weather!
            </h2>
          </div>
          <div class="dashboard-body">
            <router-view v-if="position"/>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
export default {
  name: 'App',
  mounted() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;
        this.position = position;
        this.$router.push({ path: '/', query: { lat, lon } });
      });
    }
  },
  data() {
    return {
      /**
       * Current position received from browser Navigator
       * @type {Object}
       */
      position: null,
    };
  },
};
</script>

<style lang="scss">
  @import "styles/main";
  .container {
    min-height: 100vh;
    background-size: cover;
    background-position: 50% 50%;
    background-repeat: no-repeat;
    background-image: url('./assets/background.png');
  }
  .logo {
    display: inline-block;
    width: 135px;
    height: 37px;
    background-size: 100%;
    background-repeat: no-repeat;
    background-image: url('./assets/logo.png');
    &-wrapper {
      position: relative;
      display: inline-block;
      border-radius: 25px;
      background-color: rgba(255, 255, 255, 0.2);
      padding: 18px 40px 18px 80px;
      left: -50px;
    }
  }
  .content {
    width: 100%;
    text-align: center;
    display: flex;
    justify-content: center;
  }
  .dashboard {
    width: 740px;
    min-height: 420px;
    height: 100%;
    border-radius: 25px;
    background-color: rgba(255, 255, 255, 0.20);
    border-radius: 25px;
    @include respond-below(sm) {
      width: 100%;
      margin: 0 15px 39px;
    }
    @include respond-below(xs) {
    }
  }
  .dashboard-header {
    background-color: rgba(255, 255, 255, 0.20);
    border-bottom: 1px solid white;
    border-radius: 25px 25px 0 0;
    &__text {
      font-weight: 500;
      font-size: 22px;
      padding: 39px 0;
    }
  }
  .dashboard-body {
    padding: 39px 0;
  }
</style>
