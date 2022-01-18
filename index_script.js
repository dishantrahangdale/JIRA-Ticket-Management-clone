let add_btn = document.querySelector(".add_btn");
let remove_btn = document.querySelector(".remove_btn");
let modal_cont = document.querySelector(".modal_cont");
let mainCont = document.querySelector(".main_cont");
let text_area = document.querySelector(".text_area");
let lock_btn = document.querySelector(".ticket_lock")
let colors  = ["cl1","cl2","cl3","cl4"]
let modal_priority = colors[colors.length-1];
let toolBoxColors = document.querySelectorAll(".color");
let allPriorityColors = document.querySelectorAll(".pri_col");
let addflag = false;
let delflag = false;
let lockclass = "fa-lock";
let unlockclass = "fa-unlock";
let ticket_arr = []

if(localStorage.getItem("jira_tickets")){
    ticket_arr = JSON.parse(localStorage.getItem("jira_tickets"));
    ticket_arr.forEach((ticketObj)=>{
        createNewTicket(ticketObj.t_color,ticketObj.t_data,ticketObj.t_id)
    })
}

for(let i=0; i<4; i++){
    toolBoxColors[i].addEventListener("click",(e)=>{
        let currentToolBoxColor = toolBoxColors[i].classList[0];
        
        let filteredTickets = ticket_arr.filter((ticketObj, idx)=>{
            return currentToolBoxColor===ticketObj.t_color;
        })

        let allTicketsCont = document.querySelectorAll(".ticket_cont");
        for(let i = 0; i<allTicketsCont.length; i++){
            allTicketsCont[i].remove();
        }
        filteredTickets.forEach((ticketObj2,idx2)=>{
            createNewTicket(ticketObj2.t_color,ticketObj2.t_data,ticketObj2.t_id);
        })
    })

    toolBoxColors[i].addEventListener("dblclick", (e) => {
        let allTicketsCont = document.querySelectorAll(".ticket_cont");
        for(let i = 0; i<allTicketsCont.length; i++){
            allTicketsCont[i].remove();
        }
        ticket_arr.forEach((ticketObj,idx)=>{
            createNewTicket(ticketObj.t_color, ticketObj.t_data, ticketObj.t_id);
        })
    })
}


// priority coloring
allPriorityColors.forEach((elem,idx)=>{
    elem.addEventListener("click",(e)=>{
        allPriorityColors.forEach((elem2,idx)=>{
            elem2.classList.remove("border");
        })
        elem.classList.add("border");
        modal_priority = elem.classList[0];
    })
})

remove_btn.addEventListener("click",(e)=>{
    delflag = !delflag;
})




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
        createNewTicket(modal_priority,text_area.value);
        addflag = false;
        setModalToDefault();        
    }
})

function createNewTicket(t_color,t_data,t_id){
    let id = t_id || shortid();
    let ticketcont = document.createElement("div");
    ticketcont.setAttribute("class","ticket_cont");
    
    // let t_col = document.createElement("div")
    // t_col.setAttribute("class","ticket_color");
    // let t_id = document.createElement("div")
    // t_id.setAttribute("class","ticket_id");
    // let t_task = document.createElement("div")
    // t_task.setAttribute("class","ticket_task");
    // t_task.innerText = data;
    // ticketcont.appendChild(t_col);
    // ticketcont.appendChild(t_id);
    // ticketcont.appendChild(t_task);

    ticketcont.innerHTML = `
        <div class="ticket_color ${t_color}"></div>
        <div class="ticket_id">#${id}</div>
        <div class="ticket_task">${t_data}</div>
        <div class="ticket_lock"> <i class="fas fa-lock"></i> </div>
    `;

    mainCont.appendChild(ticketcont);

    if(!t_id) { 
        ticket_arr.push({t_color,t_data,t_id:id});
        localStorage.setItem("jira_tickets",JSON.stringify(ticket_arr))
    }

    handle_Remove(ticketcont,id);
    handle_lock(ticketcont,id);
    handle_color(ticketcont,id);
}

function handle_Remove(ticket,id){
    ticket.addEventListener("click",(e)=>{
        if(!delflag)    return;
        let idx = getTicketIdx(id);
        ticket_arr.splice(idx,1);
        // localStorage.setItem("jira_tickets",JSON.stringify(ticket_arr))
        localStorage.setItem("jira_tickets",JSON.stringify(ticket_arr));
        // let strTicketArr = ;
        ticket.remove(); 
    })
    // if(delflag){
    //      ticket.remove();
    // }
 }

 function handle_lock(ticket,id){
    let ticLockElem = ticket.querySelector(".ticket_lock");
    let lock = ticLockElem.children[0];
    let ticTaskArea = ticket.querySelector(".ticket_task");
    lock.addEventListener("click",(e)=>{
        let ticketIdx = getTicketIdx(id)
        if(lock.classList.contains(lockclass)){
            lock.classList.remove(lockclass);
            lock.classList.add(unlockclass);
            ticTaskArea.setAttribute("contenteditable","true");
        }
        else{
            lock.classList.remove(unlockclass);
            lock.classList.add(lockclass);
            ticTaskArea.setAttribute("contenteditable","false")
        }

        // local storage update
        ticket_arr[ticketIdx].t_data = ticTaskArea.innerText;   //doubt
        localStorage.setItem("jira_tickets",JSON.stringify(ticket_arr));
    })
}


function getTicketIdx(id){
    let ticketIdx = ticket_arr.findIndex((ticketObj)=>{
        return ticketObj.t_id===id;  //doubt
    })
    return ticketIdx;
}

function handle_color(ticket,id){

    let ticColor = ticket.querySelector(".ticket_color");
        ticColor.addEventListener("click",(e)=>{
            let ticketIdx = getTicketIdx(id);
            let curr_color = ticColor.classList[1];
            let curr_index = colors.findIndex((color)=>{
            return curr_color===color;
        })
        let new_index = (curr_index+1)%4;
        let new_color = colors[new_index];
        ticColor.classList.remove(curr_color);
        ticColor.classList.add(new_color);

        // change data in local storage
        ticket_arr[ticketIdx].t_color = new_color;  //doubt
        // localStorage.setItem("jira_tickets",JSON.stringify(ticket_arr));
        localStorage.setItem("jira_tickets",JSON.stringify(ticket_arr))
    })
    
}

function setModalToDefault(){
    modal_cont.style.display = "none";
    text_area.value = "";
    modal_priority = colors[colors.length-1]; 
    allPriorityColors.forEach((elem2,idx)=>{
        elem2.classList.remove("border");
    })
    allPriorityColors[allPriorityColors.length-1].classList.add("border");
}