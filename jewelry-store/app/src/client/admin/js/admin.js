let contenu;
let deconnecter = () => {
    document.getElementById('dc').submit();
}

function editerProduit(produit){
	document.getElementById('nomarticlea').value = produit.nomarticle;
	document.getElementById('descriptiona').value = produit.description;
	document.getElementById('categoriea').value = produit.categorie;
	document.getElementById('qteinventairea').value = produit.qteinventaire;
	document.getElementById('seuila').value = produit.seuil;
	document.getElementById('prixa').value = produit.prix;
	document.getElementById('anciennePochette').value = produit.imageart;
	document.getElementById('ida').value = produit.id;
	$('#modalModifier').modal('show');
}

let idArticleSupprimer;

function supprimerProduit(ida){
	idArticleSupprimer = ida;
	$('#supprimerArticleModal').modal('show');
}

function requettesupprimerProduit(){
	supprimer(idArticleSupprimer);
}

function enleverMultiplesArticles(){                  
	let listeCheckBoxes = document.getElementsByName("options[]");
	//Vérifier s'il y a au moins une option de cochée;
	let listeArticles="";
	for(let uneOption of  listeCheckBoxes){
		if (uneOption.checked){
			listeArticles+=(uneOption.value+";"); //9;13;50;
		}
	}
	if(listeArticles.length > 0){
		listeArticles=listeArticles.substring(0,listeArticles.length-1);//Enlever dernier ;
		document.getElementById("idaM").value = listeArticles;
		document.getElementById("formEnleverMultiples").submit();
	}
}

$(document).ready(function(){
	// Activate tooltip
	$('[data-toggle="tooltip"]').tooltip();
	
	// Select/Deselect checkboxes
	var checkbox = $('table tbody input[type="checkbox"]');
	$("#selectAll").click(function(){
		if(this.checked){
			checkbox.each(function(){
				this.checked = true;                        
			});
		} else{
			checkbox.each(function(){
				this.checked = false;                        
			});
		} 
	});
	checkbox.click(function(){
		if(!this.checked){
			$("#selectAll").prop("checked", false);
		}
	});
});



//pour le paginator


var $pagination,
totalRecords = 0,
records = [],
displayRecords = [],
recPerPage = 4,
page = 1,
totalPages = 0;

function genererPagination(listProduit){
	$pagination = $('#pagination');
	records = listProduit;
	//alert(JSON.stringify(records));
	// console.log(records);
	totalRecords = records.length;
	totalPages = Math.ceil(totalRecords / recPerPage);
	apply_pagination();
}

function apply_pagination() {
    $pagination.twbsPagination({
          totalPages: totalPages,
          visiblePages: 6,
          onPageClick: function (event, page) {
                displayRecordsIndex = Math.max(page - 1, 0) * recPerPage;
                endRec = (displayRecordsIndex) + recPerPage;
               
                displayRecords = records.slice(displayRecordsIndex, endRec);
                generate_table();
          }
    });
}
function generate_table() {
    let tr;
    $('#emp_body').html('');
	let rep="";
	
    for (let produit of displayRecords) { 
		rep+=`
			<tr id="${produit.id}">
					
				<td>${produit.id}</td>
				<td><img class='img-fluid'  width='60' height='60' src='../../serveur/pochettes/${produit.imageart}'></td>
				<td>${produit.nomarticle}</td>
				<td>${produit.description}</td>
				<td>${produit.categorie }</td>
				<td>${produit.qteinventaire}</td>
				<td>${produit.seuil}</td>
				<td>${produit.prix.toFixed(2)}$</td>
				<td>
					<a href="#" onClick='editerProduit(`;
				rep+=JSON.stringify(produit);
				rep+=`)' class="edit" data-bs-toggle="modal"><i class="bi bi-pencil" data-toggle="tooltip" title="Modifier"></i></a>
					<a href="#" onClick='supprimerProduit(${produit.id})' class="delete" data-toggle="modal"><i class="bi bi-trash3" data-toggle="tooltip" title="Enlever"></i></a>
				</td>
			</tr>`;
    }
	$('#emp_body').html(rep);
}	

