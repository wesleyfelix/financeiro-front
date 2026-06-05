<template>
  <q-layout
      view="lHh lpr lFf"
      class="full-screen"
  >
    <q-header elevated>
      <q-toolbar>
        <a
            class="cursor-pointer"
            @click="irParaHome"
        >
          <img src="https://www.globalti.com.br/img/logos-gti/GTIlogowy.png" />
        </a>
        <q-toolbar-title>
          Agendamentos de transferências
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
    irParaHome() {
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
