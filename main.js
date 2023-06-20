let title = document.getElementById("title");
let price = document.getElementById("price");
let taxes = document.getElementById("taxes");
let ads = document.getElementById("ads");
let discount = document.getElementById("discount");
let total = document.getElementById("total");
let count = document.getElementById("count");
let categry = document.getElementById("categry");
let create = document.getElementById("create");
let mood = "create";
let temp;

function gettotal() {
    if (price.value != "") {
        let result = +price.value + +taxes.value + +ads.value - +discount.value;
        total.innerHTML = result;
        total.style.background = "#040";
    } else {
        total.innerHTML = "";
        total.style.background = "#a00d02";
    }
}
let arr;
if (localStorage.products != null) {
    arr = JSON.parse(localStorage.products);
} else {
    arr = [];
}

create.onclick = function () //create items
{
    let ob = {
        title: title.value.toLowerCase(),
        price: price.value,
        taxes: taxes.value,
        ads: ads.value,
        discounts: discount.value,
        total: total.innerHTML,
        count: count.value,
        categry: categry.value.toLowerCase(),
    };
    showdata();
    if (title.value != "" && price.value != "" && categry.value != "") {
        if (mood === "create") {
            if (ob.count > 1) {
                for (var i = 0; i < ob.count; i++) {
                    arr.push(ob);
                }
            } else {
                arr.push(ob);
            }
        } else {
            arr[temp] = ob;
            mood = "create";
            create.innerHTML = "create";
            count.style.display = "block";
        }
    }
    // arr.push(ob);
    localStorage.setItem(" products", JSON.stringify(arr));

    showdata();
};

function clr() {
    title.value = "";
    price.value = "";
    taxes.value = "";
    ads.value = "";
    discount.value = "";
    total.innerHTML = "";
    count.value = "";
    categry.value = "";
}
function showdata() {
    let table = "";
    
    for (let i = 0; i < arr.length; i++) {
        table += `
        <tr>
        <td>${i + 1}</td>
        <td>${arr[i].title}</td>
        <td>${arr[i].price}</td>
        <td>${arr[i].taxes}</td>
        <td>${arr[i].ads}</td>
        <td>${arr[i].discounts}</td>
        <td>${arr[i].total}</td>
        <td>${arr[i].categry}</td>
        <td><button onclick="updatedata(${i})"  id="update">update</button></td>
        <td><button onclick="deleteitem(${i})" id="delete">delete</button></td>
    </tr>
        `;
    }
    document.getElementById("tbodey").innerHTML = table;
    let btndelete = document.getElementById("deleteall");
    if (arr.length > 0) {
        btndelete.innerHTML = `<button onclick="deleteall()">Delete ALL (${arr.length})</button>`;
    } else {
        btndelete.innerHTML = "";
    }
}
showdata();

function deleteitem(i) {
    arr.splice(i, 1);
    localStorage.products = JSON.stringify(arr);
    showdata();
}
function deleteall() {
    localStorage.clear();
    arr.splice(0);
    showdata();
}
function updatedata(i) {
    showdata();
    title.value = arr[i].title;
    price.value = arr[i].price;
    taxes.value = arr[i].taxes;
    ads.value = arr[i].ads;
    discount.value = arr[i].discount;
    gettotal();
    count.style.display = "none";
    categry.value = arr[i].categry;
    create.innerHTML = "UPDATE";
    mood = "update";
    temp = i;
    scroll({
        top: 0,
        behavior: "smooth",
    });
}

let searchmood = "title";

function getsearchmood(id) {
    let search = document.getElementById("search");
    if (id == "searchtitle") {
        searchmood = "title";
        search.placeholder = "search by title";
    } else {
        searchmood = "category";
        search.placeholder = "search by category";
    }
}
function searchdata(value) {
    let table = "";
    if (searchmood == "title") {
        let connter = arr.length;
        for (let i = 0; i < connter; i++) {
            if (arr[i].title.includes(value.toLowerCase())) {
                table += `
                <tr>
                <td>${i + 1}</td>
                <td>${arr[i].title}</td>
                <td>${arr[i].price}</td>
                <td>${arr[i].taxes}</td>
                <td>${arr[i].ads}</td>
                <td>${arr[i].discounts}</td>
                <td>${arr[i].total}</td>
                <td>${arr[i].categry}</td>
                <td><button onclick="updatedata(${i})"  id="update">update</button></td>
                <td><button onclick="deleteitem(${i})" id="delete">delete</button></td>
            </tr>
                `;
            }
        }
    } else {
        for (let i = 0; i < connter; i++) {
            if (arr[i].categry.includes(value)) {
                table += `
                <tr>
                <td>${i + 1}</td>
                <td>${arr[i].title}</td>
                <td>${arr[i].price}</td>
                <td>${arr[i].taxes}</td>
                <td>${arr[i].ads}</td>
                <td>${arr[i].discounts}</td>
                <td>${arr[i].total}</td>
                <td>${arr[i].categry}</td>
                <td><button onclick="updatedata(${i})"  id="update">update</button></td>
                <td><button onclick="deleteitem(${i})" id="delete">delete</button></td>
            </tr>
                `;
            }
        }
    }
    document.getElementById("tbodey").innerHTML = table;
}
