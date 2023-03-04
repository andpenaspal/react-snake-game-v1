import BasicButtonModal from 'BasicComponents/BasicButtonModal';
import Typography from 'BasicComponents/Typography';
import React, { FunctionComponent } from 'react';
import { useCookies } from 'react-cookie';
import styled from 'styled-components';

interface GameWonModalProps {
  onClose: () => void;
}

const StyledText = styled(Typography)`
  margin-bottom: 10px;
`;

const GameWonModal: FunctionComponent<GameWonModalProps> = ({ onClose }) => {
  const [, setCookie] = useCookies();
  setCookie('SnakeGameReward', 'I-am-an-officially-recognized-Snake-Enchanter');

  return (
    <BasicButtonModal
      buttonColor="info200"
      buttonText="Go Again"
      heading="Congratulations!"
      onClose={onClose}
    >
      <StyledText>🐍🐍 You must be quite the Snake Enchanter! 🐍🐍</StyledText>
      <StyledText>You won my most valuable item...</StyledText>
      <StyledText>A virtual cookie! 🍪</StyledText>
    </BasicButtonModal>
  );
};

export default GameWonModal;
