function sendEmail() {
    const formData = {
        email: document.getElementById('recipient').value,
        przedautor: document.getElementById('przedautor').value,
        autor: document.getElementById('subject').value,
        zyczenia: document.getElementById('message').value,
    };

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Sprawdzanie, czy pola są uzupełnione
    if (formData.email === "" || formData.autor === "" || formData.zyczenia === "") {
        document.getElementById('error_form').innerHTML = "Uzupełnij wszystkie wymagane dane!";
        return;
    }

    // Sprawdzanie poprawności adresu e-mail
    if (!emailRegex.test(formData.email)) {
        document.getElementById('error_form').innerHTML = "Podaj prawidłowy email!";
        return;
    }

    // Wysyłanie danych do serwera
    fetch('https://xzyczenia.ct8.pl/send_wish.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
    })
        .then((response) => response.json())
        .then((data) => {
            console.log("Dane zostały przesłane.", data);

            // Wyświetlenie życzeń po wysłaniu
            view_wish(data);
        })
        .catch((error) => {
            console.error('Błąd:', error);
            document.getElementById('error_form').innerHTML = "Wystąpił błąd podczas przesyłania danych. Spróbuj ponownie.";
        });
}

function view_wish(data) {
    // Ukrywanie sekcji z formularzem
    document.getElementById('orders_wish').style.display = 'none';

    // Wyświetlanie sekcji z podsumowaniem
    document.getElementById('view_wish').style.display = 'block';
    document.getElementById('title_vw').textContent = `Życzenie ID: ${data.id}`;
    document.getElementById('email_vw').textContent = `Zamówienie zostało wysłane na podany email: ${data.email}.`;
    document.getElementById('link_vw').innerHTML = `Link do życzenia: <a href="?id=${data.id}">Twoje życzenia</a>`;
    document.getElementById('content_vw').innerHTML = `
        *Administrator nie odpowiada za treści umieszczone w zamówieniu, KONTAKT: xcenqx.gmail.com<br>
        **Podane ID w tytule po wpisaniu na stronie głównej wyświetli dodane życzenia.
    `;
    document.title = `Animowana Kartka Świąteczna nr: ${data.id}`;
}
