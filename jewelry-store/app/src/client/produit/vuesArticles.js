const creeCardP = (unProduit)=>{
let pcard = `<div id="${unProduit.id}" class="col-md-3 col-sm-6 mb-3 style="background-color: black;">
<div class="item-product">
  <a href="#" class="product-thumb-link">
    <img src="../../serveur/pochettes/${unProduit.imageart}" class="img-fluid">
  </a>
</div>
<div class="product-info">
  <div class="d-flex justify-content-between py-3">
    <a href="#" class="cat-parent">${unProduit.description }/a>
    <a href="#" class="wishlist">
      <i class="fa fa-heart"></i>
    </a>
  </div>
  <h4 class="product-title">
    <a href="#">${unProduit.nomarticle}</a>
  </h4>
  <div class="product-price">
    <ins><span class="money text-white">$ ${unProduit.prix}</span></ins>
  </div>
  <div class="d-flex align-items-center justify-content-between py-1">
    <div class="rating">
      <i class="far fa-star"></i>
      <i class="far fa-star"></i>
      <i class="far fa-star"></i>
      <i class="far fa-star"></i>
      <i class="far fa-star"></i>
    </div>
    <div class="basket">
      <a href="#"><i class="fas fa-shopping-basket"></i></a>
    </div>
  </div>
</div>
</div>`;
return pcard;
};

const listerProduits1 = (listerProduits) => {
    let listProduits = `<div class="row">`;
    for (let produit of listerProduits) {
        listProduits += creeCardP(produit);
        }
        listProduits += `</div>`;
       document.getElementById('contenu1').innerHTML = listProduits;

};
