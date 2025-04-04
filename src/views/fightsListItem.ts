import { FightWithDistance } from "../types";

export default function fightsListItem(fight: FightWithDistance) {
  return `
        <article>
            <a href="#">
                <h2>${fight.title}</h2>
            </a>
            <a href="#" class="author">${fight.authorName}</a>
            <div class="stats">
                <span>Replies: ${fight.replyCount}</span>
                <span>Upvotes: ${fight.upvotes}</span>
                <span>Last post: ${fight.latestActivityDistance}</span>
            </div>
        </article>  
    `;
}
