🇩🇪🇵🇱 GerneLernen - ucz się jak lubisz 🇵🇱🇩🇪

Gerne-Lernen to aplikacja JS do nauki języka niemieckiego. Na stronie głównej znajduje się menu, w którym użytkownik może dostosować styl nauki do swoich indywidualnych potrzeb.

W pierwszym dziale znajduje się przycisk nauka oraz przycisk Pokaż Tłumacz. Po naciśnięciu przycisku Nauka jesteśmy przenoszeni do podstrony, w której wypisane są słówka z bazy danych (plik json), użytkownik może w tym miejscu uczyć się słów, a te, które już zna odznaczyć i tym samym sprawić, że będą skreślone. Poza tym, użytkownik może sortować wyświetlanie słów (A-Z po polsku, Z-A po polsku, A-Z po niemiecku oraz Z-A po niemiecku). Dodatkowo, by zapewnić pełną wygodę, użytkownik może znaleźć konkretne słowa poprzez wpisanie ich w wyszukiwarkę. Po naciśnięciu przycisku powrót wracamy do strony głównej.

Kolejny przycisk "Pokaż Tłumacza" wyświetla nam tłumacz diki, w który możemy wpisać dowolne, nurtujące nas słowo.

Główne menu służące do generowania testu językowego posiada następującą funkcjonalność: ilość słów w teście, kierunek tłumaczenia (czy wpisujemy słowa po polsku czy po niemiecku), możliwość pokazania odpowiedzi po wykonanym quizie - tłumaczenie słowa wyświetli się tuż pod słowem, możliwość wyświetlania czasu, by kontrolować ile zajmuje nam rozwiązywanie quizu oraz przycisk wylosuj słowa, do rozpoczęcia quizu.

Po rozpoczęciu quizu użytkownikowi wysuwa się lista słówek do tłumaczenia wraz z miejscem na wpisanie odpowiedzi. Po kliknięciu przicusku sprawdź odpowiedzi, znajdującego się na samym dole, poprawne odpowiedzi podświetlają się na zielono, a błędne na czerwono. Ponadto, na samym dole wyświetla się również procent poprawnych odpowiedzi. Jeśli użytkownik będzie chciał wyświetlić czas, to po sprawdzeniu odpowiedzi timer staje, a jeśli chciał wyświetlić odpowiedzi - te również się pojawią.

Kompilacja:

git clone https://github.com/szymonjozwiakzip/gerne-lernen

python3 -m http.server
