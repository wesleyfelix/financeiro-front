<template>
  <q-layout
      view="lHh lpr lFf"
      class="full-screen"
  >
    <q-header elevated>
      <q-toolbar>
        <q-avatar>
          <img src="https://cdn.quasar.dev/logo-v2/svg/logo-mono-white.svg" />
        </q-avatar>
        <q-toolbar-title>
          Quasar Framework teste
        </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <slot></slot>
    </q-page-container>
  </q-layout>
</template>

<script>
export default {
  name: "MainLayout",
  methods: {
    logout() {
      this.$router.push('/');
    }
  }
}
</script>

<style scoped>
.full-screen {
  min-height: 100vh;
}
</style>
