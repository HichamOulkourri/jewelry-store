let enregistrer = () =>  {
	let formMembres = new FormData(document.getElementById('formEnreg'));
    formMembres.append("action","enregistrer");
	let donneesMembre = formaterDonneesFormData(formMembres);// Dans global.js
	fetch('/membre', {
			method: "POST",
			body: donneesMembre
		})
		.then(reponse => reponse.json())
		.then(reponseJSON => {
			messageToast(reponseJSON.msg);
		})
		.catch((error) => {
			messageToast("Probléme pour enregistrer membre, essayez plus tard.Merci.");
		});
}