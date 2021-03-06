import * as React from "react";
import {
  Modal,
  Header,
  Image,
  Form,
  Button,
  Segment,
  Feed
} from "semantic-ui-react";
import { EditOutlined } from "@material-ui/icons";
import { UPDATE_FEED } from "../../graphql/Feed/mutation";
import { useMutation, useQuery } from "react-apollo";
import { FEED, FEEDS } from "../../graphql/Feed/query";
import Loading from "../../components/Loading/Loading";
import { getImageUrlByGender } from "../../utils/functions/getUserImageUrl";
import Moment from "react-moment";
import { Feed as FeedType } from "../../@types/types/database/DatabaseTypes";
import {
  UpdateFeedReturnData,
  UpdateFeedVariables,
  Props,
  GetFeedByIdReturnData,
  GetFeedByIdVariables
} from "../../@types/interfaces/PageInterfaces/Feed/updatefeed.interfaces";

const UpdateFeed: React.FC<Props> = ({ id }) => {
  const [open, setOpen] = React.useState<boolean>(false);
  const [content, setContent] = React.useState<string>("");

  const [updateFeed, { loading }] = useMutation<
    UpdateFeedReturnData,
    UpdateFeedVariables
  >(UPDATE_FEED, {
    refetchQueries: [{ query: FEEDS }, { query: FEED, variables: { id } }]
  });

  const { data, loading: getFeedLoading } = useQuery<
    GetFeedByIdReturnData,
    GetFeedByIdVariables
  >(FEED, { variables: { id } });

  const feed: FeedType = !getFeedLoading && data.feed.feed;

  const onUpdateFeed = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    updateFeed({
      variables: { id, content }
    }).then(() => setContent(""));
  };

  return (
    <Modal
      open={open}
      trigger={
        <Image children={<EditOutlined onClick={() => setOpen(true)} />} />
      }
      centered={false}
    >
      <Modal.Header>Güncelle</Modal.Header>
      <Modal.Content>
        <Modal.Description>
          {getFeedLoading ? (
            <Loading size={40} />
          ) : (
            <Segment key={feed.id}>
              <Feed size="small">
                <Feed.Event>
                  <Feed.Label image={getImageUrlByGender(feed.user.gender)} />
                  <Feed.Content>
                    <Feed.Summary className="blog-detail-content">
                      <a>
                        {feed.user.name} {feed.user.surname}
                      </a>{" "}
                      <Feed.Date>
                        <b>@{feed.user.username}</b>{" "}
                        <Moment date={feed.createdAt} fromNow ago /> ago
                      </Feed.Date>
                    </Feed.Summary>
                    <Feed.Extra className="blog-detail-content">
                      {feed.content}
                    </Feed.Extra>
                  </Feed.Content>
                </Feed.Event>
              </Feed>
            </Segment>
          )}

          <Header as="h4">
            <Header.Content>feed'ini güncelle</Header.Content>
          </Header>
          <Form reply>
            <Form.TextArea
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                setContent(e.target.value)
              }
              style={{ minHeight: "300px" }}
              placeholder="Yeni içeriğini buraya gir!"
              value={content}
            />
          </Form>
        </Modal.Description>
      </Modal.Content>
      <Modal.Actions>
        <Button
          onClick={() => setOpen(false)}
          size="small"
          color="red"
          inverted
        >
          Vazgeç
        </Button>
        <Button
          onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
            onUpdateFeed(e);
            !loading && setOpen(false);
          }}
          size="small"
          color="green"
          inverted
          loading={loading}
          disabled={loading || !content}
        >
          Feed'i Güncelle
        </Button>
      </Modal.Actions>
    </Modal>
  );
};

export default UpdateFeed;
