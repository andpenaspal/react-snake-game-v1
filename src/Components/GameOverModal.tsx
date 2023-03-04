import BasicButtonModal from 'BasicComponents/BasicButtonModal';
import React, { FunctionComponent } from 'react';

interface GameOverModalProps {
  onClose: () => void;
}

const GameOverModal: FunctionComponent<GameOverModalProps> = ({ onClose }) => (
  <BasicButtonModal
    buttonColor="info200"
    buttonText="Try Again"
    heading="Game Over"
    onClose={onClose}
  />
);

export default GameOverModal;
