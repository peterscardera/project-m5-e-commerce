import React from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom"

const ItemDetails = () => {

const { itemId } = useParams();
console.log(itemId)

    return (
        <div>ItemDetails ?</div>
    )
}

export default ItemDetails