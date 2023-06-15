let listeProduits = null;

let ajouter = () =>  {
	
	let formProduit = new FormData(document.getElementById('formAjouter'));
    formProduit.append("action","ajouter");
	$.ajax({
		type: 'POST',
		url: '/produit',
		data: formProduit,
		dataType: 'json',
		contentType: false,
		processData: false,
		success: function (reponse) {
			$('#formAjouter')[0].reset(); 
			messageToast(reponse.msg);		
		},
		fail: () => {
			messageToast("Probléme pour enregistrer le produit");
		}
	});
}
	
let lister = (provenance) =>  {
	let formDataLister = new FormData();
    formDataLister.append("action","lister");
	let donneesLister= formaterDonneesFormData(formDataLister);// Dans global.js
	fetch('/produit', {
			method: "POST",
			body: donneesLister
		})
		.then(reponse => reponse.json())
		.then(reponseJSON => {
			if (reponseJSON.OK) {
				listeProduits = reponseJSON.listeProduits;
				if(provenance == "index"){
					//controleurViewproduits("lister", reponseJSON.listeProduits, 0);
					controleurViewproduits1("lister", reponseJSON.listeProduits, 0);/// Définie dans js/global.js. Le id où afficher et le message
				} else if (provenance == "membre") {
					//controleurViewproduits("lister", reponseJSON.listeProduits, 1);
					controleurViewproduits1("lister", reponseJSON.listeProduits, 1);
				}
				else if(provenance == "admin"){
					genererPagination(reponseJSON.listeProduits);
				}
			} else {
				messageToast(reponseJSON.msg);
			}
		})
		.catch((error) => {
			messageToast("Probléme pour lister les produits, essayez plus tard. Merci.");
		});
}

let supprimer = (id) => {
	let formDataSupprimer = new FormData();
	formDataSupprimer.append("action", "supprimer");
	formDataSupprimer.append("idProduit", id);
	let donneesSupprimer = formaterDonneesFormData(formDataSupprimer);// Dans global.js
	fetch('/produit', {
		method: "POST",
		body: donneesSupprimer
	})
	.then(reponse => reponse.json())
	.then(reponseJSON => {
		if (reponseJSON.OK) {
			document.getElementById(id).remove();
			window.location.href = "../admin/admin.html";
			//messageToast(reponseJSON.msg);
		}
	})
	.catch((error) => {
		messageToast("Probléme pour supprimer le produit, essayez plus tard. Merci.");
	});
}

let modifier = () => {
	let formProduit = new FormData(document.getElementById('formModifier'));
	formProduit.append("action", "modifier");
	$.ajax({
		type: 'POST',
		url: '/produit',
		data: formProduit,
		dataType: 'json',
		contentType: false,
		processData: false,
		success: function (reponse) { //alert(JSON.stringify(reponse));
			window.location.href = "../admin/admin.html";
			//messageToast(reponse.msg);
		},
		fail: () => {
			messageToast("Probléme pour modifier le produit");
		}
	});
}