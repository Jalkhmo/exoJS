document.addEventListener("DOMContentLoaded", () => {  
    const copierBtn = document.getElementById("copierBtn");
    const texteACopier = document.getElementById("texteACopier").textContent; //recupere le texte
    const confirmationMessage = document.getElementById("confirmationMessage");
  
    copierBtn.addEventListener("click", () => {
      navigator.clipboard.writeText(texteACopier) //API de copie de texte + fonction pour ecrire dans le pp
        .then(() => {   //message de validation (ou non)
          confirmationMessage.textContent = "✅ Texte copié dans le presse-papier !";
        })
        .catch(err => {
          confirmationMessage.textContent = "❌ Une erreur s'est produite lors de la copie.";
          console.error("Erreur de copie :", err);
        });
    });
  });
  