//selecting popup box,popup overlay button
var popupoverlay=document.querySelector(".popup-overlay")
var popupbox=document.querySelector(".popup-box")
var addpopupbutton=document.getElementById("add-pop-button")
 
addpopupbutton.addEventListener("click",function(){
    popupoverlay.style.display="block";
    popupbox.style.display="block";
})
//select cancel button
var cancelbook=document.getElementById("cancel-book")
cancelbook.addEventListener("click",function(event){
    event.preventDefault()
    popupoverlay.style.display="none";
    popupbox.style.display="none";

})
//select container,add-book,book-title,book-author,book-description
var container=document.querySelector(".container")
var addbook=document.getElementById("add-book")
var booktitle=document.getElementById("book-title-input")
var bookauthor=document.getElementById("book-author-input")
var bookdescription=document.getElementById("book-description-input")

addbook.addEventListener("click",function(event){
    event.preventDefault()
    var div=document.createElement("div")
    div.setAttribute("class","book-container")
    div.innerHTML=`<h2>${booktitle.value}</h2>
    <h2>${bookauthor.value}</h2>
    <p>${bookdescription.value}</p>
    <button onclick="deletebook(event)">Delete</button>`
    container.append(div)
    popupoverlay.style.display="none";
    popupbox.style.display="none";

})
function deletebook(event)
{
    event.target.parentElement.remove()
}