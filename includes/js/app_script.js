
 const urlParams = new URLSearchParams(window.location.search);
 const wishId = urlParams.get('id');

 if (wishId) {

   fetch('https://xzyczenia.ct8.pl/json.php')
     .then(response => response.json())
     .then(data => displayWishById(data, wishId))
     .catch(error => console.error('Błąd pobierania danych:', error));
 } else {
   document.getElementById('id-wish-form').style.display = 'flex';
   document.getElementById('card').style.display = 'none';
   document.getElementById('click-icon').style.display = 'none';
   document.getElementById('click-home').style.display = 'none';
 }

 
 function displayWishById(data, id) {

   const wish = data.find(item => item.id == id);
   if (wish) {
     document.getElementById('zyczenia').textContent = `${wish.zyczenia}`;
     document.getElementById('autor').textContent = `${wish.przedautor} ${wish.autor}`;
     document.getElementById('num-wish').textContent = `(ID: ${wish.id})`;
     document.title = `Animowana Kartka Świąteczna by ${wish.autor}`;
   } else {
     console.error(`Brak życzenia o id ${id}`);
     window.location.href = '../apps/zyczenia';
   }
 }


 function addWish() {

   const newWishId = document.getElementById('id_wish').value;

   fetch('https://xzyczenia.ct8.pl/json.php')
     .then(response => response.json())
     .then(data => {
       const wishExists = data.some(item => item.id == newWishId);
       if (wishExists) {
         window.location.href = `?id=${newWishId}`;
       } else {
         document.getElementById('error-wish').textContent = `Brak życzenia o podanym numerze ID`;
       }
     })
     .catch(error => console.error('Błąd pobierania danych:', error));
 }