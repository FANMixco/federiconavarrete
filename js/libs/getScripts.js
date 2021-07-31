const getScript = url => new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = url;
    script.async = true;
  
    script.onerror = reject;
  
    script.onload = script.onreadystatechange = function() {
      const loadState = this.readyState;
  
      if (loadState && loadState !== 'loaded' && loadState !== 'complete') return;
  
      script.onload = script.onreadystatechange = null;
  
      resolve();
    }
  
    document.head.appendChild(script);
});