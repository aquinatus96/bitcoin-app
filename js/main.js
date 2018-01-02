/* Po załadowaniu strony pobierz aktualnie ceny bitcoin-pl */

$(function () {

    var buyPriceContainer = $('#buy-price');
    var sellPriceContainer = $('#sell-price');

    var buyPercent = $('#buy-percent');
    var sellPercent = $('#sell-percent');

    function getExchangeData() {

        var currentBuyPrice = parseFloat(buyPriceContainer.html());
        var currentSellPrice = parseFloat(sellPriceContainer.html());

        /* Połącz się z API i pobierz dane */

        $.getJSON('https://blockchain.info/pl/ticker', function (data) {


            var buyNewPrice = data.PLN.buy;
            var sellNewPrice = data.PLN.sell;

            buyPriceContainer.html(buyNewPrice);
            sellPriceContainer.html(sellNewPrice);

            buyPriceContainer.html(buyNewPrice);
            sellPriceContainer.html(sellNewPrice);

            var roundedPercentBuy = ((buyNewPrice - currentBuyPrice) / buyNewPrice * 100).toFixed(2) + '%';
            var roundedPercentSell = ((sellNewPrice - currentSellPrice) / sellNewPrice * 100).toFixed(2) + '%';

            console.log(roundedPercentBuy);
            console.log(roundedPercentSell);


            if (currentBuyPrice < parseFloat(buyNewPrice)) {

                buyPercent.removeClass().addClass('percent-item percent-up').html(roundedPercentBuy);

            } else if (currentBuyPrice > parseFloat(buyNewPrice)) {

                buyPercent.removeClass().addClass('percent-item percent-down').html(roundedPercentBuy);
            } else {

                buyPercent.removeClass().addClass('percent-item').html('=');

            }



            if (currentSellPrice < parseFloat(sellNewPrice)) {

                sellPercent.removeClass().addClass('percent-item percent-up').html(roundedPercentSell);

            } else if (currentSellPrice > parseFloat(sellNewPrice)) {

                sellPercent.removeClass().addClass('percent-item percent-down').html(roundedPercentSell);

            } else {

                sellPercent.removeClass().addClass('percent-item').html('=');

            }



            console.log(data.PLN.buy);
            console.log(data.PLN.sell);
            console.log('cyk cyk');

        });

    }

    getExchangeData();


    var interval;
    clearInterval(interval);
    interval = setInterval(getExchangeData, 1000);


    // Zmiana klas zmiana klas przycisków i ustawienie odświeżania co 1 sekundę

    $('#live-btn').click(function () {
        console.clear();

        clearInterval(interval);
        interval = setInterval(getExchangeData, 1000);

        $('#live-btn').addClass('live-active');
        $('#interval-btn').removeClass('interval-active').addClass('interval-disabled').html('5 sek');

    });


    // Zmiana klas przycisków, ponowne naciśnięcie zmienia interwał odświeżania


    $('#interval-btn').click(function () {
        console.clear();

        if ($('#live-btn').hasClass('live-active')) {

            $('#interval-btn').addClass('interval-active');
            $('#live-btn').removeClass('live-active').addClass('live-disabled');
            $('#interval-btn').html('5 sek');

            clearInterval(interval);
            interval = setInterval(getExchangeData, 1000 * 5);

        } else if ($('#interval-btn').html() === '5 sek') {

            $('#interval-btn').html('10 sek');

            clearInterval(interval);
            interval = setInterval(getExchangeData, 1000 * 10);

        } else if ($('#interval-btn').html() === '10 sek') {

            $('#interval-btn').html('30 sek');

            clearInterval(interval);
            interval = setInterval(getExchangeData, 1000 * 30);

        } else if ($('#interval-btn').html() === '30 sek') {

            $('#interval-btn').html('1 min');

            clearInterval(interval);
            interval = setInterval(getExchangeData, 1000 * 60);

        } else {

            $('#interval-btn').html('5 sek');

            console.clear();

            clearInterval(interval);
            interval = setInterval(getExchangeData, 1000 * 5);
        }

    });


    // Zegar na stronie

    function timer() {

        var timer = new Date();

        var day = timer.getDate();
        if (day < 10) day = '0' + day;
        var month = timer.getMonth() + 1;
        if (month < 10) month = '0' + month;
        var year = timer.getFullYear();

        var hours = timer.getHours();
        if (hours < 10) hours = '0' + hours;
        var minutes = timer.getMinutes();
        if (minutes < 10) minutes = '0' + minutes;
        var seconds = timer.getSeconds();
        if (seconds < 10) seconds = '0' + seconds;


        $('#timer').html(hours + ':' + minutes + ':' + seconds + ' / ' + day + '.' + month + '.' + year);
    }

    var timerInterval = setInterval(timer, 1000);
    timer();

});
