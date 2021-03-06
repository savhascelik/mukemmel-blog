import * as React from "react";
import {
  Props,
  DeleteCommentReturnData,
  DeleteCommentVariables
} from "../../../@types/interfaces/PageInterfaces/BlogDetails/Comment/deletecomment.interfaces";
import { Popup, Icon } from "semantic-ui-react";
import { useMutation } from "react-apollo";
import { DELETE_COMMENT } from "../../../graphql/Comment/mutation";
import { GET_BLOG_BY_ID } from "../../../graphql/Blog/query";
import {
  GET_COMMENT_BY_USER_ID,
  GET_COMMENTS
} from "../../../graphql/Comment/query";
import { DeleteOutline } from "@material-ui/icons";
import { IOnDeleteCommentFunc } from "../../../@types/types/functions/Comment/types";

const DeleteComment: React.FC<Props> = ({ blog_id, user_id, id }) => {
  const [deleteComment, { loading }] = useMutation<
    DeleteCommentReturnData,
    DeleteCommentVariables
  >(DELETE_COMMENT, {
    variables: { id },
    awaitRefetchQueries: true,
    refetchQueries: [
      { query: GET_BLOG_BY_ID, variables: { id: blog_id } },
      { query: GET_COMMENT_BY_USER_ID, variables: { user_id, blog_id } },
      { query: GET_COMMENTS }
    ]
  });

  const onDelete: IOnDeleteCommentFunc = (
    e: React.MouseEvent<SVGSVGElement, MouseEvent>
  ): void => {
    e.preventDefault();
    deleteComment();
  };

  return (
    <Popup
      trigger={
        <Icon
          onClick={(e: React.MouseEvent<SVGSVGElement>) => {
            onDelete(e);
          }}
          loading={loading}
          disabled={loading}
          children={<DeleteOutline htmlColor="black" />}
        />
      }
      content="Yorumunu sil!"
      size="small"
    />
  );
};

export default DeleteComment;
