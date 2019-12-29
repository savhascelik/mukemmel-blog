import * as React from "react";
import { Container, Divider, Header, Segment } from "semantic-ui-react";
import AllBlogs from "./AllBlogs";

const Blogs: React.FC = () => {
  return (
    <Segment style={{ padding: "20px" }} basic>
      <Container fluid>
        <Header as="h2" content="Yazılar" />
        <Divider />
        <AllBlogs />
      </Container>
    </Segment>
  );
};

export default Blogs;