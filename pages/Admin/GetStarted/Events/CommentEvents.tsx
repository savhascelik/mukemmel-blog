import * as React from "react";
import { useQuery } from "react-apollo";
import { Comment } from "../../../../@types/types/database/DatabaseTypes";
import Loading from "../../../../components/Loading/Loading";
import { Card, Feed, Header, Image } from "semantic-ui-react";
import Moment from "react-moment";
import Pagination from "../../../../components/Pagination/Pagination";
import { GetCommentsReturnData } from "../../../../@types/interfaces/PageInterfaces/BlogDetails/allcommentstab.interfaces";
import { GET_COMMENTS } from "../../../../graphql/Comment/query";
import { getImageUrlByGender } from "../../../../utils/functions/getUserImageUrl";

const CommentEvents: React.FC = () => {
  const [currentPage, setCurrentPage] = React.useState<number>(1);

  const { data: getCommentsData, loading: getCommentsLoading } = useQuery<
    GetCommentsReturnData
  >(GET_COMMENTS);

  let totalComments: Array<Comment>;

  let indexOfLastComment: number;
  let indexOfFirstComment: number;
  let currentComments: Array<Comment>;

  if (!getCommentsLoading) {
    totalComments = getCommentsData.comments;
    indexOfLastComment = currentPage * 3;
    indexOfFirstComment = indexOfLastComment - 3;
    currentComments = totalComments.slice(
      indexOfFirstComment,
      indexOfLastComment
    );
  }

  return (
    <div style={{ marginTop: "15px" }}>
      {getCommentsLoading ? (
        <Loading size={30} />
      ) : (
        <Card.Content>
          <Feed>
            <Header as="h4" content="Son yapılan yorumlar:" />
            {currentComments.map((comment: Comment) => (
              <Feed.Event key={comment.id}>
                <Feed.Label>
                  <Image
                    size="mini"
                    src={getImageUrlByGender(comment.user.gender)}
                  />
                </Feed.Label>
                <Feed.Content>
                  <Feed.Date>
                    {comment.user.name} {comment.user.surname} &nbsp;
                    <Moment date={comment.createdAt} fromNow ago /> ago
                  </Feed.Date>
                  <Feed.Summary>
                    {comment.content}{" "}
                    <a href={`/blog/details/${comment.blog_id}`}>
                      Blog'a git...
                    </a>
                  </Feed.Summary>
                </Feed.Content>
              </Feed.Event>
            ))}
            <Pagination
              itemsPerPage={3}
              totalItems={totalComments}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              scrollTo={false}
            />
          </Feed>
        </Card.Content>
      )}
    </div>
  );
};

export default CommentEvents;
