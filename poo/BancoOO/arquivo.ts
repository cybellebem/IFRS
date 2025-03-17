// classe para cliente
class Cliente {
    nome: string;
    codigo: number;

    constructor(nome: string, codigo: number) {
        this.nome = nome;
        this.codigo = codigo;
    }
}

let cliente1 = new Cliente("Alibaba", 1);
let cliente2 = new Cliente("Ali", 2);

// classe para cartao de credito
class CartaoDeCredito {
    numero: string;
    validade: string;

    constructor(numero: string, validade: string) {
        this.numero = numero;
        this.validade = validade;
    }
}

let cartao1 = new CartaoDeCredito("1234567898765432", "12/25");
let cartao2 = new CartaoDeCredito("432187650984323", "16/27");

//classe agencia
class Agencia {
    numero: number;

    constructor(numero: number) {
        this.numero = numero;
    }
}

let agencia1 = new Agencia(101);
let agencia2 = new Agencia(202);



class Conta {
    numero: number;
    saldo: number;
    limite: number;

    constructor(numero: number, saldo: number, limite: number = 100) {
        this.numero = numero;
        this.saldo = saldo;
        this.limite = limite;
    }

    deposito(valor: number): void {
        if (valor > 0) {
            this.saldo += valor;
            console.log(`Depósito de R$ ${valor} realizado com sucesso.`);
        } else {
            console.log("Valor de depósito inválido.");
        }
    }

    saque(valor: number): void {
        if (valor > 0 && valor <= (this.saldo + this.limite)) {
            this.saldo -= valor;
            console.log(`Saque de R$ ${valor} realizado com sucesso.`);
        } else {
            console.log("Saldo insuficiente ou valor inválido.");
        }
    }

    extrato(): void {
        console.log(`Extrato da conta ${this.numero}: Saldo: R$ ${this.saldo}, Limite: R$ ${this.limite}`);
    }

    consultarSaldo(): void {
        console.log(`Saldo disponível na conta ${this.numero}: R$ ${this.saldo + this.limite}`);
    }
}

// Testando os métodos
let conta1 = new Conta(12345, 500);
conta1.deposito(200);
conta1.saque(150);
conta1.extrato();
conta1.consultarSaldo();

//9
// classe funcionarios
class Funcionario {
    nome: string;
    salario: number;

    constructor(nome: string, salario: number) {
        this.nome = nome;
        this.salario = salario;
    }

    aumentarSalario(valor: number): void {
        if (valor > 0) {
            this.salario += valor;
            console.log(`Salário aumentado em R$ ${valor}. Novo salário: R$ ${this.salario}`);
        } else {
            console.log("Valor inválido para aumento.");
        }
    }

    consultarDados(): void {
        console.log(`Funcionário: ${this.nome}, Salário: R$ ${this.salario}`);
    }
}

// Testando os métodos da classe Funcionario
let funcionario1 = new Funcionario("Carlos Souza", 3000);
funcionario1.aumentarSalario(500);
funcionario1.consultarDados();