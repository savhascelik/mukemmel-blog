import * as React from "react";
import { Feed, Image, Card, Segment, Message } from "semantic-ui-react";
import {
  Favorite,
  FavoriteBorder,
  CommentOutlined,
  ChatBubbleOutline
} from "@material-ui/icons";
import { getImageUrlByGender } from "../../utils/functions/getUserImageUrl";
import { useQuery } from "react-apollo";
import { GetFeedsReturnData } from "../../@types/interfaces/PageInterfaces/Feed/feedlist.interfaces";
import { FEEDS } from "../../graphql/Feed/query";
import Moment from "react-moment";
import Loading from "../../components/Loading/Loading";
import LikeFeed from "./LikeFeed";
import ReplyFeed from "./ReplyFeed";
import {
  User,
  Feed as FeedType
} from "../../@types/types/database/DatabaseTypes";
import { Redirect } from "react-router";
import { NavLink } from "react-router-dom";
import DeleteFeed from "./DeleteFeed";
import UpdateFeed from "./UpdateFeed";

type Props = {
  activeUser: User;
};

const FeedList: React.FC<Props> = ({ activeUser }) => {
  const { data, loading } = useQuery<GetFeedsReturnData>(FEEDS);

  if (loading) return <Loading size={50} />;

  const feeds: FeedType[] = data.feeds.filter(
    (feed: FeedType) => feed.reply_id === "not a reply"
  );

  return (
    <>
      {feeds.length === 0 ? (
        <Message
          color="red"
          header="Burada hiç feed yok!"
          content="Eğer istersen hemen giriş yaparak ya da kayıt olarak düşüncelerini paylaşabilirsin!"
        />
      ) : (
        feeds.map(feed => (
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
                    {feed.blog !== null && (
                      <NavLink to={`/blog/details/${feed.blog.id}`}>
                        ({feed.blog.title}'dan bahsederek)
                      </NavLink>
                    )}
                  </Feed.Extra>
                  <Feed.Meta>
                    <Feed.Like>
                      <LikeFeed id={feed.id} />
                      <span style={{ marginLeft: "2px" }}>
                        {feed.likes} Beğeni
                      </span>
                    </Feed.Like>
                    <Feed.Like>
                      <ReplyFeed reply_id={feed.id} activeUser={activeUser} />
                      <span style={{ marginLeft: "2px" }}>
                        {feed.replies.length} Yanıt
                      </span>
                    </Feed.Like>
                    {activeUser.id === feed.user_id && (
                      <Feed.Like>
                        <DeleteFeed id={feed.id} /> Sil
                      </Feed.Like>
                    )}
                    {activeUser.id === feed.user_id && (
                      <Feed.Like>
                        <UpdateFeed id={feed.id} /> Güncelle
                      </Feed.Like>
                    )}
                    {feed.replies.length !== 0 && (
                      <Feed.Like>
                        <a href={`/social/feed/details/${feed.id}`}>
                          Bu konuyu göster
                        </a>
                      </Feed.Like>
                    )}
                  </Feed.Meta>
                </Feed.Content>
              </Feed.Event>
            </Feed>
          </Segment>
        ))
      )}
    </>
  );
};

export default FeedList;