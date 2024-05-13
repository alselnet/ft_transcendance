function component(){
    const element = document.createElement('div');
    element.innerHTML = 'Hello la tchim';
    return element;
}
document.body.appendChild(component());