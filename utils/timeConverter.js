// Datumobjekt für den 30. Dezember 2023 um 19:00 Uhr erstellen
var datum = new Date(2023, 11, 30, 20, 0, 0, 0); // Monate werden von 0 bis 11 gezählt, daher 11 für Dezember

// Zeitstempel extrahieren
var zeitstempel = datum.getTime();

console.log("Der Zeitstempel für den 30. Dezember 2023 um 20:00 Uhr ist: " + zeitstempel);
