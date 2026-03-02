const timeoutId = setTimeout(() => {
    console.log('Hello, World!');
    const objects =  document.querySelectorAll('.card')
    
    console.log(objects);
}, 3000);
