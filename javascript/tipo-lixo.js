document.addEventListener("DOMContentLoaded", function(){
    const cards = document.querySelectorAll(".papel, .plastico, .vidro, .metais, .eletronicos");

    cards.forEach(cards => {
        cards.addEventListener("click", function() {
            this.classList.toggle("selecionado");
        });
    });
});