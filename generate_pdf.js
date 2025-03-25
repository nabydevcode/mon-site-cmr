
const puppeteer = require('puppeteer');

// L'ID d'expédition est fixé à 1
const shipmentId = "1";

// Vérifier que le chemin de sortie est fourni
if (process.argv.length < 3) {
    console.error("Usage: node generate_pdf.js <outputPath>");
    process.exit(1);
}

const outputPath = process.argv[2]; // Chemin du fichier PDF généré

(async () => {
    try {
        const browser = await puppeteer.launch(); // Lancer le navigateur sans interface
        const page = await browser.newPage();       // Ouvrir une nouvelle page

        // Charger la page de votre application Symfony à afficher
        // Remplacez 'localhost:8000' par l'URL appropriée en production
        await page.goto(`http://localhost:8000/shipment/print/${shipmentId}`, { waitUntil: 'networkidle0' });

        // Générer le PDF
        await page.pdf({
            path: outputPath,    // Enregistrer le PDF à l'emplacement spécifié
            format: 'A4',
            printBackground: true,
        });

        console.log(`PDF généré avec succès : ${outputPath}`);
        await browser.close(); // Fermer le navigateur
    } catch (error) {
        console.error("Erreur lors de la génération du PDF :", error);
        process.exit(1);
    }
})();


