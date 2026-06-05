<template>
  <MainLayout>
    <q-page-container>
      <q-page class="q-pa-md">
        <div class="q-pa-md q-gutter-sm">
          <q-btn color="primary" label="Nova transferência" icon="request_page" to="/transferencia" />
          <q-btn color="secondary" glossy label="Extrato" icon="text_snippet" to="/extrato"/>
        </div>
      </q-page>
    </q-page-container>
  </MainLayout>
</template>
<script>
import MainLayout from '@/components/MainLayout.vue';
export default {
  components: {MainLayout},
  name: 'HomePage',
  data() {
    return {

    }
  }
}
</script>
