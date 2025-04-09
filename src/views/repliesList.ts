import { Reply } from "../types/reply";
import { getDistanceFromNow } from "../utils/date";

export default function repliesList(replies: Reply[]) {
  return `
        <hr>
        <h3>Replies</h3>
        <div class="replies-wrapper">
            ${replies.length === 0 ? `<p class="empty">No replies</p>` : ""}
            ${replies
              .map(
                (reply) => `
                <article>
                    <p>${reply.body}</p>
                    <div class="author-stats">
                        <a class="link" href="#"><strong>${reply.author_name}</strong></a>
                        <span>Upvotes:&nbsp;${reply.upvotes}</span>
                        <span>Posted:&nbsp;${getDistanceFromNow(reply.created_at)}</span>
                        <button class="bite-back-button">Bite back</button>
                    </div>
                </article>
            `,
              )
              .join(" ")}
        </div>
    `;
}
