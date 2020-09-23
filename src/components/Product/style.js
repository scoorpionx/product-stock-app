import styled from 'styled-components/native';

export const Container = styled.TouchableOpacity`
  margin: 0 15px 15px 15px;
  padding: 10px;
  border: 0.7px solid #000;
  border-radius: 8px;
`;

export const Info = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 10px;
`;

export const Text = styled.Text`
  font-size: 20px;
`;

export const DescriptionText = styled.Text`
  display: ${(props) => (props.visible ? 'flex' : 'none')};
  font-size: 20px;
`;

export const Icons = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
`;

export const Image = styled.Image`
  display: ${(props) => (props.visible ? 'flex' : 'none')};
  /* display: flex; */
  width: 100%;
  height: 500px;
  justify-content: center;
  border-radius: 8px;
  margin-bottom: 10px;
`;

export const Description = styled.Text`
  display: block;
`;
