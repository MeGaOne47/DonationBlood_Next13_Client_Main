// ImportExcelButton.tsx
import React from 'react';
import { Form } from 'react-bootstrap';

interface ImportExcelButtonProps {
  onImport: (file: File) => void;
}

const ImportExcelButton: React.FC<ImportExcelButtonProps> = ({ onImport }) => {
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onImport(file);
    }
  };

  return (
    <Form.Group controlId="formFile" className="mb-3">
      <Form.Label>Chọn File Excel từ bệnh viện cung cấp</Form.Label>
      <Form.Control type="file" onChange={handleFileChange} />
    </Form.Group>
  );
};

export default ImportExcelButton;
