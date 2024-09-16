const cities = `48.30,32.16,Кропивницький,200000,
44.38,34.33,Алушта,31440,
49.46,30.17,Біла Церква,200131,
49.54,28.49,Бердичів,87575,#некоммент
50.45,30.52,Київ,2952301
49.99,36.23,Харків,1421125
46.48,30.72,Одеса,1010537
48.46,35.05,Дніпро,968502
48.02,37.80,Донецьк,901645
49.84,24.03,Львів,717273
47.84,35.14,Запоріжжя,710052
47.91,33.39,Кривий Ріг,603904
44.62,33.52,Севастополь,547820
46.98,31.99,Миколаїв,470011
47.10,37.54,Маріуполь,425681
48.57,39.31,Луганськ,397677
44.95,34.10,Сімферополь,340540
48.02,37.98,Макіївка,338968
51.51,31.29,Чернігів,282747
49.59,34.55,Полтава,279593
46.64,32.62,Херсон,279131
49.42,26.99,Хмельницький,274452
49.44,32.06,Черкаси,269836
48.29,25.94,Чернівці,264298
50.25,28.66,Житомир,261624
50.91,34.80,Суми,256474

#
46.49,36.58,#Бердянськ,121692,
49.15,28.41,Вінниця,356665,
#45.40,34.29,Джанкой,43343,

# в цьому файлі три рядки-коментаря :)`;

const processCities = (csv) => (str) => {
    const topCities = csv
        .split("\n")
        .filter((line) => line.trim() && !line.trim().startsWith("#"))
        .map((line) => {
            const [latitude, longitude, city, population] = line.split(",");
            return { city, population: Number(population) };
        })
        .sort((a, b) => b.population - a.population)
        .slice(0, 10)
        .reduce((acc, city, index) => {
            acc[city.city] = { population: city.population, rating: index + 1 };
            return acc;
        }, {});

    return str.replace(/\{([^}]+)}/g, (_, cityName) => {
        const city = topCities[cityName];
        return city
            ? `City: ${cityName}, Population: ${city.population}, Rating: ${city.rating}`
            : `{${cityName}}`;
    });
};

const replaceCityData = processCities(cities);
const result = replaceCityData(
    "The top cities are {Київ}, {Харків}, and {Одеса}."
);
console.log(result);