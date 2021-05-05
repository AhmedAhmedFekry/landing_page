
//class section 
class Section {
    // make the last id of section by zero value when run project 
    last_id=0;

    // make the content html for every section created when click on the add button 
    get sectionConten(){
        return `
        <section id="section${this.last_id}" data-n="section ${this.last_id}" class="active-class">
        <div class="landing__container">
        <h2>Section ${this.last_id}</h2>
        <p>section............................................................................................</p>
        </div>
        </section>
        `
    };
    // this function for adding new section 
    new_section_added(){
        this.last_id +=1;
        document.getElementsByTagName('main')[0].insertAdjacentHTML('beforeend',this.sectionConten);
    }
}// end class 



// class for navbar 
class Navbar1 {
    // menu elment select by id 
    menu_ele = document.getElementById('navbar__list');

    // make the content html for menu__link created when click on the add button 
    create_menu(){
        this.menu_ele.innerHTML='';
        document.querySelectorAll('section').forEach(element =>{
            this.menu_ele.insertAdjacentHTML("beforeend",`<li> <a class="menu__link" href="#${element.id}" data-section-id="${element.id}" >${element.dataset.n}</a></li>`);
            
        });
        this.scroll_to_section();
    }

  
    // funtion to scroll into the section when menu link in the navbar for this section 
    scroll_to_section(){
        this.menu_ele.addEventListener('click',function(event){
            event.preventDefault();
            // scroll into section smooth 
            const id = event.target.dataset.sectionId
            document.getElementById(id).scrollIntoView({block: 'end',behavior:'smooth'});
            // add active class to target section
            activeClass(id);
        });
    }
}
const menu = new Navbar1()
const ele_top = document.getElementById('scrollToTop');
const section = new Section();



function new_section_added(){
    section.new_section_added();
    menu.create_menu();
}

// function to scroll to top when click on the button up

function scrollToTop(){
    ele_top.addEventListener('click', ()=>{
        window.scrollTo({
            top:0
        })
    });
}

// this function check which section show  on screen 
//  section_on_screen
function section_on_screen(ele,buf){
    buf = typeof buf ==='undefined' ? 0 : buf;
    const b=ele.getBoundingClientRect();
    if (b.top >= buf && b.left >= buf &&  b.right <= 
        ((window.innerWidth || document.documentElement.clientWidth) -buf) &&
        b.bottom <= ((window.innerHeight || document.documentElement.clientHeight) -buf ) ){
            return true
        } else{
            return false
        }       
}
// this function for add active class 
function activeClass(id){
    document.querySelector('.active-class')?.classList.remove('active-class');
    document.querySelector(`#${id}`).classList.add('active-class');
    document.querySelector('.linkActive')?.classList.remove('linkActive');
    document.querySelector(`[href="#${id}"]`).classList.add('linkActive');
 

}


///  add even when the user scroll 
window.addEventListener('scroll',()=>{
    let scrollPrecent= ((window.innerHeight + window.scrollY)/document.body.offsetHeight)*100;

    if (scrollPrecent > 50 ){
        // show scroll top button if the scrollPrecent > 50
        ele_top.classList.remove('noDisplay');
    }
    else {
           // hide scroll top button if the scrollPrecent =< 50 
        ele_top.classList.add('noDisplay');
    }
    document.querySelectorAll('section').forEach(element =>{
        if(section_on_screen(element,-200)){
           
            activeClass(element.id)
        }
    });
});





// calling this funtion to bluid five  new section 
section.new_section_added();
section.new_section_added();
section.new_section_added();
section.new_section_added();
menu.create_menu()
scrollToTop();