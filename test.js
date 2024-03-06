function getCurrentTime() {
    const now = new Date(); // Crée un nouvel objet Date représentant l'instant actuel

    const hours = now.getHours(); // Obtient l'heure actuelle (0-23)
    const minutes = now.getMinutes(); // Obtient les minutes actuelles (0-59)
    const seconds = now.getSeconds(); // Obtient les secondes actuelles (0-59)

    // Formate les heures, les minutes et les secondes pour qu'ils aient toujours deux chiffres
    const formattedHours = String(hours).padStart(2, '0');
    const formattedMinutes = String(minutes).padStart(2, '0');
    const formattedSeconds = String(seconds).padStart(2, '0');

    // Crée une chaîne de caractères représentant l'heure actuelle au format HH:MM:SS
    const currentTime = `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;

    return currentTime;
}

console.log(getCurrentTime());