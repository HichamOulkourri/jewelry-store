const formaterDonneesFormData = (formData) => {
    const conteneur = new URLSearchParams();
    for (const paire of formData) {
        conteneur.append(paire[0], paire[1]);
    }
    return conteneur;
}

const afficherMessage = (msg, num) => {
    document.getElementById(`msg${num}`).innerHTML = msg;
    
    let st = setInterval(() => {
        document.getElementById(`msg${num}`).innerHTML = "";
        // Si num =
        // 1 => formulaire enregistrer membre
        // 2 => formulaire connexion
        // 3 => formulaire ajouter film
        switch(num){
            case 1: 
                document.getElementById('formEnreg').reset();
                $('#modalEnreg').modal('hide');
            break;
            case 2:
            break;
            case 3:
                document.getElementById('formAjouter').reset();
            break; 
            case 4:
                document.getElementById('formModifier').reset();
                $('#modalModifier').modal('hide');
            break;
        }
    }, 5000);
}

$(document).ready(function () {
    $("#dragindex").draggable(); 
    $("#dragadm").draggable();
    $("#modalEnreg").draggable();
});

// dragToast('drag'); 
// const dragToast = (idElem) => {
//     $(`#${idElem}`).draggable();
// }

// Gestion des Toasts
let messageToast = (msg) => {
    if (msg.length > 0) {
        let textToast = document.getElementById("textToast");
        let toastElList = [].slice.call(document.querySelectorAll('.toast'))
        let toastList = toastElList.map(function (toastEl) {
            return new bootstrap.Toast(toastEl)
        })
        textToast.innerHTML = msg;
        toastList[0].show();
    }
}