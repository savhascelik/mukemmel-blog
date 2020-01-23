import * as React from "react";
import { useQuery } from "react-apollo";
import {
  GetUserByIdReturnData,
  GetUserByIdVariables
} from "../../@types/interfaces/PageInterfaces/Profile/profile.interfaces";
import { USER } from "../../graphql/User/query";
import Loading from "../../components/Loading/Loading";
import {
  Container,
  Segment,
  Header,
  Grid,
  Image,
  List,
  Icon
} from "semantic-ui-react";
import { User } from "../../@types/types/database/DatabaseTypes";
import { getImageUrlByGender } from "../../utils/functions/getUserImageUrl";
import {
  AccountCircleOutlined,
  AccountBoxOutlined,
  Help,
  Delete
} from "@material-ui/icons";
import Moment from "react-moment";

const Profile: React.FC = () => {
  const { data, loading } = useQuery<
    GetUserByIdReturnData,
    GetUserByIdVariables
  >(USER, {
    variables: { id: window.location.pathname.split("/")[2] }
  });

  if (loading) return <Loading size={50} />;

  const user: User = data.user.user;

  return (
    <Container>
      <Segment color="violet" raised>
        <Header
          content={`${user.name} ${user.surname} Profili`}
          textAlign="center"
        />
        <Grid columns={2} stackable>
          <Grid.Column width={6}>
            <Image
              src="https://image.flaticon.com/icons/svg/17/17004.svg"
              centered
            />
          </Grid.Column>
          <Grid.Column width={10}>
            <List relaxed divided animated>
              <List.Item style={{ marginTop: "5px" }} as="a">
                <List.Content>
                  <List.Header style={{ color: "#EA7675" }}>İsim</List.Header>
                  <List.Description>{user.name}</List.Description>
                </List.Content>
              </List.Item>
              <List.Item style={{ marginTop: "5px" }} as="a">
                <List.Content>
                  <List.Header style={{ color: "#F48840" }}>
                    Soyisim
                  </List.Header>
                  <List.Description>{user.surname}</List.Description>
                </List.Content>
              </List.Item>
              <List.Item style={{ marginTop: "5px" }} as="a">
                <List.Content>
                  <List.Header style={{ color: "#B58105" }}>
                    Kullanıcı Adı
                  </List.Header>
                  <List.Description>@{user.username}</List.Description>
                </List.Content>
              </List.Item>
              <List.Item style={{ marginTop: "5px" }} as="a">
                <List.Content>
                  <List.Header style={{ color: "#10a3a3" }}>Email</List.Header>
                  <List.Description>{user.email}</List.Description>
                </List.Content>
              </List.Item>
              <List.Item style={{ marginTop: "5px" }} as="a">
                <List.Content>
                  <List.Header style={{ color: "#6435c9 " }}>
                    Cinsiyet
                  </List.Header>
                  <List.Description>
                    {user.gender === "men" ? "Erkek" : "Kadın"}
                  </List.Description>
                </List.Content>
              </List.Item>
              <List.Item style={{ marginTop: "5px" }} as="a">
                <List.Content>
                  <List.Header style={{ color: "#a5673f" }}>
                    Oluşturulma Tarihi
                  </List.Header>
                  <List.Description>
                    <Moment date={user.createdAt} format="DD/MM/YY" />
                  </List.Description>
                </List.Content>
              </List.Item>
            </List>
          </Grid.Column>
        </Grid>
      </Segment>
    </Container>
  );
};

export default Profile;
