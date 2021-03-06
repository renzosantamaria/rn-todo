import styled from "styled-components/native";

interface Wrapper{
    flexNumber?: string;
    bgColor?: string;
}
export const Wrapper = styled.View<Wrapper>`
    flex: ${props => props.flexNumber || 'none'};
    flex-direction: row;
    justify-content: space-between;
    background-color: ${props => props.bgColor || 'grey'};
    padding: 20px;
    height: 100px;
    width: 60%;
`;

interface Text{
    color?: string;
    bgColor?: string;
}
export const Text = styled.TextInput<Text>`
    color: ${props => props.color};
    background-color: ${props => props.bgColor};
    font-size: 20px;
    height: 40px;
    /* border: 1px solid black */
`;

export const SafeAreaView = styled.SafeAreaView<Wrapper>`
    /* flex: ${props => props.flexNumber || 'none'};
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: ${props => props.bgColor || 'grey'};
    padding: 20px;
    height: 100px;
    width: 100%; */
    /* backgroundColor: Colors.background, */
    color: white;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    flex: 1;
    height: 100%;
    width: auto;
    padding: 0
`
