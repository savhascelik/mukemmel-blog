import * as React from "react";
import { Comment, Grid, Divider, Message, Feed } from "semantic-ui-react";
import { useQuery, useMutation } from "react-apollo";
import Loading from "../../components/Loading/Loading";
import Moment from "react-moment";
import { NavLink } from "react-router-dom";
import { getImageUrlByGender } from "../../utils/functions/getUserImageUrl";
import { GetFeedsReturnData } from "../../@types/interfaces/PageInterfaces/Feed/feedlist.interfaces";
import { FEEDS } from "../../graphql/Feed/query";
import LikeFeed from "../Social/LikeFeed";
import ReplyFeed from "../Social/ReplyFeed";
import { User } from "../../@types/types/database/DatabaseTypes";

type Props = {
  activeUser: User;
  userImage?: boolean;
};

const LastFeeds: React.FC<Props> = ({ activeUser, userImage }) => {
  const currentBlogId: string = window.location.pathname.split("/")[3];

  const { data, loading } = useQuery<GetFeedsReturnData>(FEEDS);

  if (loading) return <Loading size={50} />;

  const feeds = data.feeds
    .filter(feed => feed.reply_id === "not a reply")
    .slice(0, 4);

  return (
    <Grid>
      <Grid.Column>
        {!data.feeds ||
          (data.feeds.length === 0 && (
            <Message error>
              <Message.Header>Burada Hiç Feed Yok!</Message.Header>
              <Message.Content>
                Bir tane eklemek ister misin?{" "}
                <NavLink to="/social">Ekle!</NavLink>
              </Message.Content>
            </Message>
          ))}
        <Feed>
          {feeds.map(feed => (
            <React.Fragment key={feed.id}>
              <Feed.Event>
                {userImage && (
                  <Feed.Label image={getImageUrlByGender(feed.user.gender)} />
                )}
                <Feed.Content>
                  <Feed.Summary className="blog-detail-content">
                    <a href={`/profile/${feed.user_id}`}>
                      {feed.user.name} {feed.user.surname}
                    </a>{" "}
                    <Feed.Date>
                      <b>@{feed.user.username}</b>{" "}
                      <Moment date={feed.createdAt} fromNow ago /> ago
                    </Feed.Date>
                  </Feed.Summary>
                  <Feed.Extra className="blog-detail-content">
                    {feed.content.slice(0, 80)}...{" "}
                    <a href={`/social/feed/details/${feed.id}`}>feed'i gör</a>
                    {feed.blog !== null && feed.blog_id !== currentBlogId && (
                      <NavLink to={`/blog/details/${feed.blog.id}`}>
                        ({feed.blog.title}'dan bahsederek)
                      </NavLink>
                    )}
                  </Feed.Extra>
                  <Feed.Meta>
                    <Feed.Like>
                      <LikeFeed activeUser={activeUser} id={feed.id} />
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
              <Divider />
            </React.Fragment>
          ))}
        </Feed>
      </Grid.Column>
    </Grid>
  );
};

export default LastFeeds;
