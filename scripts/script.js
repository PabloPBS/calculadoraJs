const historico = document.querySelector("#historico");
const atual = document.querySelector("#atual");
const teclas = document.querySelectorAll("#teclas button");

class Calculadora {

}

teclas.forEach((btn) => {
    btn.addEventListener("click", (e) => {

        const value = e.target.innerText;

        console.log(value);
    });
});