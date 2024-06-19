import { Injectable } from '@angular/core';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

@Injectable({
  providedIn: 'root'
})
export class InvoiceService {
  constructor() {}

  generateInvoice(paymentDetails: any,nom: string, prix: number) {
    const doc = new jsPDF();

    // Adicionar título
    doc.setFontSize(18);
    doc.text('Facture de Paiement', 105, 15, { align: 'center' });

    // Adicionar detalhes do pagamento
    doc.setFontSize(12);
    doc.text(`Nom: ${nom}`, 10, 30);
    doc.text(`CIN: ${paymentDetails.cin_adherant}`, 10, 40);
    doc.text(`Date du Paiement: ${paymentDetails.date_payement}`, 10, 50);
    doc.text(`Total Reçu: ${paymentDetails.quant_recu} MAD`, 10, 60);
    doc.text(`Rendu: ${paymentDetails.rendu} MAD`, 10, 70);

    // Adicionar tabela para detalhes de pagamento (exemplo)
    const columns = ["Description", "Quantité", "Total"];
    const rows = [
      ["Abonnement", "1", `${prix} MAD`]
    ];

    // AutoTable configurações e inclusão
    autoTable(doc, {
      startY: 80,
      head: [columns],
      body: rows,
    });

    // Adicionar rodapé
    doc.setFontSize(10);
    doc.text('Merci pour votre paiement!', 105, doc.internal.pageSize.height - 10, { align: 'center' });

    // Salvar o PDF
    doc.save(`facture_${paymentDetails.cin_adherant}.pdf`);
  }
}
