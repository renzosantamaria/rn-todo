import React from "react"
import styled from "styled-components/native"

const Container = styled.View`
width: 140px;
height: 140px;
`

const Image = styled.Image<image>`
    width: 140px;
    height: 140px;
`
interface image{
    imageSource?: any
}

const Avatar = ({imageSource}) => {
    return(
        <Container>
            <Image source={imageSource} />
        </Container>
    )
}

export default Avatar