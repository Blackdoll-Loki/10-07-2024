document.addEventListener("DOMContentLoaded", () => {
  const fileInput = document.getElementById('fileInput') as HTMLInputElement;
  const titleInput = document.getElementById('titleInput') as HTMLInputElement;
  const descriptionInput = document.getElementById('descriptionInput') as HTMLInputElement;
  const imageContainer = document.getElementById('imageContainer') as HTMLDivElement;
  const form = document.getElementById('uploadForm') as HTMLFormElement;

  const request = indexedDB.open('imageDB', 1);
  let db: IDBDatabase;

  request.onupgradeneeded = (event: IDBVersionChangeEvent) => {
    db = (event.target as IDBOpenDBRequest).result;
    if (!db.objectStoreNames.contains('images')) {
      db.createObjectStore('images', { keyPath: 'id', autoIncrement: true });
    }
  };

  request.onsuccess = (event: Event) => {
    db = (event.target as IDBOpenDBRequest).result;
    loadImages();
  };

  request.onerror = (event: Event) => {
    console.error("Error opening IndexedDB:", (event.target as IDBOpenDBRequest).error);
  };

  form.addEventListener('submit', (event: Event) => {
    event.preventDefault();
    const files = fileInput.files;
    const title = titleInput.value;
    const description = descriptionInput.value;
    const uploadDate = new Date().toLocaleString();

    if (files) {
      for (const file of files) {
        const reader = new FileReader();
        reader.onload = () => {
          const blob = new Blob([reader.result as ArrayBuffer], { type: file.type });
          saveImage({ blob, title, description, uploadDate });
        };
        reader.readAsArrayBuffer(file);
      }
    }
  });

  function loadImages() {
    const transaction = db.transaction('images', 'readonly');
    const store = transaction.objectStore('images');
    const request = store.getAll();
    request.onsuccess = () => {
      request.result.forEach(displayImageCard);
    };

    request.onerror = (event: Event) => {
      console.error("Error loading images:", (event.target as IDBRequest).error);
    };
  }

  function saveImage(image: { blob: Blob, title: string, description: string, uploadDate: string }) {
    const transaction = db.transaction('images', 'readwrite');
    const store = transaction.objectStore('images');
    const request = store.add(image);

    request.onsuccess = () => {
      displayImageCard(image);
      form.reset();
    };

    request.onerror = (event: Event) => {
      console.error("Error saving image:", (event.target as IDBRequest).error);
    };
  }

  function displayImageCard(image: { blob: Blob, title: string, description: string, uploadDate: string }) {
    const div = document.createElement('div');
    div.className = 'card';

    const img = document.createElement('img');
    img.src = URL.createObjectURL(image.blob);

    const title = document.createElement('h3');
    title.textContent = image.title;

    const description = document.createElement('p');
    description.textContent = image.description;

    const date = document.createElement('p');
    date.textContent = `Uploaded on: ${image.uploadDate}`;

    div.appendChild(img);
    div.appendChild(title);
    div.appendChild(description);
    div.appendChild(date);
    imageContainer.appendChild(div);
  }
});
