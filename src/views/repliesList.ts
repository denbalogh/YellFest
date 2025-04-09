import { Reply } from "../types/reply";
import repliesListItem from "./repliesListItem";

export default function repliesList(replies: Reply[], newUserName: string) {
  return `
        <hr>
        <h3>Replies</h3>
        <div class="replies-wrapper">
            ${replies.length === 0 ? `<p class="empty">No replies</p>` : ""}
            ${replies
              .map((reply) => repliesListItem(reply, newUserName))
              .join(" ")}
        </div>
    `;
}
