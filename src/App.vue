<template>
  <div id="app">
    <!-- <div id="nav">
      <router-link to="/home">Home</router-link>
      <router-link to="/about">About</router-link>
      <router-link to="/three">three</router-link>
      <router-link to=/star>Star</router-link>
    </div> -->
    <router-view/>
  </div>
</template>

<style lang="scss">
#app {
  text-align: center;
  color: #2c3e50;
}

#nav {
  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
