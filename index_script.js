let add_btn = document.querySelector(".add_btn");
let modal_cont = document.querySelector(".modal_cont");
let mainCont = document.querySelector("main_cont");
let addflag = false;

add_btn.addEventListener("click",(e)=>{
    // console.log("clicked");
    addflag = !addflag;
    if(addflag){
        modal_cont.style.display = "flex";
    }
    else{
        modal_cont.style.display = "none";
    }
})

modal_cont.addEventListener("keydown", (e) => {
    let key = e.key;
    if(key==="Shift"){
        createNewTicket();
        // modal_cont.style.display = "none";
        // modal_cont.innerText = "";
        // console.log("hi dishant");
    }
})

function createNewTicket(){
    let ticketcont = document.createElement("div");
    ticketcont.setAttribute("class","ticket_cont");
    ticketcont.innerHTML = `
        <div class="ticket_color"></div>
        <div class="ticket_id">sample</div>
        <div class="ticket_task">SFDFDD</div>
    `;
    // console.log(ticketcont);
    mainCont.appendChild(ticketcont);
    // ticketcont.async = false;
    // document.getElementById("main_cont").appendChild(ticketcont);
}