// Affectation de l'objet Button sur une data
const theButton = document.querySelector("button");
// Si le bouton a été trouvé on applique les transformations comportementales
!theButton ? console.log("Bouton de formulaire non trouvé") : transformTheFormButtonManagement();

// Création des données qui correspondent aux champs à tester ( type, valeur )
// je les crée ici afin d'avoir une portée globale de ces datas dans mes fonctions
const champPrenom = document.getElementById("first-name");
const champNom = document.getElementById("last-name");
const champMessage = document.getElementById("message");
const champErreur = document.getElementById("error-message");
(!champPrenom)||(!champNom)||(!champMessage)||(!champErreur) ? console.log("manque au moins un champ de formulaire ou le message d'erreur") : ApplyTheFullFormFieldsManagement();

// Je vais déclarer le template du HTML à insérer, sinon comment savoir quoi mettre sur le premier commenntaire ????
const whatToInsertWhenOK = "\n<div class=\"flex space-x-4 text-sm text-gray-500\">\n<div class=\"flex-1 py-10 border-t border-gray-200\">\n  <h3 class=\"font-medium text-gray-900\">[firstNameToPut] [lastNameToPut]</h3>\n  <div class=\"prose prose-sm mt-4 max-w-none text-gray-500\">\n    <p>[commentToPut]</p>\n  </div>\n</div>\n</div>\n";

function transformTheFormButtonManagement(){
    // suppression du submit du formulaire
    theButton.type = "button";
    // affectation de la fonction à réaliser en cas d'appui sur le bouton
    theButton.addEventListener("click", PerformActionsOnButtonPress);
}

function ApplyTheFullFormFieldsManagement(){
  // Ajout de listener pour masquer le message d'erreur à la saisie 
  champPrenom.addEventListener("input", hideErrorMessage);
  champNom.addEventListener("input", hideErrorMessage);
  champMessage.addEventListener("input", hideErrorMessage);
}

function hideErrorMessage(){
  if (!champErreur.style=="") champErreur.style="display: none;";
}

function ShowErrorMessage(){
  if (champErreur.style) champErreur.style="";
}



function InsertTheCommentInTheCurrentPage(){
    // -----------------------------------------------------------------------------
    // modif de InnerHtml à implémenter
    // -----------------------------------------------------------------------------
    // Premiere méthode
    // -----------------------------------------------------------------------------
    // Je récup le template et l'affecte à une variable locale que je vais travailler
    let myLocalMessage1 = whatToInsertWhenOK;
    // Je peux bosser, car toutes les vérifs ont été faites avant
    myLocalMessage1 = myLocalMessage1.replace("[firstNameToPut]", champPrenom.value);
    myLocalMessage1 = myLocalMessage1.replace("[lastNameToPut]", champNom.value);
    myLocalMessage1 = myLocalMessage1.replace("[commentToPut]", champMessage.value);
    // console.log(myLOcalMessage1);

    // -----------------------------------------------------------------------------
    // Seconde méthode, peut-être plus "élégante"
    // -----------------------------------------------------------------------------
    var blocElement = document.createElement('div');
    blocElement.setAttribute('class', 'flex space-x-4 text-sm text-gray-500');

    var blocElement2 = document.createElement('div');
    blocElement2.setAttribute('class', 'flex-1 py-10 border-t border-gray-200');

    var blocElement3 = document.createElement('h3');
    blocElement3.setAttribute('class', 'font-medium text-gray-900');
    //blocElement3.setAttribute('value', champPrenom.value + ' '+ champNom.value);
    blocElement3.innerText = champPrenom.value + ' '+ champNom.value;

    var blocElement4 = document.createElement('div');
    blocElement4.setAttribute('class', 'prose prose-sm mt-4 max-w-none text-gray-500');

    var blocElement5 = document.createElement('p');
    //blocElement5.setAttribute('value', champMessage.value);
    blocElement5.innerText = champMessage.value;

    // concaténation des blocs
    blocElement4.appendChild(blocElement5);
    blocElement3.appendChild(blocElement4);
    blocElement2.appendChild(blocElement3);
    blocElement.appendChild(blocElement2);

    var maZoneDeCommentaires = document.getElementById("comment-list");
    // premiere solution
    // maZoneDeCommentaires.innerHTML += myLocalMessage1;
    maZoneDeCommentaires.appendChild(blocElement);
    // seconde solution
}

function SendFormDataToTheServer(){
    // Post ajax à implémenter
}

function EraseFormFieldsContent(){
  champPrenom.value = "";
  champNom.value = "";
  champMessage.value = "";  
}

function PerformActionsOnButtonPress()
{
    if (IsFormCompleteAndOk()){
        InsertTheCommentInTheCurrentPage();
        SendFormDataToTheServer();
        EraseFormFieldsContent();
    }
}

function verifyChampDeFormulaireContent(inputDataContent){
  if (!inputDataContent){
    console.log("Le texte " + inputDataContent + " est vide");
    // affichage du message d'erreur
    ShowErrorMessage();
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

  return(isEverythingOk);

}

