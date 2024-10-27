import React from 'react'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

async function getData() {
    const res = await fetch('https://localhost:8000/api/v1/product/allpro')
    if (!res.ok) {
      throw new Error('Failed to fetch data')
    }
   
    return res.json()
  }

const Products = async () => {
    const data = await getData()
    console.log(data);
    
  return (
   data.map(item=>(
    <Card style={{ width: '18rem' }}>
    <Card.Img variant="top" src="holder.js/100px180" />
    <Card.Body>
      <Card.Title>Card Title</Card.Title>
      <Card.Text>
        Some quick example text to build on the card title and make up the
        bulk of the card's content.
      </Card.Text>
      <Button variant="primary">Go somewhere</Button>
    </Card.Body>
  </Card>
   ))
  )
}

export default Products
