import * as React from "react";
import { ApolloConsumer } from "react-apollo";
import { withRouter, RouteComponentProps } from "react-router-dom";
import { ApolloClient } from "apollo-boost";
import { Props } from "../../@types/interfaces/ComponentInterfaces/Logout/logout.interfaces";
import { Button } from "semantic-ui-react";

const Logout: React.FC<RouteComponentProps<Props>> = ({ history }) => {
  const onClick = (
    client: ApolloClient<object>,
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    e.preventDefault();
    localStorage.setItem("token", "");
    client.resetStore();
  };

  return (
    <ApolloConsumer>
      {client => (
        <Button
          fluid
          inverted
          color="blue"
          content="Çıkış Yap"
          onClick={(e: React.MouseEvent<HTMLButtonElement>) =>
            onClick(client, e)
          }
        />
      )}
    </ApolloConsumer>
  );
};

export default withRouter(Logout);
