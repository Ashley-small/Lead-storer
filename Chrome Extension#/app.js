let myLeads = [];
const inputEl = document.getElementById("input-el")
const inputBTN = document.getElementById("input-btn");
const ulEL = document.getElementById("ul-el");
const deleteBtn =document.getElementById('delete-btn');
const leadsFromLocalStorage = JSON.parse(localStorage.getItem("myLeads"));
const tabBtn = document.getElementById('tab-btn');
if (leadsFromLocalStorage){
  myLeads = leadsFromLocalStorage
  render(myLeads)
};

deleteBtn.addEventListener("dblclick",function(){
localStorage.clear()
myLeads=[]
render(myLeads)
});

inputBTN.addEventListener("click",function(){
  let textValue =inputEl.value;
  myLeads.push(textValue);
  inputEl.value = ""

  localStorage.setItem("myLeads", JSON.stringify(myLeads));
  render(myLeads)

});

tabBtn.addEventListener("click", function(){
  chrome.tabs.query({active: true, currentWindow:true}, function(tabs){
    myLeads.push(tabs[0].url)
    localStorage.setItem("myLeads", JSON.stringify(myLeads))
    render(myLeads)
  })
})




function render(leads) {


let listItems= " ";

for (var i = 0; i < leads.length; i++) {
listItems +=`<li>
<a  target='blank'  href ='${leads[i]}'>
  ${leads[i]}
  </a>
</li>`


};
ulEL.innerHTML = listItems;
}
