import { NormalComment } from "@sinequa/components/comments";

export const COMMENTS: Comment[] = [
    new Comment('comment 1'),
    new Comment('comment 2'),
    new Comment('comment 3'),
    new Comment('comment 4')
];

export const NORMAL_COMMENT: NormalComment = {
    message: 'comment',
    userid: 'userid',
    username: 'username',
    likes: 3,
    likedByUser: false,
    commentid: 'commentid',
    docid: 'docid',
    replyto: 'replyto',
    creation: '2020-11-05 11:10:47',
    modified: '2020-11-05 11:10:47'
};