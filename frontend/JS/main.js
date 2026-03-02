// URL de ton API
const API_URL = 'http://localhost:3300/api/stuff';

// Fonction pour récupérer les données
async function fetchItems() {
  try {
    const response = await fetch(API_URL);
    const items = await response.json();

    const container = document.getElementById('items-container');
    container.innerHTML = ''; // On vide avant d'ajouter

    // items.forEach(item => {
    //   const card = document.createElement('div');
    //   card.className = 'card';
    //   card.innerHTML = `
    //         <img src="${item.imageUrl}" alt="${item.title}">
    //         <h2>${item.title}</h2>
    //         <p>${item.description}</p>
    //         <div class="price">${item.price} FCFA</div>
    //       `;
    //   container.appendChild(card);
    // });

    items.forEach(item => {
      const card = document.createElement('div');
      card.className = 'card';

      // IMPORTANT 👇
      card.dataset.id = item._id;

      card.innerHTML = `
        <img src="${item.imageUrl}" alt="${item.title}">
        <h2>${item.title}</h2>
        <p>${item.description}</p>
        <div class="price">${item.price} FCFA</div>
      `;

      // l'evenement de click
      card.addEventListener('click', () => {
        window.location.href = `/api/stuff/${item._id}`;
      });

      container.appendChild(card);
    });

    

    // let objects = document.querySelectorAll('.card');
    // objects.forEach(object => {
    //   object.addEventListener('click', () => {

    //     const id = object.dataset.id;
    //     const item = items.find(i => i._id === id);

    //     //a joute une div pour la mise a jour des objets et mettre les donnees de l'objet dans le formulaire plus sa classe css pour le style
    //     const divUpdate = document.querySelector('.update');

    //     // class css pour la div de mis a jour
    //     divUpdate.classList.add('updates');


    //     divUpdate.innerHTML = `
    //       <form id="updateForm">
    //         <i class="fi fi-rr-cross closeModal"></i>
    //         <input type="text" id="title" value="${item.title}" required>
    //         <textarea id="description" required>${item.description}</textarea>
    //         <input type="text" id="imageUrl" value="${item.imageUrl}" required>
    //         <input type="number" id="price" value="${item.price}" required>
    //         <button type="submit">Modifier</button>
    //       </form>
    //     `;

    //     const form = document.getElementById('updateForm');

    //     form.addEventListener('submit', async (e) => {
    //       e.preventDefault();

    //       const updatedItem = {
    //         title: document.getElementById('title').value,
    //         description: document.getElementById('description').value,
    //         imageUrl: document.getElementById('imageUrl').value,
    //         price: document.getElementById('price').value
    //       };

    //       await fetch(`http://localhost:3300/api/stuff/${id}`, {
    //         method: 'PUT',
    //         headers: {
    //           'Content-Type': 'application/json'
    //         },
    //         body: JSON.stringify(updatedItem)
    //       });

    //       fetchItems(); // Recharge la liste
    //     });

    //   });
    // });

  } catch (error) {
    console.error('Erreur lors de la récupération des données :', error);
  }
}

// On appelle la fonction au chargement de la page
fetchItems();