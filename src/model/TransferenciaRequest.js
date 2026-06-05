export default class TransferenciaRequest {
    constructor({
                    contaOrigem = '',
                    contaDestino = '',
                    valor = null,
                    dataTransferencia = '',
                } = {}) {
        this.contaOrigem = contaOrigem;
        this.contaDestino = contaDestino;
        this.valor = valor;
        this.dataTransferencia = dataTransferencia;
    }
}
