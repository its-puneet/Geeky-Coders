



    // async function getActiveTabURL() {
    //     const tabs = await chrome.tabs.query({
    //         currentWindow: true,
    //         active: true
    //     });
      
    //     return tabs[0];
    // }
    // document.addEventListener("DOMContentLoaded", async () => {
    // const activeTab = await getActiveTabURL();
    
     
    // if (!activeTab.url.includes("leetcode.com/")) {
    //     const container = document.getElementById("container");
    
    //     container.innerHTML = '<div class="title">This is not a leetcode page.</div>';
    // }


    let quotes = {}
fetch("https://type.fit/api/quotes")
.then(function(response) {
return response.json();
})
.then(function(data) {
    var button = document.getElementById('bt11')
    button.addEventListener('click',() => {
            let ran = Math.floor(Math.random()*10000);
            ran = ran%1643;
            alert(data[ran].text);
        })
});
