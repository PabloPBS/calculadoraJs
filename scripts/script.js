const historico = document.querySelector("#historico");
const atual = document.querySelector("#atual");
const teclas = document.querySelectorAll("#teclas button");

class Calculadora {
    constructor (historico, atual) {
        this.historico = historico
        this.atual = atual
        this.operacao = "";
    }

    //Adiciona os dígitos
    addDigit(digit) {
        if (digit === "." && this.atual.innerText.includes(".")) {
            return
        }
        this.operacao = digit
        this.updateScreen()
    }

    processOperation(operation) {
        if (this.atual.innerText === "" && operation !== "C") {
            if (this.historico.innerText !== "") {
                this.changeOperation(operation)
            }
            return
        }
        let operationValue
        const previous = +this.historico.innerText.split(" ")[0]
        const current = +this.atual.innerText

        switch (operation) {
            case "+":
                operationValue = previous + current;
                this.updateScreen(operationValue, operation, current, previous)
                break
            case "-":
                operationValue = previous - current;
                this.updateScreen(operationValue, operation, current, previous)
                break
            case "/":
                operationValue = previous / current;
                this.updateScreen(operationValue, operation, current, previous)
                break
            case "*":
                operationValue = previous * current;
                this.updateScreen(operationValue, operation, current, previous)
                break
            case "DEL":
                this.processDelOperator()
                break
            case "CE":
                this.processClearCurrentOperation()
                break
            case "C":
                this.processClearAll()
                break
            case "=":
                this.processEqualOperator()
                break
            default:
                return
        }
    }

    //Muda os valores da tela
    updateScreen(operationValue = null, operation = null, current = null, previous = null) {
        console.log(operationValue, operation, current, previous)

        if(operationValue === null) {
            this.atual.innerText += this.operacao
        } else {
            if (previous === 0) {
                operationValue = current
            }

            this.historico.innerText = `${operationValue} ${operation}`
            this.atual.innerText = ""
        }  
    }

    changeOperation(operation) {
        const mathOperations = ["+","-","/","*"]
        if (!mathOperations.includes(operation)) {
            return
        }
        this.historico.innerText = this.historico.innerText.slice(0,-1) + operation
    }

    processDelOperator() {
        this.atual.innerText = this.atual.innerText.slice(0,-1)
    }

    processClearCurrentOperation() {
        this.atual.innerText = ""
    }

    processClearAll() {
        this.atual.innerText = ""
        this.historico.innerText = ""
    }

    processEqualOperator() {
        const operation = historico.innerText.split(" ")[1]
        this.processOperation(operation)
    }
}

const calc = new Calculadora(historico, atual)

teclas.forEach((btn) => {
    btn.addEventListener("click", (e) => {

        const value = e.target.innerText;

        if (+value >= 0 || value === '.') {
            calc.addDigit(value)
        } else {
            calc.processOperation(value)
        }
    });
});