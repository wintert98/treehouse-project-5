const randomUser = 'https://randomuser.me/api/?results=12'
const gallery = document.getElementById('gallery');
const cards = document.getElementsByClassName('card');
let people = []


//function to handle all fetch requests
async function getRandomProfile(url) {
  try{
      const profiles = await fetch(url);
      const profilesJSON = await profiles.json();
      const profileResults = profilesJSON.results
      people.push(profileResults);
      galleryHTML(profileResults)
      cardListener()
  } catch (err) {
    console.log(err)
  }
         
  }
 

// Generate the markup for each gallery card profile and inserts onto the Dom
function galleryHTML(data) {
  let galleryHtml = ''
    for(let i = 0; i < data.length; i++) {
       galleryHtml += `
        <div class="card" "child${i}">
          <div class="card-img-container">
            <img class="card-img" src=${data[i].picture.large} alt="profile picture">
          </div>

            <div class="card-info-container">
            <h3 id="name" class="card-name cap">${data[i].name.first} ${data[i].name.last}</h3>
            <p class="card-text">${data[i].email}</p>
            <p class="card-text cap">${data[i].location.city}, ${data[i].location.state}</p>
          </div>
        </div>    
         `;     
    }
    gallery.insertAdjacentHTML('beforeend', galleryHtml);
  }
    
  // Listener for card selection on the Dom
  function cardListener() {
    for (let i = 0; i < cards.length; i++) {
        cards[i].addEventListener('click', (e) => {
           let index = [...cards].indexOf(e.currentTarget);
               generateModal(people[0][index]);
            
        });
    }
}
// function to convert phone # to this format (XXX) XXX-XXXX
// Note; Not all of the phone #'s have ten digits
function cellConvert(data) {
  let nums = data.replace(/\D/g,'');
  const num1 = nums.slice(0, 3);
  const num2 = nums.slice(3, 6);
  const num3 = nums.slice(6, 10);
  const cell = `(${num1}) ${num2}-${num3}`
  return cell
}
// function to convert birthday to the following format MM/DD/YYYY
function birthdayConvert(data) {
const year = data.slice(0, 4);
const day = data.slice(8, 10);
const month = data.slice(5, 7);
 const birthday = `${month}/${day}/${year}`
 return birthday
}

  // Generate the markup for each gallery profile
function generateModal(data) {
  let modalHtml = ''
         const cell = cellConvert(data.cell);
         const birthday = birthdayConvert(data.dob.date);
         const streetNum = data.location.street.number
         const street = data.location.street.name
         const city = data.location.city
         const state = data.location.state
         const zip = data.location.postcode
         modalHtml += `
         <div class="modal-container">
             <div class="modal">
                 <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
                 <div class="modal-info-container">
                     <img class="modal-img" src=${data.picture.large} alt="profile picture">
                     <h3 id="name" class="modal-name cap">${data.name.first} ${data.name.last}</h3>
                     <p class="modal-text">${data.email}</p>
                     <p class="modal-text cap">${city}</p>
                     <hr>
                     <p class="modal-text">${cell}</p>
                     <p class="modal-text">${streetNum} ${street}, ${city}, ${state} ${zip}</p>
                     <p class="modal-text">Birthday: ${birthday}</p>
                 </div>
             </div>`
        
             gallery.insertAdjacentHTML('beforeend', modalHtml); 
    
  } 
  
  getRandomProfile(randomUser);

  
// Event listener for closing the modal window
  gallery.addEventListener('click',(e) => {
    if(e.target.innerText === 'X') {
      gallery.lastChild.remove();
    }
  }); 

