fetch('js/data/basic.json')
    .then(response => response.json())
    .then(data => {
        document.querySelectorAll('[data-translation]').forEach(item => {
            item.innerHTML = data[`${item.dataset.translation}`];
    });
})
.catch(error => {
    console.error('Error loading JSON:', error);
});

fetch('js/data/sublinks.json')
    .then(response => response.json())
    .then(data => {
      // Get the container element
      const linksContainer = document.getElementById('sub-links');
      
      // Iterate over the JSON data and create the links
      data.forEach(item => {
        const link = document.createElement('a');
        link.classList.add('sub-link');
        link.href = item.link;
        link.setAttribute('aria-label', item['aria-label']);
        link.setAttribute('title', item.title);
        
        if (item.target) {
          link.target = item.target;
        }
        
        const icon = document.createElement('i');
        icon.classList.add(item.icon);
        
        link.appendChild(icon);
        linksContainer.appendChild(link);
    });
})
.catch(error => {
    console.error('Error loading JSON:', error);
});

fetch('js/data/links.json')
    .then(response => response.json())
    .then(data => {
        // Get the container element
        const linksContainer = document.getElementById('links');
        
        // Iterate over the JSON data and create the links
        data.forEach(item => {
        const link = document.createElement('a');
        link.classList.add('link');
        link.href = item.link;
        link.setAttribute('aria-label', item['aria-label']);
        link.setAttribute('title', item.title);
        
        if (item.target) {
            link.target = item.target;
        }
        
        const icon = document.createElement('i');
        icon.classList.add(item.icon);
        icon.innerHTML = "&nbsp;";
        
        const text = document.createTextNode(item.text);
        
        link.appendChild(icon);
        link.appendChild(text);
        linksContainer.appendChild(link);
    });
})
.catch(error => {
    console.error('Error loading JSON:', error);
});
