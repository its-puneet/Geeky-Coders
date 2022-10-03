const purchasePrice = document.querySelector("#purchase-price");
const stockQty = document.querySelector("#stock-quantity");
const currPrice = document.querySelector("#current-price");
const checkBtn = document.querySelector("#check-btn");
const output = document.querySelector('#output');
const emotion = document.querySelector('.emotion')

function calculateProfitAndLoss(e) {
    e.preventDefault()
    let CP = purchasePrice.value;
    let Qty = stockQty.value;
    let SP = currPrice.value;
    if (!isNaN(CP) && !isNaN(Qty) && !isNaN(SP)) {
        CP = Number(CP);
        Qty = Number(Qty);
        SP = Number(SP);
        if (CP > 0 && Qty > 0 && SP > 0) {
            //loss
            if (CP > SP) {
                const loss = (CP - SP) * Qty;
                const lossPerc = ((CP - SP) * 100) / CP;
                output.style.display = 'block'
                output.innerHTML = `<div style = "border :2px solid #DC2626;width:97%; text-align: center; color:#DC2626; padding: 1rem .3rem;">
                Your loss is ${loss} and loss Percentage ${lossPerc}% 😢☹️😩</div>`;
            }
            //profit
            else if (SP > CP) {
                const profit = (SP - CP) * Qty;
                const profitPerc = ((SP - CP) * 100) / CP;
                output.style.display = 'block'
                output.innerHTML = `<div style = "border :2px solid #6D28D9; width:97%; text-align: center; padding: 1rem .3rem;"> Yay!! Your Profit is ${profit} and profit Percentage is ${profitPerc}%</div>`;

            } else {
                output.style.display = 'block'
                output.innerHTML = `<div style = "border :2px solid #6D28D9; width:97%; text-align: center; padding: 1rem .3rem;">No Pain No Gain :)</div>`;
            }
        } else {
            output.style.display = 'block'
            output.innerHTML = `<div style = "border :2px solid #6D28D9; width:97%; text-align: center; padding: 1rem .3rem;"> Please enter valid value </div>`;
        }
    } else {
        output.style.display = 'block'
        output.innerHTML =
            `<div style = "border :2px solid #6D28D9; width:97%; text-align: center; padding: 1rem .3rem;"> Please enter values greater than 0 only numbers are allowed in above fields </div>`;
    }
}

checkBtn.addEventListener("click", calculateProfitAndLoss);
