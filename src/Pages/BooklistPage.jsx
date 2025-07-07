import React, { useState } from "react";
import { Container, Row, Col, Form, Button, Card } from "react-bootstrap";
import { useFirebase } from "../context/FirebaseContext";

const BookListing = () => {
  const [title, setTitle] = useState("");
  const [isbn, setIsbn] = useState("");
  const [price, setPrice] = useState("");
  const [cover, setCover] = useState(null);
  const {supabase,user,uploadData}=useFirebase();
  const handleSubmit=async({title,isbn,price,coverURL})=>{
    console.log("Books Submitted !");
    console.log("Adding to FireStore !");
    //FireStore Data Upload
    await uploadData(title,isbn,price,coverURL,user);
    alert('Book Submitted✅ !');
  };

  const onSubmit = async(e) => {
    e.preventDefault();
    //Add cover pic to supabase storage and retrieve the URL -> Pass it to the coverURL.

    const { data, error } = await supabase.storage
    .from('images')
    .upload(`public/${Date.now()}-${cover.name}`,cover);
    console.log(data);

    if(error){
        console.error('Upload Error',error.message);
        alert("Failed to upload Image !"); 
        return;
    }
    console.log("Upload Success !");

    const{data:urlData,error:urlError}=supabase.storage
    .from('images')
    .getPublicUrl(data.path);

    if(urlError){
        console.error("URL error:", urlError.message);
        alert("Failed to get public URL.");
        return;
    }
    const coverURL=urlData.publicUrl;
    console.log('Public Cover URL',coverURL);
    
    //Supabase chalabo !
    handleSubmit({
      title,
      isbn,
      price,
      coverURL,
    });
    //Making again default values 
    setTitle("");setIsbn("");setPrice("");setCover(null);
  };

  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col xs={12} md={8} lg={6}>
          <Card className="p-4 shadow-sm">
            <Card.Title className="text-center mb-4 fs-3 fw-bold">
              List Your Book
            </Card.Title>

            <Form onSubmit={onSubmit}>
              {/* Book Title */}
              <Form.Group className="mb-3" controlId="formBookTitle">
                <Form.Label>Book Title</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter book title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
              </Form.Group>

              {/* ISBN */}
              <Form.Group className="mb-3" controlId="formISBN">
                <Form.Label>ISBN Number</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter ISBN number"
                  value={isbn}
                  onChange={(e) => setIsbn(e.target.value)}
                  required
                />
              </Form.Group>

              {/* Price */}
              <Form.Group className="mb-3" controlId="formPrice">
                <Form.Label>Price (INR)</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Enter price"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  required
                  min="0"
                />
              </Form.Group>

              {/* Book Cover Upload */}
              <Form.Group className="mb-4" controlId="formCover">
                <Form.Label>Book Cover Photo</Form.Label>
                <Form.Control
                  type="file"
                  accept="image/*"
                  onChange={(e) => setCover(e.target.files[0])}
                  required
                />
              </Form.Group>

              <div className="d-grid">
                <Button variant="primary" type="submit" size="lg">
                  Submit Listing
                </Button>
              </div>
            </Form>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default BookListing;
