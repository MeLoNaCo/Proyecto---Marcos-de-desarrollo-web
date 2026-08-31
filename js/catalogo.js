const inputBuscar = document.getElementById('inputBuscar');
const tarjetas = document.querySelectorAll('.item-tarjeta');

inputBuscar.addEventListener('keyup', () => {
    const texto = inputBuscar.value.toLowerCase();
    tarjetas.forEach(tarjeta => {
        const titulo = tarjeta.querySelector('.titulo-prod').textContent.toLowerCase();
        if (titulo.includes(texto)) {
            tarjeta.classList.remove('d-none');
        } else {
            tarjeta.classList.add('d-none');
        }
    });
});