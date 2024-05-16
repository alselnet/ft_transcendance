
export const ajax = (props) => {
    let {url, callback} = props;
    
    fetch(url)
        .then(response => response.json())
        .then(data => callback(data))
}