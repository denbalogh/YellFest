import { Reply } from "../types/reply";
import { getDistanceFromNow } from "../utils/date";

export default function repliesListItem(reply: Reply, newUserName: string) {
  const hasChildren = !!reply.children;

  return `
    <div ${hasChildren ? "" : `class="indent"`}>
        <article 
            data-fight-id="${reply.fight_id}" 
            data-reply-id="${reply.reply_id}" 
            data-new-user-name="${newUserName}"
        >
            <p>${reply.body}</p>
            <div class="author-stats">
                <a class="link" href="#"><strong>${reply.author_name}</strong></a>
                <span>Upvotes:&nbsp;${reply.upvotes}</span>
                <span>Posted:&nbsp;${getDistanceFromNow(reply.created_at)}</span>
                ${reply.parent_reply_id ? "" : `<button class="bite-back-button">Bite back</button>`}
            </div>
        </article>
        ${hasChildren ? reply.children.map((reply) => repliesListItem(reply, newUserName)).join(" ") : ""}
    </div>
`;
}
