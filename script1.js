
document.addEventListener("DOMContentLoaded", () => {
  const blocs = document.querySelectorAll(".bloc");

  blocs.forEach(bloc => {
    const bouton = bloc.querySelector(".copierBtn");
    const texte = bloc.querySelector(".texteACopier").textContent; //recupere le texte
    const confirmation = bloc.querySelector(".confirmationMessage");

    bouton.addEventListener("click", () => {
      navigator.clipboard.writeText(texte)  //API de copie de texte + fonction pour ecrire dans le pp
        .then(() => { //message de validation (ou non)
          confirmation.textContent = "✅ Texte copié dans le presse-papier !";
          confirmation.style.color = "green";
        })
        .catch(err => {
          confirmation.textContent = "❌ Une erreur s'est produite lors de la copie.";
          confirmation.style.color = "red";
          console.error("Erreur de copie :", err);
        });
    });
  });
});

  