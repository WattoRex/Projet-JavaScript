<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800;900&family=Roboto:wght@300;400;500;700;900&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="style.css">
    <title>Weather App API</title>
</head>

<body>
    <header>
        <section>
            <div class="waves">
                <div class="wave" id="wave1"></div>
                <div class="wave" id="wave2"></div>
                <div class="wave" id="wave3"></div>
                <div class="wave" id="wave4"></div>
            </div>
        </section>
    </header>


    <div class="container">
        <div class="search-box">
            <i class="fa-solid fa-location-dot"></i>
            <input type="text" placeholder="Entrer un code postal">
            <button class="fa-solid fa-magnifying-glass"></button>
        </div>

        <div class="not-found">
            <img src="images/404.png">
            <p>Localité Invalide !</p>
        </div>

        <div class="weather-box">
            <img src="">
            <p class="temperature"></p>
            <p class="description"></p>
        </div>

        <div class="weather-details">
            <div class="humidity">
                <i class="fa-solid fa-water"></i>
                <div class="text">
                    <span></span>
                    <p>Humidité</p>
                </div>
            </div>
            <div class="wind">
                <i class="fa-solid fa-wind"></i>
                <div class="text">
                    <span></span>
                    <p>Vitesse du vent</p>
                </div>
            </div>
        </div>

    </div>
    <footer>
        <section>
            <div class="waves">
                <div class="wave" id="wave1"></div>
                <div class="wave" id="wave2"></div>
                <div class="wave" id="wave3"></div>
                <div class="wave" id="wave4"></div>
            </div>
        </section>
    </footer>
    <script src="https://kit.fontawesome.com/7c8801c017.js" crossorigin="anonymous"></script>
    <script src="index.js"></script>
</body>

</html>