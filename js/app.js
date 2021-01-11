const btnTab = document.querySelectorAll(".tab-btn");
const about = document.querySelector(".about");
const articles = document.querySelectorAll(".content");

about.addEventListener("click", function (e) {
  const id = e.target.dataset.id;
  if (id) {
    //remove active from other button
    btnTab.forEach(function (btn) {
      btn.classList.remove("active");
      e.target.classList.add("active");
    });
    // hide other articles
    articles.forEach(function (article) {
      article.classList.remove("active");
    });
    const element = document.getElementById(id);
    element.classList.add("active");
  }
});

let cta = document.getElementById('cnt');

cta.addEventListener('click', function(e) {
  let deviza = document.getElementById('deviza').value;
  let kurs = document.getElementById('kurs').value;
  let prihod = document.getElementById('prihod').value = (deviza * kurs);
  let trosak = document.getElementById('trosak').value = (prihod * .2);
  let osnovica = document.getElementById('osnovica').value = (parseFloat(prihod) - parseFloat(trosak));
  let porez = document.getElementById('porez').value = (osnovica * .2);
  let pio = document.getElementById('pio').value = (osnovica * .255);
  let zdrav = document.getElementById('zdrav').value = (osnovica * .103);
  let totalPorez = document.getElementById('totalPorez').value = (parseFloat(porez) + parseFloat(pio) + parseFloat(zdrav));
  let netoPrihod = document.getElementById('netoPrihod').value = (parseFloat(prihod) - parseFloat(totalPorez));
})
//  ======= FORMATIRANJE BR ========
// function formatNumber(num) {
//   return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.') + ` din.`
// }

let ctadva = document.getElementById('cnt_dva');

ctadva.addEventListener('click', function(e) {
  let deviza_dva = document.getElementById('deviza_dva').value;
  let kurs_dva = document.getElementById('kurs_dva').value;
  let prihod_dva = document.getElementById('prihod_dva').value = (deviza_dva * kurs_dva);
  let trosak_dva = document.getElementById('trosak_dva').value = (prihod_dva * .2);
  let osnovica_dva = document.getElementById('osnovica_dva').value = (parseFloat(prihod_dva) - parseFloat(trosak_dva));
  let porez_dva = document.getElementById('porez_dva').value = (osnovica_dva * .2);
  let pio_dva = document.getElementById('pio_dva').value = (osnovica_dva * .255);
  let totalPorezi = document.getElementById('totalPorezi').value = (parseFloat(porez_dva) + parseFloat(pio_dva));
  let netoPrihodi = document.getElementById('netoPrihodi').value = (parseFloat(prihod_dva) - parseFloat(totalPorezi));
})