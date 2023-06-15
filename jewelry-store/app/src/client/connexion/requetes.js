let connexion = () =>  {
	let formConnexion = new FormData(document.getElementById('formConnexion'));
    formConnexion.append("action","connexion");
	let donneesConnexion = formaterDonneesFormData(formConnexion); // Dans global.js
	fetch('/connexion', {
			method: "POST",
			body: donneesConnexion
		})
		.then(reponse => reponse.json())
		.then(reponseJSON => {
			if(reponseJSON.OK){
				if(reponseJSON.statut == "A"){
					switch(reponseJSON.role){
						case "A":
							window.location.href="client/admin/admin.html";
						break;
						case "M":
							window.location.href="client/membre/membre.html";
						break;
						default:
							window.location.href="index.html";
					}
				} else{
					messageToast("Contactez l'administrateur!");
				}
			} else {
				messageToast(reponseJSON.msg);
			}
		})
		.catch((error) => {
			messageToast("Problème pour se connecter, essayez plus tard. Merci.");
		});
}