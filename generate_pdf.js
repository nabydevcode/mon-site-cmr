const puppeteer = require('puppeteer');

// Récupération des arguments passés depuis Symfony
const shipmentId = process.argv[2]; // ID de l'expédition
const outputPath = process.argv[3]; // Chemin du fichier PDF généré


// Valider la présence des arguments
if (!shipmentId || !outputPath) {
    console.error('Erreur : L\'ID ou le chemin de sortie est manquant.');
    process.exit(1); // Arrêt en cas d'erreur
}

(async () => {
    const browser = await puppeteer.launch(); // Lancer un navigateur sans interface
    const page = await browser.newPage(); // Ouvrir une nouvelle page

    // Charger la page de votre application Symfony à afficher
    await page.goto(`http://localhost:8000/shipment/print/${shipmentId}`, { waitUntil: 'networkidle0' });

    // Générez le PDF
    await page.pdf({
        path: outputPath, // Enregistrer au chemin fourni
        format: 'A4',
        printBackground: true, // Inclure les arrière-plans dans le PDF
    });

    console.log(`PDF généré avec succès : ${outputPath}`);
    await browser.close(); // Fermer le navigateur
})();


