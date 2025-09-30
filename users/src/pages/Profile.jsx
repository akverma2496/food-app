import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProfile, updateProfile } from "../store/actions/profileActions";
import { Container, Row, Col, Card, Form, Button, Spinner } from "react-bootstrap";
import { toast } from "react-toastify";

const ProfilePage = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { name, email, loading, error } = useSelector((state) => state.profile);

  const [form, setForm] = useState({ name: "", email: "" });

  useEffect(() => {
    if (user?.uid) {
      dispatch(fetchProfile(user.uid));
    }
  }, [dispatch, user]);

  useEffect(() => {
    setForm({ name, email });
  }, [name, email]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateProfile({ uid: user.uid, ...form })).then((res) => {
      if (res.meta.requestStatus === "fulfilled") {
        toast.success("Profile updated successfully!");
      } else {
        toast.error("Failed to update profile");
      }
    });
  };

  return (
    <Container className="py-5">
      <Row className="justify-content-center">
        <Col md={6}>
          <Card className="shadow-sm">
            <Card.Body className="p-4">
              <h3 className="mb-4 text-center">My Profile</h3>

              {loading ? (
                <div className="text-center">
                  <Spinner animation="border" />
                </div>
              ) : (
                <Form onSubmit={handleSubmit}>
                  <Form.Group className="mb-3" controlId="formName">
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                      type="text"
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      required
                    />
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="formEmail">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" value={form.email} disabled readOnly />
                  </Form.Group>

                  <div className="d-grid">
                    <Button type="submit" variant="primary" disabled={loading}>
                      {loading ? <Spinner size="sm" animation="border" /> : "Update Profile"}
                    </Button>
                  </div>
                </Form>
              )}

              {error && <p className="text-danger text-center mt-2">{error}</p>}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default ProfilePage;
