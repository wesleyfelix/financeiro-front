<template>
  <MainLayout>
    <q-page class="q-pa-md flex flex-center">
      <q-card class="form-card q-pa-lg">
        <q-card-section>
          <div class="text-h5 text-weight-bold">Agendamento de Transferência</div>
          <div class="text-subtitle2 text-grey-7 q-mt-sm">
            Preencha os dados abaixo para agendar uma nova transferência.
          </div>
        </q-card-section>

        <q-separator class="q-my-md" />

        <q-form
            ref="agendamentoForm"
            class="q-gutter-md"
            @submit="submitForm"
        >
          <q-input
              v-model="form.contaOrigem"
              label="Conta de Origem"
              outlined
              lazy-rules
              maxlength="10"
              fill-mask=""
              hint="Informe exatamente 10 dígitos"
              :rules="[
              val => !!val || 'Conta de origem é obrigatória',
              val => /^\d{10}$/.test(val)|| 'Conta de origem deve ter 10 dígitos'
            ]"
          />

          <q-input
              v-model="form.contaDestino"
              label="Conta de Destino"
              outlined
              lazy-rules
              maxlength="10"
              fill-mask=""
              hint="Informe exatamente 10 dígitos"
              :rules="[
              val => !!val || 'Conta de destino é obrigatória',
              val => /^\d{10}$/.test(val)|| 'Conta de destino deve ter 10 dígitos'
            ]"
          />

          <q-input
              v-model.number="form.valor"
              label="Valor"
              type="number"
              outlined
              lazy-rules
              min="0.01"
              step="0.01"
              prefix="R$"
              :rules="[
              val => val !== null && val !== '' && val !== undefined || 'Valor é obrigatório',
              val => Number(val) >= 0.01 || 'Valor deve ser maior que zero'
            ]"
          />

          <q-input
              v-model="form.dataTransferencia"
              label="Data da Transferência"
              type="date"
              outlined
              lazy-rules
              :rules="[
              val => !!val || 'Data da transferência é obrigatória',
              val => validarDataHojeOuFutura(val) || 'Data da transferência deve ser hoje ou futura'
            ]"
          />

          <div class="row justify-end q-gutter-sm q-mt-lg">
            <q-btn
                color="secondary"
                label="Voltar"
                to="/"
            />
            <q-btn
                label="Limpar"
                color="grey"
                :disable="loading"
                @click="resetForm"
            />

            <q-btn
                label="Agendar transferência"
                color="primary"
                type="submit"
                unelevated
                :loading="loading"
            />
          </div>
        </q-form>
      </q-card>
    </q-page>
  </MainLayout>
</template>

<script>
import MainLayout from '@/components/MainLayout.vue'
import FinanceiroService from '@/service/FinanceiroService'
import TransferenciaRequest from '@/model/TransferenciaRequest'
import { Notify } from 'quasar'

export default {
  name: 'NovaTransferencia',
  components: {
    MainLayout
  },
  data() {
    return {
      loading: false,
      form: new TransferenciaRequest()
    }
  },
  methods: {
    validarDataHojeOuFutura(data) {
      if (!data) return false

      const hoje = new Date()
      hoje.setHours(0, 0, 0, 0)

      const dataInformada = new Date(`${data}T00:00:00`)
      return dataInformada >= hoje
    },

    extrairMensagemErro(error) {
      const responseData = error?.response?.data

      if (!responseData) {
        return 'Erro ao agendar transferência. Tente novamente.'
      }

      if (typeof responseData === 'string') {
        return responseData
      }


      if (responseData.mensagem) {
        return responseData.mensagem
      }

      if (responseData.erro && responseData.mensagem) {
        return `${responseData.erro}: ${responseData.mensagem}`
      }

      if (responseData.message) {
        return responseData.message
      }

      if (responseData.errors) {
        if (Array.isArray(responseData.errors)) {
          return responseData.errors.join(', ')
        }

        if (typeof responseData.errors === 'object') {
          return Object.values(responseData.errors).join(', ')
        }
      }

      return 'Erro ao agendar transferência. Tente novamente.'
    },

    async submitForm() {
      const isValid = await this.$refs.agendamentoForm.validate()

      if (!isValid) {
        return
      }

      this.loading = true

      try {
        const payload = new TransferenciaRequest({
          contaOrigem: String(this.form.contaOrigem).trim(),
          contaDestino: String(this.form.contaDestino).trim(),
          valor: Number(this.form.valor),
          dataTransferencia: this.form.dataTransferencia
        })

        await FinanceiroService.createTransferencia(payload)


        Notify.create({
          type: 'positive',
          message: 'Transferência agendada com sucesso!'
        });

        this.resetForm()
      } catch (error) {
        console.error('Erro ao criar transferência:', error)

        Notify.create({
          type: 'negative',
          message: this.extrairMensagemErro(error)
        });

      } finally {
        this.loading = false
      }
    },

    resetForm() {
      this.form = new TransferenciaRequest()

      if (this.$refs.agendamentoForm) {
        this.$refs.agendamentoForm.resetValidation()
      }
    }
  }
}
</script>

<style scoped>
.form-card {
  width: 100%;
  max-width: 600px;
  border-radius: 16px;
}
</style>
