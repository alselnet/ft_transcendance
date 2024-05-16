import { Card } from "./Cards.js";


export const ContainerCards = (props) => {
    let {results} = props;
    let div = document.createElement("div");

    results.map( e1 => div.append(Card(e1)))

    return div
}