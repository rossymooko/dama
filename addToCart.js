var id = Math.random().toString(36).substring(7);
console.log("Order id: " + id);
var orderDocRef = db.collection("testOrder").doc(id);
var productsFirebase = [];
var quantity = 1;
// var totalPrice;
var pindex = 0;
// var total = 0;




function addToCart(index) {

    animation();
    var pd;
    var x = ["Lip1", "Lip2", "Brushes2", "Cheek1", "Eye4", "Brushes3", "Cheek2"
        , "Lip5", "Brushes1", "Eye1", "Eye2", "Brushes4", "Face4", "Cheek3"
        , "Face2", "Face3", "Lip3", "Cheek4", "Eye3", "Lip4", "Face1"];

    for (i = 0; i < 21; i++) {
        if (index == i) {
            pd = x[i];
        }
    }
    
    db.collection('product').doc(pd).get().then(function (doc) {
        //console.log("Document data:", doc.data());
        // const pdName = document.getElementById("pdName");
        // const pdPrice = document.getElementById("pdPrice");
        buyProduct(doc);
        

        function buyProduct(doc) {
            //name
            let lip1n = document.createElement("lip1n") //create node
            let name = document.createElement("span");

            lip1n.setAttribute('data-id', doc.id);
            name.textContent = doc.data().name; // ดึง data / name มาจาก firestore

            lip1n.appendChild(name); // append text node to element lip1n
            // pdName.appendChild(lip1n);

            //price
            let lip1p = document.createElement("lip1p")
            let price = document.createElement("span");

            lip1p.setAttribute('data-id', doc.id);
            price.textContent = doc.data().price;

            lip1p.appendChild(price);
            // pdPrice.appendChild(lip1p);
            
            
            if (productsFirebase[pindex]==null) { 
                var product = {
                    name: name.textContent, price: price.textContent,quantity: quantity
                }
                productsFirebase.push(product); 
                
            }   //++total
            // alert(price.textContent+pindex+":"+total+":"+productsFirebase); 
            /* var temp = price.textContent;
            pindex++; 
            var passPrice = Math.floor(temp)
            totalPrice+= 55  */
            

            orderDocRef.set({
                products: productsFirebase,
                // total_price: totalPrice
            })
            .then(function() {
                            console.log("Document successfully written!");
            })
            .catch(function(error) {
                console.error("Error writing document: ", error);
            });

            //-----------------addItem-------------------
            var imgSrc = document.getElementsByClassName("primary_image")[index].src
            var title = name.textContent;
            var cost = price.textContent;
            var eachtotal = price.textContent;
            add();

            function add() {
                var cartRow = document.createElement('div')
                cartRow.classList.add('cart-row')
                var cartItems = document.getElementsByClassName('cart-items')[0]
                var cartRowContents = `
                 <table class="table space-80">
                     <thead class="cart-row">
                        <tr>
                            <th class="product-photo">Product</th>
                            <th class="produc-name"></th>
                            <th class="product-price">Price</th>
                            <th class="product-quantity">Quantity</th>
                            <th class="total-price">Total</th>
                            <th class="product-remove"></th>
                        </tr>
                    </thead>
                    <tbody id="mybody">
                        <tr class="item_cart">
                            <td class="product-photo"><img src="${imgSrc}" alt="Futurelife"
                                    height="100" width="100"></td>
                            <td class="produc-name">${title}</td>
                            <td class="product-price">${cost}</td>
                            <td class="product-quantity"><input type="number" size="4" class="input-text qty text"
                                    title="SL" value="1" min="0" step="1"></td>
                            <td class="total-price">${eachtotal}</td>
                            <td id="pdTotal" class="product-price"></td>
                            <td class="product-remove"><a onclick="deleteItem('0')" class="remove" title=""></a></td>
                        </tr>  
                    </tbody>
                </table>`
                cartRow.innerHTML = cartRowContents
                cartItems.append(cartRow)
            }
            //-----------------addItem-------------------

            //----------------removeItem-----------------
            // function ready() {
            //     var removeCartItemButtons = document.getElementsByClassName('remove')
            //     for (var i = 0; i < removeCartItemButtons.length; i++) {
            //         var button = removeCartItemButtons[i]
            //         button.addEventListener('click', removeCartItem)
            //     }

            // function removeCartItem(event) {
            //     var buttonClicked = event.target
            //     buttonClicked.parentElement.parentElement.remove()
            // }
            //----------------removeItem-----------------


        } // End buyProduct()

    });
}

function deleteItem(index) {
    
    console.log(productsFirebase[index]) //  ดูว่า product ทั้งหมดมีไรบ้าง
    var product = productsFirebase[index] 
    var x = confirm("Are you sure you want to delete?"); 
    if (x) {
        var removeProduct = orderDocRef.update({
            products: firebase.firestore.FieldValue.arrayRemove(product) // ]ลบ product ออกใน firestore
        }); productsFirebase.splice(index,1); // ลบ product ออกใน array javascript ด้วย 
        console.log(productsFirebase); // ดูว่า product ลบออกไปยัง
        console.log("Document successfully deleted!");
        return true;
    }
    else return false;

}

function animation() {
    Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Added to shopping cart',
        showConfirmButton: false,
        timer: 2000
    })
}


/*function total(in){

    for (let index = 0; index < productsFirebase.length; index++) {
        // const element = array[index];
        productsFirebase[in].
        
    }
}*/
