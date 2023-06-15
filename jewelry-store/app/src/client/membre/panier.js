const TAXES = 0.1556;
let panier = null;

if (localStorage.getItem("panier") == undefined) {
    localStorage.setItem("panier", '[]'); //panier vide
}
let nbart;
const afficherNombreArticlesPanier = () => {
    nbart = JSON.parse(localStorage.getItem("panier")).length;
    let afficherNbart = "(" + nbart + ")";
    $('#nbart').html(afficherNbart);
}

afficherNombreArticlesPanier();

let ajouterPanier = (idArticle) => {
    panier = JSON.parse(localStorage.getItem("panier"));
    let trouve = panier.find(ida => {
        return idArticle == ida;
    })
    if(trouve == undefined){
        panier.push(idArticle);
        localStorage.setItem("panier", JSON.stringify(panier));
        ++nbart;
        afficherNbart = "(" + nbart + ")";
        $('#nbart').html(afficherNbart); //document.getElementById('nbart').innerHTML = afficherNbart;
    }else {
        alert("Article existe déjà dans le panier");
    }
}

let enleverArticle = (btnClose, idArticleEnlever) => {
    let montantArticle;
    if(btnClose.parentNode.previousSibling.nodeType == 3){//Noeud bidon type #text:espace
        montantArticle = parseFloat(btnClose.parentNode.previousSibling.previousSibling.firstChild.nodeValue);
    }else {
        montantArticle = parseFloat(btnClose.parentNode.previousSibling.firstChild.nodeValue);
    }
    let ancienTotal = parseFloat(document.getElementById("totalAchat").innerText); 
    let nouveauTotal = ancienTotal - montantArticle; //Pour mettre à jour la facture
    
    //Enlever l'article du visuel du panier
    let articleEnleverVisuelPanier = btnClose.parentNode.parentNode;
    articleEnleverVisuelPanier.parentNode.remove(articleEnleverVisuelPanier);

    //Mise à jour du localStorage
    panier = JSON.parse(localStorage.getItem("panier"));
    let nouveauPanier = panier.filter(idArticlePanier => {
        return idArticlePanier != idArticleEnlever; 
    })
    if (nouveauPanier.length == panier.length) {
        alert("L'article " + idArticleEnlever + " n'existe pas");
    } else {
        localStorage.setItem("panier", JSON.stringify(nouveauPanier));
        --nbart;
        afficherNbart = "(" + nbart + ")";
        $('#nbart').html(afficherNbart);
        mettreAJourLaFacture(nouveauTotal);
    }
    //document.querySelector("#divRetirer").style.display = 'none';
}

let mettreAJourLaFacture = (nouveauTotal) => {
    document.getElementById("totalAchat").innerText = nouveauTotal.toFixed(2) + "$";
    let montantTaxes = nouveauTotal * TAXES;
    let totalPayer = nouveauTotal + montantTaxes;
    document.getElementById("idTaxes").innerText = montantTaxes.toFixed(2) + "$"; 
    document.getElementById("totalPayer").innerText = totalPayer.toFixed(2) + "$"; 
}

let ajusterTotalAchat = (elemInput, prix, montantActuel) => {
    let ancienMontant;
    let qte = elemInput.value; 
    montantTotalCetArticle = (qte * prix);
    if(elemInput.parentNode.nextSibling.nodeType == 3){//Node bidon ajouté au DOM
        ancienMontant = parseFloat(elemInput.parentNode.nextSibling.nextSibling.firstChild.nodeValue);
        elemInput.parentNode.nextSibling.nextSibling.firstChild.nodeValue = montantTotalCetArticle+"$";
    }else {
        ancienMontant = parseFloat(elemInput.parentNode.nextSibling.firstChild.nodeValue);
        elemInput.parentNode.nextSibling.firstChild.nodeValue = montantTotalCetArticle+"$";
    }
    //Mise-à-jour de la facture
    let ancienTotal = parseFloat(document.getElementById("totalAchat").innerText); 
    let nouveauTotal = (ancienTotal - ancienMontant)+montantTotalCetArticle; 
    mettreAJourLaFacture(nouveauTotal);
} 

let payer = () => {
    document.getElementById("payer").innerHTML = "Merci pour votre paiement.";
}

let afficherPanier = () => {
    let panier = JSON.parse(localStorage.getItem("panier"));
    let nbArt = panier.length;
    let vuePanier = `
        <div class="card">
            <div class="row">
                <div class="col-md-8">
                    <div class="title">
                        <div class="row">
                            <div class="col">
                                <h4 class='text-dark'><b>Panier d'achats</b></h4>
                            </div>
                            <div class="col align-self-center text-right text-muted">${nbArt} articles</div>
                        </div>
                    </div> 
        `;
    let listeArticlesAchetes = []; //  panier[2,5,8]
    let listeArticles = listeProduits;
    panier.forEach(idArticle => {
        listeArticlesAchetes.push(listeArticles.find(unArticle => unArticle.id == idArticle));
    });
    let totalAchat = 0;
    let montantTotalCetArticle;
    for (let unArticle of listeArticlesAchetes) {
        montantTotalCetArticle = parseFloat(unArticle.prix);
        vuePanier += ` 
            <div class="row border-top border-bottom">
                <div class="row align-items-center">
                    <div class="col-2"><img class="img-fluid" src="../../serveur/pochettes/${unArticle.imageart}"></div>
                    <div class="col">
                        <div class="row text-muted">${unArticle.nomarticle}</div>
                    </div>
                    <div class="col"> <input type="number" id="qte" name="qte" min="1" max="100" value=1 onChange="ajusterTotalAchat(this,${unArticle.prix}, ${montantTotalCetArticle});"></div>
                    <div class="col">${montantTotalCetArticle}$</div>
                    <div class="col"><div class="close closeBtn" onClick="enleverArticle(this,${unArticle.id});">&#10005;</div></div>
                </div>
            </div>
        
        `;
        totalAchat += montantTotalCetArticle;
    }
    
    let montantTaxes = totalAchat * TAXES;
    let totalPayer = totalAchat + montantTaxes;

    vuePanier += `
            </div>
                    <div class="col-md-4  text-dark">
                        <div>
                            <h5><b>Facture</b></h5>
                        </div>
                        <hr>
                        <br/>
                        <div class="row">
                            <div class="col" style="padding-left:10;">${nbArt} ARTICLES</div>
                            <div id="totalAchat" class="col text-right">${totalAchat.toFixed(2)}$</div>
                        </div>
                        <br/>
                        <div class="row">
                            <div class="col" style="padding-left:10;">MONTANT TAXES</div>
                            <div id="idTaxes" class="col text-right">${montantTaxes.toFixed(2)}$</div>
                        </div>
                        <br/>
                        <div class="row">
                            <div class="col" style="padding-left:10;">MONTANT À PAYER</div>
                            <div id="totalPayer" class="col text-right">${totalPayer.toFixed(2)}$</div>
                        </div> 
                        </br>
                        <button class="btn btn-dark" onclick="payer();">PAYER</button>
                        <span id="payer"></span>
                        <br/> 
                    </div>
                </div>
            </div>
        `;
    $('#contenuPanier').html(vuePanier);
    document.getElementById("payer").innerHTML = "";
    let modalPanier = new bootstrap.Modal(document.getElementById('idModPanier'), {});
    modalPanier.show();
}