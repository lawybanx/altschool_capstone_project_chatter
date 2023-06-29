import { useNavigate } from 'react-router-dom';

interface ClickTagOptions {
  handleSameRoute?: () => void;
  onClose?: () => void;
}

const useClickTag = ({ handleSameRoute, onClose }: ClickTagOptions) => {
  const navigate = useNavigate();

  return (e: React.MouseEvent<HTMLButtonElement>, tagName: string) => {
    e.stopPropagation();
    navigate(`/tags/${tagName}`);

    handleSameRoute && handleSameRoute();
    onClose && onClose();
  };
};

export default useClickTag;
