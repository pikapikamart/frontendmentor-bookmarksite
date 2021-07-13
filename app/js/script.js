import {element, elements} from "./utility.js";


// Mobile Navigations
const body = element("body");
const header = element(".header");
const navbar =  element(".navbar");
const navbarDropdownButton = element(".js-navbar-trigger");
const navbarOverlay = element(".navbar__overlay");
const navbarLastElement = element(".js-navbar-last");

const setTrapFocus = (event, firstElement, lastElement) =>{
    if (document.activeElement == firstElement) {
        if (event.shiftKey && event.key == "Tab") {
            event.preventDefault();
            lastElement.focus();
        }
    }
    else if (document.activeElement == lastElement) {
        if (!event.shiftKey && event.key == "Tab") {
            event.preventDefault();
            firstElement.focus();
        }
    }
}

const checkTabKeys = event =>{
    setTrapFocus(event, navbarDropdownButton, navbarLastElement);
}

const rippleEffect = () =>{
    const diameter = Math.max(navbarOverlay.clientWidth, navbarOverlay.clientHeight);
    const radius = diameter / 2;
    const navbarRipple = document.createElement("div");
    navbarRipple.style.width = navbarRipple.style.height = `${diameter}px`;
    navbarRipple.style.left = `${navbarDropdownButton.offsetLeft+16 - radius}px`;
    navbarRipple.style.top = `${navbarDropdownButton.offsetTop+10 - radius}px`;

    const endAndResetRipple = ()=>{
        navbarOverlay.classList.toggle("takeover");
        navbarRipple.remove();
        navbarDropdownButton.addEventListener("click", rippleEffect);
    }

    if (header.classList.contains("mobile")) {
        navbarRipple.className = "navbar__ripple navbar__ripple--white";
        navbarDropdownButton.setAttribute("aria-expanded", "false");
        navbar.classList.add("transitioning");
        navbarOverlay.appendChild(navbarRipple);
        navbar.removeEventListener("keydown", checkTabKeys);

        setTimeout(() =>{
            endAndResetRipple();
            navbar.className = "navbar";
        }, 1800);

    } else{
        navbarRipple.className = "navbar__ripple navbar__ripple--dark";
        navbarDropdownButton.setAttribute("aria-expanded", "true");
        navbar.classList.add("mobile");
        navbarOverlay.appendChild(navbarRipple);
        navbar.addEventListener("keydown", checkTabKeys);

        navbarRipple.addEventListener("transitionend", ()=>{
            endAndResetRipple();
        });
    }

    body.classList.toggle("no-scroll");
    header.classList.toggle("mobile");
    setTimeout(()=> navbarRipple.classList.add("animate"), 1)
    navbarDropdownButton.removeEventListener("click", rippleEffect);
}

navbarDropdownButton.addEventListener("click", rippleEffect);

// Features
const features = [
    {
        imagePath: "images/illustration-features-tab-1.svg",
        heading: "Bookmark in one click",
        text: "Organize your bookmarks however you like. Our simple drag-and-drop interface gives you complete control over how you manage your favourite sites."
    },
    {
        imagePath: "images/illustration-features-tab-2.svg",
        heading: "Intelligent search",
        text: "Our powerful search feature will help you find saved sites in no time at all. No need to trawl through all of your bookmarks."
    },{
        imagePath: "images/illustration-features-tab-3.svg",
        heading: "Share your bookmarks",
        text: "Easily share your bookmarks and collections with others. Create a shareable link that you can send at the click of a button."
    },
];

const featureTablist = element(".tabs__selections");
const featureTabs = elements(".tabs__choice");
const featureHolder = element(".tabs__contents");

const featureImageNode = element(".js-feature-image");
const featureHeadingNode = element(".js-feature-heading");
const featureTextNode = element(".js-feature-text");
let featureTabIndex = 0;

const changeTab = event =>{
    
    if (event.keyCode == 37 || event.keyCode == 39) {
        if (event.keyCode == 37) {
            featureTabIndex--;
            featureTabIndex = featureTabIndex < 0? 2 : featureTabIndex;
        } else if (event.keyCode == 39) {
            featureTabIndex++;
            featureTabIndex = featureTabIndex > 2? 0: featureTabIndex;
        }
    }
    featureTabs[featureTabIndex].focus();
}
// for using arrow to change tabs
featureTablist.addEventListener("keydown", changeTab);

const changeFeaturedFeature = target =>{
    const index = target.dataset.index;
    featureHolder.setAttribute("aria-labelledby", target.id);
    featureImageNode.setAttribute("src", features[index].imagePath);
    featureHeadingNode.textContent = features[index].heading;
    featureTextNode.textContent = features[index].text;
}

const changeFeature = (event) =>{

    if (event.target.getAttribute("aria-selected") == "true") {
        return;
    }

    featureTabs.forEach(tab => tab.setAttribute("aria-selected", "false"));
   
    event.target.setAttribute("aria-selected", "true");
    featureHolder.classList.add("hide");

    setTimeout(() =>{
        changeFeaturedFeature(event.target);
        featureHolder.classList.remove("hide");
    }, 500)
}

featureTabs.forEach(tab =>{
    tab.addEventListener("click", changeFeature);
})


// Form checking
const emailForm = element(".cta__form");
const emailAriaLive = element(".cta-aria-live");
const emailToast = element(".toast");

const testEmail = email=>{
    let re = /^([a-z\d\.-]+)@([a-z\d-]+)\.([a-z]{2,8})(\.[a-z]{2,8})?$/;
    return re.test(email);
}

emailForm.addEventListener("submit", event =>{
    event.preventDefault();
    if (!testEmail(event.target.email.value)) {
        event.target.email.setAttribute("aria-invalid", "true");
        emailAriaLive.textContent = "email invalid, please check entered email";
    } else {
        event.target.email.setAttribute("aria-invalid", "false");
        emailAriaLive.textContent = "successfully submitted email, thank you";
        emailToast.classList.add("show");
        setTimeout(()=>{
            emailToast.classList.remove("show");
        }, 5000);
    }
})