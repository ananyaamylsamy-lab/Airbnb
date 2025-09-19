function MainModule(listingsID = "#listings") {
 const me = {};
 const listingsElement = document.querySelector(listingsID);
 let favorites = new Set(); // Store favorite listing IDs

 function toggleFavorite(listingId) {
   if (favorites.has(listingId)) {
     favorites.delete(listingId);
   } else {
     favorites.add(listingId);
   }
   // Update the heart icon
   const heartIcon = document.querySelector(`[data-listing-id="${listingId}"]`);
   if (heartIcon) {
     heartIcon.innerHTML = favorites.has(listingId) ? '♥' : '♡';
     heartIcon.style.color = favorites.has(listingId) ? '#ff385c' : '#ccc';
   }
 }

 function getListingCode(listing) {
   const isFavorite = favorites.has(listing.id);
   const heartIcon = isFavorite ? '♥' : '♡';
   const heartColor = isFavorite ? '#ff385c' : '#ccc';

   return `<div class="col-4">
     <div class="listing card">
       <div style="position: relative;">
         <img
           src="${listing.picture_url}"
           class="card-img-top"
           alt="AirBNB Listing"
         />
         <button 
           class="favorite-btn" 
           data-listing-id="${listing.id}"
           onclick="main.toggleFavorite(${listing.id})"
           style="position: absolute; top: 10px; right: 10px; background: none; border: none; font-size: 24px; cursor: pointer; color: ${heartColor};"
         >
           ${heartIcon}
         </button>
       </div>
       <div class="card-body">
         <h2 class="card-title">${listing.name}</h2>
         <div class="price">${listing.price}</div>
         <p class="card-text">${listing.description}</p>
         <div class="host-info">
           <img src="${listing.host_picture_url}" alt="${listing.host_name}" class="host-photo" style="width: 40px; height: 40px; border-radius: 50%;">
           <span>Host: ${listing.host_name}</span>
         </div>
         <div class="amenities">
           <strong>Amenities:</strong> ${JSON.parse(listing.amenities).slice(0, 3).join(', ')}...
         </div>
         <a href="${listing.listing_url}" class="btn btn-primary" target="_blank">View Listing</a>
       </div>
     </div>
   </div>`;
 }

 function redraw(listings) {
   listingsElement.innerHTML = "";
   listingsElement.innerHTML = listings.map(getListingCode).join("\n");
 }

 async function loadData() {
   const res = await fetch("./airbnb_sf_listings_500.json");
   const listings = await res.json();
   me.redraw(listings.slice(0, 50));
 }

 me.redraw = redraw;
 me.loadData = loadData;
 me.toggleFavorite = toggleFavorite;
 return me;
}

const main = MainModule();
main.loadData();