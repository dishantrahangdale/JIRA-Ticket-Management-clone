let add_btn = document.querySelector(".add_btn");
let modal_cont = document.querySelector(".modal_cont");
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