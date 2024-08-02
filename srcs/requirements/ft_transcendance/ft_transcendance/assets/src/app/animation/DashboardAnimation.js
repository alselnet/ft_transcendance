export function showCircle(container, cx, cy, radius, callback) {
   let div = document.createElement('div');
   div.style.width = 0;
   div.style.height = 0;
   div.style.left = cx + 'px';
   div.style.top = cy + 'px';
   div.style.borderRadius = '50%';
   div.style.position = 'absolute';
   div.style.transition = 'width 0.5s ease, height 0.5s ease, left 0.5s ease, top 0.5s ease';

   container.appendChild(div);
   console.log('Circle div added to DOM:', div);

   setTimeout(() => {
       div.style.width = radius * 2 + 'px';
       div.style.height = radius * 2 + 'px';
       div.style.left = (cx - radius) + 'px';
       div.style.top = (cy - radius) + 'px';
       console.log('Circle animation started');
       callback(div);
   }, 100);
}

function showSectorGraph(container, size, percentage, color) {
   const radius = size / 2;
   const center = radius;
   const endAngle = (percentage / 100) * 360;
   const radians = (endAngle * Math.PI) / 180;
   const largeArc = endAngle > 180 ? 1 : 0;

   const x = center + radius * Math.cos(radians - Math.PI / 2);
   const y = center + radius * Math.sin(radians - Math.PI / 2);

   const sectorPath = `
       M ${center},${center}
       L ${center},${center - radius}
       A ${radius},${radius} 0 ${largeArc} 1 ${x},${y}
       Z
   `;

   const svg = `
       <svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg">
           <circle cx="${center}" cy="${center}" r="${radius}" fill="transparent"/>
           <circle cx="${center}" cy="${center}" r="${radius}" fill="#63aa63" style="transform-origin: ${center}px ${center}px; transform: scale(0); transition: transform 0.5s ease;"/>
           <path d="${sectorPath}" fill="${color}" style="transform-origin: ${center}px ${center}px; transform: scale(0); transition: transform 0.5s ease 0.5s;"/>
       </svg>
   `;

   container.innerHTML = svg;

   setTimeout(() => {
       const circle = container.querySelector('circle:nth-of-type(2)');
       circle.style.transform = 'scale(1)';
       console.log('Full circle animation started');
   }, 10);

   setTimeout(() => {
       const path = container.querySelector('path');
       path.style.transform = 'scale(1)';
       console.log('Sector animation started');
   }, 510);
}

export function setupCamembertAnimation(dashboardContainer, percentage, color, message = '') {
   console.log('Setting up camembert animation');
   const camembertContainer = dashboardContainer.querySelector('.camembert-stat');
   if (!camembertContainer) {
       console.error('Camembert container not found');
       return;
   }

   console.log('Camembert container found', camembertContainer);

   camembertContainer.innerHTML = '';

   const containerRect = camembertContainer.getBoundingClientRect();
   const size = containerRect.width;
   const radius = size / 2;

   showCircle(camembertContainer, radius, radius, radius, (div) => {
       if (message) {
           showMessageInCircle(div, size, message);
       } else {
           setTimeout(() => {
               showSectorGraph(div, size, percentage, color);
           }, 500);
       }
   });
}

function showMessageInCircle(container, size, message) {
   const radius = size / 2;
   const center = radius;

   const svg = `
       <svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg">
           <circle cx="${center}" cy="${center}" r="${radius}" fill="#9e9d9d" style="transform-origin: ${center}px ${center}px; transform: scale(0); transition: transform 0.5s ease;"/>
           <text x="${center}" y="${center}" text-anchor="middle" dominant-baseline="middle" font-size="10" fill="black" style="opacity: 0; transition: opacity 0.5s ease 0.5s;">
               ${message}
           </text>
       </svg>
   `;

   container.innerHTML = svg;

   setTimeout(() => {
       const circle = container.querySelector('circle');
       const text = container.querySelector('text');
       circle.style.transform = 'scale(1)';
       console.log('Full circle animation started');

       setTimeout(() => {
           text.style.opacity = 1;
           console.log('Text animation started');
       }, 510);
   }, 10);
}

export const animateNumbers = (element, target) => {
   let start = 0;
   const duration = 1000;
   const increment = target / (duration / 10);
   const timer = setInterval(() => {
       start += increment;
       if (start >= target) {
           clearInterval(timer);
           start = target;
       }
       element.textContent = Math.floor(start);
   }, 10);
}