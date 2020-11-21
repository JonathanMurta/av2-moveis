import styled from 'styled-components/native';

export const Container = styled.View`
    background-color: #0d1418;
    flex: 1;
    padding: 10px 10px 0 10px;
    justify-content: flex-end;
    align-items: center;
    margin-top: 25px;
`;

export const Texto = styled.Text`
    color: #fff;
    font-size: 20px;
    text-align: center;
`;

export const ContainerButtons = styled.View`
    flex-direction: row;
    margin-bottom: 10px;
`

export const Button = styled.TouchableOpacity`
    flex: 1;
    width: 100%;
    height: 60px;
    background-color: ${props=> props.invert ? "#fff" : "#ae1b73"};
    border: 1px solid #ae1b73;
    border-radius: 5px;
    justify-content: center;
    align-items: center;
    margin-right: ${props=> props.invert ? "10px" : "0px"};
`

export const ButtonText = styled.Text`
    color: ${props=> props.invert ? "#ae1b73" : "#fff"};
    font-size: 16px;
    font-weight: bold;
`

export const Input = styled.TextInput`
    border: 1px solid #ccc;
    height: 60px;
    flex: 3;
    border-radius: 5px;
    padding: 0 20px;
    background-color: #e6e6e6;
    margin-right: 10px;
`

export const ContainerMessages = styled.View`
    width: 94%;    
    flex: 1;
    margin: 0 3%;
`;

export const ContainerMessageUser = styled.View`
    padding: 10px;
    border-radius: 5px;
    background-color: #262d31;
    margin-bottom: 5px;
`;

export const TitleMessage = styled.Text`
    color: #fff};
    font-size: 12px;
    text-align: justify;
`


export const Message = styled.Text`
    color: #fff;
    font-size: 15px;
    text-align: justify;
`
