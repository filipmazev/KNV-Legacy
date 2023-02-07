function moveToSection(index){ if(document.documentElement.clientWidth >= maxWidth) { $(".main").moveTo(index); window.location.hash = "#" + index; } } 
function scrollToTop(){ window.scrollTo(0,0); }
function checkTag(){ if(window.location.hash === "#null"){ window.location.hash = "" } else return; }

var hasScrolled = 0; var maxWidth = 1450; 
if(document.documentElement.clientWidth < maxWidth) {  
var MobileLinks=document.querySelectorAll('[data-link]');
for (var index in MobileLinks){ if(MobileLinks.hasOwnProperty(index)){
MobileLinks[index].setAttribute("href", MobileLinks[index].getAttribute('data-link')) } }
document.getElementById("logo-link").setAttribute("onclick","scrollToTop()") }

setInterval(function() { 
if(document.documentElement.clientWidth >= maxWidth) {  
if(window.location.hash != "#1" && hasScrolled === 0 && window.location.hash != "" && window.location.hash != "#0"){ hasScrolled = 1;  
document.querySelector('.arrow').classList.add('hide-arrow'); 
document.querySelector('.arrow-text').classList.add('hide-arrow'); }
const remover = document.querySelectorAll('.reached'); 
remover.forEach(elem => { elem.classList.remove("reached"); });
const element = document.querySelector('[data-id="' + window.location.hash + '"]'); 
if(!element.classList.contains("reached")){ element.classList.toggle("reached"); } } }, 100); 

var ww = $(window).width();
var limit = maxWidth;

const form = document.getElementById('contact_form');
function saveForm(){ if (typeof(sessionStorage) !='undefined'){ Array.from(form.elements).forEach(element => { 
if(!element.classList.contains('contact_button')){ sessionStorage.setItem(element.getAttribute('data-type'), element.value);} });
if(document.getElementById("contact_form").classList.contains("form-submited")){ sessionStorage.setItem('form-submited', 'true'); } } }
function checkForm(){ if (typeof(sessionStorage) !='undefined'){ Array.from(form.elements).forEach(element => { 
if(!element.classList.contains('contact_button')){ element.value = sessionStorage.getItem(element.getAttribute('data-type')); } }); 
if(sessionStorage.getItem('form-submited') === 'true'){ sendEmail(); } sessionStorage.clear(); } }

function refresh() { saveForm(); 
ww = $(window).width(); var w = ww<limit ? (location.reload(true)) : ( ww>limit ? (location.reload(true)) : ww = limit ); } var tOut;
$(window).resize(function() {
    var resW = $(window).width(); clearTimeout(tOut);
    if ( (ww>limit && resW<limit) || (ww<limit && resW>limit) ) {      
    if (typeof(sessionStorage) !='undefined'){ sessionStorage.setItem('scrollPosition', window.location.hash.replace('#', '')); }
    tOut = setTimeout(refresh, 10); }
});

function scrollToPos(){ 
if (typeof(sessionStorage) !='undefined'){ if(document.documentElement.clientWidth < maxWidth){ 
var cnt = 0; $(document).ready(function () { $('section').each(function () { cnt++; var i = $(this).attr('id');
if(cnt == sessionStorage.getItem('scrollPosition')){ window.location.hash = i; return; } }); }); 
window.location.hash = "#" + sessionStorage.getItem('scrollPosition'); } } }

function regEx(str, stringBefore, stringAfter){ var regExp = new RegExp(`${stringBefore}(.*?)${stringAfter}`, "i");
var match = regExp.exec(str); match = match !== null ? (match[1] !== "" ? match[1] : match) : match;
if(match != null){ return match.toString(); } else { return null; } }
function regExCounter(str, stringBeforeStart, enumerator, stringBeforeEnd, stringAfter){ var count=0;
while(regEx(str, stringBeforeStart + (enumerator++) + stringBeforeEnd, stringAfter) != null){ ++count; } return (count <= 0 ? 0 : (count)); };

var cardOptionsArray = new Array(); var cardOptionsConfiguration = new Array(); var generatedDivsArray = new Array(); 
var cardOptionsExtrasConfig = new Array(); var cardOptionsExtras = new Array(); var CardsCount = 0;

function initCards(LngObject){ var str = JSON.stringify(LngObject);
CardsCount = regExCounter(str, '"Card-', 1, '', '-Title":"'); var CardBundleOptionCount = regExCounter(str, '"CardBundleOption', 0, '":"', '",');
cardOptionsExtrasConfig = LngObject.CardBundleOptionExtras.split(",");
for(var i=0; i<CardBundleOptionCount; i++){ var cardOption = regEx(str, '"CardBundleOption' + i + '":"', '",'); 
if(cardOption != null){ cardOptionsArray.push((cardOption)); } 
if(i+1 <= CardsCount){ var options = regEx(str, '"Card' + (i+1) + 'OptionsList":"', '",'); 
if(options != null){ cardOptionsConfiguration.push(options); } } } 

for(var i=0; i<CardsCount; i++){ var divCreator = ''; var cardOptionsConfigurationSplit = cardOptionsConfiguration[i].toString().split(","); 
for(var j=0; j<cardOptionsConfigurationSplit.length; j++){ var optionType = "bundle-option"; 
for(var k=0; k<cardOptionsExtrasConfig.length; k++){ if((cardOptionsConfigurationSplit[j] === cardOptionsExtrasConfig[k])){ optionType = "extra-option"; 
if((cardOptionsExtras.includes(cardOptionsArray[cardOptionsConfigurationSplit[j]]) === false)){ cardOptionsExtras.push(cardOptionsArray[cardOptionsConfigurationSplit[j]]); } break; } }
divCreator += '<div class="card-item ' + optionType + '"> <p> ' + cardOptionsArray[cardOptionsConfigurationSplit[j]] + ' </p> <div class="item-remove"> <hr> </div> </div>\n'; }
document.querySelector('.card' + (i+1) + ' .card-content-container .card-items').innerHTML = divCreator; generatedDivsArray.push(divCreator) } }

function createSwipe(){ 
var swiperContainer = document.querySelector(".mySwiper"); var swiperWrapper = document.querySelector(".cards-workings"); var swiperSlides = document.querySelectorAll(".card-workings");
if(document.documentElement.clientWidth < maxWidth) { if(swiperContainer !== null){ if(swiperContainer.querySelector(".swiper") === null){ swiperContainer.classList.add("swiper"); }; }
if(swiperWrapper !== null){ if(swiperWrapper.querySelector(".swiper-wrapper") === null){ swiperWrapper.classList.add("swiper-wrapper"); }; }
if(swiperSlides !== null){ swiperSlides.forEach(function swiperSlidesAdd(item){ if(item.querySelector(".swiper-slide") === null){ item.classList.add("swiper-slide"); } }); }
var swiper = new Swiper(".mySwiper", { effect: "cards", cardsEffect: { perSlideRotate: 2, slideShadows: false, perSlideOffset: 7 }, 
visibilityFullFit: false, autoResize: false, spaceBetween: 0, grabCursor: true, slidesPerView: 'auto',
pagination: { el: '.swiper-pagination', type: 'bullets', clickable: true }, lazyLoading: true, loop: false }); } 
else{ if(swiperContainer !== null){ if(swiperContainer.querySelector(".swiper") === null){ swiperContainer.classList.remove("swiper"); }; }
if(swiperWrapper !== null){ if(swiperWrapper.querySelector(".swiper-wrapper") === null){ swiperWrapper.classList.remove("swiper-wrapper"); }; }
if(swiperSlides !== null){ swiperSlides.forEach(function swiperSlidesAdd(item){ if(item.querySelector(".swiper-slide") === null){ item.classList.remove("swiper-slide"); } }); } } }

var MySecureToken; var ContactSendTo; var ContactDefaultSubject;
var ContactField1Placeholder; var ContactField2Placeholder; var ContactField3Placeholder; var ContactField4Placeholder;
var ContactButtonMessage1 = "SEND"; var ContactButtonMessage2 = "SENT"; var CardOrderMessage = "ORDER";
var ModalButtonMessage1 = "ORDER"; var ModalButtonMessage2 = "✓"; var ModalOrderMessageStart = "A client has requested the following services: ";

function InteractionTranslator(LngObject){ 
    MySecureToken = LngObject.SecureToken; ContactDefaultSubject = LngObject.ContactDefaultSubject; ContactSendTo = LngObject.ContactSendTo;
    ContactButtonMessage1 = LngObject.ContactButtonMessage1; ContactButtonMessage2 = LngObject.ContactButtonMessage2; CardOrderMessage = LngObject.CardOrderMessage;
    ModalButtonMessage1 = LngObject.ModalButtonMessage1; ModalButtonMessage2 = LngObject.ModalButtonMessage2; ModalOrderMessageStart = LngObject.ModalOrderMessageStart;

    document.getElementById('name').placeholder = LngObject.ContactField1Placeholder;
    document.getElementById('email').placeholder = LngObject.ContactField2Placeholder; 
    document.getElementById('subject').placeholder = LngObject.ContactField3Placeholder 
    document.getElementById('message').placeholder = LngObject.ContactField4Placeholder;
    document.getElementById('Footer2Link1').setAttribute("href", LngObject.FooterSegment2Link1Direct);
    document.getElementById('Footer3Link1').setAttribute("href", LngObject.FooterSegment3Link1Direct);
    document.getElementById('Footer3Link2').setAttribute("href", LngObject.FooterSegment3Link2Direct);
    document.getElementById('Footer3Link3').setAttribute("href", LngObject.FooterSegment3Link3Direct);
    document.getElementById('Footer4Link1').setAttribute("href", LngObject.FooterSegment4Link1Direct);
    document.getElementById('Footer4Link2').setAttribute("href", LngObject.FooterSegment4Link2Direct);
    document.getElementById('Footer4Link3').setAttribute("href", LngObject.FooterSegment4Link3Direct);
}