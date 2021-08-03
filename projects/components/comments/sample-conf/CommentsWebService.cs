///////////////////////////////////////////////////////////
// Plugin Comments : file CommentsWebService.cs
//

using System;
using System.Collections.Generic;
using System.Text;
using Sinequa.Common;
using Sinequa.Configuration;
using Sinequa.Plugins;
using Sinequa.Connectors;
using Sinequa.Indexer;
using Sinequa.Search;
using Sinequa.Ml.Plugins;
using Sinequa.Search.JsonMethods;
using Sinequa.Engine.Client;
//using Sinequa.Ml;

namespace Sinequa.Plugin
{

    /// <summary>
    /// A class representing a single comment stored in a Sinequa index.
    /// </summary>
    public class Comment
    {
        public readonly string commentid;
        public readonly string docid;
        public string message;
        public readonly string userid;
        public readonly string username;
        public readonly DateTime creation;
        public DateTime modified;
        public readonly ListStr likes;
        public bool likedByUser;
        public readonly string replyto;
        public bool deleted;

        public List<Comment> subcomments = new List<Comment>();

        /// <summary>
        /// Constructor to initialize a new comment based on its minimal required inputs
        /// Other fields like the comment id and dates are initialized based on those inputs.
        /// </summary>
        /// <param name="docid">id of the document to which the comment is attached</param>
        /// <param name="message">textual content of the comment</param>
        /// <param name="user">principal of the author of the comment</param>
        /// <param name="replyto">optional id of the parent comment, if this is a reply</param>
        public Comment(string docid, string message, CCPrincipal user, string replyto )
        {
            creation = Dat.ToUtc(DateTime.Now);
            commentid = $"{docid}|{Str.Md5(user.UserId + creation.ToBinary())}";
            this.docid = docid;
            this.message = message;
            userid = user.UserId;
            username = user.FullName;
            if (Str.IsEmpty(username))
            {
                username = user.Name;
            }
            modified = creation;
            likes = new ListStr();
            likedByUser = false;
            this.replyto = replyto;
            deleted = false;
        }

        /// <summary>
        /// Constructor to reconstruct a comment object based on the content of the index.
        /// </summary>
        /// <param name="cursor">The cursor from which to retrieve the comment data</param>
        /// <param name="currentUserId">Current user requesting this comment</param>
        public Comment(Cursor cursor, string currentUserId)
        {
            commentid = cursor.GetColumn("id");
            docid = cursor.GetColumn("docid");
            message = cursor.GetColumn("message");
            userid = cursor.GetColumn("userid");
            username = cursor.GetColumn("username");
            creation = Sys.ToDat(cursor.GetColumn("creation")); // Dates in the index are UTC dates!
            modified = Sys.ToDat(cursor.GetColumn("modified"));
            likes = ListStr.ListFromStr(cursor.GetColumn("likes"), ';');
            likedByUser = likes.Contains(currentUserId);
            replyto = cursor.GetColumn("replyto") ?? "";
            deleted = Sys.ToBoo(cursor.GetColumn("deleted"));
        }

        /// <summary>
        /// Generate an INSERT SQL clause to store this comment in the index
        /// </summary>
        public string ToInsertSQL(string indexname)
        {
            return $"INSERT INTO {indexname} (id,docid,message,userid,username,creation,modified,likes,replyto,deleted) VALUES " +
            $"({Str.SqlValue(commentid)},{Str.SqlValue(docid)},{Str.SqlValue(message)},{Str.SqlValue(userid)},{Str.SqlValue(username)},{Str.SqlValue(creation)},{Str.SqlValue(modified)},'',{Str.SqlValue(replyto)},'false')";
        }

        /// <summary>
        /// Generate an UPDATE SQL clause to update this comment's data in the index 
        /// (only updating the message, modified date and likes as the rest is constant)
        /// </summary>
        public string ToUpdateSQL(string indexname)
        {
            string strlikes = Str.SqlValue(Str.Join(";",likes));
            return $"UPDATE {indexname} SET message={Str.SqlValue(message)},modified={Str.SqlValue(modified)},likes={strlikes} WHERE id={Str.SqlValue(commentid)} AND docid={Str.SqlValue(docid)}";
        }

        /// <summary>
        /// Generate an UPDATE SQL clause to remove the like of the current user from the index
        /// </summary>
        public string ToUpdateDeleteLikeSQL(string indexname, string userid)
        {
            string strlikes = Str.SqlValue(Str.Join(";", likes));
            return $"UPDATE {indexname} MODE 'delete' SET likes={Str.SqlValue(userid)} WHERE id={Str.SqlValue(commentid)} AND docid={Str.SqlValue(docid)}";
        }

        /// <summary>
        /// Generate an UPDATE SQL clause to append the like of the current user to the index
        /// </summary>
        public string ToUpdateAppendLikeSQL(string indexname, string userid)
        {
            string strlikes = Str.SqlValue(Str.Join(";", likes));
            return $"UPDATE {indexname} MODE 'append' SET likes={Str.SqlValue(userid)} WHERE id={Str.SqlValue(commentid)} AND docid={Str.SqlValue(docid)}";
        }

        /// <summary>
        /// Generate a JSON object from this comment, to be returned by the web service
        /// </summary>
        public Json ToJson()
        {
            var jComment = Json.NewObject();
            jComment.Set("commentid", commentid);
            jComment.Set("docid", docid);
            jComment.Set("replyto", replyto);
            jComment.Set("creation", Sys.ToStr(creation)+"Z"); // Note: dates are returned as UTC dates with "Z" suffix
            jComment.Set("modified", Sys.ToStr(modified)+"Z");

            if(!deleted)
            {
                jComment.Set("message", message);
                jComment.Set("userid", userid);
                jComment.Set("username", username);
                jComment.Set("likes", likes.Count);
                jComment.Set("likedByUser", likedByUser);
            }
            else
            {
                jComment.Set("deleted", true);
            }

            if(subcomments.Count > 0)
            {
                jComment.Set("subcomments", ToJson(subcomments));
            }
            
            return jComment;
        }

        /// <summary>
        /// Transforms a list of comments into a JSON array
        /// </summary>
        public static Json ToJson(List<Comment> comments)
        {
            var jComments = Json.NewArray();
            foreach(var comment in comments)
            {
                jComments.EltAdd(comment.ToJson());
            }
            return jComments;
        }

    }
    

    /// <summary>
    /// Web service managing the comments.
    /// The web service has a single endpoint and 5 actions:
    /// - create: Create a new comment
    /// - read: Retrieve the list of comments for a given document
    /// - update: Update the content of an existing comment (if allowed)
    /// - delete: Delete a comment (if allowed)
    /// - like: Like a comment
    /// </summary>
	public class CommentsWebService : JsonMethodPlugin
    {
        // TODO: Store index name in configuration
        static readonly string indexname = "comments";
 
        public override JsonMethodAuthLevel GetRequiredAuthLevel()
        {
            return JsonMethodAuthLevel.User;
        }

        /// <summary>
        /// Main entry point of the web service. This method simply retrieves the "action"
        /// input from the request, and calls the corresponding method accordingly (among which
        /// Create(), Read(), Update(), Delete(), Like()).
        /// </summary>
        public override void OnPluginMethod()
        {

            //Sys.Log("Comments Web Service Plugin Start");

            string action = ensureStrInput("action");
            string docid = ensureStrInput("docid");
            if (docid == null || action == null) return;

            if (!Method.Session.HasAccessToDocId(docid))
            {
                SetError(403, "You do not have access to this document");
                return;
            }

            CCIndex index = CC.Current.Indexes[indexname];
            EngineClient client = null;

            try
            {

                client = EngineClientsPool.FromPool(index);

                switch (action.ToLower())
                {
                    case "create":
                        Create(client, docid);
                        break;

                    case "read":
                        Read(client, docid);
                        break;

                    case "count":
                        Count(client, docid);
                        break;

                    case "update":
                        Update(client, docid);
                        break;

                    case "delete":
                        Delete(client, docid);
                        break;

                    case "like":
                        Like(client, docid);
                        break;

                    default:
                        SetError(400, "Invalid 'action' input. Possible actions: 'create','read','update','delete','like'");
                        break;
                }

            }
            catch (Exception ex)
            {
                JsonResponse.SetValue("error", ex.StackTrace);
                SetError(400, ex.Message);
            }
            finally
            {
                EngineClientsPool.ToPool(client);
            }

            //Sys.Log("Comments Web Service Plugin End");
        }

        /// <summary>
        /// Create a new comment
        /// </summary>
        /// <param name="client"></param>
        /// <param name="docid"></param>
        private void Create(EngineClient client, string docid)
        {
            // Get required inputs
            string message = ensureStrInput("message");
            if (message == null) return;
            string replyto = Method.JsonRequest.ValueStr("replyto", "");

            // Create a Comment object
            var comment = new Comment(docid, message, Method.Session.User, replyto);

            // Insert into index
            string sql = comment.ToInsertSQL(indexname);
            client.Exec(sql);
            if (client.HasError())
            {
                SetError(500, client.GetError());
                Sys.LogError($"Error engine: {client.GetError()} for SQL: {sql}");
                return;
            }

            // Return the new comment
            JsonResponse.Set("comment", comment.ToJson());
        }

        /// <summary>
        /// Get all the comments for a given document
        /// </summary>
        /// <param name="client"></param>
        /// <param name="docid"></param>
        private void Read(EngineClient client, string docid)
        {
            // Extract comments from index
            var comments = ReadComments(client, docid);

            // Organize comments in a tree structure
            var rootComments = new List<Comment>();
            foreach(var comment in comments.Values)
            {
                if(!Str.IsEmpty(comment.replyto))
                {
                    if (comments.ContainsKey(comment.replyto))
                    {
                        var parent = comments[comment.replyto];
                        parent.subcomments.Add(comment);
                    }
                    else
                    {
                        // This is not a dramatic error... This orphan comment just won't be shown
                        Sys.LogError($"Comment {comment.commentid} replies to a parent {comment.replyto} that was not found..!");
                    }
                }
                else
                {
                    rootComments.Add(comment);
                }
            }

            // Write JSON
            JsonResponse.Set("comments", Comment.ToJson(rootComments));
        }


        /// <summary>
        /// Get the number of comments for a given document
        /// </summary>
        /// <param name="client"></param>
        /// <param name="docid"></param>
        private void Count(EngineClient client, string docid)
        {
            var sql = $"SELECT id FROM {indexname} WHERE docid={Str.SqlValue(docid)} ORDER BY modified LIMIT 1";

            Cursor cursor = client.ExecCursor(sql);
            if (cursor != null)
            {
                // Write JSON
                JsonResponse.Set("count", cursor.TotalRowCount);
            }
            else
            {
                throw new Exception("Cursor is null!");
            }
        }


        /// <summary>
        /// Update the content of a comment
        /// </summary>
        /// <param name="client"></param>
        /// <param name="docid"></param>
        private void Update(EngineClient client, string docid)
        {
            // Get required inputs
            string commentid = ensureStrInput("commentid");
            if (commentid == null) return;

            string message = ensureStrInput("message");
            if (message == null) return;

            // Read the comment from the engine
            var comment = ReadComment(client, commentid, docid);
            if (comment == null) return;

            // Prevent updating a deleted comment
            if (comment.deleted)
            {
                SetError(400, $"Cannot like/unlike a deleted comment");
                return;
            }

            // Update the message content
            comment.message = message;
            comment.modified = Dat.ToUtc(DateTime.Now);

            string sql = comment.ToUpdateSQL(indexname);

            // Admin can update any comment
            if (!Method.Session.User.IsAdministrator)
            {
                string userid = Method.Session.UserId;
                sql = $"{sql} AND userid={Str.SqlValue(userid)}";
            }

            // Update the index;
            int res = client.Exec(sql);
            if (client.HasError())
            {
                SetError(500, client.GetError());
                Sys.LogError($"Error engine: {client.GetError()} for SQL: {sql}");
                return;
            }

            // Check that the comment was correctly updated
            if (res != 1)
            {
                SetError(404, $"This comment could not be found");
                return;
            }

            // Return the updated comment
            JsonResponse.Set("comment", comment.ToJson());
        }


        /// <summary>
        /// Delete a comment (hard or soft delete supported)
        /// </summary>
        /// <param name="client"></param>
        private void Delete(EngineClient client, string docid)
        {
            // Get required inputs
            string commentid = ensureStrInput("commentid");
            if (commentid == null) return;
            bool markAsDeleted = Method.JsonRequest.ValueBoo("markAsDeleted", true);

            // Hard vs soft delete mode
            string sql;
            if (markAsDeleted)
            {
                // Only mark the comment as deleted (can still have replies)
                sql = $"UPDATE {indexname} SET message='',userid='',username='',likes='',deleted='true' WHERE id={Str.SqlValue(commentid)} AND docid={Str.SqlValue(docid)}";
            }
            else
            {
                // Hard delete the comment
                sql = $"DELETE FROM {indexname} WHERE id={Str.SqlValue(commentid)}";
            }

            // Admin can delete any comment
            if (!Method.Session.User.IsAdministrator)
            {
                string userid = Method.Session.UserId;
                sql = $"{sql} AND userid={Str.SqlValue(userid)}";
            }

            // Delete from index
            int res = client.Exec(sql);
            if (client.HasError())
            {
                SetError(500, client.GetError());
                Sys.LogError($"Error engine: {client.GetError()} for SQL: {sql}");
                return;
            }

            // Check that the comment was correctly deleted
            if (res != 1)
            {
                SetError(404, $"This comment could not be found");
                return;
            }

        }

        /// <summary>
        /// Like or Unlike a comment
        /// </summary>
        /// <param name="client"></param>
        private void Like(EngineClient client, string docid)
        {
            // Get required inputs
            string commentid = ensureStrInput("commentid");
            if (commentid == null) return;

            // Read the comment from the engine
            var comment = ReadComment(client, commentid, docid);
            if (comment == null) return;

            // Prevent liking a deleted comment
            if (comment.deleted)
            {
                SetError(400, $"Cannot like/unlike a deleted comment");
                return;
            }

            // Update the comment
            string sql;
            if (comment.likes.Contains(Method.Session.UserId))
            {
                comment.likes.Remove(Method.Session.UserId);
                comment.likedByUser = false;
                sql = comment.ToUpdateDeleteLikeSQL(indexname, Method.Session.UserId);
            }
            else
            {
                comment.likes.Add(Method.Session.UserId);
                comment.likedByUser = true;
                sql = comment.ToUpdateAppendLikeSQL(indexname, Method.Session.UserId);
            }

            int res = client.Exec(sql);
            if (client.HasError())
            {
                SetError(500, client.GetError());
                Sys.LogError($"Error engine: {client.GetError()} for SQL: {sql}");
                return;
            }

            if (res != 1)
            {
                SetError(404, $"This comment could not be found");
                return;
            }

            // Return the updated comment
            JsonResponse.Set("comment", comment.ToJson());
        }


        /// <summary>
        /// Retrieve the raw list of comments attached to a document
        /// </summary>
        /// <param name="client">Engine client to make the request</param>
        /// <param name="docid">id of the document to retrieve</param>
        /// <returns>A dictionary mapping comment ids to comment objects</returns>
        private Dictionary<string, Comment> ReadComments(EngineClient client, string docid)
        {
            var comments = new Dictionary<string, Comment>();
            var sql = $"SELECT * FROM {indexname} WHERE docid={Str.SqlValue(docid)} ORDER BY modified LIMIT 10000"; // Hard limit of 10000 comments for extreme cases

            Cursor cursor = client.ExecCursor(sql);
            if (cursor != null)
            {
                while (!cursor.End())
                {
                    Comment comment = new Comment(cursor, Method.Session.UserId);
                    comments.Add(comment.commentid, comment);
                    cursor.MoveNext();
                }
            }
            else
            {
                throw new Exception("Cursor is null!");
            }
            return comments;
        }


        /// <summary>
        /// Read a single comment from the index
        /// </summary>
        /// <param name="client">Engine client to make the request</param>
        /// <param name="commentid">id of the comment to retrieve</param>
        /// <returns>a Comment object (or null if the comment was not found)</returns>
        private Comment ReadComment(EngineClient client, string commentid, string docid)
        {
            // Get the current comment
            string sql = $"SELECT * FROM {indexname} WHERE id={Str.SqlValue(commentid)} AND docid={Str.SqlValue(docid)} LIMIT 1";

            Cursor cursor = client.ExecCursor(sql);
            if (cursor != null && !client.HasError())
            {
                Comment comment = null;
                if (!cursor.End())
                {
                    comment = new Comment(cursor, Method.Session.UserId);
                }
                else
                {
                    SetError(404, $"This comment could not be found");
                }
                cursor.Dispose();
                return comment;
            }
            else
            {
                throw new Exception("Cursor is null! "+client.GetError());
            }
        }

        /// <summary>
        /// Retrieve an input from the current request JSON body.
        /// Set an error status if the input is missing or empty (unless allowEmpty = true)
        /// </summary>
        private string ensureStrInput(string name, bool allowEmpty = false)
        {
            string data = Method.JsonRequest.ValueStr(name);

            if (data == null)
            {
                SetError(400, $"Missing \"{name}\" input");
                return null;
            }

            if(!allowEmpty && Str.IsEmpty(data))
            {
                SetError(400, $"Empty \"{name}\" input");
                return null;
            }

            return data;
        }

    }


}
