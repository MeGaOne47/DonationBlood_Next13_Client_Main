import { useState } from 'react';
import { Button } from 'react-bootstrap';

interface IProps {
  onDelete: () => void; // Function to handle delete action
}

function DeleteConfirmationButton(props: IProps) {
  const [showConfirmation, setShowConfirmation] = useState<boolean>(false);

  const handleDeleteClick = () => {
    setShowConfirmation(true);
  };

  const handleConfirmDelete = () => {
    // Call the onDelete function passed as prop
    props.onDelete();
    setShowConfirmation(false);
  };

  const handleCancelDelete = () => {
    setShowConfirmation(false);
  };

  return (
    <>
      <Button variant="danger" onClick={handleDeleteClick}>
        Delete
      </Button>
      {showConfirmation && (
        <div>
          <p>Are you sure you want to delete?</p>
          <Button variant="danger" onClick={handleConfirmDelete}>
            Yes
          </Button>
          <Button variant="secondary" onClick={handleCancelDelete}>
            No
          </Button>
        </div>
      )}
    </>
  );
}

export default DeleteConfirmationButton;
