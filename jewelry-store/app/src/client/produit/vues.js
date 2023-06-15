
const creerCard = (Produit, from) => {
   let 
   rep = `
        <div id="${Produit.id}" class="card style-cards" style="width: 15rem; ; background-color: transparent;">
        <img src="../../serveur/pochettes/${Produit.imageart}" class="card-img-top" alt="...">
        <div class="card-body">
            <h5 class="fw-bolder text-muted">${Produit.nomarticle}</h5>
            <p class="text-muted">${Produit.description}</p>
            <p class="text-muted">Categorie : ${Produit.categorie}</p>
            <p class="text-muted"> Stock : ${Produit.qteinventaire}</p>
            <p class=" fw-bolder text-muted "> Prix : ${Produit.prix.toFixed(2)}$</p>`
        if(from == 1){
            rep += `<a href="#" onClick="ajouterPanier(${Produit.id});"><i class="bi bi-cart-plus panierPlus"></i></a>
            
            `;
        }
        rep += `
        </div>
        </div>
        `;
        return rep;
}

const listerProduits = (listeProduits, from) => {
    let contenu = `<div class='row'>`;
    for (let Produit of listeProduits) {
        contenu += creerCard(Produit, from);
    }
    contenu += `</div>`;
    document.getElementById('contenu').innerHTML = contenu;
}

const listerProduits1 = (listeProduits, from) => {
    let contenu = `<div class='row'>`;
    for (let Produit of listeProduits) {
        contenu += creerCard(Produit, from);
    }
    contenu += `</div>`;
    document.getElementById('contenu1').innerHTML = contenu;
}
const montrerFilmAdmin = (Produit) => {
    let rep = `
			<tr id="${Produit.id}">
				<td>
					<span class="custom-checkbox">
						<input type="checkbox" id="opt" value="${Produit.id}" name="options[]">
						<label for="opt"></label>
					</span>
				</td>	
				<td>${Produit.id}</td>
				<td><img class='img-fluid'  width='60' height='60' src='../../serveur/pochettes/${Produit.pochette}'></td>
				<td>${Produit.nomarticle}</td>
				<td>${Produit.description}</td>
				<td>${Produit.categorie}</td>
                <td>${Produit.qteinventaire}</td>
				<td>${Produit.seuil}</td>
                <td>${Produit.prix}</td>
				<td>
					<a href="#" onClick='editerProduit(`;
    rep += JSON.stringify(Produit);
    rep += `)' class="edit" data-bs-toggle="modal"><i class="bi bi-pencil" data-toggle="tooltip" title="Modifier"></i></a>
					<a href="#" onClick='supprimerProduit(${Produit.id})' class="delete" data-toggle="modal"><i class="bi bi-trash3" data-toggle="tooltip" title="Enlever"></i></a>
				</td>
			</tr>`;
    //alert(rep);
    document.getElementById('emp_body').innerHTML += rep;
}

var controleurViewproduits = (action, donnees, idmsg) => {
    switch (action) {
        case 'lister':
            listerProduits(donnees, idmsg);
            break;
    }
}

var controleurViewproduits1 = (action, donnees, idmsg) => {
    switch (action) {
        case 'lister':
            listerProduits1(donnees, idmsg);
            break;
    }
}

