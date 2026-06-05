<template>
  <MainLayout>
    <q-page class="q-pa-md">
      <div class="row items-center justify-between q-mb-lg">
        <div>
          <div class="text-h5 text-weight-bold">Extrato de Transferências</div>
          <div class="text-subtitle2 text-grey-7 q-mt-xs">
            Consulte abaixo todas as transferências agendadas.
          </div>
        </div>
        <div class="row q-gutter-sm q-mt-lg">
          <q-btn
              color="secondary"
              label="Voltar"
              to="/"
          />
          <q-btn
              color="primary"
              icon="refresh"
              label="Atualizar"
              unelevated
              :loading="loading"
              @click="carregarTransferencias"
          />
        </div>

      </div>

      <!-- Cards resumo -->
      <div class="row q-col-gutter-md q-mb-lg">
        <div class="col-12 col-md-4">
          <q-card class="summary-card">
            <q-card-section>
              <div class="text-subtitle2 text-grey-7">Total de Transferências</div>
              <div class="text-h5 text-weight-bold q-mt-sm">
                {{ totalTransferencias }}
              </div>
            </q-card-section>
          </q-card>
        </div>

        <div class="col-12 col-md-4">
          <q-card class="summary-card">
            <q-card-section>
              <div class="text-subtitle2 text-grey-7">Valor Total Transferido</div>
              <div class="text-h5 text-weight-bold q-mt-sm">
                {{ formatarMoeda(totalValorTransferido) }}
              </div>
            </q-card-section>
          </q-card>
        </div>

        <div class="col-12 col-md-4">
          <q-card class="summary-card">
            <q-card-section>
              <div class="text-subtitle2 text-grey-7">Taxa Total</div>
              <div class="text-h5 text-weight-bold q-mt-sm">
                {{ formatarMoeda(totalTaxas) }}
              </div>
            </q-card-section>
          </q-card>
        </div>
      </div>

      <!-- Tabela -->
      <q-card class="extrato-card">
        <q-card-section>
          <q-table
              title="Lista de Transferências"
              :rows="transferencias"
              :columns="columns"
              row-key="id"
              flat
              bordered
              :loading="loading"
              no-data-label="Nenhuma transferência encontrada"
              loading-label="Carregando transferências..."
              rows-per-page-label="Registros por página"
              :pagination="{ rowsPerPage: 10 }"
          >
            <template v-slot:body-cell-valor="props">
              <q-td :props="props" class="text-right text-weight-medium">
                {{ formatarMoeda(props.row.valor) }}
              </q-td>
            </template>

            <template v-slot:body-cell-taxa="props">
              <q-td :props="props" class="text-right">
                {{ formatarMoeda(props.row.taxa) }}
              </q-td>
            </template>

            <template v-slot:body-cell-dataTransferencia="props">
              <q-td :props="props">
                <q-chip
                    dense
                    square
                    color="primary"
                    text-color="white"
                >
                  {{ formatarData(props.row.dataTransferencia) }}
                </q-chip>
              </q-td>
            </template>

            <template v-slot:body-cell-dataAgendamento="props">
              <q-td :props="props">
                {{ formatarData(props.row.dataAgendamento) }}
              </q-td>
            </template>

            <template v-slot:no-data>
              <div class="full-width row flex-center text-grey-7 q-gutter-sm q-pa-lg">
                <q-icon size="2em" name="receipt_long" />
                <span>Nenhuma transferência foi encontrada.</span>
              </div>
            </template>
          </q-table>
        </q-card-section>
      </q-card>
    </q-page>
  </MainLayout>
</template>

<script>
import MainLayout from '@/components/MainLayout.vue'
import FinanceiroService from '@/service/FinanceiroService'
import {Notify} from "quasar";

export default {
  name: 'ExtratoTransferencias',
  components: {
    MainLayout
  },
  data() {
    return {
      loading: false,
      transferencias: [],
      columns: [
        {
          name: 'id',
          label: 'ID',
          field: 'id',
          align: 'left',
          sortable: true
        },
        {
          name: 'contaOrigem',
          label: 'Conta Origem',
          field: 'contaOrigem',
          align: 'left',
          sortable: true
        },
        {
          name: 'contaDestino',
          label: 'Conta Destino',
          field: 'contaDestino',
          align: 'left',
          sortable: true
        },
        {
          name: 'valor',
          label: 'Valor',
          field: 'valor',
          align: 'right',
          sortable: true
        },
        {
          name: 'taxa',
          label: 'Taxa',
          field: 'taxa',
          align: 'right',
          sortable: true
        },
        {
          name: 'dataTransferencia',
          label: 'Data Transferência',
          field: 'dataTransferencia',
          align: 'left',
          sortable: true
        },
        {
          name: 'dataAgendamento',
          label: 'Data Agendamento',
          field: 'dataAgendamento',
          align: 'left',
          sortable: true
        }
      ]
    }
  },
  computed: {
    totalTransferencias() {
      return this.transferencias.length
    },

    totalValorTransferido() {
      return this.transferencias.reduce((total, item) => {
        return total + Number(item.valor || 0)
      }, 0)
    },

    totalTaxas() {
      return this.transferencias.reduce((total, item) => {
        return total + Number(item.taxa || 0)
      }, 0)
    }
  },
  mounted() {
    this.carregarTransferencias()
  },
  methods: {
    async carregarTransferencias() {
      this.loading = true

      try {
        const response = await FinanceiroService.getTransferencias()

        if (Array.isArray(response)) {
          this.transferencias = response
        } else if (Array.isArray(response?.data)) {
          this.transferencias = response.data
        } else {
          this.transferencias = []
        }
      } catch (error) {
        console.error('Erro ao buscar transferências:', error)

        Notify.create({
          type: 'negative',
          message: this.extrairMensagemErro(error)
        });

      } finally {
        this.loading = false
      }
    },

    extrairMensagemErro(error) {
      const responseData = error?.response?.data
      const status = error?.response?.status

      if (!responseData) {
        return 'Erro ao carregar o extrato. Tente novamente.'
      }

      if (typeof responseData === 'string') {
        return responseData
      }

      if (responseData.mensagem) {
        return responseData.mensagem
      }

      if (responseData.message) {
        return responseData.message
      }

      if (responseData.errors) {
        if (Array.isArray(responseData.errors)) {
          return responseData.errors.join(', ')
        }

        if (typeof responseData.errors === 'object' && responseData.errors !== null) {
          return Object.values(responseData.errors).flat().join(', ')
        }
      }

      if (responseData.erro) {
        return responseData.erro
      }

      if (status === 400) {
        return 'Erro na consulta do extrato.'
      }

      if (status === 500) {
        return 'Erro interno do servidor.'
      }

      return 'Erro ao carregar o extrato. Tente novamente.'
    },

    formatarMoeda(valor) {
      const numero = Number(valor || 0)

      return new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL'
      }).format(numero)
    },

    formatarData(data) {
      if (!data) {
        return '-'
      }

      const partes = data.split('-')

      if (partes.length !== 3) {
        return data
      }

      const [ano, mes, dia] = partes
      return `${dia}/${mes}/${ano}`
    }
  }
}
</script>

<style scoped>
.extrato-card,
.summary-card {
  border-radius: 16px;
}

.summary-card {
  min-height: 120px;
}
</style>
