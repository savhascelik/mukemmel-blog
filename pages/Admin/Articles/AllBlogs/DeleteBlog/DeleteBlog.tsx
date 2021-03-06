import * as React from "react";
import { Popup, Icon } from "semantic-ui-react";
import { DeleteOutline } from "@material-ui/icons";
import {
  GET_LAST_FOUR_BLOG,
  GET_BLOGS,
  GET_BLOG_BY_ID
} from "../../../../../graphql/Blog/query";
import { DELETE_BLOG } from "../../../../../graphql/Blog/mutation";
import { useMutation } from "@apollo/react-hooks";
import { IOnDeleteBlogFunc } from "../../../../../@types/types/functions/Articles/types";
import {
  Props,
  DeleteBlogReturnData,
  DeleteBlogVariables
} from "../../../../../@types/interfaces/PageInterfaces/Admin/Articles/DeleteBlog/deleteblog.interfaces";

const DeleteBlog: React.FC<Props> = ({ id }) => {
  const [deleteBlog, { loading }] = useMutation<
    DeleteBlogReturnData,
    DeleteBlogVariables
  >(DELETE_BLOG, {
    variables: { id },
    awaitRefetchQueries: true,
    refetchQueries: [
      { query: GET_LAST_FOUR_BLOG },
      { query: GET_BLOGS },
      { query: GET_BLOG_BY_ID, variables: { id } }
    ]
  });

  const onDelete: IOnDeleteBlogFunc = (
    e: React.MouseEvent<SVGSVGElement, MouseEvent>
  ): void => {
    e.preventDefault();
    deleteBlog();
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
      content="Blogu sil!"
      size="small"
    />
  );
};

export default DeleteBlog;
