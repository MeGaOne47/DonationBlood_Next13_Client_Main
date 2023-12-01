"use client"
import React, { useState, useEffect } from 'react';
import { Card, ListGroup } from 'react-bootstrap';

// interface IProps {
//     donationHistory: IDonationHistory[];
//   }

const DonationHistoryList = ({ donorId }: { donorId: any }) => {
  console.log("donorIdHisTory",donorId);
  const [donationHistory, setDonationHistory] = useState<IDonationHistory | null>(null);

  useEffect(() => {
    const fetchDonationHistory = async () => {
      try {
        const response = await fetch(`http://localhost:8000/donation-history/by-donor/${donorId}`);
        if (response.ok) {
          const result = await response.json();
          setDonationHistory(result);
        } else {
          console.error('Error fetching donation history');
        }
      } catch (error) {
        console.error('Error fetching donation history', error);
      }
    };

    fetchDonationHistory();
  }, [donorId]);

  return (
    <div>
      <h2>Donation History</h2>
      <Card>
        <ListGroup variant="flush">
          {donationHistory && donationHistory.map((historyItem: { id: React.Key | null | undefined; donationDate: string | number | Date; donatedAmount: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | React.ReactFragment | React.ReactPortal | React.PromiseLikeOfReactNode | null | undefined; healthCheckResult: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | React.ReactFragment | React.ReactPortal | React.PromiseLikeOfReactNode | null | undefined; }) => (
            <ListGroup.Item key={historyItem.id}>
              <strong>Donation Date:</strong> {new Date(historyItem.donationDate).toDateString()}<br />
              <strong>Donated Amount:</strong> {historyItem.donatedAmount}<br />
              <strong>Health Check Result:</strong> {historyItem.healthCheckResult}
            </ListGroup.Item>
          ))}
        </ListGroup>
      </Card>
    </div>
  );  
};

export default DonationHistoryList;
