// Création des données qui correspondent aux champs à tester ( type, valeur )
// je les crée ici afin d'avoir une portée globale de ces datas dans mes fonctions
const champPrenom = document.getElementById("first-name");
const champNom = document.getElementById("last-name");
const champMessage = document.getElementById("message");
const champErreur = document.getElementById("error-message");
(!champPrenom)||(!champNom)||(!champMessage)||(!champErreur) ? console.log("manque au moins un champ de formulaire ou le message d'erreur") : ApplyTheFullFormFieldsManagement();

function ApplyTheFullFormFieldsManagement(){
  // Ajout de listener pour masquer le message d'erreur à la saisie 
  champPrenom.addEventListener("input", IsFormCompleteAndOk);
  champNom.addEventListener("input", IsFormCompleteAndOk);
  champMessage.addEventListener("input", IsFormCompleteAndOk);
}


function verifyChampDeFormulaireContent(inputDataContent){
  if (!inputDataContent){
    // Le champ n'est pas valide -- un champ vide retourne invalide
    return false;
  }
  // si on n'a pas renvoyé false..... on renvoit true....  
  // console.log("Le texte " + inputDataContent + " est OK");
  return (true);
}

function IsFormCompleteAndOk() {

  // Définition de la valeur retournée par la fonction
  // Initialisée à True, on va tout faire pour la passer à False avec tous les tests des datas
  let isEverythingOk=true;

  // Si le champ est présent dans le formulaire et qu'on a réussi à l'affecter à une data...
  // Alors on appellera la fonction qui va tester si le contenu de la data est OK, sinon inutile d'en faire plus...
  !champPrenom ? (console.log("Champ first-name manquant dans le formulaire"), isEverythingOk=false) : isEverythingOk=verifyChampDeFormulaireContent(champPrenom.value);

  // la même philosophie est appliquée pour les tests suivants  

  if (isEverythingOk==true)
  { // On continue les tests tant que tout est ok... sinon pas la peine d'en faire plus pour des questions d'optimisation 
    !champNom ? (console.log("Champ last-name manquant dans le formulaire"), isEverythingOk=false) : isEverythingOk=verifyChampDeFormulaireContent(champNom.value);
  }

  if (isEverythingOk==true)
  { // On continue les tests tant que tout est ok... sinon pas la peine d'en faire plus pour des questions d'optimisation 
      !champMessage ? (console.log("Champ message manquant dans le formulaire"), isEverythingOk=false) : isEverythingOk=verifyChampDeFormulaireContent(champMessage.value);
  }
  
  if (!isEverythingOk) console.log('Il reste un champ vide');

  return(isEverythingOk);

}

